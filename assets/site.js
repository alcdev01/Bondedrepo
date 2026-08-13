(() => {
  'use strict';
  const data = window.UNBONDED_DATA || { sources: [], districts: [], events: [] };
  const contacts = window.UNBONDED_CONTACTS || [];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  const recordUrl = id => `source.html?id=${encodeURIComponent(id)}`;
  const titleLink = source => `<a class="source-title-link" href="${recordUrl(source.id)}">${escapeHtml(source.title)}</a>`;
  const chips = values => (values || []).slice(0, 5).map(value => `<span class="chip">${escapeHtml(value)}</span>`).join('');
  const sourceCard = source => `<article class="source-card"><p class="source-author">${escapeHtml(source.author)}</p><h3>${titleLink(source)}</h3><p class="source-meta">${source.year || 'Year not recorded'} · ${escapeHtml(source.methodType)} · ${escapeHtml(source.geography)}</p><p class="source-claim">${escapeHtml(source.claims?.[0] || source.claim)}</p><div class="source-footer">${chips([...(source.systems || []), ...(source.themes || [])])}</div></article>`;

  const setupNavigation = () => $('.nav-toggle')?.addEventListener('click', () => $('.nav-links')?.classList.toggle('open'));
  const unique = values => [...new Set(values.filter(Boolean))].sort();
  const fillSelect = (element, values) => unique(values).forEach(value => element?.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));
  const sourceOrganisation = author => contacts.find(contact => contact.aliases.some(alias => author.toLowerCase().includes(alias.toLowerCase())));

  function setupCatalogue() {
    const root = $('#catalogue'); if (!root) return;
    const controls = { search: $('#search'), system: $('#system-filter'), method: $('#method-filter'), year: $('#year-filter'), theme: $('#theme-filter'), linked: $('#doi-filter') };
    const systemOptions = ['Haliya', 'Kamaiya', 'Haruwa-Charuwa', 'Kamlari', 'Cross-system / general'];
    systemOptions.forEach(value => controls.system?.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));
    fillSelect(controls.method, data.sources.map(source => source.methodType));
    fillSelect(controls.year, data.sources.map(source => source.year));
    fillSelect(controls.theme, data.sources.flatMap(source => source.themes || []));
    if (controls.search) controls.search.value = new URLSearchParams(location.search).get('q') || '';
    const render = () => {
      const query = controls.search?.value.toLowerCase().trim() || '';
      const records = data.sources.filter(source => {
        const linked = /https?:\/\//.test([source.url, source.citation, source.gap].join(' '));
        return (!query || JSON.stringify(source).toLowerCase().includes(query)) && (!controls.system?.value || source.systems?.includes(controls.system.value)) && (!controls.method?.value || source.methodType === controls.method.value) && (!controls.year?.value || String(source.year) === controls.year.value) && (!controls.theme?.value || source.themes?.includes(controls.theme.value)) && (!controls.linked?.checked || linked);
      }).sort((a, b) => (b.year || 0) - (a.year || 0));
      $('#result-count').textContent = `${records.length} of ${data.sources.length} source records shown`;
      root.innerHTML = records.map(sourceCard).join('') || '<p class="empty">No source records match these filters.</p>';
    };
    Object.values(controls).filter(Boolean).forEach(control => control.addEventListener(control.type === 'search' ? 'input' : 'change', render));
    $('#search-button')?.addEventListener('click', render); render();
  }

  function setupDetail() {
    const root = $('#source-detail'); if (!root) return;
    const source = data.sources.find(item => item.id === new URLSearchParams(location.search).get('id'));
    if (!source) { root.innerHTML = '<section class="not-found"><h1>Source record not found</h1><p>Return to the catalogue to browse the repository.</p></section>'; return; }
    const selectedThemes = new Set(source.themes || []);
    const originalUrl = /^https?:\/\//.test(source.url || '') ? source.url : '';
    const related = data.sources.filter(item => item.id !== source.id).map(item => ({ item, shared: (item.themes || []).filter(theme => selectedThemes.has(theme)) })).filter(item => item.shared.length).sort((a, b) => b.shared.length - a.shared.length || (b.item.year || 0) - (a.item.year || 0)).slice(0, 3);
    const organisation = sourceOrganisation(source.author);
    const contactPanel = organisation ? `<section class="source-organisation"><p class="eyebrow">Organisation contact</p><h2>${escapeHtml(organisation.name)}</h2><p>Questions about this organisation’s work or publication may be directed through its public contact channels.</p><div class="contact-actions">${organisation.website ? `<a href="${escapeHtml(organisation.website)}" target="_blank" rel="noopener noreferrer">Organisation website ↗</a>` : ''}${organisation.contactUrl ? `<a href="${escapeHtml(organisation.contactUrl)}" target="_blank" rel="noopener noreferrer">Contact details ↗</a>` : ''}</div></section>` : '';
    root.innerHTML = `<article class="detail-main"><p class="eyebrow">${escapeHtml(source.id)} · ${escapeHtml(source.status)}</p><h1>${escapeHtml(source.title)}</h1><p class="detail-author">${escapeHtml(source.author)} · ${source.year || 'Year not recorded'}</p><div class="detail-citation">${escapeHtml(source.citation || 'Citation not yet recorded.')}</div>${originalUrl ? `<a class="original-source-cta" href="${escapeHtml(originalUrl)}" target="_blank" rel="noopener noreferrer">View original paper / source ↗</a>` : '<p class="original-source-unavailable">No stable original-paper link is recorded for this source.</p>'}<h2>Recorded findings</h2><ul class="claim-list">${(source.claims || [source.claim]).map(claim => `<li>${escapeHtml(claim)}</li>`).join('')}</ul><p class="callout">${escapeHtml(source.gap || 'No additional repository note recorded.')}</p>${contactPanel}<section class="related-sources"><p class="eyebrow">Explore related evidence</p><h2>Similar themed papers</h2>${related.length ? `<div class="related-list">${related.map(({ item, shared }) => `<article><p>${escapeHtml(item.author)} · ${item.year || 'Year not recorded'}</p><h3>${titleLink(item)}</h3><small>Shared theme${shared.length > 1 ? 's' : ''}: ${shared.map(escapeHtml).join(', ')}</small></article>`).join('')}</div>` : '<p>No other repository records share a coded theme with this source.</p>'}</section></article>`;
  }

  const publicationCard = source => `<article class="pub-card source-card"><div class="publication-year">${source.year}</div><p class="source-author">${escapeHtml(source.author)}</p><h3>${titleLink(source)}</h3><p class="source-meta">${escapeHtml(source.methodType)} · ${escapeHtml(source.geography)}</p><p class="source-claim">${escapeHtml(source.claims?.[0] || source.claim)}</p><div class="source-footer">${chips([...(source.systems || []), ...(source.themes || [])])}</div></article>`;
  function setupTimeline() {
    const history = $('#history-timeline'), publications = $('#publication-timeline'); if (!history || !publications) return;
    history.innerHTML = data.events.slice().sort((a, b) => b.year - a.year).map(event => `<article class="time-item"><div class="time-year">${event.year}</div><div class="time-card"><p class="eyebrow">Policy / historical record</p><h3>${event.url ? `<a class="timeline-record-link" href="${escapeHtml(event.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(event.title)} ↗</a>` : escapeHtml(event.title)}</h3><p>${escapeHtml(event.text)}</p>${event.url ? '<span class="record-link-note">Official legal text</span>' : ''}</div></article>`).join('');
    const system = $('#pub-system'), period = $('#pub-period');
    const renderPublications = () => { const start = Number(period?.value) || 0; const records = data.sources.filter(source => source.year && (!system?.value || source.systems?.includes(system.value)) && (!start || (source.year >= start && source.year < start + 5))).sort((a, b) => b.year - a.year); publications.innerHTML = records.map(publicationCard).join('') || '<p class="empty">No source records match these filters.</p>'; };
    [system, period].filter(Boolean).forEach(control => control.addEventListener('change', renderPublications)); renderPublications();
    const show = view => { const isHistory = view === 'history'; history.hidden = !isHistory; publications.hidden = isHistory; $('#publication-controls').hidden = isHistory; $$('[data-tab]').forEach(button => button.classList.toggle('active', button.dataset.tab === view)); };
    $$('[data-tab]').forEach(button => button.addEventListener('click', () => show(button.dataset.tab))); show('history');
  }

  function setupGeo() {
    const svg = $('#nepal-map'), info = $('#map-info'), metric = $('#map-metric'); if (!svg || !window.NEPAL_DISTRICTS) return;
    const coverage = { Dang:['Kamaiya'], Banke:['Kamaiya'], Bardiya:['Kamaiya'], Kailali:['Kamaiya','Haliya'], Kanchanpur:['Kamaiya','Haliya'], Bajhang:['Haliya'], Dadeldhura:['Haliya'], Baitadi:['Haliya'], Doti:['Haliya'], Bajura:['Haliya'], Achham:['Haliya'], Surkhet:['Haliya'], Jajarkot:['Haliya'], Humla:['Haliya'], Saptari:['Haruwa-Charuwa'], Siraha:['Haruwa-Charuwa'], Dhanusha:['Haruwa-Charuwa'], Mahottari:['Haruwa-Charuwa'], Sarlahi:['Haruwa-Charuwa'], Rautahat:['Haruwa-Charuwa'], Bara:['Haruwa-Charuwa'], Parsa:['Haruwa-Charuwa'], Morang:['Haruwa-Charuwa'], Sunsari:['Haruwa-Charuwa'], Jhapa:['Haruwa-Charuwa'] };
    const haliya = { Bajhang:{identified:2945,eligible:2945,landRecipients:2848}, Dadeldhura:{identified:2551,eligible:2551,landRecipients:2267}, Kanchanpur:{identified:2516,eligible:1991,landRecipients:1830} }; const labels = { identified:'Identified families', eligible:'Eligible category count', landRecipients:'Reported recipients', cash:'Average support (NPR)', timber:'Average timber (cu. ft.)' }; const district = name => data.districts.find(item => item.name === name); let selected = '';
    const paths = window.NEPAL_DISTRICTS.features, all=[]; const collect = value => typeof value[0] === 'number' ? all.push(value) : value.forEach(collect); paths.forEach(feature => collect(feature.geometry.coordinates)); const [minX,maxX,minY,maxY]=[Math.min(...all.map(point=>point[0])),Math.max(...all.map(point=>point[0])),Math.min(...all.map(point=>point[1])),Math.max(...all.map(point=>point[1]))]; const width=1400,height=740,padding=18; const point=([x,y])=>[padding+(x-minX)/(maxX-minX)*(width-padding*2),height-padding-(y-minY)/(maxY-minY)*(height-padding*2)]; const draw = feature => (feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates).map(polygon => polygon.map(ring => ring.map((coord,index) => `${index?'L':'M'}${point(coord)[0].toFixed(1)},${point(coord)[1].toFixed(1)}`).join(' ') + 'Z').join(' ')).join(' ');
    const seen=new Set(); svg.setAttribute('viewBox',`0 0 ${width} ${height}`); svg.innerHTML=paths.filter(feature=>{const name=feature.properties.shapeName;if(seen.has(name))return false;seen.add(name);return true;}).map(feature=>{const name=feature.properties.shapeName,systems=coverage[name],clickable=Boolean(district(name)||haliya[name]),kind=!systems?'':systems.length>1?'overlap':systems[0]==='Kamaiya'?'kamaiya':systems[0]==='Haliya'?'haliya':'haruwa';return `<path class="district ${systems?'covered '+kind:''} ${clickable?'clickable':''}" data-name="${escapeHtml(name)}" d="${draw(feature)}"><title>${escapeHtml(systems?`${name}: ${systems.join(' + ')}`:`${name}: no coded coverage`)}</title></path>`;}).join('');
    const renderInfo=()=>{if(!selected)return;const systems=coverage[selected],valueKey=metric.value,kamaiya=district(selected),haliyaData=haliya[selected]; const block=(name,values)=>`<section class="overlap-group"><h4>${name} data</h4>${values?.[valueKey]!==undefined?`<strong>${Number(values[valueKey]).toLocaleString()}</strong><p>${labels[valueKey]}</p>`:'<p>No comparable district-level value is recorded for this indicator.</p>'}</section>`; info.innerHTML=`<button class="map-close" aria-label="Close">×</button><p class="eyebrow">${systems.join(' + ')}</p><h3>${selected}</h3>${systems.length>1?block('Kamaiya',kamaiya)+block('Haliya',haliyaData):block(systems[0],kamaiya||haliyaData)}<p class="map-source-cue">Scroll down for sources based on this geography.</p>`; info.classList.add('has-data'); $('.map-close',info).addEventListener('click',()=>info.classList.remove('has-data'));};
    const renderSources=name=>{const section=$('#district-sources'),list=$('#district-source-list');section.hidden=false;$('#district-sources-title').textContent=`Sources specifically coded to ${name}`;const records=data.sources.filter(source=>source.geography?.toLowerCase().includes(name.toLowerCase()));list.innerHTML=records.map(sourceCard).join('')||'<p class="empty">No source record is explicitly coded to this district.</p>';};
    const tooltip=document.createElement('div');tooltip.className='district-hover-label';$('.geo-stage').append(tooltip);svg.addEventListener('pointermove',event=>{const target=event.target.closest('.district.covered');if(!target){tooltip.hidden=true;return;}const box=$('.geo-stage').getBoundingClientRect();tooltip.hidden=false;tooltip.textContent=target.dataset.name;tooltip.style.left=`${Math.min(event.clientX-box.left+14,box.width-160)}px`;tooltip.style.top=`${event.clientY-box.top+16}px`;}); svg.addEventListener('pointerleave',()=>tooltip.hidden=true);svg.addEventListener('click',event=>{const target=event.target.closest('.district.clickable');if(!target)return;selected=target.dataset.name;renderInfo();renderSources(selected);}); metric.addEventListener('change',renderInfo);
  }
  function setupContacts() {
    const root = $('#contacts-list'); if (!root) return;
    root.innerHTML = contacts.map(contact => `<article class="contact-card"><p class="eyebrow">Organisation contact</p><h2>${escapeHtml(contact.name)}</h2><p>${escapeHtml(contact.focus)}</p><dl>${contact.website ? `<div><dt>Website</dt><dd><a href="${escapeHtml(contact.website)}" target="_blank" rel="noopener noreferrer">Visit website ↗</a></dd></div>` : ''}${contact.email ? `<div><dt>Email</dt><dd><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></dd></div>` : ''}${contact.phone ? `<div><dt>Phone</dt><dd><a href="tel:${escapeHtml(contact.phone.replace(/[^+\d]/g, ''))}">${escapeHtml(contact.phone)}</a></dd></div>` : ''}${contact.contactUrl ? `<div><dt>Contact page</dt><dd><a href="${escapeHtml(contact.contactUrl)}" target="_blank" rel="noopener noreferrer">Open public contact details ↗</a></dd></div>` : ''}</dl>${!contact.website && !contact.email ? '<p class="contact-availability">Only a public telephone contact is recorded here; no website or email has been added without verification.</p>' : ''}</article>`).join('');
  }
  setupNavigation(); setupCatalogue(); setupDetail(); setupTimeline(); setupGeo(); setupContacts();
})();
