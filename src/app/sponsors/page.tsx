import { Header } from "@/components/cypher/Header";
import { Footer } from "@/components/cypher/Footer";
import { SponsorSection } from "@/components/cypher/SponsorSection";

export default function SponsorsPage() {
  return (
    <div className="site-shell">
      <Header />
      <main style={{ paddingTop: "120px" }}>
        <SponsorSection />
      </main>
      <Footer />
    </div>
  );
}
