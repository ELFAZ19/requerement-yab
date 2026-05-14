// ===================== TOAST NOTIFICATION SYSTEM =====================
function showToast(message, type = 'success', duration = 4500) {
  // Inject keyframe styles once
  if (!document.getElementById('yd-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'yd-toast-styles';
    style.textContent = `
      @keyframes ydToastIn  { from { opacity:0; transform:translateX(110%); } to { opacity:1; transform:translateX(0); } }
      @keyframes ydToastOut { from { opacity:1; transform:translateX(0);    } to { opacity:0; transform:translateX(110%); } }
      .yd-toast-bar { transition: width linear; }
    `;
    document.head.appendChild(style);
  }

  const configs = {
    success: { bg:'#1a1a2e', accent:'#c9a84c', icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`, label:'Success' },
    error:   { bg:'#2d0a0a', accent:'#e74c3c', icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`, label:'Error' },
    warning: { bg:'#1a1506', accent:'#f39c12', icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f39c12" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.5" stroke-width="3"/></svg>`, label:'Warning' },
    info:    { bg:'#0a1020', accent:'#3b82f6', icon:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.5" stroke-width="3"/></svg>`, label:'Info' },
  };
  const cfg = configs[type] || configs.success;

  // Container (bottom-right stack)
  let container = document.getElementById('yd-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'yd-toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column-reverse;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }

  // Toast element
  const toast = document.createElement('div');
  toast.style.cssText = `
    pointer-events:all;
    min-width:300px;max-width:420px;
    background:${cfg.bg};
    border:1px solid ${cfg.accent}33;
    border-left:4px solid ${cfg.accent};
    border-radius:12px;
    padding:14px 16px 10px;
    box-shadow:0 8px 32px rgba(0,0,0,.45),0 2px 8px rgba(0,0,0,.3);
    font-family:Arial,sans-serif;
    animation:ydToastIn .35s cubic-bezier(.21,1.02,.73,1) forwards;
    overflow:hidden;
    position:relative;
  `;

  toast.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:12px;">
      <div style="flex-shrink:0;margin-top:1px;">${cfg.icon}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:${cfg.accent};margin-bottom:4px;">${cfg.label}</div>
        <div style="font-size:13px;color:#e8e6e0;line-height:1.5;word-wrap:break-word;">${message}</div>
      </div>
      <button onclick="this.closest('.yd-toast-el').remove()" style="flex-shrink:0;background:none;border:none;cursor:pointer;color:#666;padding:0;line-height:1;margin-top:-2px;font-size:18px;">&times;</button>
    </div>
    <div class="yd-toast-bar" style="position:absolute;bottom:0;left:0;height:3px;background:${cfg.accent};border-radius:0 0 0 8px;width:100%;margin-top:10px;"></div>
  `;
  toast.classList.add('yd-toast-el');

  container.appendChild(toast);

  // Progress bar shrink
  const bar = toast.querySelector('.yd-toast-bar');
  requestAnimationFrame(() => {
    bar.style.transition = `width ${duration}ms linear`;
    bar.style.width = '0%';
  });

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast.querySelector('button').addEventListener('click', () => { clearTimeout(timer); dismissToast(toast); });
}

function dismissToast(toast) {
  if (!toast || !toast.parentNode) return;
  toast.style.animation = 'ydToastOut .3s ease forwards';
  setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
}

// ===================== ENHANCED PDF DOWNLOAD =====================
function printProposal() {
  const btn = event ? (event.currentTarget || event.target) : null;
  const origHTML = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Generating PDF...'; }

  calcPricing();
  const d = window._exportData || collectData();
  const p = d.pricing || {};
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const validUntil = new Date(now.getTime()+14*24*60*60*1000).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const ref = 'PROJ-'+Date.now().toString().slice(-6);

  const allBkNames = new Set([
    ...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,
    ...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra
  ].map(b=>b.name));
  const frontF = (d.features||[]).filter(f=>!allBkNames.has(f.name));
  const backF  = (d.features||[]).filter(f=> allBkNames.has(f.name));

  const contentMap={photo:'Profile photos',bio:'Bio/About text',portfolio:'Portfolio samples',
    cv:'CV/Resume',domain:'Domain name',logo:'Logo/Brand assets',products:'Product info',hosting:'Hosting account'};
  const contentList = d.project?.contentReady
    ? Object.entries(d.project.contentReady).filter(([,v])=>v).map(([k])=>contentMap[k]||k).join(', ')||'None confirmed yet'
    : 'None confirmed yet';

  const R=(lbl,val)=>val&&val!=='—'?`<tr><td style="padding:8px 14px;font-size:11px;color:#666;width:38%;border-bottom:1px solid #eee;vertical-align:top;font-weight:500;">${lbl}</td><td style="padding:8px 14px;font-size:11px;color:#1a1a2e;border-bottom:1px solid #eee;">${val}</td></tr>`:'';
  const SEC=(n,t)=>`<div style="display:flex;align-items:center;gap:12px;margin:24px 0 12px;"><div style="min-width:30px;height:30px;background:#1a1a2e;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#c9a84c;">${n}</div><div style="font-size:14px;font-weight:800;color:#1a1a2e;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #c9a84c;flex:1;padding-bottom:4px;">${t}</div></div>`;
  const FEAT=(icon,name,price)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 12px;margin:3px 0;background:#f7f6f3;border-radius:6px;border-left:3px solid #c9a84c;"><span style="font-size:11.5px;color:#1a1a2e;">${icon} ${name}</span><span style="font-size:11px;color:#777;font-family:monospace;white-space:nowrap;margin-left:8px;">${Number(price).toLocaleString()} ETB</span></div>`;
  const DIVIDER=`<div style="height:1px;background:#e8e6e1;margin:20px 0;"></div>`;

  const priceRows=(p.lines||[]).map(l=>`<tr><td style="padding:9px 14px;font-size:11.5px;color:#555;border-bottom:1px solid #eee;">${l.lbl}</td><td style="padding:9px 14px;text-align:right;font-size:11.5px;color:${l.val<0?'#1a7a4a':'#1a1a2e'};border-bottom:1px solid #eee;font-family:monospace;">${l.val<0?'-':'+'}${Math.abs(l.val).toLocaleString()} ETB</td></tr>`).join('');

  const termsList=[
    `A deposit of <strong>${d.terms?.depositPct||50}%</strong> is required before work begins.`,
    `Client must provide all content (text, images, logo) by agreed deadline. Delays extend the timeline.`,
    `Revisions beyond included rounds billed at <strong>500–2,000 ETB per round</strong>.`,
    `Client owns all deliverables upon full payment. Freelancer may display work in portfolio.`,
    `Rush delivery (under 1 week) carries a <strong>30% surcharge</strong>.`,
    `This quote is valid for <strong>14 days</strong> from the proposal date.`,
    `New features added after project start require a separate quote.`,
    `Hosting, domain, and 3rd-party API costs are <strong>NOT included</strong> unless listed above.`
  ].map((t,i)=>`<div style="display:flex;gap:10px;margin-bottom:7px;font-size:11px;color:#444;line-height:1.65;"><span style="min-width:18px;height:18px;background:#1a1a2e;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#c9a84c;flex-shrink:0;margin-top:1px;">${i+1}</span><span>${t}</span></div>`).join('');

  const html=`<div style="font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;color:#1a1a2e;background:#fff;box-sizing:border-box;">

<!-- ══ FULL-BLEED HEADER (starts at top edge) ══ -->
<div style="background:#1a1a2e;padding:28px 36px 24px;margin:0;display:flex;align-items:center;justify-content:space-between;">
  <div style="display:flex;align-items:center;gap:16px;">
    <div style="width:54px;height:54px;background:#c9a84c;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
      <span style="font-size:21px;font-weight:900;color:#1a1a2e;letter-spacing:-1px;">YD</span>
    </div>
    <div>
      <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:#c9a84c;margin-bottom:4px;">Web Development Proposal</div>
      <div style="font-size:22px;font-weight:800;color:#fff;line-height:1.1;">Client Proposal</div>
      <div style="font-size:11px;color:#9a9aaa;margin-top:3px;">Yabsira Dejene · Dire Dawa, Ethiopia</div>
    </div>
  </div>
  <div style="text-align:right;">
    <div style="font-size:9px;color:#777;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em;">Date Issued</div>
    <div style="font-size:14px;font-weight:700;color:#fff;">${dateStr}</div>
    <div style="font-size:10px;font-family:monospace;color:#c9a84c;margin-top:6px;background:rgba(201,168,76,.15);padding:3px 8px;border-radius:4px;display:inline-block;">${ref}</div>
    <div style="font-size:10px;color:#777;margin-top:5px;">Valid until: ${validUntil}</div>
  </div>
</div>
<div style="height:4px;background:linear-gradient(90deg,#c9a84c,#e8c96a,#c9a84c);"></div>

<!-- ══ BODY CONTENT ══ -->
<div style="padding:28px 36px 36px;">

${SEC(1,'Parties')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
  <div>
    <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#c9a84c;margin-bottom:7px;">Freelancer</div>
    <table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
      ${R('Name','<strong>Yabsira Dejene</strong>')}
      ${R('Specialty','Full-Stack Web Dev &amp; UI/UX')}
      ${R('Location','Dire Dawa, Ethiopia')}
    </table>
  </div>
  <div>
    <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#c9a84c;margin-bottom:7px;">Client</div>
    <table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
      ${R('Name',`<strong>${d.client?.name||'—'}</strong>`)}
      ${R('Email',d.client?.email)}
      ${R('Phone',d.client?.phone)}
      ${R('Location',d.client?.city)}
      ${R('Profession',d.client?.profession)}
      ${R('Organization',d.client?.org)}
      ${R('Client Type',d.client?.type)}
      ${R('Contact Method',d.client?.contactMethod)}
      ${R('Found via',d.client?.source)}
    </table>
  </div>
</div>
${d.client?.notes?`<div style="margin-top:12px;padding:12px 16px;background:#f7f6f3;border-radius:8px;border-left:4px solid #c9a84c;"><div style="font-size:9px;font-weight:700;color:#999;margin-bottom:5px;text-transform:uppercase;letter-spacing:.08em;">Meeting Notes</div><div style="font-size:11.5px;color:#444;line-height:1.7;">${d.client.notes}</div></div>`:''}

${DIVIDER}${SEC(2,'Business Profile')}
<table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
  ${R('Business Type',d.business?.type)}
  ${R('Industry Sector',d.business?.sector)}
  ${R('Team Size',d.business?.size)}
  ${R('Revenue Range',d.business?.revenue)}
  ${R('Existing Website',d.business?.existing||'No — brand new site')}
  ${R('Technical Level',d.business?.techLevel)}
  ${R('Site Manager',d.business?.manager)}
  ${R('Compliance Needs',d.business?.compliance||'None specified')}
  ${R('Budget Expectation',d.client?.budget)}
  ${R('Urgency Level',d.client?.urgency)}
  ${R('Decision Maker',d.client?.decision)}
  ${R('Confidence Level',d.client?.confidence)}
</table>

${DIVIDER}${SEC(3,'Project Overview')}
<table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
  ${R('Project Name',`<strong>${d.project?.name||'—'}</strong>`)}
  ${R('Website Type',d.project?.type)}
  ${R('Primary Goal',d.project?.goal)}
  ${R('Target Audience',d.project?.audience)}
  ${R('Design Style',d.project?.style)}
  ${R('Language(s)',d.project?.lang)}
  ${R('Page Count',d.project?.pages)}
  ${R('Timeline',(d.project?.timeline||'—')+(d.project?.rush?' &nbsp;<strong style="color:#c0392b;">⚠️ RUSH +30%</strong>':''))}
  ${R('Content Ready',contentList)}
</table>
${(d.tech?.frontend||d.tech?.backend||d.tech?.database||d.tech?.hosting)?`
<div style="margin-top:12px;">
  <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:7px;">Tech Stack Selected</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
    ${d.tech?.frontend?`<div style="padding:7px 12px;background:#eef0ff;border-radius:6px;font-size:11px;"><span style="color:#888;">Frontend: </span><strong>${d.tech.frontend}</strong></div>`:''}
    ${d.tech?.backend?`<div style="padding:7px 12px;background:#eef0ff;border-radius:6px;font-size:11px;"><span style="color:#888;">Backend: </span><strong>${d.tech.backend}</strong></div>`:''}
    ${d.tech?.database?`<div style="padding:7px 12px;background:#eef0ff;border-radius:6px;font-size:11px;"><span style="color:#888;">Database: </span><strong>${d.tech.database}</strong></div>`:''}
    ${d.tech?.hosting?`<div style="padding:7px 12px;background:#eef0ff;border-radius:6px;font-size:11px;"><span style="color:#888;">Hosting: </span><strong>${d.tech.hosting}</strong></div>`:''}
  </div>
</div>`:''}
${d.project?.refs?`<div style="margin-top:10px;padding:11px 14px;background:#f7f6f3;border-radius:8px;border-left:4px solid #ddd;"><div style="font-size:9px;font-weight:700;color:#999;margin-bottom:4px;text-transform:uppercase;">Reference Websites</div><div style="font-size:11.5px;color:#555;line-height:1.6;">${d.project.refs}</div></div>`:''}

${DIVIDER}${SEC(4,'Scope of Work')}
${frontF.length?`<div style="margin-bottom:14px;"><div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#fff;background:#2d2d4e;padding:6px 12px;border-radius:5px;margin-bottom:7px;">✅ Front-End Features (${frontF.length})</div>${frontF.map(f=>FEAT('✅',f.name,f.price)).join('')}</div>`:'<div style="font-size:11px;color:#aaa;padding:6px 0;">No front-end features selected.</div>'}
${backF.length?`<div style="margin-bottom:14px;"><div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#fff;background:#2d2d4e;padding:6px 12px;border-radius:5px;margin-bottom:7px;">⚙️ Back-End / CMS / Database (${backF.length})</div>${backF.map(f=>FEAT('⚙️',f.name,f.price)).join('')}</div>`:''}
${(d.addons||[]).length?`<div style="margin-bottom:8px;"><div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#fff;background:#2d2d4e;padding:6px 12px;border-radius:5px;margin-bottom:7px;">➕ Add-On Services</div>${(d.addons||[]).map(a=>FEAT('➕',a.name+(a.monthly?' (monthly)':''),a.price)).join('')}</div>`:''}

${DIVIDER}${SEC(5,'Pricing Breakdown')}
<table style="width:100%;border-collapse:collapse;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
  <thead><tr style="background:#f7f6f3;"><th style="padding:9px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#888;font-weight:700;">Item</th><th style="padding:9px 14px;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#888;font-weight:700;">Amount</th></tr></thead>
  <tbody>${priceRows}</tbody>
  <tfoot>
    <tr style="background:#1a1a2e;"><td style="padding:14px;font-weight:800;font-size:13px;color:#fff;">TOTAL PROJECT COST</td><td style="padding:14px;text-align:right;font-size:17px;font-weight:800;color:#c9a84c;font-family:monospace;">${(p.finalTotal||0).toLocaleString()} ETB</td></tr>
    <tr style="background:#eaf5ea;"><td style="padding:10px 14px;font-size:12px;font-weight:700;color:#1a7a4a;">💰 Upfront Deposit (${p.depositPct||50}%)</td><td style="padding:10px 14px;text-align:right;font-size:13px;font-weight:700;color:#1a7a4a;font-family:monospace;">${(p.deposit||0).toLocaleString()} ETB</td></tr>
    <tr style="background:#fafafa;"><td style="padding:9px 14px;font-size:11.5px;color:#555;">Balance on Delivery</td><td style="padding:9px 14px;text-align:right;font-size:12px;font-weight:600;color:#1a1a2e;font-family:monospace;">${(p.remaining||0).toLocaleString()} ETB</td></tr>
  </tfoot>
</table>
<div style="margin-top:7px;text-align:center;font-size:10px;color:#aaa;font-style:italic;">Prices in Ethiopian Birr (ETB). Quote valid for 14 days from proposal date.</div>

${DIVIDER}${SEC(6,'Terms &amp; Conditions')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
  <table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
    <tr><td colspan="2" style="padding:7px 14px 3px;font-size:9px;font-weight:700;text-transform:uppercase;color:#c9a84c;letter-spacing:.1em;">Payment Terms</td></tr>
    ${R('Deposit Required',(d.terms?.depositPct||50)+'% upfront')}
    ${R('Payment Method',d.terms?.paymentMethod)}
    ${R('Payment Schedule',d.terms?.paymentSchedule)}
    ${R('Invoice Currency',d.terms?.currency||'ETB')}
  </table>
  <table style="width:100%;border-collapse:collapse;background:#fafaf8;border-radius:8px;overflow:hidden;">
    <tr><td colspan="2" style="padding:7px 14px 3px;font-size:9px;font-weight:700;text-transform:uppercase;color:#c9a84c;letter-spacing:.1em;">Delivery &amp; Support</td></tr>
    ${R('Revisions',(d.terms?.revisions||'1')+' round(s) included')}
    ${R('Post-Launch Support',d.terms?.support&&d.terms.support!=='none'?(d.terms.support+' days bug-fix support'):'No support period included')}
  </table>
</div>
<div style="background:#f7f6f3;padding:16px 18px;border-radius:8px;border-left:4px solid #c9a84c;">
  <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:10px;">Standard Terms</div>
  ${termsList}
</div>

${DIVIDER}${SEC(7,'Acceptance &amp; Signatures')}
<div style="background:#f7f6f3;padding:13px 16px;border-radius:8px;margin-bottom:18px;font-size:11.5px;color:#555;line-height:1.7;">
  By proceeding with the deposit payment, the client confirms they have read, understood, and agree to all terms in this proposal.
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
  <div style="border:1px solid #ddd;border-radius:8px;padding:16px 18px;">
    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:9px;">Freelancer</div>
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:3px;">Yabsira Dejene</div>
    <div style="font-size:10.5px;color:#888;margin-bottom:18px;">Full-Stack Web Developer · Dire Dawa, Ethiopia</div>
    <div style="border-top:1px dashed #ccc;padding-top:6px;font-size:9.5px;color:#aaa;">Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  </div>
  <div style="border:1px solid #ddd;border-radius:8px;padding:16px 18px;">
    <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:9px;">Client</div>
    <div style="font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:3px;">${d.client?.name||'________________________'}</div>
    <div style="font-size:10.5px;color:#888;margin-bottom:18px;">${d.client?.org||d.client?.type||'Client'}</div>
    <div style="border-top:1px dashed #ccc;padding-top:6px;font-size:9.5px;color:#aaa;">Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  </div>
</div>

<!-- ══ FOOTER ══ -->
<div style="margin-top:30px;padding-top:14px;border-top:2px solid #1a1a2e;display:flex;justify-content:space-between;align-items:center;">
  <div style="display:flex;align-items:center;gap:10px;">
    <div style="width:26px;height:26px;background:#1a1a2e;border-radius:6px;display:flex;align-items:center;justify-content:center;"><span style="font-size:10px;font-weight:900;color:#c9a84c;">YD</span></div>
    <span style="font-size:10px;color:#999;">Yabsira Dejene Web Development · Dire Dawa, Ethiopia</span>
  </div>
  <div style="text-align:right;font-size:9.5px;color:#aaa;">${ref} · ${dateStr}<br><span style="color:#c9a84c;">Valid until ${validUntil}</span></div>
</div>

</div><!-- end body -->
</div><!-- end wrapper -->`;

  const clientName=(d.client?.name)?d.client.name.replace(/\s+/g,'-').toLowerCase():'client';
  const filename=`proposal-${clientName}-${Date.now()}.pdf`;

  const opt={
    margin:[0,0,0,0],
    filename:filename,
    image:{type:'jpeg',quality:0.98},
    html2canvas:{scale:2,useCORS:true,letterRendering:true,logging:false},
    jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}
  };

  if(typeof html2pdf!=='undefined'){
    html2pdf().set(opt).from(html).save()
      .then(()=>{
        if(btn){btn.disabled=false;btn.innerHTML=origHTML;}
        showToast('PDF downloaded successfully! Check your Downloads folder.','success');
      })
      .catch(err=>{
        console.error('PDF error:',err);
        if(btn){btn.disabled=false;btn.innerHTML=origHTML;}
        showToast('PDF generation failed: '+err.message,'error');
      });
  } else {
    if(btn){btn.disabled=false;btn.innerHTML=origHTML;}
    showToast('PDF library not loaded. Please refresh the page and try again.','warning');
  }
}
