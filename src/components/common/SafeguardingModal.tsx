import React, { useState } from 'react';
import { X, ShieldAlert, ShieldCheck, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { submitSafeguardingReport } from '../../lib/storage';
import { SafeguardingReport } from '../../types';

interface SafeguardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafeguardingModal: React.FC<SafeguardingModalProps> = ({ isOpen, onClose }) => {
  const [reporterType, setReporterType] = useState<'confidential' | 'named'>('confidential');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<'medium' | 'high' | 'critical'>('high');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<SafeguardingReport | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentLocation || !incidentDetails) {
      alert('Please provide the location and description of the safeguarding concern.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const rep = submitSafeguardingReport({
        reporterType,
        reporterName: reporterType === 'named' ? reporterName : undefined,
        reporterEmail: reporterType === 'named' ? reporterEmail : undefined,
        reporterPhone: reporterType === 'named' ? reporterPhone : undefined,
        incidentLocation,
        incidentDate: incidentDate || undefined,
        incidentDetails,
        urgencyLevel,
      });
      setIsSubmitting(false);
      setSubmittedReport(rep);
    }, 800);
  };

  const handleResetAndClose = () => {
    setSubmittedReport(null);
    setReporterType('confidential');
    setReporterName('');
    setReporterEmail('');
    setReporterPhone('');
    setIncidentLocation('');
    setIncidentDate('');
    setIncidentDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3020]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF8] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#1A3020] text-[#FDFCF8] p-5 sm:p-6 relative border-b-4 border-[#F27D26] bg-islamic-pattern">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-[#E6E2D3] hover:text-[#FDFCF8] p-1 rounded-lg hover:bg-[#24422c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F27D26] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Confidential Reporting Channel
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FDFCF8] flex items-center gap-2">
            Report a Child Safeguarding Concern
          </h2>
          <p className="text-xs text-[#E6E2D3] mt-1 font-light">
            Ihsan Children's Foundation Child Protection & Integrity Committee
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {!submittedReport ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Trust statement */}
              <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#F27D26] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A3020]">Your privacy & safety are protected.</p>
                  <p className="text-[11px] text-[#5A5A40] leading-relaxed">
                    Reports are transmitted directly to our Designated Safeguarding Officer in Kampala and are strictly confidential. We take every concern seriously with zero retaliation.
                  </p>
                </div>
              </div>

              {/* Reporting Mode */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1.5">
                  Reporting Mode
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#F5F2EA] p-1 rounded-xl border border-[#E6E2D3]">
                  <button
                    type="button"
                    onClick={() => setReporterType('confidential')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      reporterType === 'confidential'
                        ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#1A3020]'
                    }`}
                  >
                    100% Anonymous / Confidential
                  </button>
                  <button
                    type="button"
                    onClick={() => setReporterType('named')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      reporterType === 'named'
                        ? 'bg-[#F27D26] text-white shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#1A3020]'
                    }`}
                  >
                    Provide My Contact Details
                  </button>
                </div>
              </div>

              {/* Named details if selected */}
              {reporterType === 'named' && (
                <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3020] mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="e.g. Community member or volunteer name"
                      className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-lg focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Email</label>
                      <input
                        type="email"
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-lg focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A3020] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        placeholder="+256 700 000 000"
                        className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-lg focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Incident Location & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Location of Concern *
                  </label>
                  <input
                    type="text"
                    required
                    value={incidentLocation}
                    onChange={(e) => setIncidentLocation(e.target.value)}
                    placeholder="e.g. Mutundwe, Karamoja field site, or partner school"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Approximate Date / Time
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel('medium')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      urgencyLevel === 'medium'
                        ? 'bg-[#F5F2EA] text-[#1A3020] border-[#F27D26] font-bold ring-1 ring-[#F27D26]'
                        : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3]'
                    }`}
                  >
                    Medium / Preventative
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel('high')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      urgencyLevel === 'high'
                        ? 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26] font-bold ring-1 ring-[#F27D26]'
                        : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3]'
                    }`}
                  >
                    High Priority
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel('critical')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      urgencyLevel === 'critical'
                        ? 'bg-rose-100 text-rose-950 border-rose-600 font-bold ring-1 ring-rose-600'
                        : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3]'
                    }`}
                  >
                    Critical / Immediate Danger
                  </button>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Details of the Concern *
                </label>
                <textarea
                  rows={4}
                  required
                  value={incidentDetails}
                  onChange={(e) => setIncidentDetails(e.target.value)}
                  placeholder="Please describe what occurred, who was involved (if safe to share), and any immediate risks to the child or vulnerable individual..."
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                />
              </div>

              {/* Emergency Hotline Notice */}
              <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-[11px] text-[#5A5A40]">
                <span className="font-semibold text-[#1A3020]">Direct Urgent Safeguarding Hotline: </span>
                <a href="tel:+256702570802" className="text-[#F27D26] font-bold hover:underline">
                  +256 702 570 802
                </a> (24/7 Response Desk)
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Encrypting & Transmitting Report...</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    Submit Safeguarding Report
                  </span>
                )}
              </button>
            </form>
          ) : (
            /* Confirmation */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#F27D26]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1A3020]">
                  Safeguarding Report Received
                </h3>
                <p className="text-xs text-[#5A5A40] max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you for taking action to protect vulnerable children. Your report has been logged confidentially with our safeguarding lead.
                </p>
              </div>

              <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] max-w-sm mx-auto font-mono text-xs">
                <p className="text-[#5A5A40]">Confidential Tracking Reference:</p>
                <p className="text-base font-bold text-[#1A3020] mt-1">{submittedReport.referenceNumber}</p>
                <p className="text-[10px] text-[#5A5A40]/80 mt-1">Please keep this reference for any follow-up inquiries.</p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
