"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export type FaqItem = {

  question: string;
  answer: string | string[];
};

export const faqs: FaqItem[] = [
  {
    question: "What is CYPHER 4.0?",
    answer:
      "CYPHER 4.0 is a 24-hour space-themed hackathon organized by the Rotaract Club of Atria Institute of Technology. It brings together programmers, designers, and problem-solvers to collaborate on innovative solutions in a competitive and creative environment.",
  },
  {
    question: "Who can participate in the hackathon?",
    answer:
      "CYPHER 4.0 is open to students from any college or university. Participants can join individually or form teams of up to 4 members. We welcome developers of all skill levels, from beginners to experienced coders.",
  },
  {
    question: "Do I need to bring anything to the event?",
    answer: [
      "Your laptop and charger",
      "Student ID card",
      "Any other personal equipment you might need",
      "A positive attitude and creative mindset!",
      "Food and refreshments will be provided during the event.",
    ],
  },
  {
    question: "What kind of projects can we build?",
    answer:
      "Project themes and specific challenges will be announced at the start of the hackathon. However, you'll generally have freedom to work on web applications, mobile apps, hardware projects, AI/ML solutions, and more. The primary focus is on creating innovative and practical solutions to real-world problems.",
  },
  {
    question: "How will the projects be judged?",
    answer:
      "Projects will be evaluated by our panel of industry professionals based on innovation, technical complexity, execution, practicality, and presentation. Each team will have a designated time slot to demo their projects and explain their approach to the judges.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="shell">
        <div className="faq-header">
          <p className="mono-label">08 / INTEL BRIEFING</p>
          <h2 className="faq-main-title">FAQ</h2>
        </div>

        <div className="faq-accordion-group">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-row ${isOpen ? "is-open" : ""}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-row-header">
                  <span className="faq-question">{faq.question}</span>
                  <button
                    type="button"
                    className="faq-dots-btn"
                    aria-expanded={isOpen}
                    aria-label={`Toggle answer for ${faq.question}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFaq(index);
                    }}
                  >
                    <svg
                      className="faq-dots-svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="20"
                      height="20"
                    >
                      <circle cx="12" cy="4.5" r="1.8" />
                      <circle cx="4.5" cy="12" r="1.8" />
                      <circle cx="12" cy="12" r="2.2" />
                      <circle cx="19.5" cy="12" r="1.8" />
                      <circle cx="12" cy="19.5" r="1.8" />
                    </svg>
                  </button>
                </div>

                <div className="faq-answer-wrapper">
                  <div className="faq-answer-inner">
                    {Array.isArray(faq.answer) ? (
                      <div className="faq-list-answer">
                        <p className="faq-list-intro">Please bring:</p>
                        <ul>
                          {faq.answer.slice(0, -1).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <p className="faq-list-note">{faq.answer[faq.answer.length - 1]}</p>
                      </div>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-footer-note">
          <p className="faq-footer-intro">
            If you have additional questions, please contact:
          </p>
          <div className="faq-contact-details">
            <a href="mailto:rotaractatriait3191@gmail.com" className="faq-contact-link">
              <Mail size={15} /> ROTARACTATRIAIT3191@GMAIL.COM
            </a>
            <span className="faq-contact-sep">•</span>
            <a href="tel:+918296869390" className="faq-contact-link">
              <Phone size={15} /> +91 8296869390
            </a>
            <span className="faq-contact-sep">•</span>
            <a href="tel:+917349238222" className="faq-contact-link">
              <Phone size={15} /> +91 7349238222
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

