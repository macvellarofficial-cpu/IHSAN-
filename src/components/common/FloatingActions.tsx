import React from 'react';
import { Heart, MessageCircle, HeartHandshake, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../../types';

interface FloatingActionsProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onOpenSafeguarding: () => void;
  siteSettings: SiteSettings;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onOpenSafeguarding,
  siteSettings,
}) => {
  const handleWhatsAppClick = () => {
    const rawNum = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const defaultMsg = encodeURIComponent("Hello Ihsan Children's Foundation. I would like to inquire about your humanitarian programs and support options.");
    window.open(`https://wa.me/${rawNum}?text=${defaultMsg}`, '_blank');
  };

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 print:hidden">
      
      {/* Volunteer Quick Trigger */}
      <button
        id="floating-volunteer-btn"
        onClick={onOpenVolunteer}
        className="group flex items-center gap-2 bg-[#1A3020] hover:bg-[#2C4D35] text-[#E6E2D3] hover:text-white px-3.5 py-2 rounded-full shadow-lg border border-[#E6E2D3]/40 transition-all duration-300 transform hover:scale-105"
        title="Volunteer with Ihsan"
      >
        <HeartHandshake className="w-4 h-4 text-[#F27D26]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold text-white">
          Join as Volunteer
        </span>
      </button>

      {/* WhatsApp Direct Chat */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleWhatsAppClick}
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2.5 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
        title="Chat on WhatsApp with Kampala Head Office"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold">
          WhatsApp Us
        </span>
      </button>

      {/* Primary Floating Donate CTA */}
      <button
        id="floating-donate-btn"
        onClick={onOpenDonate}
        className="flex items-center gap-2 bg-[#F27D26] hover:bg-[#d86c1e] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 ring-4 ring-[#F27D26]/30"
        title="Donate to Ihsan Children's Foundation"
      >
        <Heart className="w-5 h-5 fill-white" />
        <span className="text-xs font-extrabold tracking-wider uppercase">
          DONATE
        </span>
      </button>
    </aside>
  );
};
