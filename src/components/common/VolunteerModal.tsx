import React, { useState } from 'react';
import { X, HeartHandshake, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { submitVolunteerApplication } from '../../lib/storage';
import { VolunteerApplication } from '../../types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Uganda');
  const [locationCity, setLocationCity] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [areaOfInterest, setAreaOfInterest] = useState('Education & Tutoring');
  const [availability, setAvailability] = useState<'weekdays' | 'weekends' | 'flexible' | 'full_time' | 'remote'>('flexible');
  const [experienceSummary, setExperienceSummary] = useState('');
  const [motivation, setMotivation] = useState('');
  const [hasChildProtectionConsent, setHasChildProtectionConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<VolunteerApplication | null>(null);

  if (!isOpen) return null;

  const skillOptions = [
    'Teaching & Literacy',
    'Community Health & Nursing',
    'Logistics & Distribution',
    'Psychosocial & Counseling',
    'Photography & Media',
    'Fundraising & Grant Writing',
    'Water & Sanitation Engineering',
    'Administrative Support',
    'Youth Sports & Mentorship'
  ];

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChildProtectionConsent) {
      alert('Please review and agree to the Child Safeguarding declaration.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const app = submitVolunteerApplication({
        fullName,
        email,
        phone,
        country,
        locationCity,
        profession,
        skills: selectedSkills,
        areaOfInterest,
        availability,
        experienceSummary,
        motivation,
        hasChildProtectionConsent,
      });
      setIsSubmitting(false);
      setSubmittedApp(app);
    }, 800);
  };

  const handleResetAndClose = () => {
    setSubmittedApp(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setLocationCity('');
    setProfession('');
    setSelectedSkills([]);
    setExperienceSummary('');
    setMotivation('');
    setHasChildProtectionConsent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3020]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#1A3020] text-[#FDFCF8] p-5 sm:p-6 relative bg-islamic-pattern border-b-2 border-[#F27D26]">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-[#E6E2D3] hover:text-[#FDFCF8] p-1 rounded-lg hover:bg-[#24422c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F27D26] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5" /> Join Our Humanitarian Team
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FDFCF8] flex items-center gap-2">
            Volunteer Application
          </h2>
          <p className="text-xs text-[#E6E2D3] mt-1 font-light">
            Ihsan Children's Foundation • Kampala, Karamoja & Regional Field Hubs
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {!submittedApp ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020]">
                <p className="font-semibold text-[#1A3020]">Serve with Purpose & Dignity</p>
                <p className="text-[11px] text-[#5A5A40]">
                  Volunteers are the heart of Ihsan. Whether assisting in school supply distributions in Kampala or community relief in Karamoja, your skills make a tangible difference.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jeremiah Mukasa"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
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
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 700 000 000"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Uganda"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                    placeholder="e.g. Kampala, Wakiso, Gulu"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Profession & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Profession / Occupation
                  </label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Teacher, Student, Nurse, Social Worker"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    General Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden font-medium"
                  >
                    <option value="flexible">Flexible (As Needed for Drives)</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="full_time">Full-Time Field Placement</option>
                    <option value="remote">Remote / Digital Support</option>
                  </select>
                </div>
              </div>

              {/* Primary Area of Interest */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Primary Program Area of Interest
                </label>
                <select
                  value={areaOfInterest}
                  onChange={(e) => setAreaOfInterest(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden font-medium"
                >
                  <option value="Education & Tutoring">Education Support & School Kit Drives</option>
                  <option value="Child Protection">Child Protection & Community Safe Spaces</option>
                  <option value="Food Distribution">Emergency Food Relief & Feeding Programs</option>
                  <option value="Clean Water Projects">Clean Water & WASH Outreach</option>
                  <option value="Community Health">Community Health & Hygiene Drives</option>
                  <option value="Refugee Outreach">Refugee & Displaced Family Support</option>
                  <option value="Communications & Logistics">Photography, Storytelling & Logistics</option>
                </select>
              </div>

              {/* Skills Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1.5">
                  Select Applicable Skills
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {skillOptions.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A3020] text-[#FDFCF8] border-[#1A3020] font-semibold'
                            : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3] hover:border-[#1A3020]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Why do you wish to volunteer with Ihsan Children's Foundation? *
                </label>
                <textarea
                  rows={3}
                  required
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Share a brief statement of your personal commitment and motivation..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden resize-none"
                />
              </div>

              {/* Child Safeguarding Consent */}
              <div className="p-3 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] flex items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  id="child-protection-consent-check"
                  checked={hasChildProtectionConsent}
                  onChange={(e) => setHasChildProtectionConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#F27D26] rounded-sm focus:ring-[#F27D26]"
                />
                <label htmlFor="child-protection-consent-check" className="text-xs text-[#1A3020]">
                  <strong>Child Safeguarding Pledge:</strong> I confirm that I have never been convicted of any child abuse, exploitation, or violent offense, and I agree to uphold the Ihsan Children's Foundation Child Safeguarding Charter.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Send className="w-4 h-4" />
                    Submit Volunteer Application
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#F27D26]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1A3020]">
                  Application Submitted Successfully
                </h3>
                <p className="text-xs text-[#5A5A40] max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you for your willingness to serve, <strong>{submittedApp.fullName}</strong>. Our volunteer coordination team in Kampala will review your profile and contact you via email ({submittedApp.email}) or phone.
                </p>
              </div>

              <div className="bg-[#F5F2EA] p-3 rounded-xl border border-[#E6E2D3] max-w-xs mx-auto text-xs text-[#5A5A40]">
                <p>Application ID: <span className="font-mono font-bold text-[#1A3020]">{submittedApp.id}</span></p>
                <p className="text-[11px] text-[#1A3020] font-semibold mt-0.5">Status: Pending Review</p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
