
import Navbar from "./components/Navbar";
import StarBackground from "./components/StarBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import Achievements from "./sections/Achievements";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

import { PortfolioProvider } from "./context/PortfolioContext";

function PortfolioContent() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050816]">
      <StarBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

export default App;
