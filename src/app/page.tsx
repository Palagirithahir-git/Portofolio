import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Resume from "../sections/Resume";
import Contact from "../sections/Contact";
import AIAssistant from "../components/AIAssistant";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <AIAssistant />
      <Footer />
    </>
  );
}