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

function App() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />

      <main>
        {/* 01 — Brand introduction */}
        <Hero />

        {/* 02 — Quick brand credibility */}
        <Stats />

        {/* 03 — Who Halal MeatHub is */}
        <About />

        {/* 04 — Main meat showcase */}
        <MeatShowcase />

        {/* 05 — Real TikTok content */}
        <TikTokShowcase />

        {/* 06 — Brand photography */}
        <Gallery />

        {/* 07 — Find / connect */}
        <Contact />

        {/* 08 — Closing */}
        <Footer />
      </main>
    </>
  );
}

export default App;