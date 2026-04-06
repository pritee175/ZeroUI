'use client'
import { useEffect } from 'react'

export default function SilentShield() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    initApp()
  }, [])

  return (
    <>
      <style>{CSS}</style>
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
      <script dangerouslySetInnerHTML={{ __html: JS }} />
    </>
  )
}

// ─── CSS ───────────────────────────────────────────────────────────────────
const CSS = `
:root {
  --bg:#060A10;--bg1:#0A0F18;--bg2:#0F1620;--bg3:#162030;--bg4:#1C2A3C;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --text:#EDF2FF;--text2:#7A90B0;--text3:#3A4E68;
  --red:#FF2020;--red2:#CC1010;--red-g:rgba(255,32,32,0.25);
  --amber:#FF9500;--amber-g:rgba(255,149,0,0.2);
  --green:#28D668;--green-g:rgba(40,214,104,0.18);
  --blue:#0A7AFF;--cyan:#2DD4FF;--purple:#A855F7;
  --shield:#1A5FFF;--shield2:#0044CC;
  --fd:'Syne',sans-serif;--fm:'JetBrains Mono',monospace;--fb:'Outfit',sans-serif;
  --st:env(safe-area-inset-top,0px);--sb:env(safe-area-inset-bottom,0px);--nh:66px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html{height:100%;overscroll-behavior:none;}
body{background:var(--bg);color:var(--text);font-family:var(--fb);min-height:100%;overflow-x:hidden;overscroll-behavior:none;-webkit-font-smoothing:antialiased;}

@keyframes pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(3);opacity:0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}
@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes barWave{0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ripple{0%{transform:scale(0);opacity:.6}100%{transform:scale(4);opacity:0}}
@keyframes scanLine{0%{top:-2px}100%{top:102%}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px var(--red-g)}50%{box-shadow:0 0 50px rgba(255,32,32,.5)}}
@keyframes countPop{0%{transform:scale(1.5)}100%{transform:scale(1)}}
@keyframes installBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

/* ── INSTALL BANNER ── */
#ib{position:fixed;bottom:calc(var(--nh) + var(--sb) + 12px);left:12px;right:12px;z-index:600;
  background:linear-gradient(135deg,#0D1F40,#091228);border:1px solid rgba(26,95,255,.6);
  border-radius:20px;padding:16px;display:none;box-shadow:0 8px 40px rgba(0,0,0,.6),0 0 30px rgba(26,95,255,.15);}
#ib.show{display:block;animation:slideUp .4s ease;}
.ib-row{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.ib-ico{width:46px;height:46px;border-radius:13px;background:linear-gradient(135deg,var(--shield),var(--shield2));
  display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;animation:installBounce 2s ease-in-out infinite;}
.ib-title{font-family:var(--fd);font-size:15px;font-weight:700;color:var(--text);}
.ib-sub{font-size:11px;color:var(--text2);margin-top:2px;}
.ib-x{margin-left:auto;background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;padding:4px 8px;}
.ib-btn{width:100%;padding:13px;border-radius:13px;background:var(--shield);border:none;
  color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:var(--fb);}
.ib-btn:active{background:var(--shield2);transform:scale(.98);}

/* ── iOS GUIDE ── */
#iosG{position:fixed;inset:0;z-index:8000;background:rgba(4,6,10,.95);display:none;align-items:flex-end;backdrop-filter:blur(12px);}
#iosG.show{display:flex;}
.ios-sheet{background:var(--bg1);border:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;
  padding:24px 20px calc(28px + var(--sb));animation:slideUp .3s ease;}
.ios-handle{width:36px;height:4px;border-radius:2px;background:var(--bg4);margin:0 auto 20px;}
.ios-title{font-family:var(--fd);font-size:22px;font-weight:800;margin-bottom:8px;}
.ios-step{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);}
.ios-step:last-of-type{border-bottom:none;}
.ios-n{width:26px;height:26px;border-radius:50%;background:var(--shield);display:flex;align-items:center;
  justify-content:center;font-family:var(--fm);font-size:12px;color:#fff;flex-shrink:0;}
.ios-t{font-size:14px;color:var(--text);line-height:1.5;}
.ios-t b{color:var(--cyan);}
.ios-close{width:100%;padding:14px;margin-top:16px;border-radius:13px;background:var(--bg2);
  border:1px solid var(--border2);color:var(--text);font-size:15px;cursor:pointer;font-family:var(--fb);}

/* ── HEADER ── */
.hdr{position:sticky;top:0;z-index:100;background:rgba(6,10,16,.94);backdrop-filter:blur(20px) saturate(1.8);
  border-bottom:1px solid var(--border);padding:calc(var(--st) + 11px) 18px 11px;
  display:flex;align-items:center;justify-content:space-between;}
.hdr-brand{display:flex;align-items:center;gap:10px;}
.hdr-ico{width:34px;height:34px;background:linear-gradient(135deg,var(--shield),var(--shield2));
  border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;
  box-shadow:0 4px 14px rgba(26,95,255,.4);}
.hdr-name{font-family:var(--fd);font-size:20px;font-weight:800;
  background:linear-gradient(135deg,#fff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hdr-status{display:flex;align-items:center;gap:6px;background:var(--bg2);border:1px solid var(--border);
  padding:5px 12px;border-radius:20px;font-family:var(--fm);font-size:10px;color:var(--text2);transition:all .3s;}
.hdr-status.danger{border-color:var(--red);color:var(--red);animation:glowPulse 1s infinite;}
.sled{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);transition:all .3s;}
.sled.r{background:var(--red);box-shadow:0 0 8px var(--red);animation:blink .5s infinite;}
.sled.a{background:var(--amber);box-shadow:0 0 8px var(--amber);animation:blink 1s infinite;}

/* ── MAIN ── */
.main{max-width:480px;margin:0 auto;padding:0 14px calc(var(--nh) + var(--sb) + 16px);}
.tab{display:none;animation:slideUp .3s ease;}
.tab.on{display:block;}

/* ── SECTION LABELS ── */
.sl{display:flex;align-items:center;gap:8px;font-family:var(--fm);font-size:9px;letter-spacing:2.5px;
  color:var(--text3);text-transform:uppercase;margin:20px 0 10px;}
.sl::after{content:'';flex:1;height:1px;background:var(--border);}

/* ── CARDS ── */
.card{background:var(--bg1);border:1px solid var(--border);border-radius:18px;padding:16px;margin-bottom:10px;
  position:relative;overflow:hidden;transition:border-color .3s,box-shadow .3s;}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);}
.card.ca{border-color:rgba(255,32,32,.4);box-shadow:0 0 30px rgba(255,32,32,.07);}
.card.cg{border-color:rgba(40,214,104,.3);}
.card.cb{border-color:rgba(26,95,255,.35);}
.cr{display:flex;align-items:center;justify-content:space-between;}
.ct{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:600;color:var(--text);}
.ci{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.ci-r{background:rgba(255,32,32,.15);}
.ci-b{background:rgba(10,122,255,.15);}
.ci-g{background:rgba(40,214,104,.12);}
.ci-a{background:rgba(255,149,0,.12);}
.ci-p{background:rgba(168,85,247,.12);}
.ci-c{background:rgba(45,212,255,.1);}
.bdg{font-family:var(--fm);font-size:9px;letter-spacing:1px;padding:4px 9px;border-radius:6px;
  border:1px solid var(--border);background:var(--bg2);color:var(--text3);transition:all .3s;}
.bg{color:var(--green);border-color:rgba(40,214,104,.3);background:rgba(40,214,104,.05);}
.br{color:var(--red);border-color:rgba(255,32,32,.3);background:rgba(255,32,32,.05);animation:blink .8s infinite;}
.ba{color:var(--amber);border-color:rgba(255,149,0,.3);background:rgba(255,149,0,.05);}
.bb{color:var(--cyan);border-color:rgba(45,212,255,.3);background:rgba(45,212,255,.05);}
.bp{color:var(--purple);border-color:rgba(168,85,247,.3);background:rgba(168,85,247,.05);}
.div{height:1px;background:var(--border);margin:12px 0;}

/* ── SOS BUTTON ── */
.sos-zone{display:flex;flex-direction:column;align-items:center;padding:24px 0 16px;}
.sos-wrap{position:relative;width:200px;height:200px;display:flex;align-items:center;justify-content:center;}
.sos-ring{position:absolute;width:200px;height:200px;border-radius:50%;border:1.5px solid rgba(255,32,32,.45);
  animation:pulse 2.4s ease-out infinite;pointer-events:none;}
.sos-ring:nth-child(2){animation-delay:.8s;}
.sos-ring:nth-child(3){animation-delay:1.6s;}
.sos-btn{position:relative;z-index:2;width:164px;height:164px;border-radius:50%;
  background:radial-gradient(circle at 36% 30%,#FF4444,#CC0000,#7A0000);border:none;cursor:pointer;
  box-shadow:0 0 0 5px rgba(255,32,32,.12),0 0 50px rgba(255,32,32,.45),0 0 100px rgba(255,32,32,.12),
  inset 0 2px 6px rgba(255,255,255,.2),inset 0 -4px 10px rgba(0,0,0,.5);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  transition:transform .1s,box-shadow .1s;-webkit-touch-callout:none;user-select:none;}
.sos-btn:active{transform:scale(.9);box-shadow:0 0 20px rgba(255,32,32,.3),inset 0 4px 14px rgba(0,0,0,.6);}
.sos-lbl{font-family:var(--fd);font-size:38px;font-weight:800;color:#fff;letter-spacing:4px;
  text-shadow:0 2px 10px rgba(0,0,0,.5);}
.sos-sub{font-family:var(--fm);font-size:9px;color:rgba(255,255,255,.6);letter-spacing:1.5px;}
.sos-hint{font-family:var(--fm);font-size:10px;color:var(--text3);letter-spacing:.8px;text-align:center;margin-top:14px;line-height:1.8;}
.sos-hint b{color:var(--red);}
.pind{display:flex;gap:7px;margin-top:10px;}
.pdot{width:9px;height:9px;border-radius:50%;background:var(--bg3);border:1px solid var(--border);transition:all .15s;}
.pdot.lit{background:var(--red);box-shadow:0 0 10px var(--red);border-color:var(--red);}

/* ── RISK METER ── */
.risk-wrap{margin:14px 0 6px;}
.risk-label-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.risk-label{font-family:var(--fm);font-size:10px;letter-spacing:1.5px;color:var(--text3);}
.risk-val{font-family:var(--fd);font-size:22px;font-weight:800;transition:color .3s;}
.risk-bar-outer{height:12px;background:var(--bg3);border-radius:6px;overflow:hidden;position:relative;}
.risk-bar-fill{height:100%;border-radius:6px;transition:width .5s ease,background .5s;background:var(--green);}
.risk-zones{display:flex;justify-content:space-between;margin-top:4px;font-family:var(--fm);font-size:9px;color:var(--text3);}

/* ── STATUS GRID ── */
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
.scard{background:var(--bg1);border:1px solid var(--border);border-radius:13px;padding:12px 14px;transition:border-color .3s;}
.scard.sg{border-color:rgba(40,214,104,.3);}
.scard.sr{border-color:rgba(255,32,32,.35);}
.scard.sa{border-color:rgba(255,149,0,.3);}
.sc-lbl{font-family:var(--fm);font-size:9px;letter-spacing:1.5px;color:var(--text3);text-transform:uppercase;margin-bottom:6px;}
.sc-val{font-family:var(--fm);font-size:16px;font-weight:600;transition:color .3s;}
.sc-sub{font-size:10px;color:var(--text3);margin-top:2px;}
.sv-g{color:var(--green);}
.sv-r{color:var(--red);}
.sv-a{color:var(--amber);}
.sv-d{color:var(--text3);}

/* ── SENSOR ROWS ── */
.sr{display:flex;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);}
.sr:last-child{border-bottom:none;}
.sn{font-family:var(--fm);font-size:9px;letter-spacing:1px;color:var(--text3);width:76px;flex-shrink:0;}
.sv{font-family:var(--fm);font-size:13px;font-weight:600;width:72px;text-align:right;margin-left:auto;transition:color .3s;}
.sv-ok{color:var(--green);}
.sv-wn{color:var(--amber);}
.sv-dg{color:var(--red);animation:blink .3s infinite;}
.mw{flex:1;height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;margin:0 10px;}
.mf{height:100%;border-radius:3px;transition:width .2s,background .2s;}
.mf-g{background:var(--green);}
.mf-a{background:var(--amber);}
.mf-r{background:var(--red);}

/* ── VOICE ── */
.vtx{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:11px 13px;
  font-family:var(--fm);font-size:12px;color:var(--text2);min-height:50px;display:flex;align-items:center;gap:11px;
  margin-bottom:10px;transition:border-color .3s;}
.vtx.hot{border-color:var(--red);background:rgba(255,32,32,.05);}
.wf{display:flex;align-items:center;gap:3px;height:26px;flex-shrink:0;}
.wb{width:3px;background:var(--text3);border-radius:2px;height:100%;transform:scaleY(.15);transform-origin:center;transition:background .2s;}
.wf.live .wb{background:var(--green);}
.wf.hot .wb{background:var(--red);}
.wf.live .wb:nth-child(1){animation:barWave .45s ease-in-out infinite;}
.wf.live .wb:nth-child(2){animation:barWave .45s .07s ease-in-out infinite;}
.wf.live .wb:nth-child(3){animation:barWave .45s .17s ease-in-out infinite;}
.wf.live .wb:nth-child(4){animation:barWave .45s .05s ease-in-out infinite;}
.wf.live .wb:nth-child(5){animation:barWave .45s .13s ease-in-out infinite;}
.wf.live .wb:nth-child(6){animation:barWave .45s .21s ease-in-out infinite;}
.wf.live .wb:nth-child(7){animation:barWave .45s .03s ease-in-out infinite;}
.wf.live .wb:nth-child(8){animation:barWave .45s .15s ease-in-out infinite;}
.kpills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}
.kp{font-family:var(--fm);font-size:9px;letter-spacing:1px;padding:4px 10px;border-radius:7px;
  border:1px solid rgba(255,32,32,.2);background:rgba(255,32,32,.05);color:rgba(255,32,32,.45);transition:all .2s;}
.kp.hit{color:var(--red);border-color:var(--red);background:rgba(255,32,32,.15);
  box-shadow:0 0 12px rgba(255,32,32,.2);animation:blink .4s infinite;}
.mic-btn{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border2);background:var(--bg2);
  color:var(--text);font-size:14px;font-weight:500;cursor:pointer;display:flex;align-items:center;
  justify-content:center;gap:9px;transition:all .2s;font-family:var(--fb);}
.mic-btn.live{border-color:var(--green);color:var(--green);background:rgba(40,214,104,.06);}
.mic-btn:active{transform:scale(.98);}

/* ── AI BRAIN ── */
.ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.ai-card{background:var(--bg2);border:1px solid var(--border);border-radius:13px;padding:12px;
  display:flex;flex-direction:column;gap:6px;transition:all .3s;}
.ai-card.active{border-color:rgba(168,85,247,.4);background:rgba(168,85,247,.04);}
.ai-ico{font-size:20px;}
.ai-name{font-size:12px;font-weight:600;color:var(--text);}
.ai-val{font-family:var(--fm);font-size:11px;color:var(--text3);transition:color .3s;}
.ai-val.on{color:var(--purple);}
.ai-bar{height:3px;background:var(--bg3);border-radius:2px;margin-top:2px;}
.ai-fill{height:100%;border-radius:2px;background:var(--purple);transition:width .5s ease;}

/* ── COMMUNITY ── */
.vol-item{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px solid var(--border);}
.vol-item:last-child{border-bottom:none;}
.vol-av{width:38px;height:38px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;
  justify-content:center;font-size:18px;flex-shrink:0;}
.vol-name{font-size:13px;font-weight:500;}
.vol-dist{font-family:var(--fm);font-size:10px;color:var(--text2);margin-top:2px;}
.vol-status{margin-left:auto;font-family:var(--fm);font-size:9px;padding:3px 8px;border-radius:5px;}
.vs-on{color:var(--green);background:rgba(40,214,104,.1);border:1px solid rgba(40,214,104,.3);}
.vs-off{color:var(--text3);background:var(--bg3);border:1px solid var(--border);}

/* ── GEO ── */
.geo-viz{background:var(--bg2);border:1px solid var(--border);border-radius:14px;height:175px;
  position:relative;overflow:hidden;margin-bottom:12px;}
.geo-grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:20px 20px;}
.geo-safe{position:absolute;border-radius:50%;border:1.5px solid rgba(40,214,104,.4);background:rgba(40,214,104,.04);
  transition:all .5s;transform:translate(-50%,-50%);}
.geo-home{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--amber);border:2px solid #fff;
  box-shadow:0 0 10px var(--amber);transform:translate(-50%,-50%);}
.geo-user{position:absolute;width:12px;height:12px;border-radius:50%;background:var(--blue);border:2px solid #fff;
  box-shadow:0 0 14px var(--blue);transition:all .5s;transform:translate(-50%,-50%);}
.geo-lbl{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-family:var(--fm);font-size:9px;
  color:var(--text3);letter-spacing:1px;background:rgba(6,10,16,.75);padding:3px 9px;border-radius:5px;}

/* ── CONTACTS ── */
.con{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);}
.con:last-child{border-bottom:none;}
.av{width:40px;height:40px;border-radius:11px;background:var(--bg3);border:1px solid var(--border2);
  display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
.cn{font-size:13px;font-weight:600;margin-bottom:1px;}
.cr2{font-family:var(--fm);font-size:9px;letter-spacing:1px;color:var(--blue);}
.cph{font-size:11px;color:var(--text2);margin-top:1px;}
.cas{margin-left:auto;display:flex;gap:6px;}
.ib2{width:30px;height:30px;border-radius:8px;background:var(--bg2);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;transition:all .15s;}
.ib2:active{border-color:var(--text2);transform:scale(.95);}

/* ── TOGGLES ── */
.trow{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.trow:last-child{border-bottom:none;}
.tn{font-size:13px;font-weight:500;}
.td{font-size:10px;color:var(--text3);margin-top:2px;}
.tgl{width:46px;height:26px;border-radius:13px;background:var(--bg3);border:1px solid var(--border2);
  position:relative;cursor:pointer;flex-shrink:0;transition:all .25s;}
.tgl::after{content:'';position:absolute;width:20px;height:20px;background:var(--text3);border-radius:10px;
  top:2px;left:2px;transition:all .25s;}
.tgl.on{background:rgba(26,95,255,.3);border-color:var(--shield);}
.tgl.on::after{transform:translateX(20px);background:var(--shield);}
.tgl.on-r{background:rgba(255,32,32,.2);border-color:var(--red);}
.tgl.on-r::after{background:var(--red);}

/* ── SLIDERS ── */
.sg2{margin-bottom:14px;}
.slr{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.sln{font-size:13px;color:var(--text);}
.slv{font-family:var(--fm);font-size:12px;color:var(--blue);font-weight:600;}
input[type=range]{width:100%;accent-color:var(--blue);height:4px;cursor:pointer;background:var(--bg3);border-radius:2px;}

/* ── INPUTS ── */
.ig{margin-bottom:13px;}
.il{font-family:var(--fm);font-size:9px;letter-spacing:1.5px;color:var(--text3);text-transform:uppercase;margin-bottom:5px;}
.inf{width:100%;padding:11px 13px;background:var(--bg2);border:1px solid var(--border);border-radius:11px;
  color:var(--text);font-size:14px;outline:none;transition:border-color .2s;font-family:var(--fb);}
.inf:focus{border-color:var(--blue);}
.inf::placeholder{color:var(--text3);}
textarea.inf{resize:none;}
.btnp{width:100%;padding:13px;background:var(--shield);border:none;border-radius:12px;color:#fff;
  font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;font-family:var(--fb);}
.btnp:active{background:var(--shield2);transform:scale(.98);}
.btns{width:100%;padding:12px;background:var(--bg2);border:1px solid var(--border2);border-radius:12px;
  color:var(--text);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;margin-top:8px;font-family:var(--fb);}
.btns:active{transform:scale(.98);}

/* ── LOG ── */
.li{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);animation:slideUp .3s ease;}
.li:first-child{padding-top:0;}
.li:last-child{border-bottom:none;padding-bottom:0;}
.ld{width:7px;height:7px;border-radius:50%;margin-top:4px;flex-shrink:0;}
.ld-g{background:var(--green);box-shadow:0 0 6px var(--green);}
.ld-r{background:var(--red);box-shadow:0 0 6px var(--red);}
.ld-a{background:var(--amber);box-shadow:0 0 6px var(--amber);}
.ld-b{background:var(--blue);box-shadow:0 0 6px var(--blue);}
.ld-p{background:var(--purple);box-shadow:0 0 6px var(--purple);}
.lm{font-size:12px;line-height:1.5;color:var(--text);}
.lt{font-family:var(--fm);font-size:9px;color:var(--text3);margin-top:2px;}
.lcat{font-family:var(--fm);font-size:9px;letter-spacing:.5px;color:var(--text3);flex-shrink:0;margin-top:2px;}

/* ── SIM GRID ── */
.sim-g{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sim-b{padding:12px 8px;border-radius:11px;background:var(--bg2);border:1px solid var(--border);
  color:var(--text2);font-size:11px;font-weight:500;cursor:pointer;text-align:center;line-height:1.4;
  transition:all .15s;font-family:var(--fb);}
.sim-b:active{transform:scale(.94);border-color:var(--amber);color:var(--amber);}
.sim-i{font-size:19px;display:block;margin-bottom:4px;}

/* ── BOTTOM NAV ── */
.bnav{position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(6,10,16,.97);
  backdrop-filter:blur(20px) saturate(2);border-top:1px solid var(--border);display:flex;
  padding-bottom:var(--sb);height:calc(var(--nh) + var(--sb));}
.nb{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  cursor:pointer;background:none;border:none;color:var(--text3);font-family:var(--fm);
  font-size:8px;letter-spacing:.5px;text-transform:uppercase;transition:color .2s;padding-bottom:3px;}
.nb.on{color:var(--shield);}
.nb .ni{font-size:20px;transition:transform .2s;}
.nb.on .ni{transform:scale(1.12);}

/* ── EMERGENCY OVERLAY ── */
#eo{position:fixed;inset:0;z-index:9000;background:rgba(4,2,2,.97);display:none;flex-direction:column;
  align-items:center;justify-content:center;padding:28px 24px;backdrop-filter:blur(18px);text-align:center;}
#eo.show{display:flex;animation:fadeIn .25s;}
.e-icon{font-size:60px;animation:shake .5s ease;margin-bottom:6px;}
.e-title{font-family:var(--fd);font-size:52px;font-weight:800;color:var(--red);letter-spacing:5px;
  text-shadow:0 0 50px rgba(255,32,32,.7);margin-bottom:4px;line-height:1;}
.e-type{font-family:var(--fm);font-size:11px;color:var(--text2);letter-spacing:2px;margin-bottom:22px;}
.cd-ring{width:108px;height:108px;position:relative;margin-bottom:22px;}
.cd-svg{width:108px;height:108px;transform:rotate(-90deg);}
.cd-track{fill:none;stroke:var(--bg3);stroke-width:7;}
.cd-arc{fill:none;stroke:var(--red);stroke-width:7;stroke-linecap:round;stroke-dasharray:307;
  stroke-dashoffset:0;transition:stroke-dashoffset 1s linear;filter:drop-shadow(0 0 8px var(--red));}
.cd-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:46px;font-weight:800;color:var(--red);
  animation:countPop 1s infinite;text-shadow:0 0 25px rgba(255,32,32,.6);}
.e-loc{font-family:var(--fm);font-size:10px;color:var(--text3);margin-bottom:22px;
  padding:7px 16px;background:var(--bg2);border-radius:8px;border:1px solid var(--border);}
.e-risk{font-family:var(--fm);font-size:10px;color:var(--amber);margin-bottom:20px;letter-spacing:1px;}
.e-acts{width:100%;max-width:300px;display:flex;flex-direction:column;gap:10px;}
.e-send{padding:15px;border-radius:14px;background:var(--red);border:none;color:#fff;font-size:16px;
  font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .15s;box-shadow:0 4px 24px rgba(255,32,32,.45);font-family:var(--fb);}
.e-send:active{background:var(--red2);transform:scale(.97);}
.e-cancel{padding:14px;border-radius:14px;background:var(--bg2);border:1px solid var(--border2);
  color:var(--text);font-size:14px;font-weight:500;cursor:pointer;transition:all .15s;font-family:var(--fb);}
.e-sent{font-family:var(--fm);font-size:10px;color:var(--green);margin-top:12px;letter-spacing:1px;display:none;}

/* ── SENT OVERLAY ── */
#so{position:fixed;inset:0;z-index:9100;background:rgba(2,8,4,.97);display:none;flex-direction:column;
  align-items:center;justify-content:center;padding:36px 24px;text-align:center;}
#so.show{display:flex;animation:fadeIn .3s;}
.so-ico{font-size:70px;margin-bottom:18px;animation:floatY 2s ease-in-out infinite;}
.so-title{font-family:var(--fd);font-size:38px;font-weight:800;color:var(--green);letter-spacing:3px;margin-bottom:8px;}
.so-sub{font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:16px;}
.so-cons{display:flex;flex-direction:column;gap:7px;margin-bottom:16px;width:100%;max-width:280px;}
.so-c{padding:9px 14px;background:rgba(40,214,104,.08);border:1px solid rgba(40,214,104,.25);border-radius:10px;
  font-family:var(--fm);font-size:10px;color:var(--green);display:flex;justify-content:space-between;}
.so-close{padding:13px 32px;background:var(--bg2);border:1px solid var(--border2);border-radius:12px;
  color:var(--text);font-size:14px;font-weight:500;cursor:pointer;font-family:var(--fb);}

/* ── MODAL ── */
#mo{position:fixed;inset:0;z-index:8000;background:rgba(4,6,10,.92);display:none;align-items:flex-end;backdrop-filter:blur(12px);}
#mo.show{display:flex;}
.modal{background:var(--bg1);border:1px solid var(--border2);border-radius:22px 22px 0 0;width:100%;
  padding:22px 18px calc(22px + var(--sb));animation:slideUp .3s ease;}
.mh{width:34px;height:4px;border-radius:2px;background:var(--bg4);margin:0 auto 18px;}
.mt{font-family:var(--fd);font-size:22px;font-weight:800;margin-bottom:18px;}

/* ── TOAST ── */
#toast{position:fixed;bottom:calc(var(--nh) + var(--sb) + 80px);left:50%;transform:translateX(-50%) translateY(16px);
  background:var(--bg3);border:1px solid var(--border2);padding:9px 18px;border-radius:20px;
  font-size:12px;color:var(--text);z-index:7000;opacity:0;pointer-events:none;transition:all .3s;
  max-width:calc(100vw - 32px);text-align:center;white-space:nowrap;}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

/* ── AUDIO ── */
.audio-confirm{background:rgba(255,149,0,.08);border:1px solid rgba(255,149,0,.25);border-radius:12px;padding:12px;
  display:flex;align-items:center;gap:10px;margin-top:10px;}
.audio-pulse{width:8px;height:8px;border-radius:50%;background:var(--amber);box-shadow:0 0 8px var(--amber);animation:blink .6s infinite;}
.audio-text{font-family:var(--fm);font-size:11px;color:var(--amber);letter-spacing:.5px;}

/* ── PROFILE ── */
.ph{display:flex;align-items:center;gap:13px;margin-bottom:14px;}
.pa{width:58px;height:58px;border-radius:15px;background:linear-gradient(135deg,var(--shield),var(--cyan));
  display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
.pn{font-size:19px;font-weight:700;}
.ps{font-size:11px;color:var(--text2);margin-top:2px;}
.sys-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);}
.sys-row:last-child{border-bottom:none;}
.sys-k{font-family:var(--fm);font-size:9px;letter-spacing:1px;color:var(--text3);}
.sys-v{font-family:var(--fm);font-size:10px;font-weight:600;transition:color .3s;}

::-webkit-scrollbar{width:0;}
`

