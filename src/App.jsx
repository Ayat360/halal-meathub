import Hero from "./components/Hero";
import Stats from "./components/Stats";
import MeatShowcase from "./components/MeatShowcase";
import About from "./components/About";
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
        <Hero />
        <Stats />
        <MeatShowcase />
        <About />
        <TikTokShowcase />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;