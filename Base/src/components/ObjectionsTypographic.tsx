import React from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';

interface ObjectionsProps {
  businessName: string;
}

export default function ObjectionsTypographic({ businessName }: ObjectionsProps) {
  const qas = [
    {
      num: '01',
      title: 'What does this cost? What’s the damage?',
      desc: 'Transparent pricing, no hidden additions. I charge a flat monthly rate of $150 AUD. No massive upfront setup fee to choke your cash flow. That covers secure hosting, active mobile optimization, regular search health checks, and unlimited text changes. If your business changes numbers, license numbers, or addresses, you text me and I change it. If you want to cancel, you cancel. Zero lock-in contracts.'
    },
    {
      num: '02',
      title: 'I already have a website. Why change?',
      desc: 'If your current site brings in constant booked jobs and keeps your boys busy year-round, do not change it. Keep it as is. But most trade websites in Brisbane are basically silent online brochures that do not do anything but cost money. This mockup layout is custom-tooled specifically to make your phone ring on-site. It loads instantly on mobile, and highlights exactly what homeowners look for—trust, credentials, and real speed. If your current site is sitting there doing sweet FA, let’s scrap it and swap it.'
    },
    {
      num: '03',
      title: 'How long until we are live?',
      desc: 'About 7 days. Because I have already put in the time to structure and research this mockup layout for you, the heavy lifting is complete. If you say yes, we just swap the generic parts with your actual work photos, type up your Queensland trade license numbers, lock in your exact pricing/guarantees, map your domain name, and hit the green light.'
    },
    {
      num: '04',
      title: 'Do I have to do anything technical?',
      desc: 'Zip. Absolutely none of it. I’ve worked with plenty of sparkies, builders, and drainers across southeast Queensland. I know you’d rather be on the tools or running your site than arguing with domains, servers, or DNS records. I handle the host, set up the SSL, test the contact logs, make sure it’s fast on standard mobile networks, and hand over a clean working product.'
    },
    {
      num: '05',
      title: 'What if I don’t like the mockup?',
      desc: 'Then we shake hands and walk away. That is why I build the initial draft first. It gives you a real tangible product to click around on and judge, rather than requiring you to buy a block of theoretical hours. If it does not fit your vibe, you haven’t spent a single brass razoo, and I keep the layout. No hard feelings, no high-pressure pushy followups.'
    },
    {
      num: '06',
      title: 'Why is this so cheap? What’s the catch?',
      desc: 'There is no catch. I don’t employ high-rise sales staff, I don’t book fancy corporate boardrooms in the Brisbane CBD, and I don’t write lengthy 50-page strategy decks that nobody ever reads. I’m a single focused builder who structures fast, hard-working websites for small trade operators. My overhead is near zero, and I pass that efficiency straight to you. It is high end craftsmanship, priced like a couple of cartons of beer a month.'
    }
  ];

  return (
    <div className="w-full">
      <div className="border-t border-[#1C1C1C]/10 pt-12 md:pt-16">
        {/* Asymmetric Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#BC4A24] font-bold block mb-3 uppercase tracking-widest">// Section 03 // Frank Answers</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black italic text-[#1C1C1C] tracking-tight leading-[1.05]">
              Straight answers. No sales-consultant fluff.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="font-sans text-sm text-[#555] leading-relaxed max-w-lg mb-1">
              Tradesmen have the sharpest BS detectors in the country. I don't blame you. Let's look at the actual questions you care about—cost, hassle, and what happens if you hate it.
            </p>
          </div>
        </div>

        {/* Typographic FAQ Grid - 3 Columns Asymmetric where needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {qas.map((qa, index) => (
            <div key={index} className="flex flex-col justify-between pt-4 border-t border-[#1C1C1C]/10">
              <div>
                {/* Num Block */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-[#BC4A24] font-bold tracking-wider">{qa.num} //</span>
                  <span className="h-px bg-[#BC4A24]/20 flex-1"></span>
                </div>
                
                {/* Question */}
                <h4 className="text-base font-bold text-[#1C1C1C] leading-snug mb-3 tracking-tight">
                  {qa.title}
                </h4>
                
                {/* Description */}
                <p className="text-xs text-[#444] leading-relaxed font-sans">
                  {qa.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
