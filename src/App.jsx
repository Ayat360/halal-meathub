import { useEffect, useState } from "react";

import AdminDashboard from "./admin/AdminDashboard";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Hero from "./components/Hero";
import TodayAtHub from "./components/TodayAtHub";
import Stats from "./components/Stats";
import MeatShowcase from "./components/MeatShowcase";
import About from "./components/About";
import TikTokShowcase from "./components/TikTokShowcase";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

import logo from "./assets/halal-meathub-logo.png";

function App() {
  const isAdminPage = window.location.pathname === "/admin";
  const [introDone, setIntroDone] = useState(isAdminPage);

  useEffect(() => {
    if (isAdminPage) {
      return;
    }

    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, [isAdminPage]);

  if (isAdminPage) {
    return <AdminDashboard />;
  }

  return (
    <>
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
      <WhatsAppFloat />

      <main>
        <Hero />
        <TodayAtHub />
        <Stats />
        <MeatShowcase />
        <About />
        <TikTokShowcase />
        <Contact />
        <Gallery />
        <Footer />
      </main>
    </>
  );
}

export default App;