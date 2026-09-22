const Footer = () => {
  return (
    <footer className="bg-[#0b0b0a] px-6 pb-8 pt-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-white/10 pb-16">
          <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.8] tracking-[-0.07em]">
            Halal
            <br />
            <span className="text-white/25">MeatHub.</span>
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-8 py-8 text-[9px] uppercase tracking-[0.25em] text-white/35 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Halal MeatHub
          </p>

          <a
            href="https://www.tiktok.com/@halal_meathub0"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            TikTok — @halal_meathub0
          </a>

         <p className="text-sm text-white/50">
  Website crafted by{" "}
  <a
    href="https://portfolio-v1-five-sooty.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-black text-white underline decoration-[#c7a875] underline-offset-4 transition-colors duration-300 hover:text-[#c7a875]"
  >
    PROXIMA A3
  </a>
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;