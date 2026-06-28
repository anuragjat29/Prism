import { useState, useRef, useEffect } from 'react';
import { Warp } from '@paper-design/shaders-react';
import {
  Brain, Send, Search, Globe, BarChart3, Layers,
  FileText, Star, ChevronRight, Cpu, MessageSquare,
  Loader2, CheckCircle2, Eye, EyeOff, User, Lock, Mail,
  ArrowRight, LogOut, Download, Plus, Trash2, PanelRightClose, PanelRight
} from 'lucide-react';

/* ─── Pipeline node definitions ─────────────────────── */
const NODES = [
  { id: 'router',     icon: ChevronRight, label: 'Router Agent',      sublabel: 'Classifying intent',    detail: 'Determining if query requires deep research or a simple chat response.',  color: '#C2C9CC', duration: 2500 },
  { id: 'search',     icon: Search,       label: 'Web Search',         sublabel: 'Tavily API',             detail: 'Searching the internet for the most recent and relevant sources.',          color: '#C2C9CC', duration: 4000 },
  { id: 'ranking',    icon: BarChart3,    label: 'Ranking Agent',      sublabel: 'Scoring sources',        detail: 'Scoring each source by authority, freshness, and topic relevance.',          color: '#C2C9CC', duration: 3500 },
  { id: 'scraper',    icon: Globe,        label: 'Parallel Scraper',   sublabel: '5 workers active',       detail: 'Fetching URLs in parallel. Stops after 3 successful extractions.',           color: '#C2C9CC', duration: 8000 },
  { id: 'summarizer', icon: Layers,       label: 'Summarizer Agent',   sublabel: 'Compressing content',   detail: 'Condensing scraped pages into dense factual key points.',                    color: '#C2C9CC', duration: 5500 },
  { id: 'writer',     icon: FileText,     label: 'Writer Agent',       sublabel: 'Drafting report',        detail: 'Generating a structured report: Introduction, Key Findings, Conclusion.',   color: '#C2C9CC', duration: 5000 },
  { id: 'critic',     icon: Star,         label: 'Critic Agent',       sublabel: 'Quality check',          detail: 'Scoring quality 0–10. Triggers a rewrite if score is below 8.0.',           color: '#C2C9CC', duration: 4000 },
];


/* ─── StarField Component ────────────────────────────── */
function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.04 + 0.01,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      
      stars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

/* ─── Prism Logo Component ───────────────────────────── */
function PrismLogo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <defs>
        {/* Shading gradients for glass effect */}
        <linearGradient id="glass-left" x1="13" y1="5" x2="17" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <linearGradient id="glass-right" x1="17" y1="11" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id="glass-top" x1="13" y1="5" x2="17" y2="11" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
        
        {/* Rainbow spectrum gradient */}
        <linearGradient id="rainbow-spectrum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff453a" />
          <stop offset="20%" stopColor="#ff9f0a" />
          <stop offset="40%" stopColor="#ffd60a" />
          <stop offset="60%" stopColor="#30d158" />
          <stop offset="80%" stopColor="#0a84ff" />
          <stop offset="100%" stopColor="#bf5af2" />
        </linearGradient>
      </defs>

      {/* 1. Ground Shadow under the prism base */}
      <ellipse cx="17" cy="25" rx="5" ry="1.2" fill="rgba(0,0,0,0.45)" />

      {/* 2. Dispersed Rainbow Beam (emerging from left face Y=17) */}
      <polygon points="15.2,17.2 2,10 2,22" fill="url(#rainbow-spectrum)" opacity="0.85" />
      
      {/* 3. Reflected/refracted faint white rays on the left */}
      <polygon points="15.2,17.2 2,23 2,21.5" fill="rgba(255,255,255,0.12)" />

      {/* 4. Incoming White Light Ray (hitting right face at Y=19) */}
      <line x1="29" y1="21.5" x2="19" y2="19" stroke="#EDEFF0" strokeWidth="0.8" strokeLinecap="round" />
      
      {/* 5. Refracted White Ray inside the glass */}
      <line x1="19" y1="19" x2="15.2" y2="17.2" stroke="#EDEFF0" strokeWidth="0.5" opacity="0.75" />

      {/* 6. Outgoing Straight Light Ray (continuation of reflection) */}
      <line x1="19" y1="19" x2="26" y2="9" stroke="#EDEFF0" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />

      {/* 7. 3D Glass Prism Structure */}
      {/* Left Face */}
      <polygon points="13,5 17,11 17,26 13,21" fill="url(#glass-left)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" strokeLinejoin="round" />
      {/* Right Face */}
      <polygon points="21,6 17,11 17,26 21,22" fill="url(#glass-right)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" strokeLinejoin="round" />
      {/* Top Face */}
      <polygon points="13,5 21,6 17,11" fill="url(#glass-top)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" strokeLinejoin="round" />

      {/* Specular Highlight on front-center edge */}
      <line x1="17" y1="11" x2="17" y2="26" stroke="#EDEFF0" strokeWidth="0.65" opacity="0.85" />
    </svg>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ─── Pipeline Node ───────────────────────────────────── */
