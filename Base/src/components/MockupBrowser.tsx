import React, { useState } from 'react';
import { Monitor, Smartphone, RefreshCw, Sparkles, Check, Phone, ArrowUpRight } from 'lucide-react';

interface MockupBrowserProps {
  businessName: string;
  prospectName: string;
  demoImageUrl?: string;
}

export default function MockupBrowser({ businessName, prospectName, demoImageUrl }: MockupBrowserProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'rust' | 'charcoal' | 'forest'>('rust');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Guess the trade sector to show relevant copy
  const guessTrade = () => {
    const name = businessName.toLowerCase();
    if (name.includes('spark') || name.includes('electr')) return 'Sparky';
    if (name.includes('plumb') || name.includes('flow') || name.includes('drain')) return 'Plumber';
    if (name.includes('roof') || name.includes('tile')) return 'Roofer';
    if (name.includes('builder') || name.includes('construct') || name.includes('renov')) return 'Builder';
    return 'Trade Specialist';
  };

  const trade = guessTrade();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Pre-configured custom editorial content for trade sectors
  const getTradeContent = () => {
    switch (trade) {
      case 'Sparky':
        return {
          tagline: 'Reliable, clean, Brisbane sparks who turn up when they say they will.',
          intro: 'No cutting corners. No massive bill surprises. Just high-quality electrical installations and emergency repairs across Brisbane and Ipswich.',
          services: ['Domestic Rewiring & Swappouts', 'Switchboard Upgrades (Safety First)', 'Aircon Installs & Heating Lines', 'Quick-Fix Fault Finding'],
          proof: 'Fully licensed, Queensland Electrical Contractor #87241.'
        };
      case 'Plumber':
        return {
          tagline: 'Brisbane local drainage & emergency plumbers with zero BS.',
          intro: 'We treat your place with respect. From blocked drains to hot water system swapouts, we run on absolute honesty and on-time service.',
          services: ['Blocked Drain Clears & CCTV Drain Diagnostics', 'Hot Water System Emergency Repairs', 'Leaking Taps, Toilets & Pipe Swaps', 'Bathroom & Kitchen Gas Refits'],
          proof: 'QBCC Licensed Plumber & Drainer #108543.'
        };
      case 'Roofer':
        return {
          tagline: 'Built to weather Queensland storms. Honest Brisbane roofing.',
          intro: 'Tin or tile, leak finding or full roof replacements. We provide flat rates, transparent photos of the issue, and reliable guarantees.',
          services: ['Guttering, Downpipes & Leaf Guards', 'Leak Detection & Emergency Patching', 'Roof Tiling Repairs & Repointing', 'Full Metal Roof Re-roofing'],
          proof: 'QBCC Licensed Roof Contractor #119741.'
        };
      default:
        return {
          tagline: 'Honest, high-quality workmanship for local Queensland homes.',
          intro: 'No fancy sales pitches. Just reliable service, fair flat pricing, and absolute attention to detail in Brisbane and Ipswich neighborhoods.',
          services: ['Residential Installs & Repairs', 'Maintenance & Emergency Calls', 'Free Site Inspections & Flat Quotes', 'Fully Guaranteed Workmanship'],
          proof: 'Fully Licensed and Insured QLD Trade Craftsman.'
        };
    }
  };

  const tradeContent = getTradeContent();

  const themeClasses = {
    rust: {
      accent: 'text-[#BC4A24]',
      bgAccent: 'bg-[#BC4A24] hover:bg-[#9E3A1A]',
      border: 'border-[#BC4A24]',
      pill: 'bg-[#F2DFD7] text-[#BC4A24]'
    },
    charcoal: {
      accent: 'text-[#1C1C1C]',
      bgAccent: 'bg-[#1C1C1C] hover:bg-[#333333]',
      border: 'border-[#1C1C1C]',
      pill: 'bg-[#E3E3E3] text-[#1C1C1C]'
    },
    forest: {
      accent: 'text-[#43523D]',
      bgAccent: 'bg-[#43523D] hover:bg-[#344030]',
      border: 'border-[#43523D]',
      pill: 'bg-[#E1EADF] text-[#43523D]'
    }
  };

  const activeTheme = themeClasses[theme];

  return (
    <div className="w-full">
      {/* Mockup Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 font-sans text-sm pb-2 border-b border-[#EFAEA0]/20">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-[#BC4A24] uppercase tracking-wider font-semibold">Section 02 // Your Website Demo</span>
          <h3 className="text-xl font-semibold tracking-tight mt-0.5">Mockup Preview for {businessName}</h3>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Toggles */}
          <div className="flex rounded-md bg-[#EFEAE0] p-1 border border-[#E0D9CD]">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-sm transition-all ${device === 'desktop' ? 'bg-[#1C1C1C] text-white shadow-xs' : 'text-[#555] hover:text-[#1C1C1C]'}`}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-sm transition-all ${device === 'mobile' ? 'bg-[#1C1C1C] text-white shadow-xs' : 'text-[#555] hover:text-[#1C1C1C]'}`}
              title="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* Theme Palette Swapper (Only if rendering live coding mock site) */}
          {!demoImageUrl && (
            <div className="flex items-center gap-1.5 rounded-md bg-[#EFEAE0] px-2.5 py-1.5 border border-[#E0D9CD]">
              <span className="text-xs text-[#555] font-medium hidden md:inline">Accents:</span>
              <button
                onClick={() => setTheme('rust')}
                className={`w-3.5 h-3.5 rounded-full bg-[#BC4A24] border ${theme === 'rust' ? 'ring-2 ring-offset-2 ring-offset-[#F5F1EA] ring-[#1C1C1C]' : 'opacity-85'}`}
                title="Terracotta Clay"
              />
              <button
                onClick={() => setTheme('forest')}
                className={`w-3.5 h-3.5 rounded-full bg-[#43523D] border ${theme === 'forest' ? 'ring-2 ring-offset-2 ring-offset-[#F5F1EA] ring-[#1C1C1C]' : 'opacity-85'}`}
                title="Eucalyptus Olive"
              />
              <button
                onClick={() => setTheme('charcoal')}
                className={`w-3.5 h-3.5 rounded-full bg-[#1C1C1C] border ${theme === 'charcoal' ? 'ring-2 ring-offset-2 ring-offset-[#F5F1EA] ring-[#1C1C1C]' : 'opacity-85'}`}
                title="Bold Charcoal"
              />
            </div>
          )}

          {/* Refresh Action */}
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#EFEAE0] hover:bg-[#EAE4D8] border border-[#E0D9CD] transition-colors"
          >
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="text-xs font-medium">Rebuild</span>
          </button>
        </div>
      </div>

      {/* Browser Window mockup */}
      <div 
        className={`bg-white rounded-lg border border-[#DCD6C9] shadow-md overflow-hidden transition-all duration-500 mx-auto ${
          device === 'mobile' ? 'max-w-[390px] min-h-[580px]' : 'w-full'
        }`}
      >
        {/* Browser Topbar */}
        <div className="bg-[#EFEAE0] border-b border-[#DCD6C9] px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5 w-1/3">
            <span className="w-3 h-3 rounded-full bg-[#E74C3C]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#F1C40F]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#2ECC71]/80 inline-block"></span>
          </div>
          
          <div className="w-1/3 max-w-sm bg-white rounded-md border border-[#E0D9CD] text-center py-1 px-3 text-xs text-[#555] font-mono truncate">
            {businessName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'yourtrade'}.com.au
          </div>
          
          <div className="w-1/3 text-right flex items-center justify-end">
            <span className="text-[10px] font-mono tracking-widest text-[#999] uppercase">PREVIEW</span>
          </div>
        </div>

        {/* Browser Content */}
        <div className={`relative bg-[#F9F7F3] min-h-[460px] overflow-y-auto transition-opacity duration-300 ${isRefreshing ? 'opacity-30' : 'opacity-100'}`}>
          {demoImageUrl ? (
            /* User supplied a real mockup image */
            <div className="w-full">
              <img 
                src={demoImageUrl} 
                alt={`Custom website mockup for ${businessName}`} 
                className="w-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            /* Inside - Live customizable website mockup code */
            <div className="text-[#1C1C1C] font-sans antialiased">
              {/* Dynamic Header */}
              <header className="border-b border-[#EBE6DC] px-6 py-4 flex justify-between items-center bg-[#FAF9F6]">
                <div className="font-serif font-black text-lg tracking-tight uppercase flex items-center gap-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${theme === 'rust' ? 'bg-[#BC4A24]' : theme === 'charcoal' ? 'bg-[#1C1C1C]' : 'bg-[#43523D]'}`}></span>
                  {businessName}
                </div>
                <div className="hidden sm:flex items-center gap-5 text-xs font-mono uppercase tracking-wider text-[#666]">
                  <span>Home</span>
                  <span>Our Difference</span>
                  <span>Flat Rates</span>
                  <span className={`font-semibold ${activeTheme.accent}`}>Services</span>
                </div>
                <a href="tel:0400000000" className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded bg-[#1C1C1C] text-white">
                  <Phone size={11} />
                  <span>Call Now</span>
                </a>
              </header>

              {/* Dynamic Hero Layout - Off-center asymmetric */}
              <section className="px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
                <div className="md:col-span-8 flex flex-col justify-center">
                  <div className="mb-4 inline-flex">
                    <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold px-2 py-0.5 rounded ${activeTheme.pill}`}>
                      Brisbane & Ipswich Local Trade
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1C] leading-[1.1] mb-5">
                    {tradeContent.tagline}
                  </h1>
                  
                  <p className="text-base text-[#4A4B46] max-w-xl leading-relaxed mb-6">
                    {tradeContent.intro}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className={`px-5 py-3 rounded text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${activeTheme.bgAccent}`}>
                      <span>Request a Fixed Quote</span>
                      <ArrowUpRight size={15} />
                    </button>
                    <button className="px-5 py-3 rounded border border-[#D2C9B9] hover:bg-[#F2EDE2] text-sm text-[#333] font-semibold transition-colors text-center">
                      Our Fixed Rate Guarantee
                    </button>
                  </div>
                </div>

                {/* Right Hero Image or Detail Block */}
                <div className="md:col-span-4 flex items-center">
                  <div className="w-full bg-[#FAF9F5] p-5 rounded-lg border border-[#E9E4DA] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFEAE0] rounded-bl-full opacity-60 z-0"></div>
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] text-[#888] block mb-2">{tradeContent.proof}</span>
                      <h4 className="font-serif font-black text-lg mb-3">Locked-In Values</h4>
                      <ul className="text-xs space-y-2 text-[#4A4A43] font-medium leading-relaxed">
                        <li className="flex items-start gap-1 w-full"><Check size={11} className={`${activeTheme.accent} mt-0.5 shrink-0`} /> <span>Fixed pricing prior to tool deployment.</span></li>
                        <li className="flex items-start gap-1 w-full"><Check size={11} className={`${activeTheme.accent} mt-0.5 shrink-0`} /> <span>On-time arrivals with continuous SMS notifications.</span></li>
                        <li className="flex items-start gap-1 w-full"><Check size={11} className={`${activeTheme.accent} mt-0.5 shrink-0`} /> <span>Full sweep up & rubble disposal.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dynamic Service Segment */}
              <section className="bg-[#FAF9F5] px-6 py-10 border-t border-[#EBE6DC]">
                <div className="max-w-6xl mx-auto">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[#888] block mb-2">Capabilities</span>
                  <h3 className="text-xl font-bold tracking-tight mb-6">Honest Solutions, Swapped Intelligently.</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {tradeContent.services.map((service, index) => (
                      <div key={index} className="bg-white p-4 rounded border border-[#E0D9CD] shadow-2xs hover:border-[#D6CAB4] transition-colors">
                        <span className={`font-mono text-xs font-bold ${activeTheme.accent} block mb-1`}>0{index+1} //</span>
                        <h4 className="text-sm font-bold text-[#1C1C1C] leading-snug">{service}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Dynamic Footer Area */}
              <footer className="bg-[#1C1C1C] text-white px-6 py-8 text-center text-xs">
                <p className="font-semibold">{businessName} — QLD Local Trade Company</p>
                <p className="text-[#888] mt-1 font-mono text-[10px]">Building Trust Since 2026 // Brisbane, Ipswich & Moreton Bay</p>
              </footer>
            </div>
          )}
        </div>
      </div>

      {/* Under Frame Tag */}
      <div className="mt-3 text-right">
        <span className="font-mono text-[10px] text-[#8C867C]">
          * Note: You can preview this layout on phone screens too. Click the 
          <Smartphone size={10} className="inline mx-1" /> icon to test responsiveness.
        </span>
      </div>
    </div>
  );
}
