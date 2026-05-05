/* ═══════════════════════════════════════
   DigiLitera — App Core
   js/app.js
═══════════════════════════════════════ */

/* ── STORAGE ── */
const Store = {
  _key: 'dgl4',
  load() {
    try { return JSON.parse(localStorage.getItem(this._key) || '{}'); } catch { return {}; }
  },
  save(data) {
    try { localStorage.setItem(this._key, JSON.stringify(data)); } catch {}
  }
};

let _data = Store.load();
const getScores  = ()    => _data.scores  || {};
const getTotalXP = ()    => _data.xp      || 0;
function addScore(modId, entry) {
  if (!_data.scores) _data.scores = {};
  if (!_data.scores[modId]) _data.scores[modId] = [];
  _data.scores[modId].push(entry);
  _data.scores[modId].sort((a, b) => b.sc - a.sc);
  if (_data.scores[modId].length > 25) _data.scores[modId] = _data.scores[modId].slice(0, 25);
  Store.save(_data);
}
function addXP(amount) {
  if (amount <= 0) return;
  _data.xp = (_data.xp || 0) + amount;
  Store.save(_data);
}

/* ── THEME ── */
const App = {
  show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) { el.classList.add('active'); window.scrollTo({ top: 0, behavior: 'instant' }); }
  },
  toggleTheme() {
    const h = document.documentElement;
    h.dataset.theme = h.dataset.theme === 'dark' ? 'light' : 'dark';
  },
  themeIcon() {
    return document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
  },
  goHome() {
    Home.render();
    this.show('home');
  }
};

/* ── GRADE ── */
function calcGrade(pct) {
  if (pct >= 90) return { g: 'S', rc: 'rS', gc: 'var(--grn)', gd: 'var(--grn-d)' };
  if (pct >= 75) return { g: 'A', rc: 'rA', gc: 'var(--blu)', gd: 'var(--blu-d)' };
  if (pct >= 55) return { g: 'B', rc: 'rB', gc: 'var(--amb)', gd: 'var(--amb-d)' };
  return              { g: 'C', rc: 'rC', gc: 'var(--red)', gd: 'var(--red-d)' };
}

/* ─────────────────────────────────────
   HOME
───────────────────────────────────── */
const Home = {
  render() {
    const totalXP = getTotalXP();
    const scores  = getScores();
    const maxXP   = MODULES.length * 100;
    const xpPct   = Math.min(100, Math.round((totalXP / maxXP) * 100));

    const mods = MODULES.map(m => {
      const best = scores[m.id] && scores[m.id].length
        ? Math.max(...scores[m.id].map(s => s.sc)) : null;
      const bestTag = best !== null
        ? `<span class="tag tg">Best: ${best}/${m.quiz.length * 20}</span>` : '';
      const tags = m.tags.map(([c, t]) => `<span class="tag ${c}">${t}</span>`).join('');
      const done = scores[m.id] && scores[m.id].length ? 1 : 0;

      return `
        <div class="mc" onclick="Home.openModule(${m.id})">
          <div class="mc-icon" style="background:${m.ic}">${m.icon}</div>
          <div class="mc-body">
            <div class="mc-name">${m.title}</div>
            <div class="mc-desc">${m.desc}</div>
            <div class="mc-tags">${tags}${bestTag}</div>
            <div class="mc-prog-track">
              <div class="mc-prog-fill" style="width:${done * 100}%"></div>
            </div>
          </div>
          <div class="mc-arr">›</div>
        </div>`;
    }).join('');

    document.getElementById('home').innerHTML = `
      <div class="home-header">
        <div class="home-logo">
          <div class="home-logomark">⚡</div>
          <span class="home-logotext">DigiLitera</span>
        </div>
        <button class="icon-btn" onclick="App.toggleTheme();Home.render()">${App.themeIcon()}</button>
      </div>

      <div class="home-hero">
        <div class="home-eyebrow">Platform Belajar Digital</div>
        <h1 class="home-title">Jadilah<br><em class="display">Cerdas Digital</em></h1>
        <p class="home-sub">Pelajari materi, selesaikan tantangan interaktif, dan bersaing di papan skor.</p>
      </div>

      <div class="xp-card">
        <div class="xp-card-row">
          <span class="xp-card-label">⭐ XP Kamu</span>
          <span class="xp-card-val">${totalXP} / ${maxXP}</span>
        </div>
        <div class="xp-track"><div class="xp-fill" style="width:${xpPct}%"></div></div>
        <div class="xp-card-sub">${xpPct >= 100 ? '🎉 Semua modul selesai!' : `${maxXP - totalXP} XP lagi untuk selesai semua modul`}</div>
      </div>

      <div class="section-label">Pilih Modul</div>
      <div class="mod-list">${mods}</div>

      <div class="sb-entry" onclick="Scoreboard.open(0)">
        <div class="sb-entry-icon">🏆</div>
        <div class="sb-entry-text">
          <p>Papan Skor</p>
          <span>Lihat peringkat per modul</span>
        </div>
        <div class="sb-entry-arr">›</div>
      </div>`;
  },

  openModule(id) {
    Materi.open(MODULES[id]);
  }
};

