import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Organisasi from "./components/Organisasi";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { useLenis } from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Organisasi />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}

export default App;