function PipelineNode({ node, status, isLast }) {
  const Icon = node.icon;
  const isActive = status === 'active';
  const isDone   = status === 'done';
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{
        display:'flex', alignItems:'center', gap:10, padding:'7px 11px',
        borderRadius:8, width:'100%', transition:'all 0.4s ease',
        background: isActive ? `rgba(${hexToRgb(node.color)},0.1)` : isDone ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
        border:`1px solid ${isActive ? node.color+'50' : isDone ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)'}`,
        boxShadow: isActive ? `0 0 18px ${node.color}18` : 'none',
      }}>
        <div style={{
          width:28, height:28, borderRadius:6, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center',
          background: isDone ? 'rgba(194, 201, 204, 0.12)' : isActive ? `rgba(${hexToRgb(node.color)},0.18)` : 'rgba(255,255,255,0.04)',
          border:`1px solid ${isDone ? 'rgba(194, 201, 204, 0.25)' : isActive ? node.color+'35' : 'rgba(255,255,255,0.04)'}`,
          transition:'all 0.4s',
        }}>
          {isDone   ? <CheckCircle2 size={13} color="#C2C9CC" />
           : isActive ? <Loader2 size={13} color={node.color} style={{animation:'spin 1s linear infinite'}} />
           : <Icon size={13} color="rgba(255,255,255,0.2)" />}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:'11.5px',fontWeight:500,color:isActive?'#f1f5f9':isDone?'#7B8285':'#595F61',transition:'color 0.4s'}}>{node.label}</div>
          <div style={{fontSize:'10px',color:isActive?node.color:'#383B3D',marginTop:1,transition:'color 0.4s',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            {isActive ? node.detail : node.sublabel}
          </div>
        </div>
        <div style={{width:5,height:5,borderRadius:99,flexShrink:0,transition:'all 0.4s',
          background:isDone?'#C2C9CC':isActive?node.color:'#0f172a',
          boxShadow:isActive?`0 0 8px ${node.color}`:'none',
          animation:isActive?'pulse-dot 1.4s ease-in-out infinite':'none'
        }}/>
      </div>
      {!isLast && <div style={{width:1,height:4,background:isDone?'#383B3D':'rgba(255,255,255,0.03)',transition:'background 0.4s'}}/>}
    </div>
  );
}

