import { ArrowUp, MessageCircle } from "lucide-react";

function WhatsAppFloat() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col gap-3 sm:bottom-7 sm:right-7">
      {/* SCROLL TO TOP */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="flex h-12 w-12 items-center justify-center border border-black/10 bg-[#f4f0e8] text-[#171717] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-white"
      >
        <ArrowUp size={20} strokeWidth={2} />
      </button>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/2349031957147"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Halal MeatHub on WhatsApp"
        className="flex h-14 w-14 items-center justify-center bg-[#9b2936] text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#84232e]"
      >
        <MessageCircle size={23} strokeWidth={2} />
      </a>
    </div>
  );
}

export default WhatsAppFloat;