// ─── HTML ──────────────────────────────────────────────────────────────────
const HTML = `
<!-- INSTALL BANNER -->
<div id="ib">
  <div class="ib-row">
    <div class="ib-ico">🛡️</div>
    <div><div class="ib-title">Install SilentShield</div><div class="ib-sub">Real app · No app store · Works offline</div></div>
    <button class="ib-x" onclick="document.getElementById('ib').classList.remove('show')">✕</button>
  </div>
  <button class="ib-btn" id="installBtn">📲 Install as Native App — Free</button>
</div>

<!-- iOS GUIDE -->
<div id="iosG">
  <div class="ios-sheet">
    <div class="ios-handle"></div>
    <div class="ios-title">Install on iPhone</div>
    <div class="ios-step"><div class="ios-n">1</div><div class="ios-t">Tap the <b>Share</b> button at the bottom of Safari</div></div>
    <div class="ios-step"><div class="ios-n">2</div><div class="ios-t">Scroll and tap <b>"Add to Home Screen"</b></div></div>
    <div class="ios-step"><div class="ios-n">3</div><div class="ios-t">Tap <b>"Add"</b> — SilentShield opens full screen!</div></div>
    <button class="ios-close" onclick="document.getElementById('iosG').classList.remove('show')">Got it!</button>
  </div>
</div>

<!-- EMERGENCY OVERLAY -->
<div id="eo">
  <div class="e-icon" id="eIco">🚨</div>
  <div class="e-title" id="eTitle">SOS</div>
  <div class="e-type" id="eType">EMERGENCY DETECTED</div>
  <div class="cd-ring">
    <svg class="cd-svg" viewBox="0 0 108 108">
      <circle class="cd-track" cx="54" cy="54" r="48"/>
      <circle class="cd-arc" id="cdArc" cx="54" cy="54" r="48"/>
    </svg>
    <div class="cd-num" id="cdNum">5</div>
  </div>
  <div class="e-loc" id="eLoc">📍 Acquiring location…</div>
  <div class="e-risk" id="eRisk">⚡ RISK LEVEL: HIGH</div>
  <div class="e-acts">
    <button class="e-send" onclick="sendNow()">⚡ SEND SOS NOW</button>
    <button class="e-cancel" onclick="cancelAlert()">✕ Cancel — False Alarm</button>
  </div>
  <div class="e-sent" id="eSent">✓ ALERT SENT TO ALL CONTACTS</div>
</div>

<!-- SENT OVERLAY -->
<div id="so">
  <div class="so-ico">✅</div>
  <div class="so-title">ALERT SENT</div>
  <div class="so-sub">Emergency contacts notified with your location and details.</div>
  <div class="so-cons" id="sCons"></div>
  <button class="so-close" onclick="closeSent()">I'm Safe Now</button>
</div>

<!-- ADD CONTACT MODAL -->
<div id="mo" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="mh"></div>
    <div class="mt">Add Contact</div>
    <div class="ig"><div class="il">Name</div><input class="inf" id="nName" type="text" placeholder="e.g. Mom"/></div>
    <div class="ig"><div class="il">Relationship</div><input class="inf" id="nRel" type="text" placeholder="e.g. Parent, Friend"/></div>
    <div class="ig"><div class="il">Phone Number</div><input class="inf" id="nPhone" type="tel" placeholder="+91 XXXXX XXXXX"/></div>
    <div class="ig"><div class="il">Emoji</div><input class="inf" id="nEmoji" type="text" placeholder="👩 👨 🏥" maxlength="4"/></div>
    <button class="btnp" onclick="saveContact()" style="margin-top:4px">Save Contact</button>
    <button class="btns" onclick="closeModal()">Cancel</button>
  </div>
</div>

<!-- HEADER -->
<header class="hdr">
  <div class="hdr-brand">
    <div class="hdr-ico">🛡️</div>
    <div class="hdr-name">SilentShield</div>
  </div>
  <div class="hdr-status" id="hdrSt">
    <div class="sled" id="sled"></div>
    <span id="stTxt">MONITORING</span>
  </div>
</header>

<main class="main">

<!-- ═══ HOME TAB ═══ -->
<div class="tab on" id="tab-home">

  <!-- SOS -->
  <div class="sos-zone">
    <div class="sos-wrap">
      <div class="sos-ring"></div><div class="sos-ring"></div><div class="sos-ring"></div>
      <button class="sos-btn" id="sosBtn" ontouchstart="sosPrs(event)" onclick="sosPrs(event)">
        <div class="sos-lbl">SOS</div>
        <div class="sos-sub">PRESS 3×</div>
      </button>
    </div>
    <div class="pind"><div class="pdot" id="pd0"></div><div class="pdot" id="pd1"></div><div class="pdot" id="pd2"></div></div>
    <div class="sos-hint">Press 3× fast &nbsp;·&nbsp; Say <b>"HELP"</b> &nbsp;·&nbsp; Auto fall detect</div>
  </div>

  <!-- AI RISK METER (Innovation #3: Context-Aware AI) -->
  <div class="card cb">
    <div class="cr" style="margin-bottom:10px">
      <div class="ct"><div class="ci ci-p">🧠</div>AI Risk Engine</div>
      <div class="bdg bb" id="aiModeBdg">LEARNING</div>
    </div>
    <div class="risk-wrap">
      <div class="risk-label-row">
        <span class="risk-label">REAL-TIME RISK SCORE</span>
        <span class="risk-val" id="riskVal" style="color:var(--green)">0%</span>
      </div>
      <div class="risk-bar-outer"><div class="risk-bar-fill" id="riskFill" style="width:0%"></div></div>
      <div class="risk-zones"><span>SAFE</span><span>CAUTION</span><span>HIGH</span><span>CRITICAL</span></div>
    </div>
    <div class="div"></div>
    <div class="ai-grid">
      <div class="ai-card" id="ai-fall"><div class="ai-ico">💥</div><div class="ai-name">Fall Signal</div><div class="ai-val" id="aiFall">0.0g</div><div class="ai-bar"><div class="ai-fill" id="aiFallB" style="width:0%"></div></div></div>
      <div class="ai-card" id="ai-voice"><div class="ai-ico">🗣️</div><div class="ai-name">Voice Signal</div><div class="ai-val" id="aiVoice">Silent</div><div class="ai-bar"><div class="ai-fill" id="aiVoiceB" style="width:0%"></div></div></div>
      <div class="ai-card" id="ai-motion"><div class="ai-ico">🧊</div><div class="ai-name">No-Motion</div><div class="ai-val" id="aiMotion">Active</div><div class="ai-bar"><div class="ai-fill" id="aiMotionB" style="width:0%"></div></div></div>
      <div class="ai-card" id="ai-zone"><div class="ai-ico">📍</div><div class="ai-name">Zone Safety</div><div class="ai-val" id="aiZone">Inside</div><div class="ai-bar"><div class="ai-fill" id="aiZoneB" style="width:0%"></div></div></div>
    </div>
  </div>

  <!-- STATUS GRID -->
  <div class="sgrid">
    <div class="scard sg"><div class="sc-lbl">FALL DETECT</div><div class="sc-val sv-g" id="svFall">ACTIVE</div><div class="sc-sub">Accelerometer</div></div>
    <div class="scard"><div class="sc-lbl">VOICE WATCH</div><div class="sc-val sv-d" id="svVoice">OFF</div><div class="sc-sub">Keyword AI</div></div>
    <div class="scard sg"><div class="sc-lbl">SAFE ZONE</div><div class="sc-val sv-g" id="svPerim">INSIDE</div><div class="sc-sub" id="svPerimD">GPS active</div></div>
    <div class="scard sg"><div class="sc-lbl">LAST MOTION</div><div class="sc-val sv-g" id="svMot">ACTIVE</div><div class="sc-sub" id="svMotD">Just now</div></div>
  </div>

  <!-- VOICE DETECTION -->
  <div class="sl">Voice Detection</div>
  <div class="card">
    <div class="cr" style="margin-bottom:11px">
      <div class="ct"><div class="ci ci-r">🎙️</div>Keyword Monitor</div>
      <div class="bdg" id="vBdg">OFFLINE</div>
    </div>
    <div class="vtx" id="vtx">
      <div class="wf" id="wf"><div class="wb"></div><div class="wb"></div><div class="wb"></div><div class="wb"></div><div class="wb"></div><div class="wb"></div><div class="wb"></div><div class="wb"></div></div>
      <span id="vtxTxt">Tap mic to start listening…</span>
    </div>
    <div class="kpills">
      <div class="kp" id="kw-help">HELP</div><div class="kp" id="kw-sos">SOS</div>
      <div class="kp" id="kw-emergency">EMERGENCY</div><div class="kp" id="kw-save">SAVE ME</div>
      <div class="kp" id="kw-accident">ACCIDENT</div><div class="kp" id="kw-fire">FIRE</div>
      <div class="kp" id="kw-bachao">BACHAO</div>
    </div>
    <button class="mic-btn" id="micBtn" onclick="toggleMic()">
      <span id="micIco">🎙️</span><span id="micTxt">Start Voice Watch</span>
    </button>
  </div>

  <!-- LIVE SENSORS -->
  <div class="sl">Live Sensors</div>
  <div class="card">
    <div class="cr" style="margin-bottom:13px">
      <div class="ct"><div class="ci ci-b">📉</div>Accelerometer</div>
      <div class="bdg bg">LIVE</div>
    </div>
    <div class="sr"><span class="sn">ACCEL X</span><div class="mw"><div class="mf mf-g" id="mfX" style="width:10%"></div></div><span class="sv sv-ok" id="sX">+0.00g</span></div>
    <div class="sr"><span class="sn">ACCEL Y</span><div class="mw"><div class="mf mf-g" id="mfY" style="width:10%"></div></div><span class="sv sv-ok" id="sY">+0.00g</span></div>
    <div class="sr"><span class="sn">ACCEL Z</span><div class="mw"><div class="mf mf-g" id="mfZ" style="width:50%"></div></div><span class="sv sv-ok" id="sZ">+9.8g</span></div>
    <div class="sr"><span class="sn">MAGNITUDE</span><div class="mw"><div class="mf mf-g" id="mfM" style="width:30%"></div></div><span class="sv sv-ok" id="sM">1.0g</span></div>
    <div style="margin-top:12px">
      <div style="display:flex;justify-content:space-between;font-family:var(--fm);font-size:9px;color:var(--text3);margin-bottom:5px"><span>IMPACT LEVEL</span><span id="iPct">20%</span></div>
      <div class="risk-bar-outer"><div class="risk-bar-fill" id="iBar" style="width:20%"></div><div style="position:absolute;top:0;bottom:0;left:40%;width:2px;background:rgba(255,149,0,.7);border-radius:1px"></div></div>
    </div>
  </div>

  <!-- ALERT LOG -->
  <div class="sl">Alert Log</div>
  <div class="card">
    <div id="aLog">
      <div class="li"><div class="ld ld-g"></div><div style="flex:1"><div class="lm">SilentShield initialized — all 9 systems active</div><div class="lt" id="initT"></div></div><div class="lcat">BOOT</div></div>
    </div>
  </div>

</div><!-- end home -->

<!-- ═══ AI TAB ═══ -->
<div class="tab" id="tab-ai">

  <!-- Context-Aware AI -->
  <div class="sl">AI Decision Engine</div>
  <div class="card cb">
    <div class="cr" style="margin-bottom:14px">
      <div class="ct"><div class="ci ci-p">🧠</div>Context-Aware AI</div>
      <div class="bdg bb">INNOVATION #3</div>
    </div>
    <div style="font-size:12px;color:var(--text2);line-height:1.7;margin-bottom:14px">
      Combines multiple signals to calculate real-time risk. Fall+silence = critical. Voice+motion = panic attack. Single signal alone triggers caution, not alert.
    </div>
    <div class="ai-grid">
      <div class="ai-card" id="aic-fall"><div class="ai-ico">💥</div><div class="ai-name">Fall Detected</div><div class="ai-val sv-d" id="aic-fall-v">None</div><div class="ai-bar"><div class="ai-fill" id="aic-fall-b" style="width:0%"></div></div></div>
      <div class="ai-card" id="aic-voice"><div class="ai-ico">🗣️</div><div class="ai-name">Voice Keyword</div><div class="ai-val sv-d" id="aic-voice-v">None</div><div class="ai-bar"><div class="ai-fill" id="aic-voice-b" style="width:0%"></div></div></div>
      <div class="ai-card" id="aic-motion"><div class="ai-ico">🧊</div><div class="ai-name">Inactivity</div><div class="ai-val sv-d" id="aic-motion-v">Active</div><div class="ai-bar"><div class="ai-fill" id="aic-motion-b" style="width:0%"></div></div></div>
      <div class="ai-card" id="aic-zone"><div class="ai-ico">🗺️</div><div class="ai-name">Zone Breach</div><div class="ai-val sv-d" id="aic-zone-v">Safe</div><div class="ai-bar"><div class="ai-fill" id="aic-zone-b" style="width:0%"></div></div></div>
    </div>
    <div class="div"></div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-family:var(--fm);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:4px">FUSION SCORE</div>
        <div style="font-family:var(--fd);font-size:28px;font-weight:800" id="fusionScore">LOW RISK</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--fm);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:4px">ACTION</div>
        <div style="font-family:var(--fm);font-size:12px;color:var(--green)" id="fusionAction">Monitoring</div>
      </div>
    </div>
  </div>

  <!-- Adaptive Learning -->
  <div class="sl">Adaptive Learning <span style="font-family:var(--fm);font-size:9px;color:var(--purple);letter-spacing:1px;margin-left:6px">INNOVATION #5</span></div>
  <div class="card">
    <div class="cr" style="margin-bottom:12px">
      <div class="ct"><div class="ci ci-p">📊</div>Personal Baseline</div>
      <div class="bdg bp">LEARNING</div>
    </div>
    <div class="sr"><span class="sn">AVG MOTION</span><div class="mw"><div class="mf mf-g" id="avgMot" style="width:60%"></div></div><span class="sv sv-ok" id="avgMotV">Normal</span></div>
    <div class="sr"><span class="sn">DAILY PATTERN</span><div class="mw"><div class="mf mf-g" id="dayPat" style="width:75%"></div></div><span class="sv sv-ok" id="dayPatV">Active</span></div>
    <div class="sr"><span class="sn">ANOMALY SCORE</span><div class="mw"><div class="mf mf-g" id="anomaly" style="width:10%"></div></div><span class="sv sv-ok" id="anomalyV">0%</span></div>
    <div class="sr" style="border:none"><span class="sn">SAMPLES</span><div class="mw"></div><span class="sv sv-ok" id="samples">0</span></div>
    <div class="div"></div>
    <div style="font-size:11px;color:var(--text2);line-height:1.6">The AI learns your typical movement patterns over time. Sudden deviations from your baseline trigger anomaly detection, even if absolute values seem normal.</div>
  </div>

  <!-- Smart Cancellation -->
  <div class="sl">Smart Cancellation <span style="font-family:var(--fm);font-size:9px;color:var(--amber);letter-spacing:1px;margin-left:6px">INNOVATION #6</span></div>
  <div class="card">
    <div class="cr" style="margin-bottom:12px">
      <div class="ct"><div class="ci ci-a">🔊</div>Audio Confirmation</div>
      <div class="bdg ba" id="audioBdg">STANDBY</div>
    </div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px">When emergency triggers, the app asks <b style="color:var(--amber)">"Are you safe?"</b> and listens for 10 seconds. No reply = alert sent automatically.</div>
    <div class="audio-confirm" id="audioConfirm" style="display:none">
      <div class="audio-pulse"></div>
      <div class="audio-text">LISTENING: "Are you safe?"…</div>
    </div>
    <div class="sg2" style="margin-top:12px;margin-bottom:0">
      <div class="slr"><span class="sln">Audio Reply Window</span><span class="slv" id="audioWin">10s</span></div>
      <input type="range" min="5" max="20" step="1" value="10" id="audioSlider" oninput="document.getElementById('audioWin').textContent=this.value+'s'">
    </div>
  </div>

</div><!-- end ai -->

<!-- ═══ ZONE TAB ═══ -->
<div class="tab" id="tab-zone">

  <div class="sl">Safe Zone Monitor</div>
  <div class="card">
    <div class="cr" style="margin-bottom:11px">
      <div class="ct"><div class="ci ci-g">📍</div>Geofence</div>
      <div class="bdg bg" id="geoBdg">ACTIVE</div>
    </div>
    <div class="geo-viz" id="geoViz">
      <div class="geo-grid"></div>
      <div class="geo-safe" id="gCircle" style="width:120px;height:120px;left:50%;top:50%"></div>
      <div class="geo-home" id="gHome" style="left:50%;top:50%"></div>
      <div class="geo-user" id="gUser" style="left:50%;top:50%"></div>
      <div class="geo-lbl" id="gLbl">📡 HOME BASE</div>
    </div>
    <div class="sr"><span class="sn">DISTANCE</span><div class="mw"><div class="mf mf-g" id="dFill" style="width:5%"></div></div><span class="sv sv-ok" id="dVal">—</span></div>
    <div class="sr" style="border:none"><span class="sn">STATUS</span><div class="mw"></div><span class="sv sv-ok" id="pStat">INSIDE</span></div>
  </div>

  <div class="sl">Zone Settings</div>
  <div class="card">
    <div class="sg2">
      <div class="slr"><span class="sln">Safe Radius</span><span class="slv" id="radDisp">500m</span></div>
      <input type="range" min="50" max="5000" step="50" value="500" id="radSlider" oninput="updateRadius(this.value)">
    </div>
    <div class="div"></div>
    <div class="trow"><div><div class="tn">Geofence Alerts</div><div class="td">Alert on zone breach</div></div><div class="tgl on" id="tgl-geo" onclick="togF('geo')"></div></div>
    <div class="trow" style="border:none"><div><div class="tn">Night Tight Zone</div><div class="td">50% radius 10PM–6AM</div></div><div class="tgl" id="tgl-night" onclick="togF('night')"></div></div>
  </div>

  <div class="sl">Location</div>
  <div class="card">
    <div class="sys-row"><span class="sys-k">LATITUDE</span><span class="sys-v" id="gLat" style="color:var(--text2)">Acquiring…</span></div>
    <div class="sys-row"><span class="sys-k">LONGITUDE</span><span class="sys-v" id="gLng" style="color:var(--text2)">Acquiring…</span></div>
    <div class="sys-row"><span class="sys-k">ACCURACY</span><span class="sys-v" id="gAcc" style="color:var(--text2)">—</span></div>
    <div class="sys-row" style="border:none"><span class="sys-k">HOME SET</span><span class="sys-v" id="homeSet" style="color:var(--amber)">NOT SET</span></div>
    <button class="btnp" style="margin-top:13px" onclick="setHomeNow()">📍 Set Current as Home</button>
  </div>

</div><!-- end zone -->

<!-- ═══ COMMUNITY TAB ═══ -->
<div class="tab" id="tab-community">

  <!-- Community Network -->
  <div class="sl">Community Network <span style="font-family:var(--fm);font-size:9px;color:var(--green);letter-spacing:1px;margin-left:6px">INNOVATION #7</span></div>
  <div class="card cg">
    <div class="cr" style="margin-bottom:12px">
      <div class="ct"><div class="ci ci-g">🤝</div>Nearby Volunteers</div>
      <div class="bdg bg" id="volBdg">3 ONLINE</div>
    </div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px">When SOS is triggered, nearby registered volunteers are alerted simultaneously. Closest person arrives fastest.</div>
    <div id="volList">
      <div class="vol-item"><div class="vol-av">👩‍⚕️</div><div><div class="vol-name">Dr. Priya S.</div><div class="vol-dist">0.3 km away · Medical</div></div><div class="vol-status vs-on">ONLINE</div></div>
      <div class="vol-item"><div class="vol-av">👮</div><div><div class="vol-name">Officer Rajan</div><div class="vol-dist">0.8 km away · Police</div></div><div class="vol-status vs-on">ONLINE</div></div>
      <div class="vol-item"><div class="vol-av">🧑‍🚒</div><div><div class="vol-name">Amit Kumar</div><div class="vol-dist">1.2 km away · First Aid</div></div><div class="vol-status vs-off">OFFLINE</div></div>
    </div>
    <div class="div"></div>
    <div class="trow" style="padding-top:0"><div><div class="tn">Volunteer Mode</div><div class="td">Help others in your area</div></div><div class="tgl" id="tgl-vol" onclick="togF('vol')"></div></div>
  </div>

  <!-- Emergency Contacts -->
  <div class="sl">Emergency Contacts</div>
  <div class="card">
    <div id="conList"></div>
    <button class="btns" onclick="openModal()" style="margin-top:8px">+ Add Emergency Contact</button>
  </div>

  <!-- SOS Message -->
  <div class="sl">SOS Message Template</div>
  <div class="card">
    <div class="ig">
      <div class="il">Alert Message</div>
      <textarea class="inf" id="sosMsg" rows="5">🆘 EMERGENCY — SilentShield
{{NAME}} needs immediate help!

📍 {{LOCATION}}
🕐 {{TIME}}
⚡ Trigger: {{TYPE}}
🧠 AI Risk: {{RISK}}

Auto-sent by SilentShield.</textarea>
    </div>
    <button class="btnp" onclick="saveSosMsg()">Save Template</button>
  </div>

  <!-- Quick Dial -->
  <div class="sl">Quick Dial</div>
  <div class="card">
    <div class="con"><div class="av">🚑</div><div><div class="cn">Ambulance</div><div class="cr2">EMERGENCY</div><div class="cph">108</div></div><div class="cas"><div class="ib2" onclick="callN('108')">📞</div></div></div>
    <div class="con"><div class="av">🚔</div><div><div class="cn">Police</div><div class="cr2">EMERGENCY</div><div class="cph">100</div></div><div class="cas"><div class="ib2" onclick="callN('100')">📞</div></div></div>
    <div class="con" style="border:none"><div class="av">🔥</div><div><div class="cn">Fire Brigade</div><div class="cr2">EMERGENCY</div><div class="cph">101</div></div><div class="cas"><div class="ib2" onclick="callN('101')">📞</div></div></div>
  </div>

</div><!-- end community -->

<!-- ═══ SETTINGS TAB ═══ -->
<div class="tab" id="tab-settings">

  <!-- Install -->
  <div class="sl">Install App</div>
  <div class="card cb">
    <div class="cr" style="margin-bottom:12px">
      <div class="ct"><div class="ci ci-b">📲</div>Install SilentShield</div>
      <div class="bdg bb" id="instBdg">NOT INSTALLED</div>
    </div>
    <div style="font-size:12px;color:var(--text2);margin-bottom:14px;line-height:1.6">Install as a real app — works offline, appears in app drawer, no app store needed.</div>
    <button class="btnp" id="instCardBtn" onclick="trigInstall()" style="margin-bottom:8px">📲 Install as App</button>
    <button class="btns" id="iosBtn" onclick="document.getElementById('iosG').classList.add('show')" style="display:none;margin-top:0">📱 iPhone Guide</button>
  </div>

  <!-- Detection Settings -->
  <div class="sl">Detection Thresholds</div>
  <div class="card">
    <div class="sg2">
      <div class="slr"><span class="sln">Fall Impact Threshold</span><span class="slv" id="ftDisp">2.5g</span></div>
      <input type="range" min="1.5" max="6" step="0.5" value="2.5" id="ftSlider" oninput="document.getElementById('ftDisp').textContent=this.value+'g'">
      <div style="font-size:10px;color:var(--text3);margin-top:4px">Lower = more sensitive. Recommended: 2.0–3.0g</div>
    </div>
    <div class="div"></div>
    <div class="sg2">
      <div class="slr"><span class="sln">Alert Countdown</span><span class="slv" id="cdDisp">5s</span></div>
      <input type="range" min="3" max="20" step="1" value="5" id="cdSlider" oninput="document.getElementById('cdDisp').textContent=this.value+'s'">
    </div>
    <div class="div"></div>
    <div class="sg2" style="margin-bottom:0">
      <div class="slr"><span class="sln">No-Motion Alert After</span><span class="slv" id="nmDisp">30s</span></div>
      <input type="range" min="10" max="300" step="10" value="30" id="nmSlider" oninput="document.getElementById('nmDisp').textContent=this.value+'s'">
    </div>
  </div>

  <!-- Feature Toggles -->
  <div class="sl">All Features</div>
  <div class="card">
    <div class="trow"><div><div class="tn">Fall Detection</div><div class="td">Accelerometer impact monitor</div></div><div class="tgl on-r on" id="tgl-fall" onclick="togF('fall')"></div></div>
    <div class="trow"><div><div class="tn">Voice Keywords</div><div class="td">HELP, SOS, EMERGENCY…</div></div><div class="tgl on" id="tgl-voice" onclick="togF('voice')"></div></div>
    <div class="trow"><div><div class="tn">No-Motion Detection</div><div class="td">Alert if still too long</div></div><div class="tgl on" id="tgl-nomotion" onclick="togF('nomotion')"></div></div>
    <div class="trow"><div><div class="tn">Geofence Alerts</div><div class="td">Safe zone monitoring</div></div><div class="tgl on" id="tgl-geo2" onclick="togF('geo')"></div></div>
    <div class="trow"><div><div class="tn">Triple-Press SOS</div><div class="td">3× button press triggers</div></div><div class="tgl on-r on" id="tgl-triple" onclick="togF('triple')"></div></div>
    <div class="trow"><div><div class="tn">Context-Aware AI</div><div class="td">Multi-signal fusion scoring</div></div><div class="tgl on" id="tgl-ai" onclick="togF('ai')"></div></div>
    <div class="trow"><div><div class="tn">Smart Cancellation</div><div class="td">Audio "Are you safe?" check</div></div><div class="tgl on" id="tgl-audio" onclick="togF('audio')"></div></div>
    <div class="trow"><div><div class="tn">Vibration Feedback</div><div class="td">Haptic on trigger</div></div><div class="tgl on" id="tgl-vibe" onclick="togF('vibe')"></div></div>
    <div class="trow" style="border:none"><div><div class="tn">Silent Emergency Mode</div><div class="td">Whisper "bachao" triggers</div></div><div class="tgl on" id="tgl-silent" onclick="togF('silent')"></div></div>
  </div>

  <!-- Simulate -->
  <div class="sl">Simulate Emergency</div>
  <div class="card">
    <div class="cr" style="margin-bottom:12px"><div class="ct"><div class="ci ci-a">🧪</div>Test All Triggers</div><div class="bdg ba">DEMO</div></div>
    <div class="sim-g">
      <button class="sim-b" onclick="sim('fall')"><span class="sim-i">💥</span>Fall (9.4g)</button>
      <button class="sim-b" onclick="sim('voice')"><span class="sim-i">🗣️</span>Voice Keyword</button>
      <button class="sim-b" onclick="sim('perimeter')"><span class="sim-i">📍</span>Zone Breach</button>
      <button class="sim-b" onclick="sim('nomotion')"><span class="sim-i">🧊</span>No Motion 5s</button>
      <button class="sim-b" onclick="sim('panic')"><span class="sim-i">😰</span>Panic Mode</button>
      <button class="sim-b" onclick="sim('silent')"><span class="sim-i">🤫</span>Silent Mode</button>
    </div>
  </div>

  <!-- Profile -->
  <div class="sl">Profile</div>
  <div class="card">
    <div class="ph"><div class="pa">🧑</div><div><div class="pn" id="pDisp">User</div><div class="ps" id="pSub">Edit below</div></div></div>
    <div class="ig"><div class="il">Full Name</div><input class="inf" id="pName" type="text" placeholder="Your name" value="User"/></div>
    <div class="ig"><div class="il">Blood Type</div><input class="inf" id="pBlood" type="text" placeholder="O+" value="O+"/></div>
    <div class="ig"><div class="il">Medical Notes</div><textarea class="inf" id="pMed" rows="2" style="resize:none">None</textarea></div>
    <button class="btnp" style="margin-top:4px" onclick="saveProf()">Save Profile</button>
  </div>

  <!-- System -->
  <div class="sl">System Status</div>
  <div class="card">
    <div class="sys-row"><span class="sys-k">SPEECH API</span><span class="sys-v" id="sysSp">CHECKING…</span></div>
    <div class="sys-row"><span class="sys-k">MOTION API</span><span class="sys-v" id="sysMo">CHECKING…</span></div>
    <div class="sys-row"><span class="sys-k">GPS API</span><span class="sys-v" id="sysGp">CHECKING…</span></div>
    <div class="sys-row"><span class="sys-k">VIBRATION</span><span class="sys-v" id="sysVi">CHECKING…</span></div>
    <div class="sys-row"><span class="sys-k">PWA STATUS</span><span class="sys-v" id="sysPwa">CHECKING…</span></div>
    <div class="sys-row" style="border:none"><span class="sys-k">VERSION</span><span class="sys-v" style="color:var(--text2)">v2.0 — 9 Innovations</span></div>
  </div>

  <div class="card" style="text-align:center;padding:22px">
    <div style="font-size:38px;margin-bottom:10px">🛡️</div>
    <div style="font-family:var(--fd);font-size:22px;font-weight:800;letter-spacing:1px;margin-bottom:6px">SilentShield</div>
    <div style="font-size:11px;color:var(--text3);line-height:1.8">Zero-UI Emergency Response System<br/>9 Innovations · Real-time AI · Smart India Hackathon</div>
  </div>

</div><!-- end settings -->

</main>

<!-- BOTTOM NAV -->
<nav class="bnav">
  <button class="nb on" id="nav-home" onclick="swTab('home')"><span class="ni">🏠</span>HOME</button>
  <button class="nb" id="nav-ai" onclick="swTab('ai')"><span class="ni">🧠</span>AI</button>
  <button class="nb" id="nav-zone" onclick="swTab('zone')"><span class="ni">📍</span>ZONE</button>
  <button class="nb" id="nav-community" onclick="swTab('community')"><span class="ni">🤝</span>NETWORK</button>
  <button class="nb" id="nav-settings" onclick="swTab('settings')"><span class="ni">⚙️</span>MORE</button>
</nav>

<div id="toast"></div>
`

