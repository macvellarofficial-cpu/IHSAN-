import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { submitContactMessage } from '../lib/storage';
import { SiteSettings } from '../types';

interface ContactPageProps {
  siteSettings: SiteSettings;
  initialSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  siteSettings,
  initialSubject,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject || 'General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitContactMessage({
        name: fullName,
        fullName,
        email,
        phone,
        subject,
        message,
      });
      setIsSubmitting(false);
      setIsSent(true);
    }, 700);
  };

  const handleWhatsApp = () => {
    const rawNum = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent("Hello Ihsan Children's Foundation. I would like to get in touch regarding your work in Uganda.");
    window.open(`https://wa.me/${rawNum}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <MapPin className="w-3.5 h-3.5 text-[#F27D26]" />
            Kampala Secretariat • Mutundwe
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Contact & Visit Us
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            We would love to hear from you. Reach out to our Kampala head office for inquiries, visits, or humanitarian partnerships.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#FDFCF8] p-6 sm:p-8 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#1A3020] pb-4 border-b border-[#E6E2D3]">
                Headquarters Information
              </h2>

              <div className="space-y-4">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#F27D26] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A3020] uppercase">Physical Address</h3>
                    <p className="text-xs sm:text-sm text-[#5A5A40] mt-0.5 font-medium">
                      {siteSettings.headOfficeAddress}
                    </p>
                    <p className="text-[11px] text-[#5A5A40]/70">Mutundwe • Rubaga Division • Kampala</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A3020] uppercase">Primary Office Phone</h3>
                    <a href={`tel:${siteSettings.phonePrimary.replace(/\s+/g, '')}`} className="text-xs sm:text-sm text-[#1A3020] hover:text-[#F27D26] font-bold mt-0.5 block">
                      {siteSettings.phonePrimary}
                    </a>
                    <p className="text-[11px] text-[#5A5A40]/70">Monday – Friday (8:30 AM – 5:30 PM EAT)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-[#25D366] text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A3020] uppercase">Official WhatsApp Desk</h3>
                    <button
                      onClick={handleWhatsApp}
                      className="text-xs sm:text-sm text-[#1EBE5D] hover:underline font-bold mt-0.5 block text-left cursor-pointer"
                    >
                      {siteSettings.whatsappNumber} (Click to Chat)
                    </button>
                    <p className="text-[11px] text-[#5A5A40]/70">Fast field response & donor inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#5A5A40] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A3020] uppercase">Official Email Inquiries</h3>
                    <a href={`mailto:${siteSettings.emailGeneral}`} className="text-xs sm:text-sm text-[#1A3020] hover:text-[#F27D26] font-bold mt-0.5 block">
                      {siteSettings.emailGeneral}
                    </a>
                    <p className="text-[11px] text-[#5A5A40]/70">Media: media@ihsanchildrensfoundation.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F2EA] border border-[#E6E2D3] text-[#5A5A40] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A3020] uppercase">Operating Hours</h3>
                    <p className="text-xs text-[#5A5A40] mt-0.5">
                      Monday to Friday: 8:30 AM – 5:30 PM (EAT)<br />
                      Saturday: 9:00 AM – 1:00 PM (EAT)<br />
                      Sunday & Public Holidays: Emergency Response Only
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Map Directions Card */}
            <div className="bg-[#F5F2EA] p-6 rounded-3xl border border-[#E6E2D3] space-y-2">
              <h3 className="text-xs font-bold text-[#1A3020] uppercase">Directions to Mutundwe Office</h3>
              <p className="text-xs text-[#5A5A40] leading-relaxed">
                Located within Mutundwe hill community, accessible via Rubaga Road / Nateete Bypass. Visitors and partners are warmly welcomed by prior appointment.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#FDFCF8] p-6 sm:p-10 rounded-3xl border border-[#E6E2D3] shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#E6E2D3]">
              <h2 className="text-2xl font-extrabold text-[#1A3020]">
                Send Us a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5A40]">
                Please complete the form below. We typically respond within 24 hours.
              </p>
            </div>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Namubiru"
                      className="w-full px-3.5 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-3.5 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                      Subject / Topic *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden font-medium"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Donation & Receipt Confirmation">Donation & Receipt Confirmation</option>
                      <option value="Volunteer Coordination">Volunteer Coordination</option>
                      <option value="Institutional & Mosque Partnership">Institutional & Mosque Partnership</option>
                      <option value="Media & Press Inquiries">Media & Press Inquiries</option>
                      <option value="Visit Mutundwe Center">Visit Mutundwe Center</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you today? Please share your question or proposal..."
                    className="w-full px-3.5 py-2.5 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Your Message...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-white" />
                      <span>Send Message to Secretariat</span>
                    </span>
                  )}
                </button>

              </form>
            ) : (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#F27D26] flex items-center justify-center mx-auto border border-[#E6E2D3]">
                  <CheckCircle2 className="w-10 h-10 text-[#F27D26]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3020]">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A40] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your message has been routed to our Kampala office desk. We will respond to <strong>{email}</strong> shortly.
                </p>
                <button
                  onClick={() => { setIsSent(false); setMessage(''); }}
                  className="px-6 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