/* ─────────────────────────────────────
   MATERI
───────────────────────────────────── */
const Materi = {
  _mod: null,
  _pg: 0,

  open(mod) {
    this._mod = mod;
    this._pg  = 0;
    this._render();
    App.show('materi');
  },

  _render() {
    const pg  = this._mod.pages[this._pg];
    const tot = this._mod.pages.length;
    const pct = Math.round(((this._pg + 1) / tot) * 100);
    let body  = this._buildPage(pg);

    const isLast  = this._pg === tot - 1;
    const prevBtn = this._pg > 0
      ? `<button class="btn-nav-prev" onclick="Materi._prev()">← Kembali</button>`
      : `<span></span>`;

    document.getElementById('materi').innerHTML = `
      <div class="topbar">
        <button class="icon-btn" onclick="App.goHome()">←</button>
        <span class="topbar-title">${this._mod.title}</span>
        <button class="icon-btn" onclick="App.toggleTheme();Materi._render()">${App.themeIcon()}</button>
      </div>
      <div class="prog-track"><div class="prog-bar" style="width:${pct}%"></div></div>
      <div class="mat-content">${body}</div>
      <div class="mat-nav">
        ${prevBtn}
        <span class="pg-ind">${this._pg + 1} / ${tot}</span>
        <button class="btn-nav-next" onclick="Materi._next()">${isLast ? 'Mulai Kuis →' : 'Lanjut →'}</button>
      </div>`;
  },

  _buildPage(pg) {
    let html = `
      <div class="mat-chip">${this._mod.icon} Bagian ${this._pg + 1}</div>
      <h2 class="mat-title">${pg.h}</h2>
      <div class="mat-body-text">${(pg.p || '').replace(/\n\n/g, '</p><p class="mat-body-text">').replace(/\n/g, '<br>')}</div>`;

    if (pg.facts) {
      html += `<div class="fact-grid">${pg.facts.map(f =>
        `<div class="fact-box"><div class="fact-num">${f.n}</div><div class="fact-lbl">${f.l}</div></div>`
      ).join('')}</div>`;
    }
    if (pg.steps) {
      html += `<div class="step-list">${pg.steps.map(s => `
        <div class="step">
          <div class="step-num">${s.n}</div>
          <div class="step-body"><strong>${s.t}</strong><span>${s.d}</span></div>
        </div>`).join('')}</div>`;
    }
    if (pg.callout) {
      const cls = { i:'ci', w:'cw', d:'cd', g:'cg', p:'cp' }[pg.callout.t] || 'ci';
      html += `<div class="callout ${cls}"><p>${pg.callout.v}</p></div>`;
    }
    if (pg.tip) {
      html += `<ul class="tip-ul">${pg.tip.map(t => `<li>${t}</li>`).join('')}</ul>`;
    }
    return html;
  },

  _prev() { if (this._pg > 0) { this._pg--; this._render(); } },
  _next() {
    if (this._pg < this._mod.pages.length - 1) { this._pg++; this._render(); }
    else Quiz.start(this._mod);
  }
};

