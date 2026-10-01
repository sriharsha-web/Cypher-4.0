"use client";

import { useState, useCallback, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Check, Plus, X, Users, CreditCard, Sparkles, AlertCircle, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Header } from "@/components/cypher/Header";
import { Footer } from "@/components/cypher/Footer";
import { PASSES, getPrice, MIN_TEAM_SIZE, MAX_TEAM_SIZE } from "@/lib/passes";
import type { PassId, PassConfig } from "@/lib/passes";

/* ─── Razorpay type ─── */
declare global {
  interface Window {
    Razorpay: any;
  }
}

/* ─── Types ─── */
type FlowStep = "select" | "form" | "success" | "failed";

interface FormData {
  teamName: string;
  teamLeaderName: string;
  contactNumber: string;
  email: string;
  collegeName: string;
  members: string[];
}

interface SuccessData {
  registrationId: string;
  teamName: string;
  passName: string;
  teamSize: number;
  amount: number;
  paymentId: string;
}

const initialForm: FormData = {
  teamName: "",
  teamLeaderName: "",
  contactNumber: "",
  email: "",
  collegeName: "",
  members: ["", ""],
};

/* ─── Validation ─── */
function validateForm(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.teamName.trim()) errors.teamName = "Team name is required";
  if (!data.teamLeaderName.trim()) errors.teamLeaderName = "Team leader name is required";
  const phone = data.contactNumber.replace(/\D/g, "");
  if (!phone) errors.contactNumber = "Phone number is required";
  else if (phone.length !== 10) errors.contactNumber = "Enter exactly 10 digits";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email";
  if (!data.collegeName.trim()) errors.collegeName = "College name is required";
  data.members.forEach((m, i) => {
    if (!m.trim()) errors[`member_${i}`] = `Member ${i + 1} name is required`;
  });
  return errors;
}