// ─── JS ────────────────────────────────────────────────────────────────────
const JS = `
'use strict';

// ── STATE ──
const S = {
  alert:false, alertType:'', cdVal:5, cdTimer:null,
  micOn:false, rec:null,
  lastMot:Date.now(), fallCD:false,
  loc:null, home:null, radius:500, outside:false,
  feats:{fall:true,voice:true,nomotion:true,geo:true,triple:true,ai:true,audio:true,vibe:true,silent:true,night:false,vol:false},
  sosPrs:0, sosT:null,
  contacts:[
    {name:'Mom',rel:'Parent',phone:'+91 98765 43210',emoji:'👩',pri:true},
    {name:'Dad',rel:'Parent',phone:'+91 98765 43211',emoji:'👨',pri:false},
  ],
  profile:{name:'User',blood:'O+',med:'None'},
  dP:null, installed:false,
  // AI signals
  fallSig:0, voiceSig:0, motSig:0, zoneSig:0,
  riskScore:0,
  // Adaptive learning
  motHistory:[], anomaly:0, samples:0,
  // Audio confirm
  audioActive:false, audioRec:null,
};

// ── PWA INSTALL ──
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); S.dP = e;
  setTimeout(() => { if(!S.installed) document.getElementById('ib').classList.add('show'); }, 2000);
  setInstallUI('READY TO INSTALL','bb');
  setSys('sysPwa','INSTALLABLE','var(--green)');
});
window.addEventListener('appinstalled', () => {
  S.installed=true; S.dP=null;
  document.getElementById('ib').classList.remove('show');
  setInstallUI('INSTALLED ✓','bg');
  document.getElementById('instCardBtn').textContent='✓ Installed!';
  document.getElementById('instCardBtn').disabled=true;
  setSys('sysPwa','RUNNING AS APP','var(--green)');
  toast('🎉 SilentShield installed!');
  log('App installed as native PWA','blue','INSTALL');
});
if(window.matchMedia('(display-mode:standalone)').matches || window.navigator.standalone) {
  S.installed=true;
  setTimeout(() => { setInstallUI('INSTALLED ✓','bg'); document.getElementById('instCardBtn').textContent='✓ Already Installed'; document.getElementById('instCardBtn').disabled=true; setSys('sysPwa','RUNNING AS APP','var(--green)'); }, 400);
}
if(/iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone) {
  setTimeout(() => { document.getElementById('iosBtn').style.display='block'; document.getElementById('instCardBtn').textContent='📱 iPhone Install Guide'; document.getElementById('ib').classList.add('show'); }, 2000);
}
function setInstallUI(txt,cls) {
  const b=document.getElementById('instBdg'); if(b){b.textContent=txt;b.className='bdg '+cls;}
}
window.trigInstall = async () => {
  if(/iphone|ipad|ipod/i.test(navigator.userAgent)){document.getElementById('iosG').classList.add('show');return;}
  if(!S.dP){toast('Open in Chrome to install');return;}
  document.getElementById('ib').classList.remove('show');
  S.dP.prompt();
  const {outcome} = await S.dP.userChoice;
  S.dP=null;
  if(outcome==='accepted') toast('🎉 Installing…');
  else { toast('Cancelled'); document.getElementById('ib').classList.add('show'); }
};
document.getElementById('installBtn').addEventListener('click', window.trigInstall);

// ── TABS ──
function swTab(id) {
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('on'));
  document.getElementById('tab-'+id).classList.add('on');
  document.getElementById('nav-'+id).classList.add('on');
}

// ── TOAST ──
let toastT;
function toast(msg,dur=2600) {
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),dur);
}

// ── LOG ──
function log(msg,type='green',cat='SYSTEM') {
  const el=document.getElementById('aLog'); if(!el) return;
  const m={green:'ld-g',red:'ld-r',amber:'ld-a',blue:'ld-b',purple:'ld-p'};
  const d=document.createElement('div'); d.className='li';
  d.innerHTML='<div class="ld '+(m[type]||'ld-b')+'"></div><div style="flex:1"><div class="lm">'+msg+'</div><div class="lt">'+new Date().toLocaleTimeString()+'</div></div><div class="lcat">'+cat+'</div>';
  el.insertBefore(d,el.firstChild);
  while(el.children.length>25) el.removeChild(el.lastChild);
}

// ── STATUS ──
function setStatus(txt,col='green') {
  document.getElementById('stTxt').textContent=txt;
  document.getElementById('sled').className='sled'+(col==='red'?' r':col==='amber'?' a':'');
  document.getElementById('hdrSt').className='hdr-status'+(col==='red'?' danger':'');
}

// ── VIBRATE ──
function vibe(p){if(!S.feats.vibe)return;try{navigator.vibrate&&navigator.vibrate(p);}catch(e){}}

// ── SOS BUTTON ──
function sosPrs(e) {
  e.preventDefault(); if(S.alert)return;
  vibe([60]); S.sosPrs++;
  for(let i=0;i<3;i++) document.getElementById('pd'+i)?.classList.toggle('lit',i<S.sosPrs);
  if(S.sosPrs>=3){clearTimeout(S.sosT);S.sosPrs=0;for(let i=0;i<3;i++)document.getElementById('pd'+i)?.classList.remove('lit');trigAlert('SOS','PANIC BUTTON × 3','😰',95);return;}
  toast('Press '+(3-S.sosPrs)+' more for SOS');
  clearTimeout(S.sosT);
  S.sosT=setTimeout(()=>{S.sosPrs=0;for(let i=0;i<3;i++)document.getElementById('pd'+i)?.classList.remove('lit');},1200);
}

// ── AI RISK ENGINE (Innovation #3) ──
function updateAI() {
  if(!S.feats.ai) return;
  const thresh = parseFloat(document.getElementById('ftSlider')?.value||2.5);
  const nmSecs = parseInt(document.getElementById('nmSlider')?.value||30);
  const motElapsed = (Date.now()-S.lastMot)/1000;

  // Compute signals 0-100
  S.motSig = Math.min(100, (motElapsed/nmSecs)*100);
  S.zoneSig = S.outside ? 80 : 0;
  // fallSig and voiceSig updated elsewhere

  // Anomaly contribution
  const anomalyBoost = S.anomaly * 0.3;

  // Multi-signal fusion (Innovation #3: context-aware combinations)
  let risk = 0;
  const f=S.fallSig, v=S.voiceSig, m=S.motSig, z=S.zoneSig;

  // Single signals
  risk += f * 0.5;
  risk += v * 0.4;
  risk += m * 0.3;
  risk += z * 0.2;

  // Fusion bonuses (fall+silence = critical)
  if(f>50 && m>50) risk += 30; // Fall + No motion = unconscious
  if(v>50 && f>30) risk += 25; // Voice + Fall = panic
  if(v>50 && m>60) risk += 20; // Voice + No motion = trapped
  if(z>50 && m>40) risk += 15; // Zone breach + no motion

  risk = Math.min(100, risk + anomalyBoost);
  S.riskScore = risk;

  // Update UI
  const rf=document.getElementById('riskFill'), rv=document.getElementById('riskVal');
  if(rf){rf.style.width=risk+'%';rf.style.background=risk>75?'var(--red)':risk>45?'var(--amber)':'var(--green)';}
  if(rv){rv.textContent=Math.round(risk)+'%';rv.style.color=risk>75?'var(--red)':risk>45?'var(--amber)':'var(--green)';}

  // AI cards on AI tab
  upAICard('aic-fall',f,'aic-fall-b','aic-fall-v',f>50?S.fallSig.toFixed(0)+'g':'None');
  upAICard('aic-voice',v,'aic-voice-b','aic-voice-v',v>50?'Detected':'None');
  upAICard('aic-motion',m,'aic-motion-b','aic-motion-v',m>70?Math.round(motElapsed)+'s':m>30?'Slow':'Active');
  upAICard('aic-zone',z,'aic-zone-b','aic-zone-v',S.outside?'BREACH':'Safe');

  // Mini cards home tab
  upMiniAI('ai-fall','aiFall','aiFallB',f,S.fallSig.toFixed(1)+'g');
  upMiniAI('ai-voice','aiVoice','aiVoiceB',v,v>50?'Keyword!':'Silent');
  upMiniAI('ai-motion','aiMotion','aiMotionB',m,m>50?Math.round(motElapsed)+'s':'Active');
  upMiniAI('ai-zone','aiZone','aiZoneB',z,S.outside?'BREACH':'Inside');

  // Fusion score label
  const fs=document.getElementById('fusionScore'), fa=document.getElementById('fusionAction');
  if(fs){
    if(risk>80){fs.textContent='CRITICAL';fs.style.color='var(--red)';}
    else if(risk>55){fs.textContent='HIGH RISK';fs.style.color='var(--amber)';}
    else if(risk>30){fs.textContent='CAUTION';fs.style.color='var(--amber)';}
    else{fs.textContent='LOW RISK';fs.style.color='var(--green)';}
  }
  if(fa){
    if(risk>80) fa.textContent='Triggering alert…';
    else if(risk>55) fa.textContent='Monitoring closely';
    else if(risk>30) fa.textContent='Slight concern';
    else fa.textContent='All clear';
    fa.style.color=risk>55?'var(--red)':risk>30?'var(--amber)':'var(--green)';
  }

  // Auto-trigger at critical risk
  if(risk>=85 && !S.alert && S.feats.ai) {
    trigAlert('AI FUSION','MULTI-SIGNAL CRITICAL RISK','🧠',Math.round(risk));
  }
}

function upAICard(cardId,pct,barId,valId,val) {
  const card=document.getElementById(cardId),bar=document.getElementById(barId),v=document.getElementById(valId);
  if(card) card.classList.toggle('active',pct>50);
  if(bar) {bar.style.width=pct+'%';bar.style.background=pct>75?'var(--red)':pct>40?'var(--amber)':'var(--purple)';}
  if(v) {v.textContent=val;v.className='ai-val'+(pct>50?' on':'');}
}

function upMiniAI(cardId,valId,barId,pct,val) {
  const card=document.getElementById(cardId),bar=document.getElementById(barId),v=document.getElementById(valId);
  if(card) card.classList.toggle('active',pct>50);
  if(bar) {bar.style.width=pct+'%';bar.style.background=pct>75?'var(--red)':pct>40?'var(--amber)':'var(--purple)';}
  if(v) {v.textContent=val;v.className='ai-val'+(pct>50?' on':'');}
}

// ── ADAPTIVE LEARNING (Innovation #5) ──
function learnMotion(mag) {
  S.motHistory.push({t:Date.now(),v:mag});
  if(S.motHistory.length>500) S.motHistory.shift();
  S.samples++;

  if(S.samples>30) {
    const recent=S.motHistory.slice(-30).map(h=>h.v);
    const avg=recent.reduce((a,b)=>a+b,0)/recent.length;
    const oldAvg=S.motHistory.slice(-120,-30).map(h=>h.v).reduce((a,b,i,arr)=>a+b/arr.length,0)||avg;
    const diff=Math.abs(avg-oldAvg)/Math.max(oldAvg,0.1);
    S.anomaly=Math.min(100,diff*200);
  }

  // Update UI
  const an=document.getElementById('anomaly'),anV=document.getElementById('anomalyV'),smp=document.getElementById('samples');
  if(an){an.style.width=S.anomaly+'%';an.style.background=S.anomaly>50?'var(--red)':S.anomaly>25?'var(--amber)':'var(--purple)';}
  if(anV) anV.textContent=Math.round(S.anomaly)+'%';
  if(smp) smp.textContent=S.samples;
  const dp=document.getElementById('dayPat'),dpV=document.getElementById('dayPatV');
  if(dp){dp.style.width=Math.min(100,S.samples/2)+'%';}
  if(dpV) dpV.textContent=S.samples>100?'Established':S.samples>30?'Building':'Learning';
}

// ── SMART CANCELLATION Audio (Innovation #6) ──
function startAudioConfirm(cb) {
  if(!S.feats.audio) { cb(false); return; }
  const win = parseInt(document.getElementById('audioSlider')?.value||10)*1000;
  document.getElementById('audioBdg').textContent='LISTENING';
  document.getElementById('audioConfirm').style.display='flex';
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  let replied=false;
  const timeout=setTimeout(()=>{
    if(!replied){replied=true;stopAudioConfirm();cb(false);}
  },win);
  if(SR) {
    try {
      const r=new SR(); r.lang='en-IN'; r.interimResults=false;
      r.onresult=e=>{
        const t=Array.from(e.results).map(r=>r[0].transcript).join(' ').toLowerCase();
        if(['yes','safe','ok','fine','i am safe','im safe','haan','theek','theek hai'].some(w=>t.includes(w))) {
          if(!replied){replied=true;clearTimeout(timeout);stopAudioConfirm();cb(true);}
        }
      };
      r.onerror=()=>{}; r.start(); S.audioRec=r;
    } catch(e){}
  }
}
function stopAudioConfirm() {
  document.getElementById('audioBdg').textContent='STANDBY';
  document.getElementById('audioConfirm').style.display='none';
  try{S.audioRec?.stop();}catch(e){}
}

// ── EMERGENCY TRIGGER ──
function trigAlert(type,sub,icon='🚨',risk=80) {
  if(S.alert) return;
  vibe([300,100,300,100,500]);

  // Smart cancellation: ask "Are you safe?" first
  if(S.feats.audio && type!=='SOS') {
    startAudioConfirm(isSafe => {
      if(isSafe) {
        log('Smart cancellation: user confirmed safe via audio','amber','AI');
        toast('✓ Confirmed safe — alert cancelled');
      } else {
        doTrigAlert(type,sub,icon,risk);
      }
    });
    toast('Say "YES I\'M SAFE" to cancel in '+document.getElementById('audioSlider').value+'s…',parseInt(document.getElementById('audioSlider').value)*1000);
    return;
  }
  doTrigAlert(type,sub,icon,risk);
}

function doTrigAlert(type,sub,icon,risk) {
  S.alert=true; S.alertType=type;
  setStatus('EMERGENCY','red');
  document.getElementById('eIco').textContent=icon;
  document.getElementById('eTitle').textContent=type;
  document.getElementById('eType').textContent=sub;
  document.getElementById('eSent').style.display='none';
  document.getElementById('eRisk').textContent='⚡ AI RISK SCORE: '+Math.round(risk||S.riskScore)+'%';
  const locStr=S.loc?S.loc.lat.toFixed(5)+', '+S.loc.lng.toFixed(5):'Location unavailable';
  document.getElementById('eLoc').textContent='📍 '+locStr;
  document.getElementById('eo').classList.add('show');
  S.cdVal=parseInt(document.getElementById('cdSlider')?.value||5);
  const total=S.cdVal; document.getElementById('cdArc').style.strokeDashoffset=0;
  updCD();
  S.cdTimer=setInterval(()=>{
    S.cdVal--; updCD();
    document.getElementById('cdArc').style.strokeDashoffset=((1-S.cdVal/total)*302);
    if(S.cdVal<=0){clearInterval(S.cdTimer);sendNow();}
  },1000);
  log('🚨 '+type+' — '+sub,'red','ALERT');
}

function updCD(){document.getElementById('cdNum').textContent=Math.max(0,S.cdVal);}

window.cancelAlert=()=>{
  clearInterval(S.cdTimer); stopAudioConfirm();
  S.alert=false; document.getElementById('eo').classList.remove('show');
  setStatus('MONITORING','green');
  S.fallSig=0; S.voiceSig=0;
  log('Alert cancelled — false alarm confirmed','amber','CANCEL');
  toast('✓ Alert cancelled'); vibe([80]);
};

window.sendNow=()=>{
  clearInterval(S.cdTimer); vibe([500,200,500,200,500]);
  const name=document.getElementById('pName')?.value||'User';
  const locStr=S.loc?S.loc.lat.toFixed(5)+', '+S.loc.lng.toFixed(5):'Unknown';
  const msg=(document.getElementById('sosMsg')?.value||'')
    .replace('{{NAME}}',name).replace('{{LOCATION}}',locStr)
    .replace('{{TIME}}',new Date().toLocaleString())
    .replace('{{TYPE}}',S.alertType)
    .replace('{{RISK}}',Math.round(S.riskScore)+'%');
  document.getElementById('eSent').style.display='block';
  log('📤 SOS SENT — '+S.alertType+' | '+locStr,'red','SENT');
  setStatus('ALERT SENT','red');
  const sc=document.getElementById('sCons');
  sc.innerHTML=S.contacts.map(c=>'<div class="so-c"><span>'+c.emoji+' '+c.name+'</span><span>✓</span></div>').join('');
  if(S.contacts.length>0){try{setTimeout(()=>window.open('sms:'+S.contacts[0].phone.replace(/\\s/g,'')+'?body='+encodeURIComponent(msg),'_blank'),600);}catch(e){}}
  setTimeout(()=>{document.getElementById('eo').classList.remove('show');document.getElementById('so').classList.add('show');S.alert=false;},1400);
};

window.closeSent=()=>{
  document.getElementById('so').classList.remove('show');
  setStatus('MONITORING','green'); S.fallSig=0; S.voiceSig=0;
  log('User confirmed safe','green','RESOLVED');
};

// ── VOICE DETECTION (Innovation #1 + Silent Mode #4) ──
const KEYWORDS=['help','sos','emergency','save me','accident','fire','danger'];
const SILENT_KW=['bachao','help me quietly','silent emergency','quiet help'];

function toggleMic(){S.micOn?stopMic():startMic();}

function startMic() {
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){toast('⚠ Speech API not available');return;}
  try{
    const r=new SR(); r.continuous=true; r.interimResults=true; r.lang='en-IN';
    S.rec=r;
    r.onstart=()=>{
      S.micOn=true;
      document.getElementById('micBtn').classList.add('live');
      document.getElementById('micTxt').textContent='Listening… say "HELP"';
      document.getElementById('micIco').textContent='🔴';
      document.getElementById('vBdg').textContent='LIVE'; document.getElementById('vBdg').className='bdg bg';
      document.getElementById('wf').classList.add('live');
      document.getElementById('svVoice').textContent='LIVE'; document.getElementById('svVoice').style.color='var(--green)';
    };
    r.onresult=e=>{
      const raw=Array.from(e.results).map(r=>r[0].transcript).join(' ').toLowerCase();
      document.getElementById('vtxTxt').textContent=raw.slice(-80)||'…';
      const hitKW=KEYWORDS.find(kw=>raw.includes(kw));
      const hitSilent=SILENT_KW.find(kw=>raw.includes(kw));
      KEYWORDS.concat(SILENT_KW).forEach(kw=>{
        const id='kw-'+kw.replace(/\\s+/g,'-');
        const el=document.getElementById(id);
        if(el) el.classList.toggle('hit',raw.includes(kw));
      });
      if(hitKW||hitSilent){
        S.voiceSig=100;
        document.getElementById('vtx').classList.add('hot');
        document.getElementById('wf').classList.add('hot');
        if(!S.alert){
          const isSilent=!!hitSilent;
          setTimeout(()=>trigAlert(isSilent?'SILENT EMERGENCY':'VOICE',
            isSilent?'SILENT KEYWORD "'+hitSilent?.toUpperCase()+'"':'KEYWORD "'+hitKW?.toUpperCase()+'"',
            isSilent?'🤫':'🗣️'),400);
        }
      } else {
        S.voiceSig=Math.max(0,S.voiceSig-5);
      }
    };
    r.onerror=()=>stopMic();
    r.onend=()=>{if(S.micOn)try{r.start();}catch(e){}};
    r.start();
  }catch(err){toast('Mic error: '+err.message);}
}

function stopMic(){
  S.micOn=false; S.voiceSig=0;
  try{S.rec?.stop();}catch(e){} S.rec=null;
  document.getElementById('micBtn').classList.remove('live');
  document.getElementById('micTxt').textContent='Start Voice Watch';
  document.getElementById('micIco').textContent='🎙️';
  document.getElementById('vBdg').textContent='OFFLINE'; document.getElementById('vBdg').className='bdg';
  document.getElementById('wf').classList.remove('live','hot');
  document.getElementById('vtx').classList.remove('hot');
  document.getElementById('vtxTxt').textContent='Tap mic to start listening…';
  document.getElementById('svVoice').textContent='OFF'; document.getElementById('svVoice').style.color='var(--text3)';
  document.querySelectorAll('.kp').forEach(p=>p.classList.remove('hit'));
}

// ── FALL DETECTION (Innovation #2) ──
function initMotion(){
  const sys=document.getElementById('sysMo');
  if(!window.DeviceMotionEvent){if(sys){sys.textContent='NOT SUPPORTED';sys.style.color='var(--red)';}startSimMotion();return;}
  if(typeof DeviceMotionEvent.requestPermission==='function'){
    DeviceMotionEvent.requestPermission().then(r=>{
      if(r==='granted'){attachMotion();if(sys){sys.textContent='ACTIVE';sys.style.color='var(--green)';}}
      else{startSimMotion();}
    }).catch(()=>startSimMotion());
  }else{attachMotion();if(sys){sys.textContent='ACTIVE';sys.style.color='var(--green)';}}
}
function attachMotion(){window.addEventListener('devicemotion',e=>{const a=e.accelerationIncludingGravity||e.acceleration;if(!a)return;procMot(a.x||0,a.y||0,a.z||0);},{passive:true});}
function startSimMotion(){let t=0;setInterval(()=>{t+=0.04;procMot(Math.sin(t*.4)*.08,Math.cos(t*.3)*.06,9.8+Math.sin(t*.6)*.04);},150);}

function procMot(x,y,z){
  const mag=Math.sqrt(x*x+y*y+z*z);
  const gMag=mag>2?mag/9.8:mag;
  S.lastMot=Date.now();
  learnMotion(gMag); // Adaptive learning
  updSensors(x,y,z,gMag);
  // Fall signal
  const thresh=parseFloat(document.getElementById('ftSlider')?.value||2.5);
  S.fallSig=Math.min(100,(gMag/thresh)*60);
  if(!S.feats.fall||S.fallCD||S.alert)return;
  if(gMag>thresh){
    S.fallCD=true; setTimeout(()=>S.fallCD=false,8000);
    trigAlert('FALL','IMPACT '+gMag.toFixed(1)+'G DETECTED','💥',85);
  }
}

function updSensors(x,y,z,mag){
  const thresh=parseFloat(document.getElementById('ftSlider')?.value||2.5);
  const fmt=v=>(v>=0?'+':'')+v.toFixed(2)+'g';
  const cls=v=>Math.abs(v)>thresh*.8?'sv sv-dg':Math.abs(v)>thresh*.5?'sv sv-wn':'sv sv-ok';
  const mfc=v=>Math.abs(v)>thresh*.8?'mf mf-r':Math.abs(v)>thresh*.5?'mf mf-a':'mf mf-g';
  const pct=v=>Math.min(100,Math.abs(v)/thresh*100);
  [['sX','mfX',x],['sY','mfY',y],['sZ','mfZ',z]].forEach(([si,mi,v])=>{
    const el=document.getElementById(si),mf=document.getElementById(mi);
    if(el){el.textContent=fmt(v);el.className=cls(v);}
    if(mf){mf.style.width=pct(v)+'%';mf.className=mfc(v);}
  });
  const mE=document.getElementById('sM'),iB=document.getElementById('iBar'),iP=document.getElementById('iPct');
  if(mE){mE.textContent=mag.toFixed(2)+'g';mE.className=mag>thresh?'sv sv-dg':mag>thresh*.6?'sv sv-wn':'sv sv-ok';}
  const ip=Math.min(100,(mag/thresh)*100);
  if(iB){iB.style.width=ip+'%';iB.style.background=ip>100?'var(--red)':ip>70?'var(--amber)':'var(--green)';}
  if(iP) iP.textContent=Math.round(ip)+'%';
}

// ── NO-MOTION DETECTION (Innovation #2 part) ──
function startNoMotionWatch(){
  setInterval(()=>{
    if(!S.feats.nomotion||S.alert)return;
    const secs=parseInt(document.getElementById('nmSlider')?.value||30);
    const elapsed=(Date.now()-S.lastMot)/1000;
    const svM=document.getElementById('svMot'),svMD=document.getElementById('svMotD');
    if(elapsed<5){if(svM){svM.textContent='ACTIVE';svM.style.color='var(--green)';}if(svMD)svMD.textContent='Just now';}
    else{if(svM){svM.textContent=Math.round(elapsed)+'s';svM.style.color=elapsed>secs*.7?'var(--amber)':'var(--text2)';}if(svMD)svMD.textContent=Math.round(elapsed)+'s ago';}
    if(elapsed>secs){S.lastMot=Date.now();trigAlert('NO MOTION','STILL FOR '+Math.round(elapsed)+'s','🧊',75);}
  },2000);
}

// ── GPS & GEOFENCE (Innovation #1 + boundary) ──
function initGPS(){
  const sys=document.getElementById('sysGp');
  if(!navigator.geolocation){if(sys){sys.textContent='NOT SUPPORTED';sys.style.color='var(--red)';}setFallback();return;}
  if(sys){sys.textContent='ACQUIRING…';sys.style.color='var(--amber)';}
  navigator.geolocation.watchPosition(pos=>{
    const lat=pos.coords.latitude,lng=pos.coords.longitude,acc=Math.round(pos.coords.accuracy);
    S.loc={lat,lng,acc};
    if(sys){sys.textContent='ACTIVE';sys.style.color='var(--green)';}
    document.getElementById('gLat').textContent=lat.toFixed(6);
    document.getElementById('gLng').textContent=lng.toFixed(6);
    document.getElementById('gAcc').textContent='±'+acc+'m';
    if(!S.home) setHome(lat,lng);
    checkPerim(lat,lng); updGeoViz();
  },()=>{if(sys){sys.textContent='DENIED';sys.style.color='var(--red)';}setFallback();},{enableHighAccuracy:true,maximumAge:8000,timeout:15000});
}
function setFallback(){S.loc={lat:18.6551,lng:73.9552,acc:50};if(!S.home)setHome(18.6551,73.9552);}
function setHome(lat,lng){
  S.home={lat,lng};
  document.getElementById('homeSet').textContent=lat.toFixed(4)+', '+lng.toFixed(4);
  document.getElementById('homeSet').style.color='var(--green)';
}
window.setHomeNow=()=>{if(!S.loc){toast('⚠ Location not ready');return;}setHome(S.loc.lat,S.loc.lng);toast('✓ Home set!');};
function hav(lat1,lon1,lat2,lon2){const R=6371e3,p1=lat1*Math.PI/180,p2=lat2*Math.PI/180,dp=(lat2-lat1)*Math.PI/180,dl=(lon2-lon1)*Math.PI/180,a=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
function checkPerim(lat,lng){
  if(!S.home||!S.feats.geo)return;
  // Night mode (Innovation extra)
  let rad=S.radius;
  if(S.feats.night){const h=new Date().getHours();if(h>=22||h<6)rad=rad/2;}
  const dist=hav(lat,lng,S.home.lat,S.home.lng);
  const out=dist>rad;
  const df=document.getElementById('dFill'),dv=document.getElementById('dVal'),ps=document.getElementById('pStat'),svP=document.getElementById('svPerim'),svPD=document.getElementById('svPerimD');
  const pct=Math.min(100,(dist/rad)*100);
  if(df)df.style.width=pct+'%';
  if(dv)dv.textContent=dist<1000?Math.round(dist)+'m':(dist/1000).toFixed(1)+'km';
  if(svPD)svPD.textContent=dist<1000?Math.round(dist)+'m from home':(dist/1000).toFixed(1)+'km away';
  S.zoneSig=Math.min(100,(dist/rad)*80);
  if(out&&!S.outside){S.outside=true;if(ps){ps.textContent='OUTSIDE!';ps.className='sv sv-dg';}if(svP){svP.textContent='BREACH';svP.style.color='var(--red)';}if(!S.alert)trigAlert('PERIMETER','OUTSIDE SAFE ZONE ('+Math.round(dist)+'m)','📍',70);}
  else if(!out){S.outside=false;if(ps){ps.textContent='INSIDE';ps.className='sv sv-ok';}if(svP){svP.textContent='INSIDE';svP.style.color='var(--green)';}}
  updGeoViz();
}
function updateRadius(v){S.radius=parseInt(v);document.getElementById('radDisp').textContent=v>=1000?(v/1000).toFixed(1)+'km':v+'m';if(S.loc)checkPerim(S.loc.lat,S.loc.lng);}
function updGeoViz(){
  const viz=document.getElementById('geoViz');if(!viz)return;
  const W=viz.clientWidth||300,H=viz.clientHeight||175,cx=W/2,cy=H/2,cR=Math.min(cx,cy)*.82;
  const gh=document.getElementById('gHome'),gu=document.getElementById('gUser'),gc=document.getElementById('gCircle'),gl=document.getElementById('gLbl');
  if(gh){gh.style.left=cx+'px';gh.style.top=cy+'px';}
  if(gc){gc.style.width=cR*2+'px';gc.style.height=cR*2+'px';gc.style.left=cx+'px';gc.style.top=cy+'px';gc.style.marginLeft=-cR+'px';gc.style.marginTop=-cR+'px';gc.style.borderColor=S.outside?'rgba(255,32,32,.5)':'rgba(40,214,104,.4)';gc.style.background=S.outside?'rgba(255,32,32,.04)':'rgba(40,214,104,.04)';}
  if(S.loc&&S.home&&gu){const d=hav(S.loc.lat,S.loc.lng,S.home.lat,S.home.lng),rel=Math.min(d,S.radius*1.5),uR=(rel/S.radius)*cR,angle=Math.atan2(S.loc.lng-S.home.lng,S.loc.lat-S.home.lat);gu.style.left=(cx+uR*Math.cos(angle))+'px';gu.style.top=(cy+uR*Math.sin(angle))+'px';}else if(gu){gu.style.left=cx+'px';gu.style.top=cy+'px';}
  if(gl)gl.textContent=S.outside?'⚠ OUTSIDE SAFE ZONE':'📡 HOME BASE';
}

// ── TOGGLES ──
const TMAP={fall:'tgl-fall',voice:'tgl-voice',nomotion:'tgl-nomotion',geo:'tgl-geo',triple:'tgl-triple',ai:'tgl-ai',audio:'tgl-audio',vibe:'tgl-vibe',silent:'tgl-silent',night:'tgl-night',vol:'tgl-vol'};
function togF(k){
  S.feats[k]=!S.feats[k];
  [TMAP[k],'tgl-'+k+'2'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.toggle('on',S.feats[k]);});
  if(k==='voice'&&!S.feats.voice&&S.micOn)stopMic();
  toast(k.toUpperCase()+' '+(S.feats[k]?'enabled':'disabled'));
  saveData();
}

// ── SIMULATIONS ──
let simNM=null;
function sim(type){
  if(S.alert){toast('Cancel current alert first');return;}
  if(type==='fall'){procMot(7.8,-4.2,0.5);setTimeout(()=>{if(!S.alert)trigAlert('FALL','SIMULATED 9.4G','💥',88);},300);return;}
  if(type==='voice'){document.getElementById('vtxTxt').textContent='"help me please"';document.getElementById('kw-help')?.classList.add('hit');document.getElementById('vtx')?.classList.add('hot');S.voiceSig=100;setTimeout(()=>{if(!S.alert)trigAlert('VOICE','KEYWORD "HELP" DETECTED','🗣️',75);},600);return;}
  if(type==='perimeter'){S.zoneSig=80;setTimeout(()=>{if(!S.alert)trigAlert('PERIMETER','SAFE ZONE BREACHED','📍',70);},300);return;}
  if(type==='nomotion'){let c=5;toast('No-motion in 5s…');clearInterval(simNM);simNM=setInterval(()=>{c--;if(c<=0){clearInterval(simNM);if(!S.alert)trigAlert('NO MOTION','STILL FOR 30s','🧊',72);}},1000);return;}
  if(type==='panic'){S.fallSig=60;S.voiceSig=70;setTimeout(()=>{if(!S.alert)trigAlert('PANIC','MULTI-SIGNAL PANIC','😰',90);},300);return;}
  if(type==='silent'){document.getElementById('vtxTxt').textContent='"bachao"';document.getElementById('kw-bachao')?.classList.add('hit');S.voiceSig=100;setTimeout(()=>{if(!S.alert)trigAlert('SILENT EMERGENCY','SILENT KEYWORD "BACHAO"','🤫',80);},400);return;}
}

// ── CONTACTS ──
function renderContacts(){
  const list=document.getElementById('conList');if(!list)return;
  if(!S.contacts.length){list.innerHTML='<div style="text-align:center;padding:16px;color:var(--text3)">No contacts yet</div>';return;}
  list.innerHTML=S.contacts.map((c,i)=>'<div class="con"><div class="av">'+c.emoji+'</div><div style="flex:1;min-width:0"><div class="cn">'+c.name+(c.pri?'<span style="font-family:var(--fm);font-size:8px;padding:2px 7px;border-radius:4px;background:rgba(26,95,255,.15);color:var(--blue);border:1px solid rgba(26,95,255,.3);margin-left:6px">PRIMARY</span>':'')+'</div><div class="cr2">'+c.rel.toUpperCase()+'</div><div class="cph">'+c.phone+'</div></div><div class="cas"><div class="ib2" onclick="callN(\\''+c.phone.replace(/\\s/g,'')+'\\')">📞</div><div class="ib2" onclick="delCon('+i+')">🗑️</div></div></div>').join('');
}
window.openModal=()=>document.getElementById('mo').classList.add('show');
window.closeModal=()=>document.getElementById('mo').classList.remove('show');
window.saveContact=()=>{
  const name=document.getElementById('nName').value.trim(),rel=document.getElementById('nRel').value.trim(),phone=document.getElementById('nPhone').value.trim(),emoji=document.getElementById('nEmoji').value.trim()||'👤';
  if(!name||!phone){toast('⚠ Name and phone required');return;}
  S.contacts.push({name,rel:rel||'Contact',phone,emoji,pri:S.contacts.length===0});
  saveData();renderContacts();window.closeModal();
  ['nName','nRel','nPhone','nEmoji'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  toast('✓ '+name+' added');
};
function delCon(i){S.contacts.splice(i,1);saveData();renderContacts();toast('Removed');}
window.callN=(n)=>{window.location.href='tel:'+n;};

// ── PROFILE ──
window.saveProf=()=>{
  S.profile.name=document.getElementById('pName')?.value||'User';
  S.profile.blood=document.getElementById('pBlood')?.value||'O+';
  S.profile.med=document.getElementById('pMed')?.value||'None';
  document.getElementById('pDisp').textContent=S.profile.name;
  document.getElementById('pSub').textContent=S.profile.blood+' · Saved';
  saveData();toast('✓ Profile saved');
};
window.saveSosMsg=()=>{saveData();toast('✓ Message saved');};

// ── PERSISTENCE ──
function saveData(){try{localStorage.setItem('ss3',JSON.stringify({contacts:S.contacts,feats:S.feats,profile:S.profile,sosMsg:document.getElementById('sosMsg')?.value,radius:S.radius}));}catch(e){}}
function loadData(){
  try{
    const d=JSON.parse(localStorage.getItem('ss3')||'null');if(!d)return;
    if(d.contacts)S.contacts=d.contacts;
    if(d.feats)Object.assign(S.feats,d.feats);
    if(d.profile)Object.assign(S.profile,d.profile);
    if(d.sosMsg&&document.getElementById('sosMsg'))document.getElementById('sosMsg').value=d.sosMsg;
    if(d.radius){S.radius=d.radius;document.getElementById('radSlider').value=d.radius;updateRadius(d.radius);}
    if(document.getElementById('pName'))document.getElementById('pName').value=S.profile.name;
    if(document.getElementById('pBlood'))document.getElementById('pBlood').value=S.profile.blood;
    if(document.getElementById('pMed'))document.getElementById('pMed').value=S.profile.med;
    document.getElementById('pDisp').textContent=S.profile.name;
    document.getElementById('pSub').textContent=S.profile.blood;
    Object.entries(TMAP).forEach(([k,id])=>{const el=document.getElementById(id);if(el)el.classList.toggle('on',!!S.feats[k]);});
  }catch(e){}
}

// ── API CHECKS ──
function checkAPIs(){
  const set=(id,ok)=>{const el=document.getElementById(id);if(el){el.textContent=ok?'AVAILABLE':'NOT SUPPORTED';el.style.color=ok?'var(--green)':'var(--red)';}};
  set('sysSp',!!(window.SpeechRecognition||window.webkitSpeechRecognition));
  set('sysMo',!!window.DeviceMotionEvent);
  set('sysGp',!!navigator.geolocation);
  set('sysVi',!!navigator.vibrate);
  const pw=document.getElementById('sysPwa');
  if(pw&&!S.installed){pw.textContent='NOT INSTALLED';pw.style.color='var(--amber)';}
}
function setSys(id,txt,col){const el=document.getElementById(id);if(el){el.textContent=txt;el.style.color=col;}}

// ── MULTI-MODAL FEEDBACK (Innovation #8) ──
function playAlarmSound(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    [440,520,440,660].forEach((freq,i)=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.frequency.value=freq;g.gain.setValueAtTime(.3,ctx.currentTime+i*.15);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.15+.14);
      o.start(ctx.currentTime+i*.15);o.stop(ctx.currentTime+i*.15+.15);
    });
  }catch(e){}
}

// ── INIT ──
function initApp(){
  loadData(); renderContacts(); checkAPIs();
  initGPS(); initMotion(); startNoMotionWatch();
  document.getElementById('initT').textContent=new Date().toLocaleTimeString();
  setTimeout(updGeoViz,500);
  window.addEventListener('resize',updGeoViz);
  // AI loop
  setInterval(()=>{updateAI();playAlarmSound&&S.alert&&vibe&&undefined;},1000);
  // Avg motion UI
  setInterval(()=>{
    const am=document.getElementById('avgMot'),amV=document.getElementById('avgMotV');
    if(S.motHistory.length>10){
      const avg=S.motHistory.slice(-20).map(h=>h.v).reduce((a,b)=>a+b,0)/Math.min(20,S.motHistory.length);
      if(am){am.style.width=Math.min(100,avg*40)+'%';}
      if(amV)amV.textContent=avg.toFixed(2)+'g';
    }
  },2000);
  log('All 9 innovations active — SilentShield v2.0 ready','blue','BOOT');
}

history.pushState(null,'',location.href);
window.addEventListener('popstate',()=>history.pushState(null,'',location.href));
`
