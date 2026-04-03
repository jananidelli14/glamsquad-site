import { useState, useEffect, useRef } from "react";

const IMG = {
  hero:      "https://static.wixstatic.com/media/11062b_7d86337507fb4845822760f67de72339~mv2.jpg/v1/crop/x_1564,y_0,w_1872,h_3333/fill/w_600,h_900,al_c,q_80,enc_avif,quality_auto/manicure%20pedicure.jpg",
  threading: "https://static.wixstatic.com/media/11062b_b7ba265d477542c79a7779c17168760f~mv2.jpg/v1/crop/x_1635,y_0,w_4091,h_4912/fill/w_500,h_600,al_c,q_80,enc_avif,quality_auto/Eyebrow%20Threading.jpg",
  detan:     "https://static.wixstatic.com/media/11062b_d8e10d1a29194e44828298452026733e~mv2.jpg/v1/crop/x_0,y_122,w_1920,h_2305/fill/w_500,h_600,al_c,q_80,enc_avif,quality_auto/Before%20and%20After%20Skin.jpg",
  maniPedi:  "https://static.wixstatic.com/media/ad4c49_523146cedf7546bea3303f0388c4b886~mv2.jpg/v1/crop/x_6,y_0,w_824,h_990/fill/w_500,h_600,al_c,q_80,enc_avif,quality_auto/Screenshot%202023-04-07%20153152.jpg",
  waxing:    "https://static.wixstatic.com/media/ad4c49_a061d201a1c649f4b8e8e145cb62cce5~mv2.jpg/v1/crop/x_0,y_27,w_1080,h_1297/fill/w_500,h_600,al_c,q_80,enc_avif,quality_auto/Service%20Images%20(7).jpg",
  offer:     "https://static.wixstatic.com/media/ad4c49_f86d2f61c1c14bdaa82901726e3b44d7~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,enc_avif,quality_auto/May%202024%20%20Ads%20Ad%20Offer%20(17).jpg",
  salon:     "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
  g1:        "https://static.wixstatic.com/media/ad4c49_0d0c610162c8450483341a90f9962d88~mv2.jpeg/v1/fill/w_400,h_500,q_90,enc_avif,quality_auto/ad4c49_0d0c610162c8450483341a90f9962d88~mv2.jpeg",
  g2:        "https://static.wixstatic.com/media/ad4c49_7bc28e1d9e274c01a3239d536c1d5c85~mv2.jpeg/v1/fill/w_400,h_500,q_90,enc_avif,quality_auto/ad4c49_7bc28e1d9e274c01a3239d536c1d5c85~mv2.jpeg",
  g3:        "https://static.wixstatic.com/media/ad4c49_5216b222066440b582e9e3607d33b4cb~mv2.jpeg/v1/fill/w_400,h_500,q_90,enc_avif,quality_auto/ad4c49_5216b222066440b582e9e3607d33b4cb~mv2.jpeg",
  g4:        "https://static.wixstatic.com/media/ad4c49_4e234f8b944048a885f4261206eb3216~mv2.jpg/v1/fill/w_400,h_500,q_90,enc_avif,quality_auto/ad4c49_4e234f8b944048a885f4261206eb3216~mv2.jpg",
  g5:        "https://static.wixstatic.com/media/ad4c49_87b29650514f43dcb9b5f99ad173c440~mv2.jpeg/v1/fill/w_400,h_300,q_90,enc_avif,quality_auto/ad4c49_87b29650514f43dcb9b5f99ad173c440~mv2.jpeg",
  g6:        "https://static.wixstatic.com/media/ad4c49_622ba158b3374b25a629201d266b2d69~mv2.jpeg/v1/fill/w_400,h_300,q_90,enc_avif,quality_auto/ad4c49_622ba158b3374b25a629201d266b2d69~mv2.jpeg",
};

const WHATSAPP = "https://wa.me/911234567890";
const BOOKING  = "https://example.com/booking";
const CALL     = "tel:+911234567898";

/* colour tokens */
const C = {
  cream:"#FDF6F0", blush:"#F7E8DF", rose:"#E8C5B5",
  deepRose:"#C4806A", sage:"#7FAF82", mauve:"#9B7285",
  deepMauve:"#6B4A5C", text:"#3A2D2A", muted:"#8A7570",
  accent:"#D4956A", white:"#FFFCFA",
};

/* scroll reveal */
function useReveal(thresh = 0.13) {
  const r = useRef(null); const [v, sv] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { sv(true); o.disconnect(); } }, { threshold: thresh });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}
