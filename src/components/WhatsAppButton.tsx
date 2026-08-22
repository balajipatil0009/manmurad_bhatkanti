import { WHATSAPP_GENERIC_URL } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_GENERIC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40"
    >
      <button
        type="button"
        className="bg-green-500 text-white text-sm font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition"
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.5 2.7 1.6.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4Z" />
        </svg>
        Chat with Trek Leader
      </button>
    </a>
  );
}
