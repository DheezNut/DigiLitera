/* ═══════════════════════════════════════
   DigiLitera — Quiz Engine
   js/quiz.js
═══════════════════════════════════════ */

const Quiz = (() => {

  /* ── state ── */
  let state = {
    mod: null, questions: [], idx: 0,
    score: 0, corr: 0, tmr: null, tl: 0,
    drag: null, stf: null
  };
  let ddSel = null;

  const TYPE_INFO = {
    mcq:      { label: "Pilihan Ganda",       emoji: "🔘", time: 30 },
    tf:       { label: "Benar atau Salah?",   emoji: "⚖️",  time: 30 },
    drag:     { label: "Susun & Pasangkan",   emoji: "🔗", time: 55 },
    stf:      { label: "Temukan yang Salah!", emoji: "🕵️", time: 45 },
    scenario: { label: "Simulasi Kasus",      emoji: "🎭", time: 45 }
  };

  /* ─────────────────────────
     PUBLIC: start
  ───────────────────────── */
  function start(mod) {
    state = { mod, questions: mod.quiz, idx: 0, score: 0, corr: 0, tmr: null, tl: 0, drag: null, stf: null };
    _render();
    App.show('quiz');
  }

  /* ─────────────────────────
     RENDER QUIZ FRAME
  ───────────────────────── */
  function _render() {
    const q   = state.questions[state.idx];
    const tot = state.questions.length;
    const pct = Math.round((state.idx / tot) * 100);

    // FIX #1 & #2: Pastikan timer lama benar-benar berhenti sebelum render baru
    if (state.tmr) { clearInterval(state.tmr); state.tmr = null; }
    ddSel = null;

    const ti = TYPE_INFO[q.tp] || { label: q.tp, emoji: "❓", time: 30 };
    state.tl = ti.time;

    const gameHTML = _buildGame(q);

    document.getElementById('quiz').innerHTML = `
      <div class="topbar">
        <button class="icon-btn" onclick="Quiz._confirmExit()">←</button>
        <span class="topbar-title">${state.mod.icon} ${state.mod.title}</span>
        <button class="icon-btn" onclick="App.toggleTheme();Quiz._render()" title="Tema">${App.themeIcon()}</button>
      </div>
      <div class="prog-track"><div class="prog-bar" style="width:${pct}%"></div></div>

      <div class="qz-meta-bar">
        <div class="qz-meta-left">
          <span class="qz-cnt">Soal ${state.idx + 1}/${tot}</span>
          <span class="qz-dot">·</span>
          <span class="qz-pts" id="qz-pts">⭐ ${state.score}</span>
        </div>
        <span class="qz-timer" id="qz-timer">${state.tl}s</span>
      </div>

      <div class="qz-body">
        <div class="q-type-lbl">
          ${ti.emoji} <span>${ti.label}</span>
        </div>
        <div class="q-text">${q.q}</div>
        ${gameHTML}
      </div>`;

    _startTimer();
  }

  /* ─────────────────────────
     GAME BUILDERS
  ───────────────────────── */
  function _buildGame(q) {
    if (q.tp === 'mcq')      return _buildMCQ(q);
    if (q.tp === 'tf')       return _buildTF(q);
    if (q.tp === 'drag')     return _buildDrag(q);
    if (q.tp === 'stf')      return _buildSTF(q);
    if (q.tp === 'scenario') return _buildScenario(q);
    return '';
  }

  /* MCQ */
  function _buildMCQ(q) {
    const letters = 'ABCD';
    const opts = q.opts.map((o, i) => `
      <button class="opt" id="opt${i}" onclick="Quiz._answerMCQ(${i})">
        <span class="opt-letter">${letters[i]}</span>
        <span class="opt-text">${o}</span>
      </button>`).join('');
    return `<div class="opts-list">${opts}</div><div class="qfb" id="qfb"></div><div class="qfb-next" id="qfb-next"></div>`;
  }

  /* TRUE/FALSE */
  function _buildTF(q) {
    return `
      <div class="tf-statement">"${q.q}"</div>
      <div class="tf-row">
        <button class="tf-btn tf-true"  id="tf-t" onclick="Quiz._answerTF(true)">✅ Benar</button>
        <button class="tf-btn tf-false" id="tf-f" onclick="Quiz._answerTF(false)">❌ Salah</button>
      </div>
      <div class="qfb" id="qfb"></div><div class="qfb-next" id="qfb-next"></div>`;
  }

  /* DRAG-DROP */
  function _buildDrag(q) {
    const shuf  = [...q.pairs].sort(() => Math.random() - .5);
    const chips = [...q.pairs].map(p => p.m).sort(() => Math.random() - .5);
    state.drag  = { pairs: q.pairs, shuf, ans: new Array(q.pairs.length).fill(null), locked: false };

    const chipsHTML = chips.map((c, i) => `
      <div class="dd-chip" id="ddc${i}" data-val="${c.replace(/"/g,'&quot;')}"
           onclick="Quiz._pickChip(${i},'${c.replace(/'/g,"\\'")}',this)">${c}</div>`).join('');

    const rowsHTML = shuf.map((p, i) => `
      <div class="dd-row">
        <div class="dd-label">${p.l}</div>
        <div class="dd-slot" id="dds${i}" onclick="Quiz._dropChip(${i})">
          <span class="dd-slot-text" id="ddst${i}">Klik untuk isi</span>
          <button class="dd-slot-clear" onclick="Quiz._clearSlot(event,${i})">✕</button>
        </div>
      </div>`).join('');

    return `
      <p class="dd-hint">Pilih jawaban (chip biru) → klik kotak untuk memasangkan.<br>Klik <span style="color:var(--red);font-weight:700">✕ merah</span> untuk membatalkan pilihan.</p>
      <div class="dd-pool" id="dd-pool">${chipsHTML}</div>
      <div class="dd-pairs">${rowsHTML}</div>
      <div class="qfb" id="qfb"></div><div class="qfb-next" id="qfb-next"></div>
      <button class="btn-check" id="dd-check-btn" onclick="Quiz._checkDrag(false)">✓ Periksa Jawaban</button>`;
  }

  /* SPOT THE FAKE */
  function _buildSTF(q) {
    state.stf = { correct: q.correctFake, picked: [], done: false };
    const cardsHTML = q.items.map((it, i) => `
      <div class="stf-card" id="stfc${i}" onclick="Quiz._pickSTF(${i})">
        <div class="stf-card-head">${it.head}</div>
        <div class="stf-card-body">${it.body}</div>
        ${it.src ? `<div class="stf-card-src">📎 ${it.src}</div>` : ''}
      </div>`).join('');

    return `
      <p class="stf-hint">Pilih <strong>SEMUA</strong> item yang merupakan hoaks / tindakan salah (bisa lebih dari satu).</p>
      <div class="stf-grid">${cardsHTML}</div>
      <div class="qfb" id="qfb"></div><div class="qfb-next" id="qfb-next"></div>
      <button class="btn-check" id="stf-check-btn" onclick="Quiz._checkSTF(false)">✓ Konfirmasi Pilihan</button>`;
  }

  /* SCENARIO */
  function _buildScenario(q) {
    const optsHTML = q.opts.map((o, i) => `
      <button class="sc-opt" id="sco${i}" onclick="Quiz._answerScenario(${i})">${o}</button>`).join('');
    return `
      <div class="scenario-card">
        <div class="scenario-badge">💡 Situasi</div>
        <div class="scenario-body">${q.scenario}</div>
      </div>
      <p class="scenario-q-lbl">Apa tindakan terbaik?</p>
      <div class="scenario-opts">${optsHTML}</div>
      <div class="qfb" id="qfb"></div><div class="qfb-next" id="qfb-next"></div>`;
  }

  /* ─────────────────────────
     TIMER
     FIX #1: Gunakan deadline berbasis Date.now() agar tidak drift di desktop.
             Poll setiap 250ms supaya stop tepat di 0, tidak minus.
  ───────────────────────── */
  function _startTimer() {
    const deadline = Date.now() + state.tl * 1000;
    state.tmr = setInterval(() => {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      state.tl = Math.max(0, remaining);
      const el = document.getElementById('qz-timer');
      if (el) {
        el.textContent = state.tl + 's';
        el.className = 'qz-timer' + (state.tl <= 8 ? ' danger' : state.tl <= 18 ? ' warning' : '');
      }
      if (state.tl <= 0) {
        clearInterval(state.tmr);
        state.tmr = null;
        _timeUp();
      }
    }, 250);
  }

  /* FIX #2: _timeUp tidak langsung auto-advance.
             Panggil _showNextBtn agar user yang klik "Lanjut". */
  function _timeUp() {
    const q = state.questions[state.idx];
    _showFB(false, '⏰ Waktu habis! ' + q.ex);
    if (q.tp === 'mcq')      { document.querySelectorAll('.opt').forEach(b => b.disabled = true); const e = document.getElementById('opt' + q.ans); if (e) e.classList.add('ok'); }
    if (q.tp === 'tf')       { document.querySelectorAll('.tf-btn').forEach(b => b.disabled = true); }
    if (q.tp === 'scenario') { document.querySelectorAll('.sc-opt').forEach(b => b.disabled = true); const e = document.getElementById('sco' + q.ans); if (e) e.classList.add('ok'); }
    if (q.tp === 'drag')     { _checkDrag(true); return; }
    if (q.tp === 'stf')      { _checkSTF(true); return; }
    _showNextBtn();
  }

  /* ─────────────────────────
     ANSWER HANDLERS
  ───────────────────────── */
  function _answerMCQ(i) {
    clearInterval(state.tmr); state.tmr = null;
    const q = state.questions[state.idx];
    document.querySelectorAll('.opt').forEach(b => b.disabled = true);
    const ok = i === q.ans;
    const bonus = Math.max(0, Math.floor(state.tl / 3));
    if (ok) { state.score += 10 + bonus; state.corr++; }
    document.getElementById('opt' + i).classList.add(ok ? 'ok' : 'no');
    if (!ok) document.getElementById('opt' + q.ans).classList.add('ok');
    _showFB(ok, ok ? `Benar! +${10 + bonus} poin (bonus waktu +${bonus})` : 'Salah. ' + q.ex);
    // FIX #4: tampilkan tombol Lanjut agar user bisa baca penjelasan dulu
    _showNextBtn();
  }

  function _answerTF(val) {
    clearInterval(state.tmr); state.tmr = null;
    const q = state.questions[state.idx];
    const ok = val === q.ans;
    const bonus = Math.max(0, Math.floor(state.tl / 3));
    if (ok) { state.score += 10 + bonus; state.corr++; }
    document.getElementById('tf-t').disabled = true;
    document.getElementById('tf-f').disabled = true;
    const correctBtn = document.getElementById(q.ans === true ? 'tf-t' : 'tf-f');
    if (correctBtn) correctBtn.classList.add('tf-correct');
    if (!ok) {
      const wrongBtn = document.getElementById(val ? 'tf-t' : 'tf-f');
      if (wrongBtn) wrongBtn.classList.add('tf-wrong');
    }
    _showFB(ok, ok ? `Tepat! +${10 + bonus} poin` : 'Salah. ' + q.ex);
    _showNextBtn();
  }

  function _pickChip(i, v, el) {
    if (el.classList.contains('placed')) return;
    ddSel = { i, v, el };
    document.querySelectorAll('.dd-chip').forEach(c => { if (!c.classList.contains('placed')) c.classList.remove('sel'); });
    el.classList.add('sel');
  }

  function _dropChip(ti) {
    if (!ddSel) return;
    const slot = document.getElementById('dds' + ti);
    const txt  = document.getElementById('ddst' + ti);
    if (slot.classList.contains('ok') || slot.classList.contains('no')) return;

    /* return prev chip to pool if slot was already filled */
    const prevVal = state.drag.ans[ti];
    if (prevVal !== null) {
      document.querySelectorAll('.dd-chip').forEach(c => {
        if (c.dataset.val === prevVal && c.classList.contains('placed')) {
          c.classList.remove('placed');
          c.style.display = '';
        }
      });
    }

    state.drag.ans[ti] = ddSel.v;
    txt.textContent = ddSel.v;
    slot.classList.add('filled');
    ddSel.el.classList.add('placed');
    ddSel.el.classList.remove('sel');
    ddSel.el.style.display = 'none';
    ddSel = null;
    document.querySelectorAll('.dd-chip').forEach(c => c.classList.remove('sel'));
  }

  function _clearSlot(ev, ti) {
    ev.stopPropagation();
    const slot = document.getElementById('dds' + ti);
    const txt  = document.getElementById('ddst' + ti);
    if (slot.classList.contains('ok') || slot.classList.contains('no')) return;
    const prevVal = state.drag.ans[ti];
    if (prevVal === null) return;

    document.querySelectorAll('.dd-chip').forEach(c => {
      if (c.dataset.val === prevVal) {
        c.classList.remove('placed', 'sel');
        c.style.display = '';
      }
    });
    state.drag.ans[ti] = null;
    txt.textContent = 'Klik untuk isi';
    slot.classList.remove('filled');
  }

  function _checkDrag(forced) {
    if (state.drag.locked) return;
    state.drag.locked = true;
    clearInterval(state.tmr); state.tmr = null;
    const { shuf, ans, pairs } = state.drag;
    let ok = 0;
    shuf.forEach((p, i) => {
      const slot = document.getElementById('dds' + i);
      const txt  = document.getElementById('ddst' + i);
      if (ans[i] === p.m) {
        slot.classList.add('ok');
        ok++;
      } else {
        // FIX #3: selalu tampilkan jawaban benar, baik slot kosong maupun salah isi
        slot.classList.add('no');
        txt.textContent = '→ ' + p.m;
      }
    });
    const pts = ok * Math.ceil(20 / pairs.length);
    state.score += pts;
    if (ok === pairs.length) state.corr++;
    _showFB(ok === pairs.length,
      ok === pairs.length
        ? `Sempurna! Semua benar! +${pts} poin`
        : `${ok}/${pairs.length} benar. +${pts} poin — jawaban yang benar sudah ditampilkan.`);
    const btn = document.getElementById('dd-check-btn');
    if (btn) btn.style.display = 'none';
    _showNextBtn();
  }

  function _pickSTF(i) {
    if (state.stf.done) return;
    const el  = document.getElementById('stfc' + i);
    const idx = state.stf.picked.indexOf(i);
    if (idx === -1) { state.stf.picked.push(i); el.classList.add('stf-sel'); }
    else            { state.stf.picked.splice(idx, 1); el.classList.remove('stf-sel'); }
  }

  function _checkSTF(forced) {
    if (state.stf.done) return;
    clearInterval(state.tmr); state.tmr = null;
    state.stf.done = true;
    const q    = state.questions[state.idx];
    const corr = [...q.correctFake].sort().join(',');
    const pick = [...state.stf.picked].sort().join(',');
    const ok   = corr === pick;

    q.items.forEach((it, i) => {
      const el = document.getElementById('stfc' + i);
      el.classList.remove('stf-sel');
      el.classList.add('stf-locked');
      if (it.fake)                          el.classList.add('stf-reveal-bad');
      else if (state.stf.picked.includes(i)) el.classList.add('stf-reveal-wrong');
    });

    const pts = ok ? 20 : 0;
    state.score += pts;
    if (ok) state.corr++;
    _showFB(ok, ok ? `Tepat! Kamu menemukan semua yang salah! +${pts} poin` : q.ex);
    const btn = document.getElementById('stf-check-btn');
    if (btn) btn.style.display = 'none';
    _showNextBtn();
  }

  function _answerScenario(i) {
    clearInterval(state.tmr); state.tmr = null;
    const q = state.questions[state.idx];
    document.querySelectorAll('.sc-opt').forEach(b => b.disabled = true);
    const ok    = i === q.ans;
    const bonus = Math.max(0, Math.floor(state.tl / 4));
    if (ok) { state.score += 15 + bonus; state.corr++; }
    document.getElementById('sco' + i).classList.add(ok ? 'ok' : 'no');
    if (!ok) document.getElementById('sco' + q.ans).classList.add('ok');
    _showFB(ok, ok ? `Pilihan terbaik! +${15 + bonus} poin` : 'Belum tepat. ' + q.ex);
    _showNextBtn();
  }

  /* ─────────────────────────
     HELPERS
  ───────────────────────── */
  function _showFB(ok, txt) {
    const el = document.getElementById('qfb');
    if (el) { el.textContent = (ok ? '✅ ' : '❌ ') + txt; el.className = 'qfb show ' + (ok ? 'ok' : 'no'); }
    const pts = document.getElementById('qz-pts');
    if (pts) pts.textContent = '⭐ ' + state.score;
  }

  /* FIX #4: Tombol "Lanjut →" menggantikan auto-setTimeout agar user bisa
             membaca penjelasan terlebih dahulu sebelum pindah soal. */
  function _showNextBtn() {
    const container = document.getElementById('qfb-next');
    if (!container) return;
    const isLast = state.idx >= state.questions.length - 1;
    const label  = isLast ? 'Lihat Hasil 🏁' : 'Lanjut →';
    container.innerHTML = `<button class="btn-next-q" onclick="Quiz._nextQ()">${label}</button>`;
  }

  function _nextQ() {
    state.idx++;
    if (state.idx >= state.questions.length) Result.show(state);
    else _render();
  }

  function _confirmExit() {
    if (confirm('Keluar dari kuis? Progres tidak disimpan.')) { App.goHome(); }
  }

  /* ─────────────────────────
     EXPOSE
  ───────────────────────── */
  return {
    start,
    _render,         /* used by theme toggle */
    _confirmExit,
    _answerMCQ,
    _answerTF,
    _pickChip,
    _dropChip,
    _clearSlot,
    _checkDrag,
    _pickSTF,
    _checkSTF,
    _answerScenario,
    _nextQ
  };

})();