function Reveal({ children, delay=0, dir="up", style={} }) {
  const [r, v] = useReveal();
  const tx = dir==="left"?"translateX(-44px)":dir==="right"?"translateX(44px)":"translateY(36px)";
  return (
    <div ref={r} style={{ opacity:v?1:0, transform:v?"none":tx, transition:`opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:${C.cream};color:${C.text};overflow-x:hidden}
a{text-decoration:none}
img{display:block;max-width:100%}
@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fadeSlide{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes scaleIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
.ticker-wrap{overflow:hidden}
.ticker-track{display:flex;animation:ticker 30s linear infinite;white-space:nowrap}
.ticker-track:hover{animation-play-state:paused}
.btn-rose{display:inline-block;background:${C.deepRose};color:#fff;padding:16px 36px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;border:none;cursor:pointer;transition:all .3s ease}
.btn-rose:hover{background:${C.accent};transform:translateY(-3px);box-shadow:0 14px 34px rgba(196,128,106,.38)}
.btn-ghost{display:inline-block;background:transparent;color:${C.deepRose};padding:15px 34px;border-radius:50px;border:2px solid ${C.deepRose};font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .3s ease}
.btn-ghost:hover{background:${C.deepRose};color:#fff;transform:translateY(-3px)}
.btn-wa{display:inline-flex;align-items:center;gap:8px;background:#25d366;color:#fff;padding:16px 36px;border-radius:50px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;transition:all .3s ease}
.btn-wa:hover{background:#1ebe5d;transform:translateY(-3px);box-shadow:0 12px 30px rgba(37,211,102,.32)}
.pill{display:inline-block;background:${C.blush};color:${C.deepRose};padding:6px 16px;border-radius:50px;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;font-family:'DM Sans',sans-serif}
.svc-card{background:${C.white};border-radius:24px;overflow:hidden;cursor:pointer;transition:all .4s ease;border:1px solid rgba(232,197,181,.5);box-shadow:0 4px 20px rgba(196,128,106,.07)}
.svc-card:hover{box-shadow:0 22px 60px rgba(196,128,106,.2);transform:translateY(-7px)}
.svc-card:hover .svc-img{transform:scale(1.07)}
.svc-img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.trust-item{display:flex;gap:14px;align-items:flex-start;padding:14px 18px;background:${C.white};border-radius:14px;border:1px solid rgba(232,197,181,.5);transition:all .3s}
.trust-item:hover{border-color:${C.deepRose};box-shadow:0 8px 24px rgba(196,128,106,.12)}
.gal-item{border-radius:20px;overflow:hidden;background:${C.blush};position:relative;cursor:zoom-in}
.gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.gal-item:hover img{transform:scale(1.07)}
.gal-overlay{position:absolute;inset:0;background:rgba(196,128,106,.25);opacity:0;transition:opacity .3s;display:flex;align-items:center;justify-content:center}
.gal-item:hover .gal-overlay{opacity:1}
.faq-item{background:${C.white};border-radius:16px;border:1px solid rgba(232,197,181,.5);overflow:hidden;transition:border-color .3s}
.faq-item.open{border-color:${C.deepRose}}
@media(max-width:900px){.hero-grid,.why-grid{grid-template-columns:1fr!important}.hero-img-wrap{order:-1}.svc-grid{grid-template-columns:1fr 1fr!important}.gal-grid{grid-template-columns:1fr 1fr!important}.footer-grid{grid-template-columns:1fr!important;gap:40px!important}}
@media(max-width:580px){.svc-grid{grid-template-columns:1fr!important}.stats-row{flex-wrap:wrap!important;gap:28px!important}.cta-btns{flex-direction:column!important;align-items:stretch!important}.cta-btns a{text-align:center}}
.hide-m{display:flex}.show-m{display:none}
@media(max-width:768px){.hide-m{display:none!important}.show-m{display:flex!important}}
`;

/* ═══ NAV ═══ */
function Nav() {
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const navLinks = ["Services","Why Us","Gallery","Testimonials","FAQ","Contact"];

  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:900,
      background: sc?"rgba(253,246,240,.97)":"rgba(253,246,240,.3)",
      backdropFilter: sc?"blur(18px)":"blur(6px)",
      borderBottom: sc?`1px solid rgba(232,197,181,.5)`:"1px solid transparent",
      transition:"all .4s ease", padding: sc?"12px 0":"20px 0" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <a href="#" style={{ display:"flex",flexDirection:"column",lineHeight:1.1 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:C.deepRose,fontWeight:600 }}>GlowBeauty</span>
          <span style={{ fontSize:9,color:C.muted,letterSpacing:3.5,textTransform:"uppercase" }}>Premium Salon · Your City</span>
        </a>
        /* desktop */
<div className="hide-m" style={{ gap:32,alignItems:"center" }}>
  {navLinks.map(l => (
    <a key={l} href={`#${l.toLowerCase().replace(" ","-")}`}
      style={{ fontFamily:"'DM Sans'",fontSize:13,color:C.muted,letterSpacing:.3,transition:"color .2s" }}
      onMouseEnter={e=>(e.target.style.color=C.deepRose)}
      onMouseLeave={e=>(e.target.style.color=C.muted)}>{l}</a>
  ))}
  <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-rose" style={{ padding:"10px 24px",fontSize:12 }}>
    Book Demo
  </a>
</div>
{/* hamburger */}
<button onClick={()=>setMo(!mo)} className="show-m"
  style={{ background:"none",border:"none",cursor:"pointer",fontSize:26,color:C.deepRose,alignItems:"center" }}>
  {mo?"✕":"☰"}
</button>
</div>
{mo && (
  <div style={{ background:C.white,borderTop:`1px solid ${C.rose}50`,padding:"24px 28px",display:"flex",flexDirection:"column",gap:20,animation:"fadeSlide .3s ease" }}>
    {navLinks.map(l=>(
      <a key={l} href={`#${l.toLowerCase().replace(" ","-")}`} onClick={()=>setMo(false)}
        style={{ fontFamily:"'DM Sans'",fontSize:16,color:C.text }}>{l}</a>
    ))}
    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-rose" style={{ textAlign:"center" }}>
      Book Demo Appointment
    </a>
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ justifyContent:"center" }}>
      💬 WhatsApp
    </a>
  </div>
)}
</nav>
);
}

/* ═══ HERO ═══ */
function Hero() {
  const [ld, setLd] = useState(false);
  useEffect(()=>{ setTimeout(()=>setLd(true),80); },[]);
  return (
    <section style={{ minHeight:"100vh",background:`linear-gradient(140deg,${C.cream} 0%,${C.blush} 55%,#f2dcd8 100%)`,position:"relative",overflow:"hidden",display:"flex",alignItems:"center" }}>
      {/* background blobs */}
      <div style={{ position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:`${C.rose}22`,filter:"blur(70px)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:-80,left:-80,width:360,height:360,borderRadius:"50%",background:`${C.sage}18`,filter:"blur(60px)",pointerEvents:"none" }}/>
      {/* decorative floral */}
      <svg style={{ position:"absolute",top:80,left:"3%",opacity:.06,pointerEvents:"none" }} width="130" height="130" viewBox="0 0 130 130">
        {[0,60,120,180,240,300].map(r=><ellipse key={r} cx="65" cy="65" rx="11" ry="32" fill={C.deepRose} transform={`rotate(${r} 65 65)`}/>)}
        <circle cx="65" cy="65" r="9" fill={C.deepRose}/>
      </svg>
      <svg style={{ position:"absolute",bottom:80,right:"5%",opacity:.05,pointerEvents:"none" }} width="100" height="100" viewBox="0 0 100 100">
        {[0,45,90,135,180,225,270,315].map(r=><ellipse key={r} cx="50" cy="50" rx="7" ry="22" fill={C.mauve} transform={`rotate(${r} 50 50)`}/>)}
        <circle cx="50" cy="50" r="7" fill={C.mauve}/>
      </svg>

      <div style={{ maxWidth:1200,margin:"0 auto",padding:"110px 28px 60px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center" }} className="hero-grid">
       {/* LEFT */}
<div style={{ opacity:ld?1:0,transform:ld?"none":"translateY(28px)",transition:"all .9s ease" }}>
  <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:`rgba(196,128,106,.1)`,border:`1px solid rgba(196,128,106,.28)`,borderRadius:50,padding:"8px 18px",marginBottom:28 }}>
    <span style={{ fontSize:14 }}>✨</span>
    <span style={{ fontFamily:"'DM Sans'",fontSize:12,color:C.deepRose,letterSpacing:1.5,textTransform:"uppercase",fontWeight:500 }}>
      Demo Offer – ₹500 OFF First Service
    </span>
  </div>

  <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(48px,6.5vw,84px)",lineHeight:1.04,color:C.text,fontWeight:400,marginBottom:8 }}>
    smooth.<br/>
    <em style={{ color:C.deepRose,fontStyle:"italic" }}>polished.</em><br/>
    effortless.
  </h1>

  <p style={{ fontFamily:"'DM Sans'",fontSize:16,color:C.muted,lineHeight:1.7,margin:"22px 0 6px",fontWeight:300 }}>
    Beauty from just <strong style={{ color:C.deepRose,fontWeight:500 }}>₹999 only</strong>
  </p>

  <p style={{ fontFamily:"'DM Sans'",fontSize:15,color:C.muted,lineHeight:1.7,margin:"0 0 36px",fontWeight:300 }}>
    From brows to toes — experience precision care that feels as good as it looks.
  </p>

  <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:48 }} className="cta-btns">
    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-rose">
      Book Demo Appointment
    </a>
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-wa">
      💬 WhatsApp Us
    </a>
  </div>

  {/* stats */}
  <div style={{ display:"flex",gap:44 }} className="stats-row">
    {[["★ Demo","Sample Rating"],["1k+","Sample Clients"],["9AM–9PM","Sample Hours"]].map(([n,l])=>(
      <div key={l}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:C.deepRose,fontWeight:600,lineHeight:1 }}>{n}</div>
        <div style={{ fontFamily:"'DM Sans'",fontSize:11,color:C.muted,letterSpacing:1.5,textTransform:"uppercase",marginTop:4 }}>{l}</div>
      </div>
    ))}
  </div>