/* ─── Message bubble ──────────────────────────────────── */
/* ─── Markdown Renderer ────────────────────────────────── */
function MarkdownRenderer({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  let inList = false;
  let inCodeBlock = false;
  let codeBlockLines = [];
  const elements = [];

  const parseInline = (str) => {
    const parts = [];
    let currentIdx = 0;
    const regex = /\*\*([^*]+)\*\*|`([^`]+)`/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > currentIdx) {
        parts.push(str.slice(currentIdx, match.index));
      }
      if (match[1]) {
        parts.push(<strong key={match.index} style={{ color: '#EDEFF0', fontWeight: 600 }}>{match[1]}</strong>);
      } else if (match[2]) {
        parts.push(
          <code key={match.index} style={{
            background: 'rgba(255,255,255,0.06)',
            padding: '2px 5px',
            borderRadius: 4,
            fontSize: '90%',
            fontFamily: 'monospace',
            color: '#EDEFF0',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>{match[2]}</code>
        );
      }
      currentIdx = regex.lastIndex;
    }

    if (currentIdx < str.length) {
      parts.push(str.slice(currentIdx));
    }

    return parts.length > 0 ? parts : str;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <pre key={`code-${i}`} style={{
            background: '#191B1C',
            border: '1px solid #383B3D',
            padding: 10,
            borderRadius: 6,
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#EDEFF0',
            marginTop: 6,
            marginBottom: 6,
          }}>
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        );
        codeBlockLines = [];
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(lines[i]);
      continue;
    }

    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      i--;

      if (tableLines.length > 0) {
        const rows = tableLines.map(tl => tl.split('|').map(cell => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1));
        const hasHeaderDivider = rows[1] && rows[1].every(cell => cell.startsWith('-') || cell === '');
        const headerRow = rows[0];
        const bodyRows = hasHeaderDivider ? rows.slice(2) : rows.slice(1);

        elements.push(
          <div key={`table-${i}`} style={{ overflowX: 'auto', marginTop: 10, marginBottom: 10 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left', border: '1px solid #383B3D', fontFamily: 'Inter, sans-serif' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #383B3D', background: 'rgba(255,255,255,0.02)' }}>
                  {headerRow.map((col, idx) => (
                    <th key={idx} style={{ padding: '6px 8px', color: '#EDEFF0', fontWeight: 600 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '6px 8px', color: '#C2C9CC' }}>{parseInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (line.startsWith('####')) {
      elements.push(<h5 key={i} style={{ color: '#EDEFF0', fontWeight: 600, fontSize: '12px', marginTop: 10, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{parseInline(line.slice(4).trim())}</h5>);
      continue;
    }
    if (line.startsWith('###')) {
      elements.push(<h4 key={i} style={{ color: '#EDEFF0', fontWeight: 600, fontSize: '13px', marginTop: 12, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>{parseInline(line.slice(3).trim())}</h4>);
      continue;
    }
    if (line.startsWith('##')) {
      elements.push(<h3 key={i} style={{ color: '#EDEFF0', fontWeight: 600, fontSize: '14px', marginTop: 14, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{parseInline(line.slice(2).trim())}</h3>);
      continue;
    }
    if (line.startsWith('#')) {
      elements.push(<h2 key={i} style={{ color: '#EDEFF0', fontWeight: 600, fontSize: '16px', marginTop: 16, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{parseInline(line.slice(1).trim())}</h2>);
      continue;
    }

    if (line === '---' || line === '***') {
      elements.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid #383B3D', margin: '12px 0' }} />);
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        inList = true;
      }
      elements.push(
        <li key={i} style={{ marginLeft: 14, listStyleType: 'disc', color: '#C2C9CC', marginBottom: 4, lineHeight: 1.6, fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
          {parseInline(line.slice(2))}
        </li>
      );
      continue;
    }

    if (line !== '') {
      inList = false;
      elements.push(
        <p key={i} style={{ margin: '0 0 8px 0', lineHeight: 1.6, color: '#C2C9CC', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
          {parseInline(lines[i])}
        </p>
      );
    } else {
      inList = false;
    }
  }

  return <div>{elements}</div>;
}

/* ─── Message bubble ──────────────────────────────────── */
function Message({ msg }) {
  if (msg.type === 'user') return (
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:14}}>
      <div style={{maxWidth:'72%',padding:'11px 16px',borderRadius:'16px 16px 3px 16px',background:'rgba(56, 59, 61, 0.8)',border:'1px solid #595F61',color:'#EDEFF0',fontSize:14,lineHeight:1.5}}>{msg.text}</div>
    </div>
  );
  if (msg.type === 'chat') return (
    <div style={{display:'flex',justifyContent:'flex-start',marginBottom:14,gap:10}}>
      <div style={{width:28,height:28,borderRadius:99,flexShrink:0,background:'linear-gradient(135deg,#C2C9CC,#7B8285)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Brain size={13} color="#191B1C"/>
      </div>
      <div style={{maxWidth:'72%',padding:'11px 16px',borderRadius:'3px 16px 16px 16px',background:'rgba(56,59,61,0.25)',border:'1px solid #383B3D',fontSize:14,lineHeight:1.6,color:'#cbd5e1'}}>
        <MarkdownRenderer text={msg.text} />
      </div>
    </div>
  );
  if (msg.type === 'report') {
    const handleDownload = () => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const blob = new Blob([msg.text], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `research-report-${timestamp}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };
    return (
      <div style={{display:'flex',justifyContent:'flex-start',marginBottom:16}}>
        <div style={{maxWidth:'92%',padding:'18px 20px',borderRadius:'3px 16px 16px 16px',background:'rgba(25, 27, 28, 0.85)',border:'1px solid #383B3D',backdropFilter:'blur(20px)'}}>
          {/* Header row */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',gap:7,color:'#EDEFF0',fontSize:10,letterSpacing:2,textTransform:'uppercase',fontFamily:'monospace'}}>
              <CheckCircle2 size={12}/> Research Complete
            </div>
            <button onClick={handleDownload} title="Download report" style={{
              display:'flex',alignItems:'center',gap:6,padding:'5px 12px',borderRadius:8,
              background:'rgba(194, 201, 204, 0.1)',border:'1px solid rgba(194, 201, 204, 0.2)',
              color:'#C2C9CC',fontSize:11,cursor:'pointer',fontWeight:500,
              transition:'all 0.2s',
            }}>
              <Download size={12}/> Download
            </button>
          </div>
          {/* Scrollable report body */}
          <div style={{
            fontSize:'13px',color:'#C2C9CC',lineHeight:1.7,whiteSpace:'pre-wrap',
            maxHeight:380,overflowY:'auto',
            paddingRight:8,
            scrollbarWidth:'thin',
            scrollbarColor:'#383B3D transparent',
          }}>
            <MarkdownRenderer text={msg.text} />
          </div>
        </div>
      </div>
    );
  }
  if (msg.type === 'error') return (
    <div style={{display:'flex',justifyContent:'flex-start',marginBottom:12}}>
      <div style={{padding:'10px 14px',borderRadius:'3px 14px 14px 14px',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',color:'#fca5a5',fontSize:13}}>{msg.text}</div>
    </div>
  );
  return null;
}

/* ─── Auth Screen ─────────────────────────────────────── */
function AuthScreen({ onAuth }) {
  const [mode, setMode]         = useState('login'); // 'login' | 'signup'
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  // Simple local auth (no backend needed for demo)
  const USERS_KEY = 'agi_users';
  const getUsers  = () => JSON.parse(localStorage.getItem(USERS_KEY) || '{}');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate network

    const users = getUsers();

    if (mode === 'signup') {
      if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return; }
      if (!email.includes('@')) { setError('Please enter a valid email.'); setLoading(false); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
      if (users[email]) { setError('An account with this email already exists.'); setLoading(false); return; }
      users[email] = { name, password };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem('agi_user', JSON.stringify({ name, email }));
      onAuth({ name, email });
    } else {
      if (!users[email] || users[email].password !== password) {
        setError('Invalid email or password.'); setLoading(false); return;
      }
      localStorage.setItem('agi_user', JSON.stringify({ name: users[email].name, email }));
      onAuth({ name: users[email].name, email });
    }
    setLoading(false);
  };

  return (
    <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'transparent',fontFamily:'Inter, sans-serif',position:'relative',overflow:'hidden'}}>
      {/* Starfield bg */}
      <StarField />

      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:360,padding:'0 20px'}}>
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:20}}>
          <div style={{width:42,height:42,borderRadius:10,background:'rgba(25, 27, 28, 0.75)',border:'1px solid #383B3D',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
            <PrismLogo size={24} />
          </div>
          <h1 style={{fontSize:'22px',fontWeight:600,fontFamily:'Space Grotesk, sans-serif',marginBottom:4,color:'#EDEFF0'}}>Prism</h1>
          <p style={{color:'#9BA3A8',fontSize:'12px'}}>{mode==='signup' ? 'Create your account to get started' : 'Sign in to your account'}</p>
        </div>

        {/* Card */}
        <div style={{background:'rgba(25, 27, 28, 0.85)',backdropFilter:'blur(24px)',border:'1px solid #383B3D',borderRadius:12,padding:'20px 20px'}}>
          {/* Toggle */}
          <div style={{display:'flex',background:'rgba(255,255,255,0.02)',borderRadius:8,padding:3,marginBottom:16,border:'1px solid rgba(255,255,255,0.03)'}}>
            {['login','signup'].map(m => (
              <button key={m} onClick={()=>{setMode(m);setError('');}} style={{flex:1,padding:'5px',borderRadius:6,border:'none',cursor:'pointer',fontSize:'11.5px',fontWeight:500,transition:'all 0.2s',
                background:mode===m?'rgba(194,201,204,0.12)':'transparent',
                color:mode===m?'#EDEFF0':'#7B8285',
                boxShadow:mode===m?'0 0 12px rgba(194,201,204,0.08)':'none'
              }}>{m==='login'?'Sign In':'Sign Up'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:10}}>
            {mode==='signup' && (
              <div style={{position:'relative'}}>
                <User size={13} color="#7B8285" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}/>
                <input type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}
                  style={{width:'100%',padding:'8px 10px 8px 30px',background:'rgba(25,27,28,0.6)',border:'1px solid #383B3D',borderRadius:7,color:'#EDEFF0',fontSize:'12px',outline:'none',boxSizing:'border-box'}}/>
              </div>
            )}
            <div style={{position:'relative'}}>
              <Mail size={13} color="#7B8285" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}/>
              <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}
                style={{width:'100%',padding:'8px 10px 8px 30px',background:'rgba(2,6,23,0.6)',border:'1px solid #383B3D',borderRadius:7,color:'#EDEFF0',fontSize:'12px',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{position:'relative'}}>
              <Lock size={13} color="#7B8285" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}/>
              <input type={show?'text':'password'} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
                style={{width:'100%',padding:'8px 32px 8px 30px',background:'rgba(2,6,23,0.6)',border:'1px solid #383B3D',borderRadius:7,color:'#EDEFF0',fontSize:'12px',outline:'none',boxSizing:'border-box'}}/>
              <button type="button" onClick={()=>setShow(!show)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#7B8285',padding:2}}>
                {show ? <EyeOff size={13}/> : <Eye size={13}/>}
              </button>
            </div>

            {error && <div style={{fontSize:'11.5px',color:'#fca5a5',padding:'6px 10px',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:6}}>{error}</div>}

            <button type="submit" disabled={loading} style={{
              padding:'9px',borderRadius:7,border:'none',cursor:loading?'default':'pointer',
              background:'#EDEFF0',color:'#191B1C',fontWeight:600,fontSize:'12.5px',
              display:'flex',alignItems:'center',justifyContent:'center',gap:6,
              opacity:loading?0.7:1, transition:'opacity 0.2s',
              boxShadow:'0 0 20px rgba(237, 239, 240, 0.1)',
            }}>
              {loading ? <Loader2 size={13} style={{animation:'spin 1s linear infinite'}}/> : null}
              {loading ? 'Please wait...' : mode==='signup' ? 'Create Account' : 'Sign In'}
              {!loading && <ArrowRight size={13}/>}
            </button>
          </form>
        </div>

        <p style={{textAlign:'center',color:'#7B8285',fontSize:'11px',marginTop:14}}>
          By continuing you agree to our Terms of Service
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        input::placeholder { color:#7B8285 !important; }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}

/* ─── Main Research App ───────────────────────────────── */
function ResearchApp({ user, onLogout }) {
  const [query, setQuery]         = useState('');
  const [threads, setThreads]     = useState(() => {
    try {
      const saved = localStorage.getItem(`agi_threads_${user.email}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeThreadId, setActiveThreadId] = useState(() => {
    try {
      const saved = localStorage.getItem(`agi_active_thread_id_${user.email}`);
      return saved || null;
    } catch {
      return null;
    }
  });

  const [nodeStates, setNodeStates] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(260);
  const [rightPanelWidth, setRightPanelWidth] = useState(280);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const chatEndRef  = useRef(null);
  const timerRefs   = useRef([]);
  const textareaRef = useRef(null);
  const isResizingRef = useRef(false);
  const isResizingLeftRef = useRef(false);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;
  const messages = activeThread ? activeThread.messages : [];
  const hasStarted = messages.length > 0;

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const clearTimers = () => { timerRefs.current.forEach(clearTimeout); timerRefs.current = []; };

  // Save threads when updated
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`agi_threads_${user.email}`, JSON.stringify(threads));
    }
  }, [threads, user]);

  // Save active thread ID
  useEffect(() => {
    if (user && user.email) {
      if (activeThreadId) {
        localStorage.setItem(`agi_active_thread_id_${user.email}`, activeThreadId);
      } else {
        localStorage.removeItem(`agi_active_thread_id_${user.email}`);
      }
    }
  }, [activeThreadId, user]);

  const handleNewChat = () => {
    clearTimers();
    const newId = 'thread_' + Date.now();
    const newThread = {
      id: newId,
      title: 'New Research Session',
      messages: [],
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newId);
    setNodeStates({});
  };

  // Initialize a default thread if empty
  useEffect(() => {
    if (threads.length === 0) {
      handleNewChat();
    } else if (!activeThreadId) {
      setActiveThreadId(threads[0].id);
    }
  }, [threads, activeThreadId]);

  const handleDeleteThread = (threadId, e) => {
    if (e) e.stopPropagation();
    const filtered = threads.filter(t => t.id !== threadId);
    setThreads(filtered);
    if (activeThreadId === threadId) {
      if (filtered.length > 0) {
        setActiveThreadId(filtered[0].id);
      } else {
        setActiveThreadId(null);
      }
    }
  };

  const startResizing = (e) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizingRef.current) return;
    const newWidth = window.innerWidth - e.clientX;
    const maxRight = window.innerWidth - leftPanelWidth - 360;
    if (newWidth > 200 && newWidth < Math.min(500, maxRight)) {
      setRightPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const startResizingLeft = (e) => {
    e.preventDefault();
    isResizingLeftRef.current = true;
    document.addEventListener('mousemove', handleMouseMoveLeft);
    document.addEventListener('mouseup', handleMouseUpLeft);
  };

  const handleMouseMoveLeft = (e) => {
    if (!isResizingLeftRef.current) return;
    const newWidth = e.clientX;
    const activeRight = isRightPanelOpen ? rightPanelWidth : 0;
    const maxLeft = window.innerWidth - activeRight - 360;
    if (newWidth > 180 && newWidth < Math.min(450, maxLeft)) {
      setLeftPanelWidth(newWidth);
    }
  };

  const handleMouseUpLeft = () => {
    isResizingLeftRef.current = false;
    document.removeEventListener('mousemove', handleMouseMoveLeft);
    document.removeEventListener('mouseup', handleMouseUpLeft);
  };

  const runPipeline = async (q) => {
    if (!q.trim() || isRunning) return;
    clearTimers();
    setIsRunning(true);
    setNodeStates({});

    let currentThreadId = activeThreadId;
    if (!currentThreadId) return;

    // Add query and update title if it's default
    setThreads(prev => prev.map(t => {
      if (t.id === currentThreadId) {
        const newTitle = t.title === 'New Research Session' ? (q.length > 26 ? q.slice(0, 26) + '...' : q) : t.title;
        return {
          ...t,
          title: newTitle,
          messages: [...t.messages, { id: Date.now(), type: 'user', text: q }]
        };
      }
      return t;
    }));

    // Animate nodes sequentially
    let elapsed = 0;
    NODES.forEach((node) => {
      const startDelay = elapsed;
      const endDelay   = elapsed + node.duration;
      timerRefs.current.push(setTimeout(() => setNodeStates(p => ({...p,[node.id]:'active'})), startDelay));
      timerRefs.current.push(setTimeout(() => setNodeStates(p => ({...p,[node.id]:'done'})), endDelay - 300));
      elapsed = endDelay;
    });

    try {
      const res  = await fetch('/api/research', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ query: q }),
      });
      const data = await res.json();
      clearTimers();
      setNodeStates(Object.fromEntries(NODES.map(n => [n.id,'done'])));
      const isResearch = data.intent === 'RESEARCH';

      setThreads(prev => prev.map(t => {
        if (t.id === currentThreadId) {
          return {
            ...t,
            messages: [...t.messages, {
              id: Date.now(),
              type: isResearch ? 'report' : 'chat',
              text: data.result || 'No response generated.',
            }]
          };
        }
        return t;
      }));
      if (!isResearch) setNodeStates({});
    } catch {
      clearTimers();
      setNodeStates({});
      setThreads(prev => prev.map(t => {
        if (t.id === currentThreadId) {
          return {
            ...t,
            messages: [...t.messages, { id:Date.now(), type:'error', text:'Could not reach the research backend. Please ensure the Flask server is running.' }]
          };
        }
        return t;
      }));
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setQuery('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    runPipeline(q);
  };

  const suggestions = [
    'Impact of NVIDIA Blackwell on agentic AI systems',
    'Latest breakthroughs in quantum computing 2026',
    'Future of autonomous vehicles and self-driving tech',
  ];

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'transparent',color:'white',fontFamily:'Inter, sans-serif',overflow:'hidden',position:'relative'}}>
      {/* Warp bg */}
      <div style={{position:'absolute',inset:0,opacity:0.06,pointerEvents:'none'}}>
        <Warp style={{width:'100%',height:'100%'}} proportion={0.45} softness={1} distortion={0.3} swirl={0.6} swirlIterations={8} shape="checks" shapeScale={0.15} speed={0.4} colors={['hsl(200,100%,20%)','hsl(160,100%,75%)','hsl(180,90%,30%)','hsl(170,100%,80%)']}/>
      </div>

      {/* Navbar */}
      <nav style={{flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',height:42,background:'rgba(25, 27, 28, 0.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid #383B3D',zIndex:10,position:'relative'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:24,height:24,borderRadius:6,background:'rgba(25, 27, 28, 0.75)',border:'1px solid #383B3D',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <PrismLogo size={14} />
          </div>
          <span style={{fontWeight:600,fontSize:'12.5px',fontFamily:'Space Grotesk, sans-serif',color:'#EDEFF0'}}>Prism</span>
          <span style={{fontSize:'8px',padding:'1.5px 6px',borderRadius:99,background:'rgba(194,201,204,0.1)',border:'1px solid rgba(194,201,204,0.2)',color:'#C2C9CC',letterSpacing:1.5,textTransform:'uppercase'}}>Multi-Agent</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{display:'flex',alignItems:'center',gap:5}}>
            <div style={{width:5,height:5,borderRadius:99,background:isRunning?'#9BA3A8':'#EDEFF0',boxShadow:isRunning?'0 0 7px #9BA3A8':'0 0 7px #EDEFF0',animation:isRunning?'pulse-dot 1.2s ease-in-out infinite':'none'}}/>
            <span style={{fontSize:'11px',color:'#7B8285'}}>{isRunning?'Processing':'Ready'}</span>
          </div>
          <div style={{height:14,width:1,background:'rgba(255,255,255,0.06)'}}/>
          {/* Toggle Pipeline Button */}
          <button onClick={() => setIsRightPanelOpen(!isRightPanelOpen)} style={{
            background:'none',border:'1px solid #383B3D',borderRadius:5,padding:'4px 8px',
            cursor:'pointer',color:'#C2C9CC',fontSize:'11px',display:'flex',alignItems:'center',gap:5,transition:'all 0.2s'
          }}>
            {isRightPanelOpen ? <PanelRightClose size={11}/> : <PanelRight size={11}/>}
            {isRightPanelOpen ? 'Hide Pipeline' : 'Show Pipeline'}
          </button>
        </div>
      </nav>

      {/* Body */}
      <div style={{flex:1,display:'flex',overflow:'hidden',position:'relative',zIndex:1}}>

        {/* Left Side: Resizable Sidebar (New Chat & History) */}
        <div style={{
          display:'flex', position:'relative', height:'100%', flexShrink:0,
          width: leftPanelWidth,
        }}>
          <div style={{
            flex:1, height:'100%',
            background:'rgba(25, 27, 28, 0.55)', backdropFilter:'blur(20px)',
            padding:'18px 12px', display:'flex', flexDirection:'column', gap:0,
          }}>
            {/* New Chat Button */}
            <button onClick={handleNewChat} style={{
              width:'100%', padding:'7px 9px', borderRadius:8,
              background:'rgba(194, 201, 204, 0.08)',
              border:'1px solid rgba(194, 201, 204, 0.2)',
              color:'#EDEFF0', fontWeight:500, fontSize:'12px', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              transition:'all 0.2s', marginBottom:12
            }}>
              <Plus size={14}/> New Research Chat
            </button>

            {/* History list */}
            <div style={{fontSize:9,color:'#7B8285',letterSpacing:3,textTransform:'uppercase',paddingLeft:4,marginBottom:6}}>History</div>
            <div style={{flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4, paddingRight:2}}>
              {threads.map(t => (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  style={{
                    padding:'6px 9px', borderRadius:7, cursor:'pointer',
                    background: activeThreadId === t.id ? 'rgba(194,201,204,0.06)' : 'transparent',
                    border: `1px solid ${activeThreadId === t.id ? '#383B3D' : 'transparent'}`,
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    transition:'all 0.2s'
                  }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:7,minWidth:0,flex:1}}>
                    <MessageSquare size={12} color={activeThreadId === t.id ? '#C2C9CC' : 'rgba(255,255,255,0.15)'}/>
                    <span style={{
                      fontSize:'11.5px', color: activeThreadId === t.id ? '#EDEFF0' : '#7B8285',
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                      fontWeight: activeThreadId === t.id ? 500 : 400
                    }}>{t.title}</span>
                  </div>
                  <button
                    onClick={(e) => handleDeleteThread(t.id, e)}
                    title="Delete session"
                    style={{
                      background:'none', border:'none', cursor:'pointer',
                      color: 'rgba(255,255,255,0.15)', padding: 2,
                      display: 'flex', alignItems: 'center', transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}
                  >
                    <Trash2 size={11}/>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer User Info & Logout */}
            <div style={{marginTop:'auto', paddingTop:8, borderTop:'1px solid #383B3D', display:'flex', alignItems:'center', justifyBetween:'none', justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,minWidth:0,flex:1}}>
                <div style={{width:22,height:22,borderRadius:99,background:'linear-gradient(135deg,#9BA3A8,#383B3D)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9.5px',fontWeight:600,flexShrink:0,color:'#EDEFF0'}}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{fontSize:'11px',color:'#9BA3A8',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.name}</span>
              </div>
              <button onClick={onLogout} title="Logout" style={{background:'none',border:'1px solid #383B3D',borderRadius:5,padding:'4px 6px',cursor:'pointer',color:'#7B8285',display:'flex',alignItems:'center'}}>
                <LogOut size={11}/>
              </button>
            </div>
          </div>

          {/* Left Drag Handle */}
          <div
            onMouseDown={startResizingLeft}
            style={{
              width: 4, height: '100%', cursor: 'col-resize',
              background: 'rgba(255,255,255,0.02)',
              borderRight: '1px solid #383B3D',
              position: 'absolute', right: 0, top: 0, zIndex: 10,
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(194, 201, 204, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          />
        </div>

        {/* Center: Chat Interface */}
        <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
          <div style={{flex:1, overflowY:'auto', padding:'12px 18px'}}>
            {!hasStarted ? (
              <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,textAlign:'center'}}>
                <div style={{width:48,height:48,borderRadius:12,background:'linear-gradient(135deg,rgba(194,201,204,0.15),rgba(91,95,97,0.15))',border:'1px solid rgba(194,201,204,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <MessageSquare size={22} color="#C2C9CC"/>
                </div>
                <div>
                  <h2 style={{fontSize:'22px',fontWeight:400,fontFamily:'Space Grotesk, sans-serif',marginBottom:8,background:'linear-gradient(135deg,#EDEFF0,#9BA3A8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                    What would you like to research, {user.name.split(' ')[0]}?
                  </h2>
                  <p style={{color:'#C2C9CC',fontSize:'12.5px',maxWidth:440,margin:'0 auto',lineHeight:1.5}}>
                    Seven specialized AI agents will search, rank, scrape, summarize and write a verified report for you.
                  </p>
                </div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center',maxWidth:480}}>
                  {suggestions.map(s=>(
                    <button key={s} onClick={()=>runPipeline(s)} style={{padding:'6px 12px',borderRadius:99,cursor:'pointer',background:'rgba(194, 201, 204, 0.04)',border:'1px solid #383B3D',color:'#9BA3A8',fontSize:'11px',transition:'all 0.2s'}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map(msg=><Message key={msg.id} msg={msg}/>)}
                {isRunning && (
                  <div style={{display:'flex',justifyContent:'flex-start',marginBottom:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,padding:'5px 10px',borderRadius:99,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.05)',fontSize:'11px',color:'#7B8285'}}>
                      <Loader2 size={11} color="#C2C9CC" style={{animation:'spin 1s linear infinite'}}/>
                      Agents are working...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}/>
              </>
            )}
          </div>

          {/* Input bar */}
          <div style={{flexShrink:0,padding:'8px 18px 8px',background:'linear-gradient(to top, #191B1C 60%, transparent)'}}>
            <form onSubmit={handleSubmit} style={{display:'flex',alignItems:'flex-end',gap:8,padding:'8px 10px',background:'rgba(25, 27, 28, 0.85)',backdropFilter:'blur(20px)',border:'1px solid #383B3D',borderRadius:10,boxShadow:'0 0 40px rgba(0,0,0,0.5)'}}>
              <textarea ref={textareaRef} rows={1} value={query}
                onChange={e=>{setQuery(e.target.value);e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,120)+'px';}}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSubmit(e);}}}
                placeholder="Ask a research question... (Enter to send)"
                readOnly={isRunning}
                style={{flex:1,background:'transparent',border:'none',outline:'none',color:'#EDEFF0',fontSize:'12px',resize:'none',lineHeight:1.5,fontFamily:'Inter, sans-serif',minHeight:18,maxHeight:120,opacity:isRunning?0.5:1}}
              />
              <button type="submit" disabled={isRunning||!query.trim()} style={{width:28,height:28,borderRadius:6,flexShrink:0,border:'none',cursor:isRunning||!query.trim()?'default':'pointer',background:isRunning||!query.trim()?'rgba(255,255,255,0.02)':'#EDEFF0',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s',boxShadow:!isRunning&&query.trim()?'0 0 14px rgba(237, 239, 240, 0.15)':'none'}}>
                {isRunning ? <Loader2 size={11} color="rgba(255,255,255,0.25)" style={{animation:'spin 1s linear infinite'}}/> : <Send size={11} color={query.trim()?'#191B1C':'rgba(255,255,255,0.15)'}/>}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Resizable & Collapsible Pipeline Sidebar */}
        {isRightPanelOpen && (
          <div style={{
            display:'flex', position:'relative', height:'100%', flexShrink:0,
            width: rightPanelWidth,
          }}>
            {/* Drag Handle */}
            <div
              onMouseDown={startResizing}
              style={{
                width: 4, height: '100%', cursor: 'col-resize',
                background: 'rgba(255,255,255,0.02)',
                borderLeft: '1px solid #383B3D',
                position: 'absolute', left: 0, top: 0, zIndex: 10,
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(194, 201, 204, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            />

            {/* Panel Content */}
            <div style={{
              flex:1, height:'100%',
              background:'rgba(25, 27, 28, 0.55)', backdropFilter:'blur(20px)',
              padding:'18px 12px 18px 16px', overflowY:'auto',
              display:'flex', flexDirection:'column', gap:0,
            }}>
              <div style={{marginBottom:14,padding:'0 4px'}}>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                  <Cpu size={12} color="#7B8285"/>
                  <span style={{fontSize:9,color:'#7B8285',letterSpacing:3,textTransform:'uppercase'}}>Agent Pipeline</span>
                </div>
              </div>
              {NODES.map((node,i) => (
                <PipelineNode key={node.id} node={node} status={nodeStates[node.id]||'idle'} isLast={i===NODES.length-1}/>
              ))}
              {hasStarted && (
                <div style={{marginTop:18,padding:'12px',borderRadius:10,background:'rgba(255,255,255,0.01)',border:'1px solid #383B3D'}}>
                  <div style={{fontSize:9,color:'#9BA3A8',letterSpacing:3,textTransform:'uppercase',marginBottom:10}}>Session Statistics</div>
                  {[
                    {label:'Queries',val:messages.filter(m=>m.type==='user').length},
                    {label:'Reports',val:messages.filter(m=>m.type==='report').length},
                    {label:'Target Quality',val:'9.5 / 10'},
                  ].map(s=>(
                    <div key={s.label} style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:5}}>
                      <span style={{color:'#7B8285'}}>{s.label}</span>
                      <span style={{color:'#9BA3A8',fontFamily:'monospace'}}>{s.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #383B3D; border-radius: 2px; }
        textarea::placeholder { color: #7B8285; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}

/* ─── Root ────────────────────────────────────────────── */
export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('agi_user')); } catch { return null; }
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAuth   = (u) => setUser(u);
  const handleLogout = () => { localStorage.removeItem('agi_user'); setUser(null); };

  const hasUser = !!user;
  const baseBg = hasUser
    ? '#191B1C'
    : 'radial-gradient(circle at 50% 35%, #383B3D 0%, #191B1C 100%)';

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(194, 201, 204, 0.07), transparent 80%), ${baseBg}`,
      overflow: 'hidden',
    }}>
      {!user ? <AuthScreen onAuth={handleAuth} /> : <ResearchApp user={user} onLogout={handleLogout} />}
    </div>
  );
}
