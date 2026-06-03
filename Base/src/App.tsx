import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, ShieldCheck, Mail, MapPin, Hammer, ExternalLink, Calendar as CalendarIcon, FileCode, Check } from 'lucide-react';
import MockupBrowser from './components/MockupBrowser';
import FauxVideoPlayer from './components/FauxVideoPlayer';
import ObjectionsTypographic from './components/ObjectionsTypographic';
import WebhookForm from './components/WebhookForm';
import CalendarSection from './components/CalendarSection';

export default function App() {
  const [params, setParams] = useState({
    name: 'mate',
    business: 'your trade business',
    demo: '',
    time: ''
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'playground'>('preview');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const parsedName = searchParams.get('name') || searchParams.get('Name') || 'mate';
      const parsedBusiness = searchParams.get('business') || searchParams.get('Business') || 'your trade business';
      const parsedDemo = searchParams.get('demo') || searchParams.get('Demo') || '';
      const parsedTime = searchParams.get('time') || searchParams.get('Time') || '';
      
      setParams({
        name: parsedName,
        business: parsedBusiness,
        demo: parsedDemo,
        time: parsedTime
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#1C1C1C] font-sans antialiased text-base selection:bg-[#BC4A24] selection:text-white px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Top Subtle Brand Bar - Asymmetric minimal header */}
      <header className="max-w-7xl mx-auto py-6 md:py-8 border-b border-[#1C1C1C]/10 mb-12 md:mb-16 flex justify-between items-start gap-4">
        {/* Left column - Ben Identity */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C867C] block font-bold">Independent Website Builder</span>
          <h1 className="text-sm font-bold tracking-tight text-[#1C1C1C] mt-1 flex items-center gap-1.5">
            <Hammer size={13} className="text-[#BC4A24]" />
            <span>Ben // Brisbane Website Craft</span>
          </h1>
        </div>

        {/* Right column - Brisbane Coordinates */}
        <div className="text-right flex flex-col items-end">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C867C] block font-bold">// Coordinates</span>
          <span className="text-xs font-bold text-[#1C1C1C] mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B6F4B] inline-block"></span>
            Brisbane / Ipswich, QLD
          </span>
        </div>
      </header>

      {/* Main Editorial Container */}
      <main className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* 1. PERSONALIZED HERO SECTION - Asymmetric Left-heavy layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Hero copy: 8 columns out of 12 */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex">
              <span className="font-mono text-[10px] bg-[#BC4A24]/10 text-[#BC4A24] px-2.5 py-1 rounded-sm uppercase tracking-wider font-bold">
                Brisbane Local Trade Consultation Prep
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-bold tracking-tight text-[#1C1C1C] leading-[1.05]">
              Hello {params.name}. I custom-built a modern website mockup for{' '}
              <span className="font-serif-display underline decoration-[#BC4A24] text-[#BC4A24]">
                {params.business}
              </span>
              .
            </h2>

            <p className="text-base md:text-xl text-[#3D3E3A] font-serif italic leading-relaxed max-w-2xl">
              I spent around four hours researching Queensland trade territory, analyzing your local competition, and structuring a high-speed website template. Scroll down to see exactly why it matters before we talk.
            </p>

            {/* Micro Details Banner */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-[#555] font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BC4A24]"></span>
                <span>Custom Built For: {params.business}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BC4A24]"></span>
                <span>Type: 15-Min Prep Overview</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BC4A24]"></span>
                <span>Zero Sales BS Guarantee</span>
              </div>
            </div>
          </div>

          {/* Sidebar / Accent wood block: 4 columns out of 12 (Asymmetry) */}
          <div className="lg:col-span-4 bg-[#FAF9F5] rounded-lg border border-[#DCD6C9] p-5 space-y-4 shadow-2xs self-stretch flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8C867C] block font-bold">// Quick Instructions</span>
              <h3 className="text-base font-bold text-[#1C1C1C]">3 Steps Before Our Call:</h3>
              <ul className="space-y-3 text-xs text-[#555] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#BC4A24]">1.</span>
                  <span><strong>Watch the 3-Minute Video:</strong> See exactly where most Brisbane trade sites bleed local builders' jobs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#BC4A24]">2.</span>
                  <span><strong>Review Your Mockup:</strong> Scroll around the interactive template rendered below in section 02.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#BC4A24]">3.</span>
                  <span><strong>Form & Lock Timing:</strong> Tell me where you want to go in the 2-question tracker.</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-[#1C1C1C]/10 text-[10px] font-mono text-[#8C867C]">
              Queensland Licensed Trades Specialist Advisor // Ben
            </div>
          </div>

        </section>

        {/* Dynamic URL parameters generator - helpful control room panel styled like high-class magazine footer */}
        <section className="bg-[#FAF9F5] rounded border border-[#E0D9CD] p-4 font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <span className="text-[#BC4A24] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BC4A24]"></span>
              [ Prospect URL Configuration Room ]
            </span>
            <span className="text-[#888] text-[10px]">Test parameters live by changing them in the address bar or using presets:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="bg-white p-2 rounded border border-[#E0D9CD] space-y-1">
              <span className="text-[10px] text-[#888] block">PRESET 01: PLUMBER DAVE</span>
              <a href="?name=Dave&business=Dave's%20Plumbing%20%26%20Drainage&time=Thursday%2010:30am" className="text-xs text-[#BC4A24] hover:underline font-bold block truncate">
                Launch Dave's Plumbing Preview ↗
              </a>
            </div>
            <div className="bg-white p-2 rounded border border-[#E0D9CD] space-y-1">
              <span className="text-[10px] text-[#888] block">PRESET 02: SPARKY MICK</span>
              <a href="?name=Mick&business=Mick's%20Rapid%20Sparks&time=" className="text-xs text-[#BC4A24] hover:underline font-bold block truncate">
                Launch Mick's Rapid Sparks ↗
              </a>
            </div>
            <div className="bg-white p-2 rounded border border-[#E0D9CD] space-y-1">
              <span className="text-[10px] text-[#888] block">PRESET 03: BRISBANE ROOFING</span>
              <a href="?name=Steve&business=Moreton%20Bay%20Roofing" className="text-xs text-[#BC4A24] hover:underline font-bold block truncate">
                Launch Moreton Bay Roofing ↗
              </a>
            </div>
            <div className="bg-white p-2 rounded border border-[#E0D9CD] space-y-1">
              <span className="text-[10px] text-[#888] block">CUSTOM LOGS</span>
              <div className="text-[10px] text-[#555] leading-none">
                Name: {params.name} <br/>
                Trade: {params.business}
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE VIDEO SECTION */}
        <section className="pt-4">
          <FauxVideoPlayer businessName={params.business} prospectName={params.name} />
        </section>

        {/* 3. INTERACTIVE WEBSITE PREVIEW SECTION */}
        <section className="pt-4">
          <div className="bg-[#1C1C1C] text-white p-6 md:p-8 rounded-xl space-y-4 mb-2">
            <h3 className="text-2xl font-serif text-[#FAF9F5] italic tracking-tight">
              Section 02 // Clean responsive tradesmen framework.
            </h3>
            <p className="text-xs text-white/70 max-w-3xl leading-relaxed">
              Below is the raw preview layout. I designed this explicitly to load in 0.4 seconds over typical south-east Queensland 4G tower coverage. No heavy images, no bloated tracker codes. It's direct, simple, and optimized to make homeowners dial on mobile instantly.
            </p>
          </div>
          
          <MockupBrowser 
            businessName={params.business} 
            prospectName={params.name} 
            demoImageUrl={params.demo} 
          />
        </section>

        {/* 4. FAQ ADDRESSING COMMON OBJECTIONS */}
        <section className="pt-4">
          <ObjectionsTypographic businessName={params.business} />
        </section>

        {/* 5. TWO QUESTION WEBHOOK FORM */}
        <section className="pt-4">
          <WebhookForm businessName={params.business} prospectName={params.name} />
        </section>

        {/* 6. CALENDAR BOOKING PLACEHOLDER */}
        <section className="pt-4">
          <CalendarSection 
            businessName={params.business} 
            prospectName={params.name} 
            bookedTime={params.time} 
          />
        </section>

      </main>

      {/* 7. RESTRAINED MINIMAL FOOTER AREA */}
      <footer className="max-w-7xl mx-auto mt-24 pt-10 border-t border-[#1C1C1C]/10 text-xs text-[#8C867C] flex flex-col md:flex-row justify-between items-start gap-6 font-mono">
        {/* Coordinates */}
        <div className="space-y-1">
          <p className="font-bold text-[#1C1C1C]">BEN // BRISBANE TRADE WEBSITES</p>
          <p>Handcrafted web interfaces for Queensland Sparkies, Plumbers, Roofers, and Builders.</p>
          <p className="text-[10px] text-[#A69C8E]">All code compiled & launched with absolute pride on Australian Soil.</p>
        </div>

        {/* Contact direct */}
        <div className="space-y-1 md:text-right">
          <p className="font-bold text-[#1C1C1C]">DIRECT CONTACT</p>
          <p className="hover:text-[#BC4A24] transition-colors">Mobile // 0488 123 456</p>
          <p className="hover:text-[#BC4A24] transition-colors">Email // ben@tradecraftwebs.com.au</p>
          <p className="text-[10px] text-[#A69C8E]">Brisbane / Ipswich, Queensland, Australia</p>
        </div>
      </footer>

    </div>
  );
}
