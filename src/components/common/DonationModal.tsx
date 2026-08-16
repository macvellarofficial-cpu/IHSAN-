import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  Receipt,
  Lock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CurrencyCode, DonationRecord } from '../../types';
import { CURRENCIES } from '../../data/initialData';
import { recordDonation, convertFromCurrency } from '../../lib/storage';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFundCategory?: string;
  initialAmountUSD?: number;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onShowReceipt: (receipt: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  initialFundCategory = 'General Fund',
  initialAmountUSD = 50,
  currency,
  onCurrencyChange,
  onShowReceipt,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('one_time');
  const [fundCategory, setFundCategory] = useState(initialFundCategory);
  
  // Amounts calculated based on currency
  const currConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const [selectedPresetUSD, setSelectedPresetUSD] = useState<number>(initialAmountUSD);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustom, setUseCustom] = useState(false);

  // Donor Details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorNotes, setDonorNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'airtel_money' | 'card' | 'bank_transfer' | 'paypal' | 'flutterwave' | 'pesapal'>('mtn_momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);

  if (!isOpen) return null;

  const presetAmountsUSD = [25, 50, 100, 250, 500];

  const calculateTotalUSD = (): number => {
    if (useCustom && customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 25 : convertFromCurrency(parsed, currency);
    }
    return selectedPresetUSD;
  };

  const currentTotalUSD = calculateTotalUSD();
  const currentTotalInSelectedCurrency = currentTotalUSD * currConfig.rateFromUSD;

  const handleNextToDonorInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnonymous && !donorName) {
      alert('Please provide your name or check the anonymous donor option.');
      return;
    }
    if (!donorEmail || !donorEmail.includes('@')) {
      alert('Please provide a valid email address for your official charitable donation receipt.');
      return;
    }
    setStep(3);
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newRec = recordDonation({
        donorName: isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Donor'),
        donorEmail: donorEmail || 'supporter@ihsanchildrensfoundation.org',
        donorPhone: donorPhone || undefined,
        amountUSD: Math.round(currentTotalUSD * 100) / 100,
        currency: currency,
        originalAmount: Math.round(currentTotalInSelectedCurrency * 100) / 100,
        frequency: frequency,
        fundCategory: fundCategory,
        paymentMethod: paymentMethod,
        status: 'completed',
        isAnonymous: isAnonymous,
        notes: donorNotes || undefined,
      });

      setIsProcessing(false);
      setCompletedDonation(newRec);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3020]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF8] w-full max-w-xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative">
        
        {/* Header with Brand Aesthetics */}
        <div className="bg-[#1A3020] text-[#FDFCF8] p-5 sm:p-6 relative bg-islamic-pattern border-b-2 border-[#F27D26]">
          <button
            id="donation-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#E6E2D3] hover:text-[#FDFCF8] p-1 rounded-lg hover:bg-[#24422c] transition-colors cursor-pointer"
            aria-label="Close Donation Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F27D26] text-white text-[11px] font-bold uppercase tracking-wider">
              {frequency === 'monthly' ? 'Monthly Sustainer' : 'One-Time Gift'}
            </span>
            <span className="text-xs text-[#E6E2D3] flex items-center gap-1 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F27D26]" />
              100% Secure & Transparent
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FDFCF8] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F27D26] fill-[#F27D26]" />
            Your Kindness Changes Lives
          </h2>
          <p className="text-xs text-[#E6E2D3] mt-1 font-light">
            Ihsan Children's Foundation • Mutundwe, Kampala, Uganda
          </p>

          {/* Progress Steps */}
          {!completedDonation && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E6E2D3]/20 text-xs">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#F27D26] font-bold' : 'text-[#E6E2D3]/60'}`}>
                <span className="w-5 h-5 rounded-full bg-[#24422c] border border-[#F27D26]/40 flex items-center justify-center text-[11px]">1</span>
                <span>Amount & Fund</span>
              </div>
              <div className="w-8 h-px bg-[#E6E2D3]/30"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#F27D26] font-bold' : 'text-[#E6E2D3]/60'}`}>
                <span className="w-5 h-5 rounded-full bg-[#24422c] border border-[#F27D26]/40 flex items-center justify-center text-[11px]">2</span>
                <span>Your Details</span>
              </div>
              <div className="w-8 h-px bg-[#E6E2D3]/30"></div>
              <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#F27D26] font-bold' : 'text-[#E6E2D3]/60'}`}>
                <span className="w-5 h-5 rounded-full bg-[#24422c] border border-[#F27D26]/40 flex items-center justify-center text-[11px]">3</span>
                <span>Payment</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Amount & Fund Selection */}
          {step === 1 && !completedDonation && (
            <form onSubmit={handleNextToDonorInfo} className="space-y-5">
              
              {/* Frequency Toggle */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1.5">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#F5F2EA] p-1 rounded-xl border border-[#E6E2D3]">
                  <button
                    type="button"
                    onClick={() => setFrequency('one_time')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      frequency === 'one_time'
                        ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#1A3020]'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#F27D26] text-white shadow-xs'
                        : 'text-[#5A5A40] hover:text-[#1A3020]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Monthly Sustainer
                  </button>
                </div>
              </div>

              {/* Fund Designation */}
              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1.5">
                  Designate Your Gift
                </label>
                <select
                  value={fundCategory}
                  onChange={(e) => setFundCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden font-medium text-[#1A3020]"
                >
                  <option value="General Fund">Where Most Needed (General Humanitarian Fund)</option>
                  <option value="Karamoja Emergency Drought Food Relief">Karamoja Emergency Drought Food Relief</option>
                  <option value="Food Security">Food Security & Family Feeding Packages</option>
                  <option value="Education">Education & School Scholastic Kits</option>
                  <option value="Clean Water">Clean & Safe Drinking Water Boreholes</option>
                  <option value="Child Protection">Child Protection & Safe Spaces</option>
                  <option value="Refugee & Displaced Children">Refugee & Displaced Children Support</option>
                  <option value="Community Health">Community Health & Hygiene Outreach</option>
                  <option value="Orphan Support">Orphan & Vulnerable Child Direct Care</option>
                  <option value="Winter & Emergency Essentials">Winter & Emergency Essentials</option>
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#1A3020]">
                    Select Amount ({currency})
                  </label>
                  <div className="flex items-center gap-1 text-[11px] text-[#5A5A40]">
                    <span>Currency:</span>
                    <select
                      value={currency}
                      onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                      className="text-xs font-bold text-[#1A3020] bg-[#F5F2EA] px-1.5 py-0.5 rounded-sm border border-[#E6E2D3]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="UGX">UGX (USh)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {presetAmountsUSD.map((presetUSD) => {
                    const presetInCurr = presetUSD * currConfig.rateFromUSD;
                    const isSelected = !useCustom && selectedPresetUSD === presetUSD;
                    return (
                      <button
                        key={presetUSD}
                        type="button"
                        onClick={() => {
                          setSelectedPresetUSD(presetUSD);
                          setUseCustom(false);
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A3020] text-[#FDFCF8] border-[#1A3020] shadow-xs'
                            : 'bg-[#F5F2EA] text-[#5A5A40] border-[#E6E2D3] hover:border-[#1A3020] hover:text-[#1A3020]'
                        }`}
                      >
                        {currency === 'UGX' 
                          ? `${Math.round(presetInCurr / 1000)}k` 
                          : `${currConfig.symbol}${Math.round(presetInCurr)}`}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5A5A40] text-xs font-bold">
                    {currConfig.symbol}
                  </div>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setUseCustom(true);
                    }}
                    onFocus={() => setUseCustom(true)}
                    className={`w-full pl-8 pr-12 py-2.5 text-xs bg-[#F5F2EA] border rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden font-semibold text-[#1A3020] ${
                      useCustom ? 'border-[#F27D26] bg-[#FDFCF8]' : 'border-[#E6E2D3]'
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[11px] text-[#5A5A40] font-bold">
                    {currency}
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Statement */}
              <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A3020] text-[#FDFCF8] flex items-center justify-center shrink-0 font-bold">
                  UG
                </div>
                <div>
                  <p className="font-semibold text-[#1A3020]">
                    Your gift of {currConfig.symbol}{Math.round(currentTotalInSelectedCurrency).toLocaleString()} {currency}
                  </p>
                  <p className="text-[11px] text-[#5A5A40]">
                    Helps supply vital nutrition, school kits, and child safeguarding directly through our Kampala humanitarian team.
                  </p>
                </div>
              </div>

              {/* Button Next */}
              <button
                type="submit"
                id="donation-step1-continue-btn"
                className="w-full py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Donor Contact Information */}
          {step === 2 && !completedDonation && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">
                  Donor Contact Information
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#F27D26] hover:underline font-semibold cursor-pointer"
                >
                  Edit Amount ({currConfig.symbol}{Math.round(currentTotalInSelectedCurrency).toLocaleString()})
                </button>
              </div>

              {/* Anonymous checkbox */}
              <div className="p-3 bg-[#F5F2EA] rounded-xl border border-[#E6E2D3] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#1A3020]">Make this donation anonymous</p>
                  <p className="text-[11px] text-[#5A5A40]">Your name will not appear in public supporter rolls.</p>
                </div>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-[#F27D26] rounded-sm focus:ring-[#F27D26]"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Dr. Amina Sekindi"
                    className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Email Address (for Official Tax / Charitable Receipt) *
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Phone Number (Optional / For Mobile Money confirmation)
                </label>
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A3020] mb-1">
                  Dedication or Special Prayer / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={donorNotes}
                  onChange={(e) => setDonorNotes(e.target.value)}
                  placeholder="e.g., In memory of beloved parents; for clean water in rural Uganda."
                  className="w-full px-3 py-2 text-xs bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] border border-[#E6E2D3] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  id="donation-step2-continue-btn"
                  className="w-2/3 py-2.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select Payment Channel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Modular Payment Methods */}
          {step === 3 && !completedDonation && (
            <form onSubmit={handleExecutePayment} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D3]">
                <div>
                  <h3 className="text-xs font-bold text-[#1A3020] uppercase tracking-wider">
                    Select Secure Payment Method
                  </h3>
                  <p className="text-[11px] text-[#5A5A40]">
                    Total: <strong className="text-[#1A3020]">{currConfig.symbol}{Math.round(currentTotalInSelectedCurrency).toLocaleString()} {currency}</strong> ({fundCategory})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#F27D26] hover:underline font-semibold cursor-pointer"
                >
                  Change details
                </button>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                
                {/* MTN Mobile Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mtn_momo')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'mtn_momo'
                      ? 'border-[#F27D26] bg-[#F5F2EA] ring-2 ring-[#F27D26]'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Smartphone className="w-4 h-4 text-[#F27D26]" />
                    <span className="text-[10px] font-bold bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] px-1.5 py-0.5 rounded-sm">Uganda</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">MTN MoMo</span>
                  <span className="text-[10px] text-[#5A5A40]">Instant Prompt</span>
                </button>

                {/* Airtel Money */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('airtel_money')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'airtel_money'
                      ? 'border-red-500 bg-red-50/50 ring-2 ring-red-400'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Smartphone className="w-4 h-4 text-red-600" />
                    <span className="text-[10px] font-bold bg-red-100 text-red-800 px-1.5 py-0.5 rounded-sm">Uganda</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">Airtel Money</span>
                  <span className="text-[10px] text-[#5A5A40]">Direct Merchant</span>
                </button>

                {/* Visa / Mastercard */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-400'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-sm">Global</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">Credit / Debit Card</span>
                  <span className="text-[10px] text-[#5A5A40]">Visa / Mastercard</span>
                </button>

                {/* PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-400'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Globe2 className="w-4 h-4 text-sky-600" />
                    <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded-sm">Global</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">PayPal</span>
                  <span className="text-[10px] text-[#5A5A40]">Intl Donors</span>
                </button>

                {/* Pesapal / Flutterwave */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pesapal')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'pesapal'
                      ? 'border-[#1A3020] bg-[#F5F2EA] ring-2 ring-[#1A3020]'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Building2 className="w-4 h-4 text-[#1A3020]" />
                    <span className="text-[10px] font-bold bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] px-1.5 py-0.5 rounded-sm">East Africa</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">Pesapal Gateway</span>
                  <span className="text-[10px] text-[#5A5A40]">Cards & Wallets</span>
                </button>

                {/* Direct Bank Wire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#1A3020] bg-[#F5F2EA] ring-2 ring-[#1A3020]'
                      : 'border-[#E6E2D3] bg-[#FDFCF8] hover:border-[#1A3020]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Building2 className="w-4 h-4 text-[#5A5A40]" />
                    <span className="text-[10px] font-bold bg-[#F5F2EA] border border-[#E6E2D3] text-[#5A5A40] px-1.5 py-0.5 rounded-sm">EFT/Wire</span>
                  </div>
                  <span className="text-xs font-bold text-[#1A3020]">Bank Transfer</span>
                  <span className="text-[10px] text-[#5A5A40]">Official NGO Acct</span>
                </button>
              </div>

              {/* Dynamic Payment Field Details */}
              {(paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && (
                <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-2">
                  <p className="text-xs font-semibold text-[#1A3020]">
                    Mobile Money Payment Instructions:
                  </p>
                  <p className="text-[11px] text-[#5A5A40]">
                    Enter your Uganda phone number to receive an instant push prompt to enter your PIN.
                  </p>
                  <input
                    type="tel"
                    placeholder="e.g. 0772 123 456"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FDFCF8] border border-[#E6E2D3] rounded-xl text-[#1A3020] focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
                  />
                  <p className="text-[10px] text-[#5A5A40] italic">
                    Merchant Name: <span className="font-semibold text-[#1A3020]">Ihsan Children's Foundation</span>
                  </p>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] space-y-1.5 text-xs text-[#5A5A40]">
                  <p className="font-semibold text-[#1A3020]">Official Charitable Account Details:</p>
                  <p className="text-[11px]"><strong className="text-[#1A3020]">Account Name:</strong> Ihsan Children's Foundation</p>
                  <p className="text-[11px]"><strong className="text-[#1A3020]">Bank:</strong> Standard Chartered Bank / Stanbic Uganda (Kampala Branch)</p>
                  <p className="text-[11px]"><strong className="text-[#1A3020]">Account No:</strong> [Available upon verified administrative dispatch / Contact office]</p>
                  <p className="text-[10px] text-[#F27D26] font-medium">Please include your name or receipt reference when initiating transfer.</p>
                </div>
              )}

              <div className="p-3 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#F27D26] shrink-0" />
                <span className="text-[#5A5A40]">
                  All donations are recorded directly into the Ihsan Children's Foundation humanitarian ledger with instant digital receipting.
                </span>
              </div>

              {/* Submit Payment */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] border border-[#E6E2D3] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  id="donation-complete-btn"
                  className="w-2/3 py-3 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing Donation...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-white" />
                      Confirm & Complete {currConfig.symbol}{Math.round(currentTotalInSelectedCurrency).toLocaleString()} {currency}
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SUCCESS SCREEN */}
          {completedDonation && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#F5F2EA] text-[#F27D26] border border-[#E6E2D3] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#F27D26]" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#F27D26] uppercase tracking-wider bg-[#F5F2EA] border border-[#E6E2D3] px-3 py-0.5 rounded-full">
                  May Allah Reward Your Generosity (Jazakum Allahu Khayran)
                </span>
                <h3 className="text-xl font-bold text-[#1A3020] mt-2">
                  Thank You For Your Kindness!
                </h3>
                <p className="text-xs text-[#5A5A40] max-w-md mx-auto mt-1">
                  Your charitable gift of <strong>{currConfig.symbol}{Math.round(completedDonation.originalAmount).toLocaleString()} {completedDonation.currency}</strong> for <strong>{completedDonation.fundCategory}</strong> has been confirmed.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] text-left text-xs space-y-1.5 max-w-md mx-auto font-mono">
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Receipt No:</span>
                  <span className="font-bold text-[#1A3020]">{completedDonation.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Ref:</span>
                  <span className="text-[#1A3020]">{completedDonation.transactionReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Donor:</span>
                  <span className="font-semibold text-[#1A3020]">{completedDonation.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Status:</span>
                  <span className="text-[#1A3020] font-bold">COMPLETED • VERIFIED</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  id="donation-view-receipt-btn"
                  onClick={() => {
                    onClose();
                    onShowReceipt(completedDonation);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-[#F27D26]" />
                  <span>Download / Print Official Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#F5F2EA] hover:bg-[#E6E2D3] text-[#1A3020] border border-[#E6E2D3] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
