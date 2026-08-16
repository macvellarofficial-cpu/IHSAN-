import React from 'react';
import { X, Printer, Download, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DonationRecord } from '../../types';

interface ReceiptModalProps {
  receipt: DonationRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(receipt.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3020]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF8] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E6E2D3] overflow-hidden relative">
        
        {/* Modal Bar (Hidden on print) */}
        <div className="bg-[#1A3020] text-[#FDFCF8] px-6 py-3.5 flex items-center justify-between print:hidden border-b border-[#F27D26]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F27D26]" />
            <span className="text-sm font-bold tracking-tight">Official Charitable Donation Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="text-[#E6E2D3] hover:text-[#FDFCF8] p-1 rounded-lg hover:bg-[#24422c] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Certificate Container */}
        <div id="printable-receipt" className="p-6 sm:p-10 bg-[#FDFCF8] text-[#1A3020] space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#1A3020]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1A3020] text-[#F27D26] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 fill-[#F27D26]" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-[#1A3020] tracking-tight uppercase">
                  Ihsan Children's Foundation
                </h1>
                <p className="text-xs text-[#5A5A40] font-medium">
                  Mutundwe, Kampala, Uganda • Founded 2019
                </p>
                <p className="text-[11px] text-[#5A5A40]/80">
                  info@ihsanchildrensfoundation.org • +256 741 799 231
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-2.5 py-1 bg-[#F5F2EA] text-[#1A3020] border border-[#E6E2D3] text-xs font-bold rounded-lg uppercase tracking-wider mb-1">
                Official Receipt
              </span>
              <p className="text-xs font-mono font-bold text-[#1A3020]">
                {receipt.receiptNumber}
              </p>
              <p className="text-[11px] text-[#5A5A40]">Date: {formattedDate}</p>
            </div>
          </div>

          {/* Acknowledgement Statement */}
          <div className="bg-[#F5F2EA] p-4 rounded-2xl border border-[#E6E2D3] text-xs leading-relaxed text-[#1A3020]">
            <p className="font-semibold text-[#1A3020] mb-1">
              Dear {receipt.donorName},
            </p>
            <p className="text-[#5A5A40]">
              We gratefully acknowledge receipt of your charitable contribution to <strong>Ihsan Children's Foundation</strong>. 
              Your generous gift directly advances our humanitarian mission supporting vulnerable children, education, clean water, and emergency food security in Uganda.
            </p>
          </div>

          {/* Receipt Breakdown Table */}
          <div className="border border-[#E6E2D3] rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F2EA] text-[#1A3020] font-bold border-b border-[#E6E2D3]">
                  <th className="p-3">Description / Designated Fund</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Payment Rail</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E2D3]">
                <tr>
                  <td className="p-3 font-semibold text-[#1A3020]">
                    {receipt.fundCategory}
                    {receipt.notes && (
                      <p className="text-[11px] font-normal text-[#5A5A40] mt-0.5">
                        Dedication: {receipt.notes}
                      </p>
                    )}
                  </td>
                  <td className="p-3 uppercase text-[#5A5A40] font-mono">
                    {receipt.frequency === 'monthly' ? 'Monthly Commitment' : 'One-Time Gift'}
                  </td>
                  <td className="p-3 text-[#5A5A40] uppercase font-mono text-[11px]">
                    {receipt.paymentMethod.replace('_', ' ')}
                  </td>
                  <td className="p-3 text-right font-bold text-[#1A3020] text-sm">
                    {receipt.currency} {receipt.originalAmount.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-[#F5F2EA]/60 font-bold">
                  <td colSpan={3} className="p-3 text-right text-[#5A5A40]">
                    Total Received (USD Equivalent):
                  </td>
                  <td className="p-3 text-right text-[#1A3020] text-base font-extrabold">
                    ${receipt.amountUSD.toLocaleString()} USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Audit Verification & References */}
          <div className="grid grid-cols-2 gap-4 text-xs text-[#5A5A40] border-t border-[#E6E2D3] pt-4">
            <div>
              <p className="font-semibold text-[#1A3020]">Transaction Reference:</p>
              <p className="font-mono text-[11px] text-[#1A3020]">{receipt.transactionReference}</p>
              <p className="font-semibold text-[#1A3020] mt-2">Status:</p>
              <p className="inline-flex items-center gap-1 text-[#1A3020] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26]" /> Verified & Recorded in Ledger
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#1A3020]">Regulatory & Registration Status:</p>
              <p className="text-[11px] text-[#5A5A40]">
                Headquartered in Mutundwe, Kampala, Uganda. Founded 2019 by Mr Hakimu and Jeremiah.
              </p>
              <p className="text-[11px] text-[#5A5A40] mt-1">
                Uganda NGO Registration: <span className="font-mono font-semibold text-[#1A3020]">[In Process / On File]</span>
              </p>
            </div>
          </div>

          {/* Official Sign-off Seal */}
          <div className="pt-4 border-t border-dashed border-[#E6E2D3] flex items-center justify-between">
            <div className="text-[11px] text-[#5A5A40]">
              <p className="font-bold text-[#1A3020]">Ihsan Children's Foundation Secretariat</p>
              <p>Finance & Accountability Office, Kampala, Uganda</p>
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-[#1A3020]/40 flex items-center justify-center p-1 text-center text-[9px] font-bold text-[#1A3020] uppercase tracking-tighter">
              Official Seal<br />Kampala<br />★ 2019 ★
            </div>
          </div>

        </div>

        {/* Footer actions (Hidden on print) */}
        <div className="p-4 bg-[#F5F2EA] border-t border-[#E6E2D3] flex justify-end gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1A3020] hover:bg-[#24422c] text-[#FDFCF8] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#F27D26]" />
            <span>Print or Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#E6E2D3] hover:bg-[#d8d3c2] text-[#1A3020] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