</div>

        {/* RIGHT */}
<div className="hero-img-wrap" style={{ position:"relative",opacity:ld?1:0,transform:ld?"none":"translateX(28px)",transition:"all 1.1s ease .2s" }}>
  <div style={{ borderRadius:"60% 40% 55% 45%/50% 45% 55% 50%",overflow:"hidden",aspectRatio:"3/4",background:C.rose,position:"relative" }}>
    <img src={IMG.hero} alt="Manicure Pedicure Service" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}/>
    <div style={{ position:"absolute",inset:0,background:`linear-gradient(to top,${C.deepRose}22 0%,transparent 55%)` }}/>
  </div>

  {/* floating cards */}
  <div style={{ position:"absolute",bottom:44,left:-32,background:C.white,borderRadius:18,padding:"14px 20px",boxShadow:"0 12px 40px rgba(196,128,106,.25)",animation:"floatUp 3s ease-in-out infinite" }}>
    <div style={{ fontFamily:"'DM Sans'",fontSize:11,color:C.muted,marginBottom:3 }}>⭐ Certified Therapists</div>
    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:C.deepRose,fontWeight:600 }}>1,000+ Happy Clients</div>
  </div>

  <div style={{ position:"absolute",top:28,right:-24,background:C.deepRose,borderRadius:14,padding:"10px 16px",color:"#fff",boxShadow:`0 8px 24px ${C.deepRose}55`,animation:"floatUp 3.5s ease-in-out infinite .5s" }}>
    <div style={{ fontFamily:"'DM Sans'",fontSize:11,letterSpacing:1 }}>Premium Salon</div>
    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600 }}>Demo Location</div>
  </div>