/* ─────────────────────────────────────
   RESULT
───────────────────────────────────── */
const Result = {
  _state: null,
  _saved: false, // flag cegah double-save

  show(quizState) {
    this._state = quizState;
    this._saved = false; // reset flag setiap kuis baru

    const { mod, score, corr, questions } = quizState;
    const tot  = questions.length;
    const maxS = tot * 20;
    const pct  = Math.round((score / maxS) * 100);
    const { g, rc } = calcGrade(pct);

    // Hitung XP yang akan didapat (selisih dari skor terbaik sebelumnya)
    const prevBestScore = (getScores()[mod.id] || []).reduce((max, s) => Math.max(max, s.sc), 0);
    const prevBestPct   = Math.round((prevBestScore / maxS) * 100);
    const xpEarned      = Math.max(0, Math.round(pct) - Math.round(prevBestPct));

    // Simpan xpEarned ke state agar bisa dipakai di _save()
    this._state.xpEarned    = xpEarned;
    this._state.prevBestScore = prevBestScore;

    const msg = pct >= 90 ? "Luar biasa! Kamu benar-benar paham materi ini!"
      : pct >= 75 ? "Bagus! Sebagian besar sudah dikuasai dengan baik."
      : pct >= 55 ? "Lumayan! Masih ada beberapa bagian yang perlu diulas."
      : "Jangan menyerah — baca ulang materinya dan coba lagi!";

    // Banner XP: tampilkan info yang akurat sebelum simpan
    const xpBanner = xpEarned > 0
      ? `<div class="xp-earned-banner">⭐ +${xpEarned} XP akan kamu dapatkan!</div>`
      : prevBestScore > 0
        ? `<div class="xp-earned-banner xp-no-gain">Skor tidak melampaui rekor sebelumnya — XP tidak bertambah.</div>`
        : `<div class="xp-earned-banner">⭐ +${Math.round(pct)} XP akan kamu dapatkan!</div>`;

    document.getElementById('result').innerHTML = `
      <div class="topbar">
        <button class="icon-btn" onclick="App.goHome()">←</button>
        <span class="topbar-title">Hasil Kuis</span>
        <button class="icon-btn" onclick="App.toggleTheme();Result.show(Result._state)">${App.themeIcon()}</button>
      </div>
      <div class="result-wrap">
        <div class="res-ring ${rc}">${g}</div>
        <div class="res-msg">
          <h2>${msg}</h2>
          <p>${mod.icon} ${mod.title}</p>
        </div>
        <div class="stat-grid">
          <div class="stat-box"><div class="stat-val">${score}</div><div class="stat-lbl">Skor</div></div>
          <div class="stat-box"><div class="stat-val">${corr}/${tot}</div><div class="stat-lbl">Benar</div></div>
          <div class="stat-box"><div class="stat-val">${pct}%</div><div class="stat-lbl">Akurasi</div></div>
        </div>
        ${xpBanner}
        <div class="name-block">
          <p>Masukkan nama untuk papan skor:</p>
          <input id="player-name" type="text" placeholder="Nama kamu..." maxlength="22"/>
        </div>
        <button class="btn-primary" id="btn-save" onclick="Result._save()">🏆 Simpan & Lihat Papan Skor</button>
        <button class="btn-secondary" onclick="Materi.open(Result._state.mod)">📖 Ulangi Materi</button>
        <button class="btn-secondary" onclick="App.goHome()">🏠 Kembali ke Beranda</button>
      </div>`;

    App.show('result');
  },

  _save() {
    // Cegah double-save jika tombol diklik lebih dari sekali
    if (this._saved) return;
    this._saved = true;

    // Disable tombol simpan secara visual
    const btn = document.getElementById('btn-save');
    if (btn) { btn.disabled = true; btn.textContent = '✅ Tersimpan!'; }

    const nm  = (document.getElementById('player-name').value || '').trim() || 'Anonim';
    const { mod, score, questions, xpEarned } = this._state;
    const pct = Math.round((score / (questions.length * 20)) * 100);
    const { g } = calcGrade(pct);

    // Tambah XP hanya di sini, hanya selisih peningkatan
    addXP(xpEarned);

    addScore(mod.id, { nm, sc: score, pct, g, ts: Date.now() });
    Scoreboard.open(mod.id);
  }
};

/* ─────────────────────────────────────
   SCOREBOARD
───────────────────────────────────── */
const Scoreboard = {
  _tab: 0,
  _avBg: ['#2d2850','#14301e','#2d1212','#0f1f3d','#2d2000','#1a2045','#301428'],
  _avFg: ['#9d8fff','#1fd4a0','#f16060','#5eabf8','#f5a623','#60a5fa','#f472b6'],

  open(id) {
    this._tab = Math.max(0, id);
    this._render();
    App.show('scoreboard');
  },

  _render() {
    const scores = getScores();
    const list   = (scores[this._tab] || []).slice(0, 10);

    const tabs = MODULES.map((m, i) => `
      <div class="sbtab ${i === this._tab ? 'on' : ''}"
           onclick="Scoreboard._tab=${i};Scoreboard._render()">${m.icon} ${m.short}</div>`
    ).join('');

    let rows = '';
    if (!list.length) {
      rows = `<div class="sb-empty">
        <div class="sb-empty-icon">🏆</div>
        <p>Belum ada skor.<br>Jadilah yang pertama!</p>
      </div>`;
    } else {
      rows = list.map((s, i) => {
        const bg  = this._avBg[i % this._avBg.length];
        const fg  = this._avFg[i % this._avFg.length];
        const ini = s.nm.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '??';
        const rnkClass = i === 0 ? 'sb-rank g1' : i === 1 ? 'sb-rank g2' : i === 2 ? 'sb-rank g3' : 'sb-rank';
        const rnk = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        const { gc, gd } = calcGrade(s.pct);
        return `
          <div class="sb-row">
            <div class="${rnkClass}">${rnk}</div>
            <div class="sb-avatar" style="background:${bg};color:${fg}">${ini}</div>
            <div class="sb-name">${s.nm}</div>
            <span class="sb-grade" style="background:${gd};color:${gc}">${s.g}</span>
            <div class="sb-score">${s.sc}</div>
          </div>`;
      }).join('');
    }

    document.getElementById('scoreboard').innerHTML = `
      <div class="topbar">
        <button class="icon-btn" onclick="App.goHome()">←</button>
        <span class="topbar-title">🏆 Papan Skor</span>
        <button class="icon-btn" onclick="App.toggleTheme();Scoreboard._render()">${App.themeIcon()}</button>
      </div>
      <div class="sb-tabs">${tabs}</div>
      <div class="sb-content">${rows}</div>`;
  }
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  Home.render();
  App.show('home');
});
