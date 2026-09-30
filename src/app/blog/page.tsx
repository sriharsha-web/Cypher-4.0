import { Header } from "@/components/cypher/Header";
import { Footer } from "@/components/cypher/Footer";
import { BlogSection } from "@/components/cypher/BlogSection";

export default function BlogLandingPage() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        {/* We reuse the BlogSection which already has the requested hero layout and article grid */}
        <div style={{ paddingTop: "120px" }}>
          <BlogSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
