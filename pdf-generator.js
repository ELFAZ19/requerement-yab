// ===================== DIRECT PDF DOWNLOAD =====================
function printProposal() {
  // Show loading message
  const originalButton = event ? event.target : null;
  const originalText = originalButton ? originalButton.innerHTML : '';
  if (originalButton) {
    originalButton.disabled = true;
    originalButton.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Generating PDF...';
  }

  calcPricing();
  const d = window._exportData || collectData();
  const p = d?.pricing || {};
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  const validUntil = new Date(now.getTime()+14*24*60*60*1000).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

  const frontFeatures = d.features?.filter(f => {
    const allBk = [...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra];
    return !allBk.find(b => b.name === f.name);
  }) || [];
  const backFeatures = d.features?.filter(f => {
    const allBk = [...BACKEND_FEATURES.cms,...BACKEND_FEATURES.db,...BACKEND_FEATURES.auth,...BACKEND_FEATURES.ecom,...BACKEND_FEATURES.api,...BACKEND_FEATURES.infra];
    return allBk.find(b => b.name === f.name);
  }) || [];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a1a2e; background: #fff;">
      
      <div style="border-bottom: 4px solid #c9a84c; padding-bottom: 24px; margin-bottom: 32px;">
        <div style="width: 60px; height: 60px; background: #1a1a2e; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
          <span style="font-size: 24px; font-weight: 800; color: #c9a84c;">YD</span>
        </div>
        <div style="font-size: 28px; font-weight: 800; color: #1a1a2e; margin-bottom: 4px;">WEB DEVELOPMENT PROPOSAL</div>
        <div style="font-size: 12px; color: #666; margin-top: 12px;">Prepared by Yabsira Dejene • ${dateStr}</div>
        <div style="font-size: 11px; color: #666; margin-top: 8px;">Reference: PROJ-${Date.now().toString().slice(-6)} | Valid Until: ${validUntil}</div>
      </div>

      <div style="margin: 32px 0;">
        <div style="background: #1a1a2e; color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 16px;">
          <span style="font-size: 18px; font-weight: 700;">1. CLIENT INFORMATION</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${d.client?.name ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666; width: 180px;">Name</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;"><strong>${d.client.name}</strong></td></tr>` : ''}
          ${d.client?.email ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Email</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.client.email}</td></tr>` : ''}
          ${d.client?.phone ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Phone</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.client.phone}</td></tr>` : ''}
          ${d.client?.city ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Location</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.client.city}</td></tr>` : ''}
        </table>
      </div>

      <div style="margin: 32px 0;">
        <div style="background: #1a1a2e; color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 16px;">
          <span style="font-size: 18px; font-weight: 700;">2. PROJECT OVERVIEW</span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${d.project?.name ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666; width: 180px;">Project Name</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;"><strong>${d.project.name}</strong></td></tr>` : ''}
          ${d.project?.type ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Website Type</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.project.type}</td></tr>` : ''}
          ${d.project?.goal ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Primary Goal</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.project.goal}</td></tr>` : ''}
          ${d.project?.timeline ? `<tr style="border-bottom: 1px solid #e6e4e0;"><td style="padding: 10px 12px; font-size: 12px; color: #666;">Timeline</td><td style="padding: 10px 12px; font-size: 12px; color: #1a1a2e;">${d.project.timeline}</td></tr>` : ''}
        </table>
      </div>

      <div style="margin: 32px 0;">
        <div style="background: #1a1a2e; color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 16px;">
          <span style="font-size: 18px; font-weight: 700;">3. SCOPE OF WORK</span>
        </div>
        ${frontFeatures.length ? `
          <div style="font-size:11px;font-weight:700;color:#c9a84c;margin:20px 0 10px;">FRONT-END FEATURES</div>
          ${frontFeatures.map(f=>`<div style="padding:8px 12px;margin:4px 0;background:#f7f6f3;border-radius:6px;border-left:3px solid #c9a84c;display:flex;justify-content:space-between"><span style="font-size:13px;color:#1a1a2e;">✅ ${f.name}</span><span style="font-size:12px;color:#666;">${f.price.toLocaleString()} ETB</span></div>`).join('')}
        ` : ''}
        ${backFeatures.length ? `
          <div style="font-size:11px;font-weight:700;color:#c9a84c;margin:20px 0 10px;">BACK-END FEATURES</div>
          ${backFeatures.map(f=>`<div style="padding:8px 12px;margin:4px 0;background:#f7f6f3;border-radius:6px;border-left:3px solid #c9a84c;display:flex;justify-content:space-between"><span style="font-size:13px;color:#1a1a2e;">⚙️ ${f.name}</span><span style="font-size:12px;color:#666;">${f.price.toLocaleString()} ETB</span></div>`).join('')}
        ` : ''}
      </div>

      <div style="margin: 32px 0;">
        <div style="background: #1a1a2e; color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 16px;">
          <span style="font-size: 18px; font-weight: 700;">4. PRICING BREAKDOWN</span>
        </div>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e6e4e0;">
          ${(p.lines||[]).map(l=>`<tr style="border-bottom:1px solid #e6e4e0"><td style="padding:12px;font-size:13px;color:#555">${l.lbl}</td><td style="padding:12px;text-align:right;font-size:13px;color:${l.val<0?'#1a7a4a':'#1a1a2e'}">${l.val<0?'-':'+'}${Math.abs(l.val).toLocaleString()} ETB</td></tr>`).join('')}
          <tr style="background:#1a1a2e">
            <td style="color:#fff;padding:16px;font-weight:700;font-size:16px">TOTAL PROJECT COST</td>
            <td style="color:#c9a84c;padding:16px;text-align:right;font-size:18px;font-weight:700">${(p.finalTotal||0).toLocaleString()} ETB</td>
          </tr>
          <tr style="background:#e8f5e9">
            <td style="padding:12px;color:#1a7a4a;font-weight:600">💰 Upfront Deposit (${p.depositPct||50}%)</td>
            <td style="padding:12px;text-align:right;color:#1a7a4a;font-weight:600">${(p.deposit||0).toLocaleString()} ETB</td>
          </tr>
          <tr>
            <td style="padding:12px;font-size:13px;color:#555">Balance on Delivery</td>
            <td style="padding:12px;text-align:right;font-weight:600">${(p.remaining||0).toLocaleString()} ETB</td>
          </tr>
        </table>
        <p style="margin-top:12px;font-size:11px;color:#666;text-align:center"><em>Prices in Ethiopian Birr (ETB). Quote valid for 14 days.</em></p>
      </div>

      <div style="margin: 32px 0;">
        <div style="background: #1a1a2e; color: #fff; padding: 16px 20px; border-radius: 10px; margin-bottom: 16px;">
          <span style="font-size: 18px; font-weight: 700;">5. TERMS & CONDITIONS</span>
        </div>
        <div style="background:#f7f6f3;padding:20px;border-radius:8px;border-left:4px solid #c9a84c">
          <p style="margin:12px 0;font-size:12px;line-height:1.7;color:#444"><strong>1. Deposit:</strong> ${d.terms?.depositPct||50}% deposit required before work begins.</p>
          <p style="margin:12px 0;font-size:12px;line-height:1.7;color:#444"><strong>2. Revisions:</strong> ${d.terms?.revisions||'1'} round(s) of revisions included.</p>
          <p style="margin:12px 0;font-size:12px;line-height:1.7;color:#444"><strong>3. Support:</strong> ${d.terms?.support !== 'none' ? d.terms?.support + ' days bug-fix support included' : 'No support period included'}.</p>
          <p style="margin:12px 0;font-size:12px;line-height:1.7;color:#444"><strong>4. Payment:</strong> ${d.terms?.paymentMethod || 'Payment method to be agreed'}.</p>
          <p style="margin:12px 0;font-size:12px;line-height:1.7;color:#444"><strong>5. Validity:</strong> This quote is valid for 14 days from proposal date.</p>
        </div>
      </div>

      <div style="text-align:center;margin-top:32px;padding-top:16px;border-top:1px solid #e6e4e0;font-size:10px;color:#999">
        Yabsira Dejene Web Development • Dire Dawa, Ethiopia • Generated ${dateStr}
      </div>
    </div>`;

  // Use html2pdf library to generate PDF
  const clientName = (d.client && d.client.name) ? d.client.name.replace(/\s+/g,'-').toLowerCase() : 'client';
  const filename = `proposal-${clientName}-${Date.now()}.pdf`;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Create a temporary container
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  document.body.appendChild(tempDiv);

  // Generate PDF
  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(tempDiv).save().then(function() {
      // Clean up
      document.body.removeChild(tempDiv);
      if (originalButton) {
        originalButton.disabled = false;
        originalButton.innerHTML = originalText;
      }
      alert('✅ PDF downloaded successfully!');
    }).catch(function(error) {
      console.error('PDF generation error:', error);
      document.body.removeChild(tempDiv);
      if (originalButton) {
        originalButton.disabled = false;
        originalButton.innerHTML = originalText;
      }
      alert('❌ PDF generation failed. Error: ' + error.message);
    });
  } else {
    // Fallback to print dialog if html2pdf is not loaded
    document.body.removeChild(tempDiv);
    if (originalButton) {
      originalButton.disabled = false;
      originalButton.innerHTML = originalText;
    }
    alert('PDF library not loaded. Opening print dialog instead...');
    document.getElementById('pdf-template').innerHTML = html;
    setTimeout(() => window.print(), 300);
  }
}
