import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Check, 
  AlertCircle, 
  Calendar, 
  Users, 
  Target,
  Sparkles
} from 'lucide-react';
import { Project, CurrencyCode } from '../../types';
import { formatCurrency } from '../../lib/storage';
import { AnimatedProgressBar } from './AnimatedProgressBar';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  currency: CurrencyCode;
  onOpenDonateForProject: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  currency,
  onOpenDonateForProject,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!project) return null;

  const percentRaised = Math.min(100, Math.round((project.amountRaised / (project.amountRequired || 1)) * 100));

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'copy') => {
    const shareUrl = window.location.href;
    const text = `Support ${project.title} with Ihsan Children's Foundation in Uganda: ${shareUrl}`;

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3020]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF8] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header & Hero Image */}
        <div className="relative h-56 sm:h-64 shrink-0 overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3020] via-[#1A3020]/40 to-transparent"></div>

          {/* Close button */}
          <button
            id="project-detail-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-[#1A3020]/60 hover:bg-[#1A3020] text-[#FDFCF8] p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-[#E6E2D3]/30"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on hero */}
          <div className="absolute bottom-4 left-4 right-4 text-[#FDFCF8]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {project.urgentAppeal && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F27D26] text-white text-[11px] font-extrabold uppercase tracking-wider animate-pulse">
                  Urgent Humanitarian Appeal
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-[#1A3020]/90 border border-[#E6E2D3]/40 text-[#E6E2D3] text-[11px] font-semibold uppercase">
                {project.status.replace('_', ' ')}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#F27D26]">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FDFCF8] leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Funding Progress Bar Card */}
          <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[#5A5A40]">Raised: </span>
                <strong className="text-base text-[#1A3020] font-bold">
                  {formatCurrency(project.amountRaised, currency)}
                </strong>
              </div>
              <div className="text-right">
                <span className="text-[#5A5A40]">Goal: </span>
                <strong className="text-sm text-[#1A3020] font-bold">
                  {formatCurrency(project.amountRequired, currency)}
                </strong>
              </div>
            </div>

            {/* Progress bar track */}
            <AnimatedProgressBar
              percentage={percentRaised}
              heightClass="h-3"
              trackBgClass="bg-[#E6E2D3]"
              barColorClass="bg-[#F27D26]"
              duration={1.0}
              delay={0.05}
            />

            <div className="flex items-center justify-between text-[11px] text-[#5A5A40] font-medium">
              <span>{percentRaised}% Funded</span>
              <span>{project.verifiedData ? 'Verified Ledger Metrics' : 'Projected Target'}</span>
            </div>
          </div>

          {/* Situation / The Need */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A3020] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#F27D26]" />
              The Humanitarian Situation
            </h3>
            <p className="text-xs sm:text-sm text-[#1A3020] leading-relaxed bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3]">
              {project.situation}
            </p>
          </div>

          {/* Key Objective */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A3020] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#1A3020]" />
              Project Objective
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
              {project.objective}
            </p>
          </div>

          {/* Planned Activities */}
          {project.plannedActivities && project.plannedActivities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A3020]">
                Planned Humanitarian Activities
              </h3>
              <ul className="space-y-2">
                {project.plannedActivities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#5A5A40]">
                    <span className="w-5 h-5 rounded-full bg-[#F5F2EA] text-[#1A3020] border border-[#E6E2D3] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Target Beneficiaries & Safeguarding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A3020] mb-1">
                <Users className="w-4 h-4 text-[#F27D26]" />
                <span>Target Beneficiaries</span>
              </div>
              <p className="text-xs text-[#1A3020] font-semibold">{project.targetBeneficiaries}</p>
              {project.targetBeneficiariesNote && (
                <p className="text-[11px] text-[#5A5A40] mt-1">{project.targetBeneficiariesNote}</p>
              )}
            </div>

            <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A3020] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#1A3020]" />
                <span>Safeguarding & Verification</span>
              </div>
              <p className="text-[11px] text-[#5A5A40] leading-tight">
                All distributions managed directly by Ihsan field personnel with local community leader verification.
              </p>
            </div>
          </div>

          {/* Project Updates timeline if available */}
          {project.updates && project.updates.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#E6E2D3]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A3020] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#F27D26]" />
                Field Updates & Progress
              </h3>
              <div className="space-y-3">
                {project.updates.map((update, idx) => (
                  <div key={idx} className="p-3.5 bg-[#F5F2EA] rounded-2xl border-l-4 border-[#F27D26] border-y border-r border-[#E6E2D3] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#5A5A40] font-mono text-[11px]">
                      <span>{update.date}</span>
                      <span className="text-[#1A3020] font-bold">Field Dispatch</span>
                    </div>
                    <h4 className="font-bold text-[#1A3020]">{update.title}</h4>
                    <p className="text-[#5A5A40] leading-relaxed">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Section */}
          <div className="pt-3 border-t border-[#E6E2D3] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-[#1A3020] flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#F27D26]" />
              Share this Humanitarian Appeal:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="px-3 py-1.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] rounded-xl font-semibold transition-colors text-xs cursor-pointer"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="px-3 py-1.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] rounded-xl font-semibold transition-colors text-xs cursor-pointer"
              >
                X (Twitter)
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="px-3 py-1.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] border border-[#E6E2D3] rounded-xl font-semibold transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#1A3020]" /> : null}
                <span>{copiedLink ? 'Link Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-[#F5F2EA] border-t border-[#E6E2D3] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#E6E2D3] hover:bg-[#d8d3c2] text-[#1A3020] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            id="project-detail-modal-donate-btn"
            onClick={() => {
              onClose();
              onOpenDonateForProject(project.title);
            }}
            className="px-6 py-2.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Donate to this Project</span>
          </button>
        </div>

      </div>
    </div>
  );
};
