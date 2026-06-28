import { Warp } from "@paper-design/shaders-react";

export default function WarpShaderHero() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(200, 100%, 20%)", "hsl(160, 100%, 75%)", "hsl(180, 90%, 30%)", "hsl(170, 100%, 80%)"]}
        />
      </div>

      {/* Dark glassmorphic overlay */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
        {/* Badge */}
        <div className="mb-8 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-300 text-xs font-medium tracking-widest uppercase">
          Multi-Agent AI Research System
        </div>

        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-white text-5xl md:text-7xl font-light text-balance leading-tight" style={{fontFamily:'Space Grotesk, sans-serif'}}>
            Research Powered<br />
            <span className="text-transparent bg-clip-text" style={{backgroundImage:'linear-gradient(135deg, #2dd4bf, #34d399, #6ee7b7)'}}>
              by AI Agents
            </span>
          </h1>

          <p className="text-white/70 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            Five specialized AI agents collaborate to search the web, rank sources, 
            scrape content, summarize findings, and generate verified research reports — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a href="#research" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.4)]">
              Start Research
            </a>
            <a href="#how-it-works" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300">
              How it Works
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40 text-xs animate-bounce">
          <span className="tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </main>
  );
}
