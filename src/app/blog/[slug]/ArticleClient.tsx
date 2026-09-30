"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/cypher/Header";
import { Footer } from "@/components/cypher/Footer";
import { Article } from "@/data/blog";
import { ArrowRight } from "lucide-react";

export default function ArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-text, .reveal-mask, .blog-card");
    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = height > 0 ? (scrollY / height) * 100 : 0;
      setProgress(progressValue);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="site-shell">
      {/* Reading Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, height: "3px", backgroundColor: "var(--acid)", width: `${progress}%`, zIndex: 9999, transition: "width 0.1s linear" }} />
      
      <Header />
      
      <main className="article-main" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <article className="shell" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <header className="article-header" style={{ marginBottom: "60px" }}>
            <span className="mono-label cyan-text reveal-text">{article.category}</span>
            <h1 className="reveal-text stagger-1" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", marginTop: "20px", marginBottom: "30px", textTransform: "none", lineHeight: 1.1 }}>{article.title}</h1>
            <p className="reveal-text stagger-2" style={{ fontSize: "22px", color: "rgba(245,244,237,.65)", lineHeight: 1.5, marginBottom: "40px" }}>{article.excerpt}</p>
            <div className="article-meta reveal-text stagger-3" style={{ borderTop: "1px solid rgba(245,244,237,.2)", paddingTop: "20px", display: "flex", gap: "20px", color: "var(--cyan)" }}>
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <div className="reveal-mask stagger-4" style={{ width: "100%", height: "450px", overflow: "hidden", marginBottom: "80px", border: "2px solid var(--ink)", boxShadow: "12px 12px 0 var(--ink)" }}>
            <div style={{ width: "100%", height: "100%", backgroundImage: `url(${article.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>

          <div className="article-content reveal-text" style={{ fontSize: "18px", lineHeight: 1.8, color: "rgba(245,244,237,.8)" }}>
            {article.content.split("\\n\\n").map((paragraph, i) => {
              if (paragraph.startsWith("###")) {
                return <h3 key={i} style={{ fontSize: "28px", marginTop: "60px", marginBottom: "20px", color: "var(--white)" }}>{paragraph.replace("### ", "")}</h3>;
              }
              return <p key={i} style={{ marginBottom: "30px" }}>{paragraph}</p>;
            })}
          </div>
        </article>
      </main>

      <section className="related-articles section" style={{ backgroundColor: "var(--ink)", borderTop: "2px solid rgba(245,244,237,.1)" }}>
        <div className="shell">
          <h2 className="reveal-text" style={{ fontSize: "40px", marginBottom: "50px", color: "var(--white)" }}>Continue Exploring</h2>
          <div className="blog-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginTop: 0 }}>
            {related.map((rel, idx) => (
              <Link href={`/blog/${rel.slug}`} className="blog-card group reveal-text" key={rel.slug} style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="card-image-wrapper">
                  <div className="card-image" style={{ backgroundImage: `url(${rel.image})` }} />
                </div>
                <div className="card-content" style={{ opacity: 1, transform: "none", transition: "none" }}>
                  <span className="mono-label cyan-text mt-4">{rel.category}</span>
                  <h3 style={{ fontSize: "22px", marginTop: "10px", marginBottom: "20px" }}>{rel.title}</h3>
                  <div className="article-meta">
                    <span>{rel.date}</span>
                    <ArrowRight size={16} className="arrow-icon" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
