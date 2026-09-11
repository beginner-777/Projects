import Hero from "@/components/Hero";
import TechTicker from "@/components/TechTicker";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import WorkTeaser from "@/components/WorkTeaser";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <TechTicker />
      <About />
      <Experience />
      <Skills />
      <WorkTeaser />
    </div>
  );
}