</div>
</div>
</section>
);
}

/* ═══ TRUST TICKER ═══ */
function TrustStrip() {
  const items = [
    "🧖‍♀️ Skin-safe premium products","📍 Premium salon location","⭐ Top-rated service",
    "🧼 Single-use consumables","🌟 Certified beauty therapists","✨ Trusted by many clients",
    "💅 For Men & Women","🕒 Flexible working hours",
  ];
  const all = [...items,...items];
  return (
    <div style={{ background:C.deepRose,padding:"13px 0",overflow:"hidden" }} className="ticker-wrap">
      <div className="ticker-track">
        {all.map((t,i)=>(
          <span key={i} style={{ fontFamily:"'DM Sans'",fontSize:13,color:"#fff",padding:"0 36px",display:"inline-block" }}>
            {t} <span style={{ opacity:.35,marginLeft:16 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ SERVICES ═══ */
const SVCS = [
  { emoji:"🌿",title:"Threading & Brows",tag:"Sculpted. Symmetrical. Natural.",
    desc:"Our brow experts shape with precision — no over-thinning, no harsh lines.",
    items:["Eyebrow & Upper Lip Threading","Full Face Threading","Precision Brow Shaping"],
    img:IMG.threading, col:C.sage, lc:"#E8F5EA" },
  { emoji:"☀️",title:"Bleaching & De-tan",tag:"Even-Toned. Fresh. Bright.",
    desc:"Gentle formulas lighten tan, refine texture, and restore natural radiance. Safe for sensitive skin.",
    items:["Face & Neck Bleach","Full Body Bleach","De-tan & Skin-Brightening Packs"],
    img:IMG.detan, col:C.accent, lc:"#FFF0E6" },
  { emoji:"💅",title:"Spa Mani & Pedicure",tag:"Care that shows. Relaxation that lasts.",
    desc:"Clean tools, softening soaks, thorough cuticle work, and glossy finishes — for men & women.",
    items:["Express & Spa Mani–Pedi","Cuticle Care, Scrub, Massage & Polish","Gel Polish (Add-on)"],
    img:IMG.maniPedi, col:C.mauve, lc:"#F7EDF5" },
  { emoji:"🌸",title:"Waxing & Body Polish",tag:"Smooth. Clean. Stress-free.",
    desc:"Premium waxes designed for Indian skin — gentle yet effective. For men & women.",
    items:["Premium Wax (Sensitive skin, Tan removal)","Liposoluble Wax","Full Body, Half Arms, Underarms & Legs","Bikini Waxing — Men & Women","Brazilian Waxing — Men & Women","Private Part Waxing — Men & Women"],
    img:IMG.waxing, col:C.deepRose, lc:"#FDEEE9" },
];

function SvcCard({ s, i }) {
  const [open,setOpen] = useState(false);
  const [r,v] = useReveal();
  return (
    <div ref={r} className="svc-card" onClick={()=>setOpen(!open)}
      style={{ opacity:v?1:0,transform:v?"none":"translateY(40px)",transitionDelay:`${i*.11}s`,transition:"opacity .7s ease, transform .7s ease, box-shadow .4s, border-color .3s, translateY .4s" }}>
      <div style={{ height:230,overflow:"hidden",position:"relative" }}>
        <img src={s.img} alt={s.title} className="svc-img"/>
        <div style={{ position:"absolute",inset:0,background:`linear-gradient(to top,${s.col}66 0%,transparent 60%)` }}/>
        <div style={{ position:"absolute",top:14,left:14,background:C.white,borderRadius:50,width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 4px 12px rgba(0,0,0,.1)" }}>{s.emoji}</div>
        <div style={{ position:"absolute",top:14,right:14,background:`${s.lc}ee`,color:s.col,padding:"4px 12px",borderRadius:50,fontSize:10,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'DM Sans'" }}>For All</div>
      </div>
      <div style={{ padding:"22px 22px 18px" }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:C.text,fontWeight:600,marginBottom:4 }}>{s.title}</h3>
        <p style={{ fontFamily:"'DM Sans'",fontSize:11,color:s.col,letterSpacing:1.5,textTransform:"uppercase",fontWeight:500,marginBottom:10 }}>{s.tag}</p>
        <p style={{ fontFamily:"'DM Sans'",fontSize:13,color:C.muted,lineHeight:1.6,fontWeight:300,marginBottom:14 }}>{s.desc}</p>
        <div style={{ maxHeight:open?400:0,overflow:"hidden",transition:"max-height .45s ease" }}>
          <div style={{ paddingTop:8,borderTop:`1px solid ${C.rose}40` }}>
            {s.items.map(it=>(
              <div key={it} style={{ display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:`1px solid ${C.cream}` }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:s.col,flexShrink:0 }}/>
                <span style={{ fontFamily:"'DM Sans'",fontSize:13,color:C.text,fontWeight:300 }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={e=>{e.stopPropagation();setOpen(!open);}}
          style={{ marginTop:12,background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans'",fontSize:12,color:s.col,letterSpacing:1.5,textTransform:"uppercase",fontWeight:500,display:"flex",alignItems:"center",gap:6,padding:0 }}>
          {open?"Show Less ↑":"View Services ↓"}
        </button>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ background:C.cream,padding:"100px 28px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center",marginBottom:60 }}>
            <span className="pill">What We Offer</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5vw,62px)",color:C.text,fontWeight:400,lineHeight:1.1,marginTop:14 }}>
              Luxe Skin &amp; Beauty<br/><em style={{ color:C.deepRose }}>Services</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans'",fontSize:15,color:C.muted,marginTop:14,fontWeight:300 }}>
              Starting ₹999 · For Men &amp; Women · Premium Salon
            </p>
          </div>
        </Reveal>
        <div className="svc-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
          {SVCS.map((s,i)=><SvcCard key={s.title} s={s} i={i}/>)}
        </div>

        {/* combos */}
        <Reveal delay={.2}>
          <div style={{ marginTop:52,background:`linear-gradient(135deg,${C.blush} 0%,${C.rose}38 100%)`,borderRadius:24,padding:"36px 44px",border:`1px solid ${C.rose}55` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:24 }}>
              <div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:C.text,fontWeight:600,marginBottom:6 }}>Popular Combo Packages</h3>
                <p style={{ fontFamily:"'DM Sans'",fontSize:14,color:C.muted,fontWeight:300 }}>✨ Ask about curated combos in-salon!</p>
              </div>
              <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
                {[
                  { icon:"💆‍♀️",label:"Glow Facial + Brows + Upper Lip" },
                  { icon:"🧴",label:"Body Waxing + Polishing + Tan Removal" },
                  { icon:"💅",label:"Full-face Threading + Light Makeup" },
                ].map(c=>(
                  <div key={c.label} style={{ background:C.white,borderRadius:12,padding:"12px 18px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 16px rgba(196,128,106,.1)" }}>
                    <span style={{ fontSize:18 }}>{c.icon}</span>
                    <span style={{ fontFamily:"'DM Sans'",fontSize:13,color:C.text }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ WHY US ═══ */
const BADGES = [
  { icon:"🧖‍♀️",title:"Skin-safe Products",desc:"Dermatologist-approved formulas for all skin types" },
  { icon:"📍",title:"Premium Location",desc:"Calm, comfortable space designed for relaxation" },
  { icon:"⭐",title:"Top-rated Service",desc:"Loved by clients for quality and consistency" },
  { icon:"🧼",title:"Strict Hygiene",desc:"Single-use consumables, sterilised tools every visit" },
  { icon:"🌟",title:"Expert Therapists",desc:"Certified & trained in advanced skin analysis" },
];

function WhyUs() {
  return (
    <section id="why-us" style={{ background:`linear-gradient(155deg,${C.blush} 0%,${C.cream} 100%)`,padding:"100px 28px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div className="why-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          {/* image col */}
          <Reveal dir="left">
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:32,overflow:"hidden",height:"100%",minHeight:"420px",position:"relative" }}>
                <img 
  src={IMG.salon} 
  alt="Salon Interior" 
  loading="lazy"
  style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }}
/>
                <div style={{ position:"absolute",inset:0,background:`linear-gradient(to top,${C.deepRose}22,transparent)` }}/>
              </div>
              <div style={{ position:"absolute",bottom:-28,right:-28,background:C.white,borderRadius:20,padding:18,boxShadow:"0 16px 48px rgba(196,128,106,.22)",maxWidth:200,animation:"floatUp 4s ease-in-out infinite" }}>
                <img src={IMG.offer} alt="Special Offer" style={{ width:"100%",borderRadius:12,marginBottom:10 }}/>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:C.deepRose,fontWeight:600 }}>Special Offers Available!</div>
              </div>
            </div>
          </Reveal>

        {/* text col */}
<Reveal dir="right">
  <span className="pill">Why Choose Us</span>
  <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(34px,4vw,54px)",color:C.text,fontWeight:400,lineHeight:1.1,margin:"16px 0 18px" }}>
    A space built for<br/><em style={{ color:C.deepRose }}>your comfort</em>
  </h2>

  <p style={{ fontFamily:"'DM Sans'",fontSize:15,color:C.muted,lineHeight:1.8,fontWeight:300,marginBottom:32 }}>
    Whether it's a monthly ritual or a pre-event glow-up, we're here to make beauty feel effortless — and unforgettable. Unisex salon with flexible working hours.
  </p>

  <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:36 }}>
    {BADGES.map(b=>(
      <div key={b.title} className="trust-item">
        <div style={{ width:40,height:40,background:C.blush,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{b.icon}</div>
        <div>
          <div style={{ fontFamily:"'DM Sans'",fontSize:14,fontWeight:500,color:C.text,marginBottom:2 }}>{b.title}</div>
          <div style={{ fontFamily:"'DM Sans'",fontSize:13,color:C.muted,fontWeight:300 }}>{b.desc}</div>
        </div>
      </div>
    ))}
  </div>

  <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
    <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-rose">
      Book Demo Appointment
    </a>
    <a href={CALL} className="btn-ghost">📞 Call Now</a>
  </div>
</Reveal>
</div>
</div>
</section>
);
}
/* ═══ GALLERY ═══ */
function Gallery() {
  const pics = [IMG.g1,IMG.g2,IMG.g3,IMG.g4,IMG.g5,IMG.g6];
  return (
    <section id="gallery" style={{ background:C.cream,padding:"100px 28px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center",marginBottom:52 }}>
            <span className="pill">Our Work</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,58px)",color:C.text,fontWeight:400,marginTop:14,lineHeight:1.1 }}>
              Real Results,<br/><em style={{ color:C.deepRose }}>Real Clients</em>
            </h2>
          </div>
        </Reveal>

        <div className="gal-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14 }}>
          {pics.map((src,i)=>(
            <Reveal key={i} delay={i*.07}>
              <div className="gal-item" style={{ aspectRatio: "3/4" }}>
                <img src={src} alt={`Salon result ${i+1}`}/>
                <div className="gal-overlay">
                  <div style={{ background:C.white,borderRadius:"50%",width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>✨</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.2}>
          <div style={{ textAlign:"center",marginTop:36 }}>
            <a href="https://instagram.com/demo.salon" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              📸 View More on Instagram @demo.salon
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
const TESTI = [
  { name:"Anjali D.",loc:"Client Review",stars:5,text:"Hands down the best mani-pedi I've ever had — my polish lasted weeks with zero chips!" },
  { name:"Nivetha K.",loc:"Client Review",stars:5,text:"Brazilian Waxing here is next-level — no bumps, no irritation, just smooth skin. I never dread waxing anymore. Brought my hubby here too!" },
  { name:"Reema S.",loc:"Client Review",stars:5,text:"I booked their glow facial + spa pedicure before my cousin's wedding — the results were stunning. My photos looked amazing!" },
];

function Testimonials() {
  return (
    <section id="testimonials" style={{ background:`linear-gradient(155deg,${C.blush} 0%,#fde8f0 50%,${C.cream} 100%)`,padding:"100px 28px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <span className="pill">Client Love</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,58px)",color:C.text,fontWeight:400,marginTop:14,lineHeight:1.1 }}>
              What our clients<br/><em style={{ color:C.deepRose }}>are saying</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:22 }}>
          {TESTI.map((t,i)=>(
            <Reveal key={t.name} delay={i*.14}>
              <div style={{ background:C.white,borderRadius:24,padding:"34px 30px",border:`1px solid ${C.rose}45`,boxShadow:"0 4px 24px rgba(196,128,106,.08)",position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",top:10,right:18,fontFamily:"'Cormorant Garamond',serif",fontSize:110,color:`${C.rose}20`,lineHeight:1,userSelect:"none" }}>"</div>
                <div style={{ color:"#F5C842",fontSize:15,letterSpacing:3,marginBottom:14 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:C.text,lineHeight:1.7,fontStyle:"italic",marginBottom:22,position:"relative" }}>"{t.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:12,borderTop:`1px solid ${C.rose}30`,paddingTop:16 }}>
                  <div style={{ width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${C.rose},${C.deepRose})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans'",fontSize:14,color:C.text,fontWeight:500 }}>{t.name}</div>
                    <div style={{ fontFamily:"'DM Sans'",fontSize:12,color:C.muted }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={.3}>
          <div style={{ textAlign:"center",marginTop:44 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:22,background:C.white,border:`1px solid ${C.rose}50`,borderRadius:20,padding:"18px 38px",boxShadow:"0 8px 32px rgba(196,128,106,.1)",flexWrap:"wrap",justifyContent:"center" }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:50,color:C.deepRose,fontWeight:600,lineHeight:1 }}>★ Demo</div>
                <div style={{ color:"#F5C842",fontSize:18,letterSpacing:3 }}>★★★★★</div>
              </div>
              <div style={{ width:1,height:52,background:`${C.rose}55` }}/>
              <div>
                <div style={{ fontFamily:"'DM Sans'",fontSize:14,color:C.muted }}>Trusted by</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:C.text,fontWeight:600 }}>Many Happy Clients</div>
                <div style={{ fontFamily:"'DM Sans'",fontSize:11,color:C.deepRose,letterSpacing:2,textTransform:"uppercase" }}>Demo Showcase</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ═══ CTA BANNER ═══ */
function CTABanner() {
  return (
    <section style={{ background:`linear-gradient(135deg,${C.deepRose} 0%,${C.mauve} 100%)`,padding:"80px 28px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-80,right:-80,width:340,height:340,borderRadius:"50%",background:"rgba(255,255,255,.07)" }}/>
      <div style={{ position:"absolute",bottom:-50,left:-50,width:240,height:240,borderRadius:"50%",background:"rgba(255,255,255,.05)" }}/>
      <svg style={{ position:"absolute",right:"8%",top:"50%",transform:"translateY(-50%)",opacity:.07 }} width="200" height="200" viewBox="0 0 200 200">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(r=><ellipse key={r} cx="100" cy="100" rx="12" ry="52" fill="#fff" transform={`rotate(${r} 100 100)`}/>)}
        <circle cx="100" cy="100" r="14" fill="#fff"/>
      </svg>

      <div style={{ maxWidth:780,margin:"0 auto",textAlign:"center",position:"relative" }}>
        <Reveal>
          <p style={{ fontFamily:"'DM Sans'",fontSize:11,color:"rgba(255,255,255,.6)",letterSpacing:3,textTransform:"uppercase",marginBottom:16 }}>
            Demo Booking Experience
          </p>

          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(34px,5vw,60px)",color:"#fff",fontWeight:400,lineHeight:1.1,marginBottom:16 }}>
            Ready for your<br/><em>glow-up?</em>
          </h2>

          <p style={{ fontFamily:"'DM Sans'",fontSize:15,color:"rgba(255,255,255,.7)",marginBottom:40,fontWeight:300,lineHeight:1.7 }}>
            Whether it's a monthly ritual or a pre-event glow-up — this demo shows how your salon website could feel.
          </p>

          <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
            <a href={BOOKING} target="_blank" rel="noopener noreferrer"
              style={{ background:"#fff",color:C.deepRose,padding:"17px 42px",borderRadius:50,fontFamily:"'DM Sans'",fontSize:13,fontWeight:500,letterSpacing:1.5,textTransform:"uppercase",transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.2)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              📅 Book Demo Online
            </a>

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ background:"rgba(255,255,255,.15)",color:"#fff",padding:"17px 38px",borderRadius:50,fontFamily:"'DM Sans'",fontSize:13,fontWeight:400,letterSpacing:1,textTransform:"uppercase",border:"1px solid rgba(255,255,255,.3)",transition:"background .3s" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,.25)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,.15)")}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
const FAQS = [
  { q:"Do you offer sensitive-skin-friendly waxing?", a:"Yes — premium and Brazilian stripless waxes are ideal for delicate skin." },
  { q:"Do you offer gentle facials for reactive skin?", a:"Yes, we have fragrance-free and soothing options suitable for sensitive skin." },
  { q:"How long before an event should I book a facial or waxing?", a:"1–3 days before is ideal to let the skin settle and glow naturally." },
  { q:"Do you offer private part hair removal for men — and is it safe for first-timers?", a:"Absolutely. We use premium Brazilian wax and maintain strict hygiene to ensure comfort and safety. Experienced wax therapists only." },
];

function FAQ() {
  const [open,setOpen] = useState(null);
  return (
    <section id="faq" style={{ background:C.cream,padding:"100px 28px" }}>
      <div style={{ maxWidth:800,margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center",marginBottom:52 }}>
            <span className="pill">FAQs</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,52px)",color:C.text,fontWeight:400,marginTop:14 }}>
              Common <em style={{ color:C.deepRose }}>Questions</em>
            </h2>
          </div>
        </Reveal>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          {FAQS.map((f,i)=>(
            <Reveal key={f.q} delay={i*.08}>
              <div className={`faq-item${open===i?" open":""}`}>
                <button onClick={()=>setOpen(open===i?null:i)}
                  style={{ width:"100%",background:"none",border:"none",cursor:"pointer",padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,textAlign:"left" }}>
                  <span style={{ fontFamily:"'DM Sans'",fontSize:15,color:open===i?C.deepRose:C.text,fontWeight:400,transition:"color .2s" }}>{f.q}</span>
                  <span style={{ color:C.deepRose,fontSize:22,transform:open===i?"rotate(45deg)":"none",transition:"transform .3s",flexShrink:0,lineHeight:1 }}>+</span>
                </button>
                <div style={{ maxHeight:open===i?200:0,overflow:"hidden",transition:"max-height .4s ease" }}>
                  <p style={{ fontFamily:"'DM Sans'",fontSize:14,color:C.muted,lineHeight:1.7,padding:"0 24px 20px",fontWeight:300,margin:0 }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT/FOOTER ═══ */
function Footer() {
  return (
    <section id="contact" style={{ background:C.text,padding:"80px 28px 0" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div className="footer-grid" style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr",gap:60,paddingBottom:60,borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:C.rose,fontWeight:400,marginBottom:8 }}>
              GlowBeauty Studio
            </h3>

            <p style={{ fontFamily:"'DM Sans'",fontSize:11,color:"rgba(255,255,255,.3)",letterSpacing:3.5,textTransform:"uppercase",marginBottom:18 }}>
              Premium Salon · Your City
            </p>

            <p style={{ fontFamily:"'DM Sans'",fontSize:14,color:"rgba(255,255,255,.45)",lineHeight:1.7,fontWeight:300,maxWidth:280,marginBottom:28 }}>
              A premium unisex salon demo — designed to showcase modern beauty services, clean UI, and smooth booking experience.
            </p>

            <div style={{ display:"flex",gap:12 }}>
              {[
                { l:"Instagram", h:"https://instagram.com/demo.salon", ic:"📷" },
                { l:"Facebook", h:"https://facebook.com/demo.salon", ic:"📘" }
              ].map(s=>(
                <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                  style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"10px 16px",fontFamily:"'DM Sans'",fontSize:12,color:"rgba(255,255,255,.55)",transition:"all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.deepRose;e.currentTarget.style.color="#fff"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.55)"}}>
                  {s.ic} {s.l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans'",fontSize:11,color:C.deepRose,letterSpacing:3,textTransform:"uppercase",marginBottom:22 }}>Find Us</h4>
            {[
              {ic:"📍",val:"Alwarpet, Chennai"},
              {ic:"🕒",val:"Open All Days, 9 AM – 9 PM"},
              {ic:"📞",val:"+91 63795 22874",h:CALL},
              {ic:"📞",val:"+91 72000 30480"},
              {ic:"📸",val:"@glamsquad.life",h:"https://www.instagram.com/glamsquad.life/"},
            ].map((d,i)=>(
              <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:13 }}>
                <span style={{ fontSize:13,marginTop:1 }}>{d.ic}</span>
                {d.h?<a href={d.h} style={{ fontFamily:"'DM Sans'",fontSize:13,color:"rgba(255,255,255,.5)",fontWeight:300,transition:"color .2s" }}
                  onMouseEnter={e=>(e.target.style.color=C.rose)} onMouseLeave={e=>(e.target.style.color="rgba(255,255,255,.5)")}>{d.val}</a>
                  :<span style={{ fontFamily:"'DM Sans'",fontSize:13,color:"rgba(255,255,255,.5)",fontWeight:300 }}>{d.val}</span>}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans'",fontSize:11,color:C.deepRose,letterSpacing:3,textTransform:"uppercase",marginBottom:22 }}>Book Now</h4>
            <div style={{ display:"flex",flexDirection:"column",gap:11 }}>
              {[
                {l:"📅 Book Appointment Online",h:BOOKING,bg:C.deepRose,hbg:C.accent,co:"#fff"},
                {l:"💬 Chat on WhatsApp",h:WHATSAPP,bg:"#25d366",hbg:"#1ebe5d",co:"#fff"},
                {l:"📞 +91 63795 22874",h:CALL,bg:"rgba(255,255,255,.06)",hbg:"rgba(255,255,255,.12)",co:"rgba(255,255,255,.7)"},
              ].map(b=>(
                <a key={b.l} href={b.h} target="_blank" rel="noopener noreferrer"
                  style={{ background:b.bg,color:b.co,padding:"14px 20px",borderRadius:12,fontFamily:"'DM Sans'",fontSize:13,fontWeight:500,textAlign:"center",border:`1px solid rgba(255,255,255,.08)`,transition:"all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=b.hbg;e.currentTarget.style.transform="translateY(-2px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background=b.bg;e.currentTarget.style.transform="none"}}>
                  {b.l}
                </a>
              ))}
            </div>
          </div>
</div>
<div style={{ padding:"22px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
  <p style={{ fontFamily:"'DM Sans'",fontSize:12,color:"rgba(255,255,255,.22)" }}>
    2026 © GlowBeauty Studio (Demo). All rights reserved. ⚠️ This is a demo website created for portfolio purposes.
  </p>

  <div style={{ display:"flex",gap:24 }}>
    {[{l:"Privacy Policy",h:"https://example.com/privacy"},{l:"Terms of Service",h:"https://example.com/terms"}].map(x=>(
      <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer"
        style={{ fontFamily:"'DM Sans'",fontSize:12,color:"rgba(255,255,255,.22)",transition:"color .2s" }}
        onMouseEnter={e=>(e.target.style.color=C.rose)} onMouseLeave={e=>(e.target.style.color="rgba(255,255,255,.22)")}>
        {x.l}
      </a>
    ))}
  </div>
</div>
</div>
</section>
);
}
/* ═══ FLOATING CTAS ═══ */
function FloatingCTAs() {
  const [show,setShow] = useState(false);
  useEffect(()=>{ setTimeout(()=>setShow(true),1400); },[]);
  return (
    <div style={{ position:"fixed",bottom:26,right:26,display:"flex",flexDirection:"column",gap:11,zIndex:999,opacity:show?1:0,transform:show?"none":"translateY(20px)",transition:"all .5s ease" }}>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" title="WhatsApp"
        style={{ width:54,height:54,background:"#25d366",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 6px 22px rgba(37,211,102,.42)",transition:"transform .2s" }}
        onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")}
        onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>💬</a>
      <a href={CALL} title="Call"
        style={{ width:54,height:54,background:C.deepRose,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:`0 6px 22px ${C.deepRose}60`,transition:"transform .2s" }}
        onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")}
        onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>📞</a>
    </div>
  );
}

/* ═══ ROOT ═══ */
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <FAQ />
      <Footer />
      <FloatingCTAs />
    </>
  );
}
