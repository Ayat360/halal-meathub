import { MessageCircle } from "lucide-react";

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2349031957147"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Halal MeatHub on WhatsApp"
      className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center bg-[#9b2936] text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#84232e] sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={23} strokeWidth={2} />
    </a>
  );
}

export default WhatsAppFloat;