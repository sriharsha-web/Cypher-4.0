"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { articles } from "@/data/blog";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      if (containerRef.current) {
        const scrolled = window.scrollY;
        containerRef.current.style.setProperty("--scroll-y", `${scrolled}px`);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const featured = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <section className="section blog-section" ref={containerRef}>
      <div className="shell">
        <div className="center-heading" style={{ marginBottom: "60px" }}>
          <p className="mono-label acid-text reveal-text">06 / INSIGHTS</p>
          <h2 className="reveal-text stagger-1">
            STORIES, IDEAS & <span className="cyan-text">INSIGHTS</span>
          </h2>
        </div>

        {/* FEATURED ARTICLE */}
        <Link href={`/blog/${featured.slug}`} className="featured-blog-card group">
          <div className="featured-image-wrapper reveal-mask">
            <div className="featured-image-parallax" style={{ backgroundImage: `url(${featured.image})` }} />
          </div>
          <div className="featured-content">
            <span className="mono-label acid-text reveal-text stagger-1">{featured.category}</span>
            <h3 className="reveal-text stagger-2">{featured.title}</h3>
            <p className="reveal-text stagger-3">{featured.excerpt}</p>
            <div className="article-meta reveal-text stagger-4">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readingTime}</span>
              <ArrowRight size={16} className="arrow-icon" />
            </div>
          </div>
        </Link>

        {/* BLOG GRID */}
        <div className="blog-grid mt-20">
          {gridArticles.map((article, idx) => (
            <Link href={`/blog/${article.slug}`} className={`blog-card blog-card-${idx + 1} group`} key={article.slug}>
              <div className="card-image-wrapper">
                <div className="card-image" style={{ backgroundImage: `url(${article.image})` }} />
              </div>
              <div className="card-content">
                <span className="mono-label cyan-text">{article.category}</span>
                <h3>{article.title}</h3>
                <div className="article-meta mt-auto">
                  <span>{article.date}</span>
                  <ArrowRight size={16} className="arrow-icon" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="center-heading" style={{ marginTop: "60px" }}>
          <Link href="/blog" className="button button-acid reveal-text">
            View All Articles <ArrowRight size={16} style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
