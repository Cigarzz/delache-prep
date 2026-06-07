import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Video, Info, Copy, Check } from 'lucide-react';

interface CalendarProps {
  businessName: string;
  prospectName: string;
  bookedTime?: string;
}

export default function CalendarSection({ businessName, prospectName, bookedTime }: CalendarProps) {
  const [copied, setCopied] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Example trade appointment options
  const defaultSlots = [
    { day: 'Thursday', slots: ['7:00 AM (Early site wire-up)', '10:30 AM (Between job runs)', '3:30 PM (End of shift)'] },
    { day: 'Friday', slots: ['8:30 AM', '11:00 AM (Ipswich run route)', '1:30 PM'] },
    { day: 'Monday', slots: ['10:00 AM', '12:30 PM', '4:00 PM (Tool down talk)'] }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`<iframe src="https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID" style="width: 100%; border: none; min-height: 600px;" id="ghl-calendar"></iframe>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatedBook = (slot: string) => {
    setSelectedSlot(slot);
    setBookingSuccess(slot);
  };

  return (
    <div id="calendar" className="w-full">
      <div className="border-t border-[#1C1C1C]/10 pt-12 md:pt-16">
        
        {/* Case 1: USER IS ALREADY BOOKED */}
        {bookedTime || bookingSuccess ? (
          <div className="bg-[#FAF9F5] rounded-xl border-l-4 border-2 border-[#BC4A24] p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FCF8F2] rounded-full text-[#BC4A24]">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#BC4A24] font-bold tracking-widest block uppercase">// Section 05 // locked in</span>
                <h3 className="text-3xl font-serif font-black italic tracking-tight text-[#1C1C1C] leading-none mt-1">
                  You're locked in, {prospectName}.
                </h3>
                <p className="text-sm text-[#444] mt-2 font-medium">
                  We are matched for <span className="underline decoration-[#BC4A24] font-bold text-[#1C1C1C]">{bookedTime || bookingSuccess}</span>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#1C1C1C]/5">
              <div className="space-y-2 text-xs text-[#555] font-sans">
                <h4 className="font-bold text-[#1C1C1C] flex items-center gap-1.5">
                  <Video size={14} className="text-[#BC4A24]" />
                  <span>How we connect:</span>
                </h4>
                <p className="leading-relaxed">
                  We will send a Zoom or Google Meet link directly to your email and calendar before our call. We'll hop on a quick screen-share to run through the strategy together.
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#555] font-sans">
                <h4 className="font-bold text-[#1C1C1C] flex items-center gap-1.5">
                  <Clock size={14} className="text-[#BC4A24]" />
                  <span>Before we speak:</span>
                </h4>
                <p className="leading-relaxed">
                  Make sure you have watched the 3-minute video and explored the automation systems above. That way we don't stretch the 15 minutes explaining basics, we custom talk options.
                </p>
              </div>
            </div>
            
            {bookingSuccess && (
              <div className="pt-2 text-right">
                <button 
                  onClick={() => {
                    setBookingSuccess(null);
                    setSelectedSlot(null);
                  }}
                  className="font-mono text-[10px] text-[#8C867C] hover:text-[#1C1C1C] underline"
                >
                  [ Change simulated booking ]
                </button>
              </div>
            )}
          </div>
        ) : (
          
          /* Case 2: CALENDAR SCHEDULER PROMPT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Calendar copy - Asymmetric Grid */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-[#BC4A24] font-bold block uppercase tracking-widest">// Section 05 // Calendly / GHL</span>
              <h2 className="text-3xl font-serif font-black italic tracking-tight text-[#1C1C1C] leading-[1.05]">
                Grab a quick 15-minute slot.
              </h2>
              <div className="space-y-3 text-sm text-[#444] leading-relaxed">
                <p>
                  No lock-ins, no pitches. Let's look over your mockup, tell me what fits, what feels off-base, and what services you need to highlight first.
                </p>
                <p className="text-xs italic bg-[#FAF9F5] p-3 rounded border border-[#E0D9CD]">
                  "I block out an hour on Thursday & Friday specifically for local Brisbane builders, sparkies and tradesmen to run through layouts."
                </p>
                
                {/* Integration notice */}
                <div className="p-3.5 bg-[#FFFCEB] rounded border border-[#EAD5A0] text-xs text-[#1C1C1C] space-y-2 font-mono">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Info size={13} className="text-[#BC4A24]" />
                    <span>[ GHL INTEGRATION SLOT ]</span>
                  </div>
                  <p className="text-[10px] text-[#666] leading-relaxed">
                    This block is styled as a placeholder, containing an active calendar simulator. When deploying, replace the outer container placeholder code directly with your GoHighLevel/Calendly widget code.
                  </p>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-[#FDF9EA] rounded border border-[#C6B079] transition-colors text-[10px] active:scale-95"
                  >
                    {copied ? <Check size={10} /> : <Copy size={10} />}
                    <span>{copied ? 'Copied iframe snippet' : 'Copy GHL Embed Code'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live GHL booking widget */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg border border-[#DCD6C9] shadow-sm overflow-hidden">
                {/* Calendar Window Top Header */}
                <div className="bg-[#FAF9F5] px-4 py-3 border-b border-[#DCD6C9] flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#8C867C] uppercase tracking-wider">
                    RESERVED FOR {prospectName.toUpperCase()}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#BC4A24] animate-pulse"></span>
                </div>

                <div className="p-4 md:p-6 space-y-6">
                  <div className="text-center pb-3 border-b border-[#F2ECE0]">
                    <h4 className="font-serif font-black text-lg text-[#1C1C1C]">Lock in a 15-Min Work Session</h4>
                    <p className="text-xs text-[#666] mt-1 font-sans">No Zoom needed. Ben will call your mobile number directly.</p>
                  </div>

                  {/* Calendar Matrix View */}
                  <div className="space-y-4">
                    {defaultSlots.map((dayObj, i) => (
                      <div key={i} className="space-y-1.5">
                        <span className="font-mono text-[10px] text-[#555] block font-bold uppercase tracking-wider">
                          {dayObj.day}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {dayObj.slots.map((s, index) => (
                            <button
                              key={index}
                              onClick={() => handleSimulatedBook(`${dayObj.day} at ${s}`)}
                              className="px-3 py-2 text-left sm:text-center text-xs font-mono rounded bg-[#F9F7F3] hover:bg-[#EFEAE0] hover:text-[#BC4A24] border border-[#E0D9CD] transition-all text-[#1C1C1C]"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Booking Widget footer indicator template */}
                  <div className="text-center pt-3 border-t border-[#F2ECE0] text-[10px] font-mono text-[#999]">
                    GoHighLevel Booking Integration Mock v2.4 // Swappable
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
