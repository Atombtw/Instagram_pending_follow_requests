// Takip İsteği Geri Çekici v5
// instagram.com açıkken tarayıcı konsoluna yapıştırarak çalıştırın. Ayrıntılar için README.md.
(async () => {
  if (!/(^|\.)instagram\.com$/.test(location.hostname)) { alert('Bu kodu instagram.com üzerinde çalıştır.'); return; }
  const APP_ID = '936619743392459';
  const CACHE_KEY = 'igc_cache_v2';
  const POS_KEY = 'igc_pos_v1';
  const CACHE_TTL = 24 * 60 * 60 * 1000;
  const T = { scanMin: 2000, scanMax: 4000, scanPauseEvery: 15, scanPause: 30000, cancelPauseEvery: 10, cancelPause: 240000 };
  const RATE_BACKOFF = [2, 5, 10, 20]; // dakika
  const getCookie = n => { const m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : null; };
  const viewer = getCookie('ds_user_id');
  if (!viewer || !getCookie('csrftoken')) { alert("Önce Instagram'a giriş yap."); return; }
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ---------- Temizlik ----------
  window.__igcCleanup?.();
  ['igc-panel', 'igc-root', 'igc-style'].forEach(id => document.getElementById(id)?.remove());

  // ---------- Stil ----------
  const R = '#igc-root';
  const style = document.createElement('style');
  style.id = 'igc-style';
  style.textContent = `
${R}{--bg:#161513;--bg2:#201e1a;--bg3:#2b2823;--line:rgba(247,244,239,.10);--line2:rgba(247,244,239,.20);--text:#f7f4ef;--muted:#9a948a;--accent:#f0508a;--accent2:#ff6b9d;--grad:linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5);--ok:#22c55e;--warn:#f5a524;--err:#f06a5d;--info:#60a5fa;position:fixed;inset:0;pointer-events:none;z-index:2147483647;color:var(--text);font:13px/1.45 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;color-scheme:dark}
${R} *{box-sizing:border-box}
${R}>*{pointer-events:auto}
${R} [hidden]{display:none!important}
${R} :focus-visible{outline:2px solid var(--accent);outline-offset:2px}
${R} .igc-panel{position:absolute;right:18px;top:18px;width:390px;max-width:calc(100vw - 24px);max-height:calc(100vh - 24px);display:flex;flex-direction:column;background:var(--bg);border:1px solid var(--line);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.45),0 2px 6px rgba(0,0,0,.3);overflow:hidden;animation:igc-pop .18s ease-out}
@keyframes igc-pop{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}
${R} .igc-head{flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 12px 12px 14px;border-bottom:1px solid var(--line);cursor:grab;user-select:none;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)}
${R} .igc-head.drag{cursor:grabbing}
${R} .igc-brand{display:flex;align-items:center;gap:10px;min-width:0}
${R} .igc-dot{width:10px;height:10px;border-radius:50%;background:var(--grad);flex-shrink:0}
${R} .igc-brand strong{display:block;font-size:14px;font-weight:600}
${R} .igc-brand small{display:block;font-size:11px;color:var(--muted)}
${R} .igc-icons{display:flex;gap:4px;flex-shrink:0}
${R} .igc-icons button{width:28px;height:28px;display:grid;place-items:center;border:0;background:transparent;border-radius:6px;color:var(--muted);cursor:pointer;transition:background .15s,color .15s}
${R} .igc-icons button:hover{background:var(--bg2);color:var(--text)}
${R} .igc-body{padding:14px 16px;display:flex;flex-direction:column;gap:12px;overflow-y:auto;min-height:0;scrollbar-width:thin;scrollbar-color:var(--line2) transparent}
${R} .igc-label{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:6px}
${R} .igc-textarea{display:block;width:100%;height:96px;resize:vertical;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg2);color:var(--text);font:12px/1.5 ui-monospace,Consolas,monospace;outline:none;transition:border-color .15s}
${R} .igc-textarea::placeholder{color:#6d685f}
${R} .igc-textarea:focus,${R} .igc-num:focus{border-color:var(--accent)}
${R} .igc-row{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
${R} .igc-delay{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted)}
${R} .igc-num{width:52px;height:30px;padding:0 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg2);color:var(--text);font:inherit;outline:none}
${R} .igc-switch{display:flex;align-items:center;gap:8px;font-size:12px;cursor:pointer;user-select:none}
${R} .igc-switch input{position:absolute;opacity:0;pointer-events:none}
${R} .igc-track{width:34px;height:20px;border-radius:999px;background:var(--bg3);border:1px solid var(--line2);position:relative;transition:background .15s,border-color .15s}
${R} .igc-track::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--muted);transition:transform .15s,background .15s}
${R} .igc-switch input:checked+.igc-track{background:rgba(240,80,138,.22);border-color:rgba(240,80,138,.6)}
${R} .igc-switch input:checked+.igc-track::after{transform:translateX(14px);background:var(--accent)}
${R} .igc-switch input:focus-visible+.igc-track{outline:2px solid var(--accent);outline-offset:2px}
${R} .igc-btns{display:flex;gap:8px}
${R} .igc-btn{flex:1;height:38px;border-radius:9px;border:1px solid var(--line);background:var(--bg2);color:var(--text);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s,border-color .15s,transform .05s}
${R} .igc-btn:active:not(:disabled){transform:scale(.98)}
${R} .igc-btn:disabled{opacity:.4;cursor:not-allowed}
${R} .igc-primary{background:var(--accent);border-color:var(--accent);color:#161513}
${R} .igc-primary:hover:not(:disabled){background:var(--accent2);border-color:var(--accent2)}
${R} .igc-danger{background:transparent;border-color:rgba(240,106,93,.5);color:var(--err)}
${R} .igc-danger:hover:not(:disabled){background:rgba(240,106,93,.12)}
${R} .igc-bar{height:6px;border-radius:3px;background:rgba(255,255,255,.06);overflow:hidden}
${R} .igc-bar span{display:block;height:100%;width:0;background:var(--grad);transition:width .3s ease}
${R} .igc-meta{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:var(--muted);margin-top:6px}
${R} .igc-wait{color:var(--warn);font-variant-numeric:tabular-nums}
${R} .igc-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
${R} .igc-stat{background:var(--bg2);border:1px solid var(--line);border-radius:9px;padding:8px 10px}
${R} .igc-stat b{display:block;font-size:18px;font-weight:600;line-height:1.2;font-variant-numeric:tabular-nums}
${R} .igc-stat span{font-size:11px;color:var(--muted)}
${R} .igc-stat.main b{color:var(--accent2)}
${R} .igc-stat.err b{color:var(--err)}
${R} .igc-log{height:150px;overflow-y:auto;background:var(--bg2);border:1px solid var(--line);border-radius:9px;padding:6px 0;font:11.5px/1.45 ui-monospace,Consolas,monospace;scrollbar-width:thin;scrollbar-color:var(--line2) transparent}
${R} .igc-log:empty::before{content:"İşlem kayıtları burada görünecek.";display:block;padding:4px 10px;color:#6d685f;font-family:inherit}
${R} .igc-log div{display:grid;grid-template-columns:auto 6px 1fr;gap:8px;align-items:baseline;padding:2px 10px}
${R} .igc-log time{color:#6d685f}
${R} .igc-log i{width:6px;height:6px;border-radius:50%;background:var(--muted);align-self:center}
${R} .igc-log span{color:var(--muted);word-break:break-word}
${R} .igc-log .ok i{background:var(--ok)} ${R} .igc-log .ok span{color:#bbf7d0}
${R} .igc-log .err i{background:var(--err)} ${R} .igc-log .err span{color:#fecaca}
${R} .igc-log .warn i{background:var(--warn)} ${R} .igc-log .warn span{color:#fde68a}
${R} .igc-log .info i{background:var(--info)} ${R} .igc-log .info span{color:#bfdbfe}
${R} .igc-foot{flex-shrink:0;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 16px;border-top:1px solid var(--line);font-size:11px;color:var(--muted)}
${R} .igc-link{background:none;border:0;padding:0;color:var(--muted);font:inherit;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
${R} .igc-link:hover{color:var(--text)}
${R} .igc-pill{position:absolute;right:18px;bottom:18px;display:inline-flex;align-items:center;gap:8px;padding:9px 14px;background:var(--bg);border:1px solid var(--line);color:var(--text);border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.4);font-family:inherit;font-size:12px;font-weight:500;cursor:pointer}
${R} .igc-pill:hover{background:var(--bg2)}
${R} .igc-pill i{width:8px;height:8px;border-radius:50%;background:var(--muted)}
${R} .igc-pill.active i{background:var(--accent);animation:igc-pulse 1.4s infinite}
@keyframes igc-pulse{50%{opacity:.4}}
@media (max-width:480px){${R} .igc-panel{left:8px!important;right:8px!important;top:8px!important;width:auto}}
@media (prefers-reduced-motion:reduce){${R} *{animation:none!important;transition:none!important}}
`;
  document.head.appendChild(style);

  // ---------- Panel ----------
  const root = document.createElement('div');
  root.id = 'igc-root';
  root.innerHTML = `
    <section class="igc-panel" id="igc-panel" role="dialog" aria-label="Takip isteği geri çekici">
      <header class="igc-head" id="igc-head">
        <div class="igc-brand">
          <span class="igc-dot"></span>
          <div><strong>Takip İsteği Geri Çekici</strong><small>v5 · Bekleyen istekleri temizle</small></div>
        </div>
        <div class="igc-icons">
          <button id="igc-minimize" type="button" title="Küçült" aria-label="Küçült"><svg viewBox="0 0 16 16" width="14" height="14"><rect x="3" y="7.25" width="10" height="1.5" rx=".75" fill="currentColor"/></svg></button>
          <button id="igc-x" type="button" title="Kapat" aria-label="Kapat"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
        </div>
      </header>
      <div class="igc-body">
        <div>
          <div class="igc-label"><span>Kullanıcı adları veya JSON</span><span id="igc-count">0 kişi</span></div>
          <textarea id="igc-in" class="igc-textarea" spellcheck="false" autocomplete="off" placeholder="kullanici_adi_1&#10;kullanici_adi_2&#10;..."></textarea>
        </div>
        <div class="igc-row">
          <label class="igc-switch"><input type="checkbox" id="igc-dry" checked><span class="igc-track"></span>Sadece tara</label>
          <div class="igc-delay">Bekleme <input id="igc-min" class="igc-num" type="number" min="10" value="20"> – <input id="igc-max" class="igc-num" type="number" min="10" value="40"> sn</div>
        </div>
        <div class="igc-btns">
          <button id="igc-start" type="button" class="igc-btn igc-primary">Taramayı başlat</button>
          <button id="igc-stop" type="button" class="igc-btn igc-danger" disabled>Durdur</button>
        </div>
        <div>
          <div class="igc-bar"><span id="igc-bar"></span></div>
          <div class="igc-meta"><span id="igc-progress">Hazır</span><span id="igc-wait" class="igc-wait"></span></div>
        </div>
        <div class="igc-stats">
          <div class="igc-stat main"><b id="igc-s1">0</b><span id="igc-s1l">Bekleyen istek</span></div>
          <div class="igc-stat"><b id="igc-s2">0</b><span>Atlanan</span></div>
          <div class="igc-stat err"><b id="igc-s3">0</b><span>Hata</span></div>
        </div>
        <div class="igc-log" id="igc-log" aria-live="polite"></div>
      </div>
      <footer class="igc-foot"><span>Çalışırken bu sekmeyi önde tut.</span><button id="igc-clear" type="button" class="igc-link">Kayıtları sil</button></footer>
    </section>
    <button class="igc-pill" id="igc-pill" type="button" hidden><i></i><span id="igc-pill-text">Aç</span></button>`;
  document.body.appendChild(root);
  const $ = id => root.querySelector('#' + id);

  const log = (msg, type = 'muted') => {
    const d = document.createElement('div');
    d.className = type;
    const t = document.createElement('time'); t.textContent = new Date().toLocaleTimeString();
    const i = document.createElement('i');
    const s = document.createElement('span'); s.textContent = msg;
    d.append(t, i, s);
    const box = $('igc-log');
    box.appendChild(d);
    while (box.children.length > 400) box.firstChild.remove();
    box.scrollTop = 1e9;
  };

  // ---------- Sürükleme / küçültme ----------
  const panel = $('igc-panel'), head = $('igc-head'), pill = $('igc-pill');
  function placeAt(x, y) {
    const r = panel.getBoundingClientRect();
    x = Math.min(Math.max(0, x), Math.max(0, innerWidth - r.width));
    y = Math.min(Math.max(0, y), Math.max(0, innerHeight - 60));
    Object.assign(panel.style, { left: x + 'px', top: y + 'px', right: 'auto' });
  }
  try { const pos = JSON.parse(localStorage.getItem(POS_KEY)); if (pos) placeAt(pos.x, pos.y); } catch { }
  let drag = null;
  head.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    const r = panel.getBoundingClientRect();
    drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    head.setPointerCapture(e.pointerId); head.classList.add('drag');
  });
  head.addEventListener('pointermove', e => { if (drag) placeAt(e.clientX - drag.dx, e.clientY - drag.dy); });
  const endDrag = () => {
    if (!drag) return;
    drag = null; head.classList.remove('drag');
    const r = panel.getBoundingClientRect();
    try { localStorage.setItem(POS_KEY, JSON.stringify({ x: r.left, y: r.top })); } catch { }
  };
  head.addEventListener('pointerup', endDrag);
  head.addEventListener('pointercancel', endDrag);
  $('igc-minimize').onclick = () => { panel.hidden = true; pill.hidden = false; };
  pill.onclick = () => { pill.hidden = true; panel.hidden = false; };

  // ---------- Durum / bekleme ----------
  let stop = false, running = false, wake = null, ctrl = null;
  const sleep = ms => new Promise(r => {
    const t = setTimeout(done, ms);
    function done() { clearTimeout(t); if (wake === done) wake = null; r(); }
    wake = done;
  });
  async function wait(ms, label) {
    if (ms <= 0 || stop) return;
    const end = Date.now() + ms;
    const show = () => { $('igc-wait').textContent = label ? `${label} · ${fmt(Math.max(0, Math.ceil((end - Date.now()) / 1000)))}` : ''; };
    show();
    const iv = label ? setInterval(show, 500) : null;
    await sleep(ms);
    if (iv) clearInterval(iv);
    $('igc-wait').textContent = '';
  }
  const halt = () => { stop = true; wake?.(); ctrl?.abort(); };
  window.__igcCleanup = () => { halt(); root.remove(); style.remove(); };
  $('igc-x').onclick = () => {
    if (running && !confirm('İşlem sürüyor. Kapatılsın mı? (İlerleme kaydedildi.)')) return;
    window.__igcCleanup();
  };
  $('igc-stop').onclick = () => { halt(); log('Durduruluyor...', 'warn'); };

  const syncMode = () => {
    const dry = $('igc-dry').checked;
    $('igc-start').textContent = dry ? 'Taramayı başlat' : 'Geri çekmeyi başlat';
    $('igc-s1l').textContent = dry ? 'Bekleyen istek' : 'Geri çekilen';
  };
  $('igc-dry').onchange = syncMode;
  const setRunning = v => {
    running = v;
    $('igc-start').disabled = v; $('igc-stop').disabled = !v;
    ['igc-dry', 'igc-min', 'igc-max', 'igc-in'].forEach(id => { $(id).disabled = v; });
    pill.classList.toggle('active', v);
    if (!v) $('igc-pill-text').textContent = 'Aç';
  };

  // ---------- Kayıt (localStorage) ----------
  const loadCache = () => { try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch { return {}; } };
  const saveCache = c => { try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch { } };
  $('igc-clear').onclick = () => {
    if (running) return alert('Önce durdur.');
    if (confirm('Kaydedilen tarama sonuçları silinsin mi?')) { try { localStorage.removeItem(CACHE_KEY); } catch { } log('Kayıtlar silindi.', 'info'); }
  };

  // ---------- Listeyi ayrıştır ----------
  const fromUrl = s => { const m = s.match(/instagram\.com\/(?:_u\/)?([A-Za-z0-9._]+)/); return m ? m[1] : s; };
  function parse(text) {
    const out = new Set();
    const add = s => {
      if (typeof s !== 'string') return;
      s = fromUrl(s.trim()).replace(/^@/, '').replace(/\/$/, '').toLowerCase();
      if (/^[a-z0-9._]{1,30}$/.test(s)) out.add(s);
    };
    try {
      const walk = o => {
        if (Array.isArray(o)) return o.forEach(walk);
        if (o && typeof o === 'object') {
          if (Array.isArray(o.string_list_data)) {
            if (o.title) add(o.title);
            o.string_list_data.forEach(x => { if (x.value) add(x.value); else if (x.href) add(x.href); });
          } else Object.values(o).forEach(walk);
        }
      };
      walk(JSON.parse(text));
    } catch {
      text.split(/[\s,;]+/).forEach(add);
    }
    return [...out];
  }
  $('igc-in').addEventListener('input', () => { $('igc-count').textContent = `${parse($('igc-in').value).length} kişi`; });

  // ---------- Instagram istekleri ----------
  class IgError extends Error { constructor(kind, msg) { super(msg); this.kind = kind; } }
  async function rawFetch(url, init = {}) {
    if (stop) throw new IgError('cancelled', 'Durduruldu');
    const c = new AbortController(); ctrl = c;
    try { return await fetch(url, { ...init, credentials: 'include', signal: c.signal }); }
    catch { throw stop ? new IgError('cancelled', 'Durduruldu') : new IgError('network', 'Bağlantı hatası'); }
    finally { if (ctrl === c) ctrl = null; }
  }
  async function ig(url, init = {}) {
    const post = String(init.method || 'GET').toUpperCase() === 'POST';
    const headers = { 'x-ig-app-id': APP_ID, 'x-requested-with': 'XMLHttpRequest', 'x-csrftoken': getCookie('csrftoken') };
    if (post) headers['content-type'] = 'application/x-www-form-urlencoded';
    const res = await rawFetch(url, { ...init, headers });
    const text = await res.text().catch(() => '');
    let json = null; try { json = JSON.parse(text); } catch { }
    const msg = json ? String(json.message || json.error_type || '') : '';
    if (res.status === 429 || /please wait a few minutes|rate.?limit|too many/i.test(msg)) throw new IgError('rate', msg || 'HTTP 429');
    if (res.status === 404) throw new IgError('notfound', 'Bulunamadı');
    if (json?.spam || json?.feedback_required || json?.challenge || json?.checkpoint_url || /feedback_required|checkpoint_required|challenge_required/i.test(msg))
      throw new IgError('blocked', `Instagram bu işlemi engelledi (${msg || 'feedback_required'}). Birkaç saat bekle, sonra kodu tekrar çalıştır; kaldığın yerden devam eder.`);
    if (res.status === 401 || json?.require_login || /login_required/i.test(msg))
      throw new IgError('session', 'Oturum kapanmış görünüyor. Sayfayı yenileyip giriş yaptığından emin ol, sonra kodu tekrar çalıştır.');
    if (res.status === 403)
      throw new IgError('blocked', `Instagram isteği reddetti (403${msg ? ': ' + msg : ''}). Birkaç saat bekle.`);
    if (!json) {
      const title = (text.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim().slice(0, 60) || '';
      let path = ''; try { path = new URL(url, location.origin).pathname; } catch { }
      throw new IgError('nonjson', `Veri yerine sayfa döndü: ${post ? 'POST' : 'GET'} ${path} (HTTP ${res.status}${title ? ', "' + title + '"' : ''})`);
    }
    if (!res.ok) throw new IgError('http', `HTTP ${res.status}${msg ? ' ' + msg : ''}`);
    return json;
  }
  const toStatus = fs => (fs && typeof fs.following === 'boolean' && typeof fs.outgoing_request === 'boolean')
    ? (fs.following ? 'following' : fs.outgoing_request ? 'pending' : 'none') : null;

  async function idFromProfilePage(username) {
    const res = await rawFetch(`/${encodeURIComponent(username)}/`);
    if (res.status === 429) throw new IgError('rate', 'HTTP 429');
    if (res.status === 404) return null;
    const html = await res.text().catch(() => '');
    for (const re of [/"profile_id":"(\d+)"/, /"page_id":"profilePage_(\d+)"/, /instapp:owner_user_id" content="(\d+)"/, /"target_id":"(\d+)"/]) {
      const m = html.match(re);
      if (m && m[1] !== viewer) return m[1];
    }
    return null;
  }
  async function lookup(username) {
    let id = null, status = null;
    const j = await ig(`/web/search/topsearch/?context=blended&query=${encodeURIComponent(username)}&include_reel=false`);
    const hit = (j.users || []).map(x => x.user).find(x => x?.username?.toLowerCase() === username);
    if (hit) { id = String(hit.pk || hit.pk_id || hit.id || ''); status = toStatus(hit.friendship_status); }
    if (!id) { await sleep(rand(1000, 2000)); id = await idFromProfilePage(username); }
    if (!id) return { status: 'notfound' };
    if (!status) { await sleep(rand(1000, 2000)); status = toStatus(await ig(`/api/v1/friendships/show/${id}/`)); }
    if (!status) throw new IgError('http', 'Takip durumu okunamadı');
    return { id, status };
  }
  async function cancel(id) {
    const body = `user_id=${id}`;
    let j;
    try {
      j = await ig(`/web/friendships/${id}/unfollow/`, { method: 'POST', body });
    } catch (e) {
      if (e.kind !== 'http' && e.kind !== 'nonjson') throw e;
      log(`Birinci yol olmadı (${e.message}), ikinci yol deneniyor...`, 'warn');
      await sleep(rand(1500, 3000));
      j = await ig(`/api/v1/friendships/destroy/${id}/`, { method: 'POST', body });
    }
    const fs = j.friendship_status;
    if (fs && (fs.outgoing_request || fs.following)) return false;
    return j.status === 'ok' || !!fs;
  }

  // ---------- Çalıştır ----------
  const LABEL = { following: 'zaten takip ediyorsun', none: 'bekleyen istek yok', notfound: 'bulunamadı', cancelled: 'isteği önceden geri çekilmiş' };
  $('igc-start').onclick = async () => {
    const list = parse($('igc-in').value);
    if (!list.length) return alert('Geçerli kullanıcı adı bulunamadı.');
    const dry = $('igc-dry').checked;
    if (!dry && !confirm(`${list.length} kişi için takip isteği geri çekme başlatılsın mı?\n\nHer kişiden önce isteğin hâlâ beklediği kontrol edilir.`)) return;
    const cMin = Math.max(10, +$('igc-min').value || 20), cMax = Math.max(cMin, +$('igc-max').value || 40);
    const cache = loadCache();
    stop = false; setRunning(true);
    const s = { done: 0, pending: 0, cancelled: 0, skipped: 0, fail: 0 };
    const pendingList = [];
    let netCalls = 0, cancelAttempts = 0, rateHits = 0, aborted = false;
    const render = () => {
      const pct = list.length ? Math.round(s.done / list.length * 100) : 0;
      $('igc-bar').style.width = pct + '%';
      $('igc-progress').textContent = `${s.done} / ${list.length} · %${pct}`;
      $('igc-s1').textContent = dry ? s.pending : s.cancelled;
      $('igc-s2').textContent = s.skipped;
      $('igc-s3').textContent = s.fail;
      $('igc-pill-text').textContent = `${dry ? 'Taranıyor' : 'Geri çekiliyor'} ${s.done}/${list.length}`;
    };
    log(`${list.length} kullanıcı · ${dry ? 'TARAMA modu (hiçbir şey değiştirilmez)' : 'GERİ ÇEKME modu'}`, 'info');
    render();

    for (let i = 0; i < list.length && !stop; i++) {
      const u = list[i];
      const c = cache[u];
      const fresh = c && Date.now() - c.at < CACHE_TTL;
      let used = 'none';
      try {
        let status, id, fromCache = false;
        if (fresh && (c.status !== 'pending' || dry)) {
          status = c.status; id = c.id; fromCache = true;
        } else {
          used = 'scan'; netCalls++;
          const r = await lookup(u); status = r.status; id = r.id;
          cache[u] = { id, status, at: Date.now() };
        }
        const tag = fromCache ? ' (kayıttan)' : '';

        if (status === 'pending' && !dry) {
          used = 'cancel'; cancelAttempts++;
          if (await cancel(id)) { cache[u] = { id, status: 'cancelled', at: Date.now() }; s.cancelled++; log(`@${u}: istek geri çekildi`, 'ok'); }
          else { s.fail++; log(`@${u}: geri çekilemedi`, 'err'); }
        } else if (status === 'pending') {
          s.pending++; pendingList.push(u); log(`@${u}: bekleyen istek var${tag}`, 'info');
        } else {
          s.skipped++; log(`@${u}: ${LABEL[status] || status}, atlandı${tag}`);
        }
        rateHits = 0;
      } catch (e) {
        if (e.kind === 'cancelled') break;
        if (e.kind === 'rate') {
          saveCache(cache);
          if (rateHits >= RATE_BACKOFF.length) {
            log('Instagram art arda limit uyguluyor. 1–2 saat sonra kodu tekrar çalıştır; kaldığın yerden devam eder.', 'err');
            aborted = true; break;
          }
          const m = RATE_BACKOFF[rateHits++];
          log(`Instagram limiti${e.message ? ' (' + e.message + ')' : ''}. ${m} dk bekleyip tekrar denenecek.`, 'warn');
          await wait(m * 60000, 'Limit beklemesi');
          i--; continue;
        }
        if (e.kind === 'blocked' || e.kind === 'session' || e.kind === 'nonjson') { log(`@${u}: ${e.message}`, 'err'); aborted = true; break; }
        if (e.kind === 'notfound') { cache[u] = { status: 'notfound', at: Date.now() }; s.skipped++; log(`@${u}: bulunamadı, atlandı`); }
        else { s.fail++; log(`@${u}: hata · ${e.message}`, 'err'); if (used === 'none') used = 'scan'; }
      }
      saveCache(cache);
      s.done++; render();
      if (stop || i === list.length - 1) continue;
      if (used === 'cancel') {
        if (cancelAttempts % T.cancelPauseEvery === 0) await wait(T.cancelPause, 'Mola');
        else await wait(rand(cMin, cMax) * 1000, 'Sonraki işlem');
      } else if (used === 'scan') {
        if (netCalls % T.scanPauseEvery === 0) await wait(T.scanPause, 'Kısa mola');
        else await wait(rand(T.scanMin, T.scanMax));
      }
    }

    saveCache(cache);
    $('igc-wait').textContent = '';
    setRunning(false);
    if (dry && pendingList.length) {
      $('igc-in').value = pendingList.join('\n');
      $('igc-count').textContent = `${pendingList.length} kişi`;
      log(`Kutuya bekleyen ${pendingList.length} kişi yazıldı. "Sadece tara"yı kapatıp başlat.`, 'info');
    }
    if (stop) log('Durduruldu. Tekrar başlatırsan kaldığı yerden devam eder.', 'warn');
    else if (aborted) log('İşlem yarıda kaldı, ilerleme kaydedildi.', 'err');
    else log('Bitti', 'ok');
  };
  syncMode();
})();