/* ─── Component ─── */
function RegisterPageInner() {
  const [step, setStep] = useState<FlowStep>("select");
  const [selectedPass, setSelectedPass] = useState<PassId | null>(null);
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [orderCache, setOrderCache] = useState<{ orderId: string; registrationId: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  /* ── Auto-select pass from URL ── */
  useEffect(() => {
    const passParam = searchParams.get("pass");
    if (passParam && PASSES[passParam as PassId]) {
      selectPass(passParam as PassId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pass = selectedPass ? PASSES[selectedPass] : null;
  const teamSize = form.members.length;
  const price = selectedPass ? getPrice(selectedPass, teamSize) : 0;

  /* ── Leader syncs to member 0 ── */
  const updateLeader = useCallback((name: string) => {
    setForm(prev => {
      const members = [...prev.members];
      members[0] = name;
      return { ...prev, teamLeaderName: name, members };
    });
  }, []);

  const updateMember = useCallback((index: number, name: string) => {
    setForm(prev => {
      const members = [...prev.members];
      members[index] = name;
      const updates: Partial<FormData> = { members };
      if (index === 0) updates.teamLeaderName = name;
      return { ...prev, ...updates };
    });
  }, []);

  const addMember = useCallback(() => {
    setForm(prev => {
      if (prev.members.length >= MAX_TEAM_SIZE) return prev;
      return { ...prev, members: [...prev.members, ""] };
    });
  }, []);

  const removeMember = useCallback((index: number) => {
    setForm(prev => {
      if (prev.members.length <= MIN_TEAM_SIZE || index === 0) return prev;
      const members = prev.members.filter((_, i) => i !== index);
      return { ...prev, members };
    });
  }, []);

  /* ── Load Razorpay script ── */
  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise(resolve => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  /* ── Payment ── */
  const handleSubmit = useCallback(async () => {
    setServerError("");
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    if (!selectedPass || !pass) return;

    setSubmitting(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load payment gateway.");

      // Create order (or reuse cached)
      let orderId = orderCache?.orderId;
      let registrationId = orderCache?.registrationId;

      if (!orderId) {
        const res = await fetch("/api/registration/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            passId: selectedPass,
            teamName: form.teamName.trim(),
            teamLeaderName: form.teamLeaderName.trim(),
            contactNumber: form.contactNumber.replace(/\D/g, ""),
            email: form.email.trim(),
            collegeName: form.collegeName.trim(),
            members: form.members.map(m => m.trim()),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create order.");
        orderId = data.orderId;
        registrationId = data.registrationId;
        setOrderCache({ orderId: orderId!, registrationId: registrationId! });
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price! * 100,
        currency: "INR",
        name: "CYPHER 4.0",
        description: `${pass.name} Pass — ${teamSize} Members`,
        order_id: orderId,
        prefill: {
          name: form.teamLeaderName,
          email: form.email,
          contact: `+91${form.contactNumber.replace(/\D/g, "")}`,
        },
        theme: { color: "#7b28bd" },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSuccessData({
                registrationId: registrationId!,
                teamName: form.teamName,
                passName: pass.name,
                teamSize,
                amount: price!,
                paymentId: response.razorpay_payment_id,
              });
              setStep("success");
              setOrderCache(null);
            } else {
              throw new Error(verifyData.error || "Verification failed.");
            }
          } catch {
            setStep("failed");
          }
          setSubmitting(false);
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setStep("failed");
        setSubmitting(false);
      });
      rzp.open();
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
      setSubmitting(false);
    }
  }, [form, selectedPass, pass, price, teamSize, loadRazorpay, orderCache]);

  /* ── Retry ── */
  const handleRetry = useCallback(() => {
    setStep("form");
    setServerError("");
  }, []);

  /* ── Select pass and go to form ── */
  const selectPass = useCallback((id: PassId) => {
    setSelectedPass(id);
    setForm({ ...initialForm });
    setErrors({});
    setServerError("");
    setOrderCache(null);
    setStep("form");
  }, []);

  return (
    <div className="site-shell">
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(o => !o)} onNavigate={() => setMenuOpen(false)} />
      <main className="reg-main">

        {/* ── STEP: Pass Selection ── */}
        {step === "select" && (
          <section className="reg-section">
            <div className="shell reg-container">
              <Link href="/" className="reg-back-link"><ArrowLeft size={14} /> Back to Home</Link>
              <p className="mono-label">REGISTRATION / SELECT PASS</p>
              <div className="reg-heading-row">
                <h1>SELECT YOUR PASS</h1>
                <span className="early-bird-badge"><Sparkles size={13} /> EARLY BIRD PRICES</span>
              </div>
              <div className="reg-passes">
                {Object.values(PASSES).map((p) => (
                  <article key={p.id} className={`reg-pass-card${p.featured ? " featured-pass" : ""}`}>
                    {p.featured && <span className="featured-label">FEATURED PASS</span>}
                    <h3>{p.name}</h3>
                    <div className="pass-price"><strong>Rs {p.perPerson}/-</strong><small>per person</small></div>
                    <p className="pass-desc">{p.description}</p>
                    <ul className="pass-benefits">
                      {p.benefits.map((b, i) => <li key={i}><Check size={15} /><span>{b}</span></li>)}
                    </ul>
                    <button className={`button ${p.featured ? "button-acid" : "button-outline"} pass-btn`} onClick={() => selectPass(p.id)}>
                      Register Now <ArrowUpRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── STEP: Registration Form ── */}
        {step === "form" && pass && (
          <section className="reg-section">
            <div className="shell reg-container">
              <button className="reg-back-link" onClick={() => { setStep("select"); setOrderCache(null); }}><ArrowLeft size={14} /> Change Pass</button>
              <p className="mono-label">REGISTRATION / {pass.name}</p>
              <h1>REGISTER YOUR TEAM</h1>

              <div className="reg-form-layout">
                {/* Form */}
                <div className="reg-form-card">
                  <div className="reg-pass-indicator">
                    <span className="reg-pass-dot" /> Selected Pass: <strong>{pass.name}</strong>
                  </div>

                  {/* Team Details */}
                  <h4 className="reg-form-section-title"><Users size={16} /> TEAM DETAILS</h4>

                  <div className="reg-field">
                    <label htmlFor="teamName">Team Name <span className="req">*</span></label>
                    <input id="teamName" type="text" placeholder="Enter team name" value={form.teamName}
                      onChange={e => { setForm(f => ({ ...f, teamName: e.target.value })); setErrors(e2 => { const n = {...e2}; delete n.teamName; return n; }); }} className={errors.teamName ? "has-error" : ""} />
                    {errors.teamName && <span className="field-error"><AlertCircle size={12} /> {errors.teamName}</span>}
                  </div>

                  <div className="reg-field">
                    <label htmlFor="teamLeader">Team Leader Name <span className="req">*</span></label>
                    <input id="teamLeader" type="text" placeholder="Enter team leader name" value={form.teamLeaderName}
                      onChange={e => { updateLeader(e.target.value); setErrors(e2 => { const n = {...e2}; delete n.teamLeaderName; delete n.member_0; return n; }); }} className={errors.teamLeaderName ? "has-error" : ""} />
                    {errors.teamLeaderName && <span className="field-error"><AlertCircle size={12} /> {errors.teamLeaderName}</span>}
                  </div>

                  <div className="reg-field">
                    <label htmlFor="phone">Contact Number <span className="req">*</span></label>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+91</span>
                      <input id="phone" type="tel" inputMode="numeric" placeholder="9876543210" maxLength={10} value={form.contactNumber}
                        onChange={e => { const v = e.target.value.replace(/\D/g, "").slice(0, 10); setForm(f => ({ ...f, contactNumber: v })); setErrors(e2 => { const n = {...e2}; delete n.contactNumber; return n; }); }} className={errors.contactNumber ? "has-error" : ""} />
                    </div>
                    {errors.contactNumber && <span className="field-error"><AlertCircle size={12} /> {errors.contactNumber}</span>}
                  </div>

                  <div className="reg-field">
                    <label htmlFor="email">Email <span className="req">*</span></label>
                    <input id="email" type="email" placeholder="team@example.com" value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(e2 => { const n = {...e2}; delete n.email; return n; }); }} className={errors.email ? "has-error" : ""} />
                    {errors.email && <span className="field-error"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>

                  <div className="reg-field">
                    <label htmlFor="college">College Name <span className="req">*</span></label>
                    <input id="college" type="text" placeholder="Enter college name" value={form.collegeName}
                      onChange={e => { setForm(f => ({ ...f, collegeName: e.target.value })); setErrors(e2 => { const n = {...e2}; delete n.collegeName; return n; }); }} className={errors.collegeName ? "has-error" : ""} />
                    {errors.collegeName && <span className="field-error"><AlertCircle size={12} /> {errors.collegeName}</span>}
                  </div>

                  {/* Team Members */}
                  <h4 className="reg-form-section-title"><Users size={16} /> TEAM MEMBERS ({teamSize}/{MAX_TEAM_SIZE})</h4>

                  <div className="reg-members-list">
                    {form.members.map((m, i) => (
                      <div className="reg-member-row" key={i}>
                        <div className="reg-member-number">{String(i + 1).padStart(2, "0")}</div>
                        <div className="reg-member-input-wrap">
                          {i === 0 ? (
                            <div className="reg-member-leader">
                              <span className="reg-leader-badge">TEAM LEADER</span>
                              <span>{form.teamLeaderName || "—"}</span>
                            </div>
                          ) : (
                            <input type="text" placeholder={`Enter member ${i + 1} name`} value={m}
                              onChange={e => { updateMember(i, e.target.value); setErrors(er => { const n = {...er}; delete n[`member_${i}`]; return n; }); }}
                              className={errors[`member_${i}`] ? "has-error" : ""} />
                          )}
                          {errors[`member_${i}`] && <span className="field-error"><AlertCircle size={12} /> {errors[`member_${i}`]}</span>}
                        </div>
                        {i > 0 && teamSize > MIN_TEAM_SIZE && (
                          <button className="reg-remove-btn" onClick={() => removeMember(i)} aria-label="Remove member"><X size={14} /></button>
                        )}
                      </div>
                    ))}
                  </div>

                  {teamSize < MAX_TEAM_SIZE && (
                    <button className="reg-add-member-btn" onClick={addMember}><Plus size={16} /> Add Team Member</button>
                  )}
                </div>

                {/* Pricing Summary (sticky sidebar on desktop) */}
                <aside className="reg-summary-card">
                  <h4 className="reg-summary-title"><CreditCard size={16} /> ORDER SUMMARY</h4>
                  <div className="reg-summary-row"><span>Pass</span><strong>{pass.name}</strong></div>
                  <div className="reg-summary-row"><span>Per Person</span><span>₹{pass.perPerson}</span></div>
                  <div className="reg-summary-row"><span>Team Size</span><span>{teamSize} Members</span></div>
                  <div className="reg-summary-divider" />
                  <div className="reg-summary-row reg-summary-total"><span>Total</span><strong>₹{price}</strong></div>

                  {serverError && (
                    <div className="reg-server-error"><AlertCircle size={14} /> {serverError}</div>
                  )}

                  <button className="button button-acid reg-pay-btn" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? <><Loader2 size={16} className="spin" /> Processing...</> : <>Proceed to Payment <ArrowUpRight size={16} /></>}
                  </button>
                </aside>
              </div>
            </div>
          </section>
        )}

        {/* ── STEP: Success ── */}
        {step === "success" && successData && (
          <section className="reg-section">
            <div className="shell reg-container reg-result-container">
              <div className="reg-result-card reg-success-card">
                <div className="reg-result-icon reg-success-icon"><CheckCircle2 size={48} /></div>
                <h1>REGISTRATION CONFIRMED</h1>
                <p className="reg-result-sub">Your team has been successfully registered for CYPHER 4.0</p>
                <div className="reg-result-details">
                  <div className="reg-detail"><span>Registration ID</span><strong>{successData.registrationId}</strong></div>
                  <div className="reg-detail"><span>Team</span><strong>{successData.teamName}</strong></div>
                  <div className="reg-detail"><span>Pass</span><strong>{successData.passName}</strong></div>
                  <div className="reg-detail"><span>Members</span><strong>{successData.teamSize}</strong></div>
                  <div className="reg-detail"><span>Amount Paid</span><strong>₹{successData.amount}</strong></div>
                  <div className="reg-detail"><span>Payment ID</span><strong className="reg-mono">{successData.paymentId}</strong></div>
                </div>
                <Link href="/" className="button button-acid reg-home-btn">Back to Home <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </section>
        )}

        {/* ── STEP: Failed ── */}
        {step === "failed" && (
          <section className="reg-section">
            <div className="shell reg-container reg-result-container">
              <div className="reg-result-card reg-failed-card">
                <div className="reg-result-icon reg-failed-icon"><XCircle size={48} /></div>
                <h1>PAYMENT NOT COMPLETED</h1>
                <p className="reg-result-sub">Your payment was cancelled or failed. No charges were made.</p>
                <button className="button button-acid reg-home-btn" onClick={handleRetry}>Retry Payment <ArrowUpRight size={16} /></button>
                <Link href="/" className="button button-outline reg-home-btn" style={{ marginTop: "10px" }}>Back to Home</Link>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterPageInner />
    </Suspense>
  );
}
