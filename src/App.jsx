import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import MeatShowcase from "./components/MeatShowcase";
import TikTokShowcase from "./components/TikTokShowcase";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

import logo from "./assets/halal-meathub-logo.png";

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* LOGO INTRO */}
      {!introDone && (
        <div className="logo-intro">
          <img
            src={logo}
            alt="Halal MeatHub"
            className="logo-intro-image"
          />
        </div>
      )}

      <SmoothScroll />
      <CustomCursor />

      <main>
        <Hero />
        <Stats />
        <About />
        <MeatShowcase />
        <TikTokShowcase />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;