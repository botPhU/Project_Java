import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { ModulesSection } from "./sections/ModulesSection";
import { WorkflowSection } from "./sections/WorkflowSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        <ModulesSection />
        <WorkflowSection />
      </main>
      <Footer />
    </div>
  );
}
