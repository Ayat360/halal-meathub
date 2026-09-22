import { MessageCircle } from "lucide-react";

function WhatsAppFloat() {
  const whatsappNumber = "2349031957147";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Halal MeatHub on WhatsApp"
      className="fixed bottom-6 right-5 z-[80] flex items-center gap-3 rounded-full border border-white/10 bg-[#151512] px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#c7a875] sm:bottom-8 sm:right-8"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-black">
        <MessageCircle size={21} strokeWidth={2.5} />
      </span>

      <span className="hidden text-xs font-black uppercase tracking-[0.15em] sm:block">
        WhatsApp Us
      </span>
    </a>
  );
}

export default WhatsAppFloat;