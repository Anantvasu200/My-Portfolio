import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Web Audio Sound Engine ───────────────────────────────────────────────────
function createAudioCtx() {
  try { return new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
}

function playJump(ctx) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine';
  const t = ctx.currentTime;
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
  osc.start(t); osc.stop(t + 0.2);
}

function playLand(ctx) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'triangle';
  const t = ctx.currentTime;
  osc.frequency.setValueAtTime(180, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);
  gain.gain.setValueAtTime(0.12, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.start(t); osc.stop(t + 0.1);
}

function playMilestone(ctx) {
  if (!ctx) return;
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6 arpeggio
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'square';
    const t = ctx.currentTime + i * 0.07;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.10, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t); osc.stop(t + 0.12);
  });
}

function playCrash(ctx) {
  if (!ctx) return;
  // Noise burst
  const bufSize = ctx.sampleRate * 0.25;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const gain = ctx.createGain();
  src.connect(gain); gain.connect(ctx.destination);
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0.22, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  src.start(t); src.stop(t + 0.3);

  // Descending tone overlay
  const osc = ctx.createOscillator();
  const ogain = ctx.createGain();
  osc.connect(ogain); ogain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(60, t + 0.35);
  ogain.gain.setValueAtTime(0.15, t);
  ogain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc.start(t); osc.stop(t + 0.38);
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CANVAS_W   = 700;
const CANVAS_H   = 160;
const GROUND_Y   = 120;
const PLAYER_W   = 30;
const PLAYER_H   = 36;
const GRAVITY    = 0.55;
const JUMP_VY    = -13;
const BASE_SPEED = 5;

// Obstacle configs  { label, w, h, color, icon }
const OBSTACLE_TYPES = [
  { label: 'BUG',     w: 26, h: 30, color: '#ef4444', icon: '🐛' },
  { label: 'ERR 500', w: 44, h: 26, color: '#f97316', icon: '💥' },
  { label: 'DOWNTIME',w: 36, h: 34, color: '#8b5cf6', icon: '⚡' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randBetween(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pickObstacle() { return OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)]; }

// ─── Component ────────────────────────────────────────────────────────────────
export default function MiniGame() {
  const canvasRef  = useRef(null);
  const stateRef   = useRef(null);        // mutable game state (no re-render)
  const rafRef     = useRef(null);
  const audioCtxRef = useRef(null);       // lazily created AudioContext
  const mutedRef   = useRef(false);       // mute state (no re-render needed)
  const [uiState, setUiState] = useState({ phase: 'idle', score: 0, hiScore: 0 });
  const [muted, setMuted] = useState(false);

  // ── Sound helpers (respects mute) ────────────────────────────────────────
  const ensureAudio = () => {
    if (!audioCtxRef.current) audioCtxRef.current = createAudioCtx();
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  };
  const sfxJump      = () => { if (!mutedRef.current) playJump(ensureAudio()); };
  const sfxLand      = () => { if (!mutedRef.current) playLand(ensureAudio()); };
  const sfxMilestone = () => { if (!mutedRef.current) playMilestone(ensureAudio()); };
  const sfxCrash     = () => { if (!mutedRef.current) playCrash(ensureAudio()); };

  const toggleMute = () => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  };

  // ── Detect dark mode ──────────────────────────────────────────────────────
  const isDark = () => document.documentElement.classList.contains('dark');

  // ── Init game state ───────────────────────────────────────────────────────
  const initState = useCallback(() => ({
    player: { x: 70, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true, jumping: false },
    obstacles: [],
    score: 0,
    frame: 0,
    nextSpawn: randBetween(60, 120),
    speed: BASE_SPEED,
    dead: false,
    started: true,
  }), []);

  // ── Draw frame ────────────────────────────────────────────────────────────
  const draw = useCallback((ctx, gs) => {
    const dark = isDark();
    const W = CANVAS_W;
    const H = CANVAS_H;

    // Background
    ctx.clearRect(0, 0, W, H);
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    if (dark) {
      bgGrad.addColorStop(0, 'rgba(15,23,42,0.85)');
      bgGrad.addColorStop(1, 'rgba(2,6,23,0.85)');
    } else {
      bgGrad.addColorStop(0, 'rgba(248,250,252,0.85)');
      bgGrad.addColorStop(1, 'rgba(226,232,240,0.85)');
    }
    ctx.fillStyle = bgGrad;
    ctx.roundRect(0, 0, W, H, 16);
    ctx.fill();

    // Ground line
    ctx.strokeStyle = dark ? 'rgba(148,163,184,0.25)' : 'rgba(100,116,139,0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(W, GROUND_Y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ground dots / runway feel
    for (let i = 0; i < W; i += 40) {
      const offset = (gs.frame * gs.speed * 0.4) % 40;
      const x = (i - offset + W) % W;
      ctx.fillStyle = dark ? 'rgba(148,163,184,0.15)' : 'rgba(100,116,139,0.15)';
      ctx.beginPath();
      ctx.arc(x, GROUND_Y + 6, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Player — terminal block
    const p = gs.player;
    const glowColor = dark ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.35)';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 14;

    ctx.fillStyle = dark ? '#3b82f6' : '#2563eb';
    ctx.roundRect(p.x, p.y, PLAYER_W, PLAYER_H, 6);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Terminal symbol on player
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$_', p.x + PLAYER_W / 2, p.y + PLAYER_H / 2);

    // Obstacles
    gs.obstacles.forEach(obs => {
      ctx.shadowColor = obs.color + '88';
      ctx.shadowBlur = 10;
      // Body
      ctx.fillStyle = obs.color;
      ctx.roundRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h, 5);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Icon
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(obs.icon, obs.x + obs.w / 2, GROUND_Y - obs.h / 2);

      // Label below
      ctx.font = 'bold 7px "JetBrains Mono", monospace';
      ctx.fillStyle = dark ? '#fff' : '#1e293b';
      ctx.fillText(obs.label, obs.x + obs.w / 2, GROUND_Y + 14);
    });

    // Score
    const scoreText = `SCORE  ${String(gs.score).padStart(5, '0')}`;
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = dark ? 'rgba(148,163,184,0.7)' : 'rgba(71,85,105,0.7)';
    ctx.fillText(scoreText, W - 16, 22);

    // Speed
    ctx.textAlign = 'left';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = dark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.45)';
    ctx.fillText(`${(gs.speed / BASE_SPEED * 100).toFixed(0)}% speed`, 12, 22);
  }, []);

  // ── Game loop ─────────────────────────────────────────────────────────────
  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gs = stateRef.current;
    if (!gs || gs.dead) return;

    gs.frame++;
    gs.score = Math.floor(gs.frame / 6);
    gs.speed = BASE_SPEED + gs.score / 120;

    // Physics
    const p = gs.player;
    const wasInAir = !p.onGround;
    p.vy += GRAVITY;
    p.y += p.vy;
    if (p.y >= GROUND_Y - PLAYER_H) {
      p.y = GROUND_Y - PLAYER_H;
      p.vy = 0;
      if (!p.onGround) sfxLand(); // landed
      p.onGround = true;
      p.jumping = false;
    }

    // Score milestones (every 50 pts)
    const prevScore = Math.floor((gs.frame - 1) / 6);
    const currScore = Math.floor(gs.frame / 6);
    if (currScore > 0 && currScore % 50 === 0 && prevScore % 50 !== 0) sfxMilestone();

    // Spawn obstacles
    gs.nextSpawn--;
    if (gs.nextSpawn <= 0) {
      const type = pickObstacle();
      gs.obstacles.push({ ...type, x: CANVAS_W + 20 });
      gs.nextSpawn = randBetween(70, 150);
    }

    // Move obstacles
    gs.obstacles = gs.obstacles.filter(o => o.x + o.w > -10);
    gs.obstacles.forEach(o => { o.x -= gs.speed; });

    // Collision (AABB with slight forgiveness)
    const pad = 5;
    const px1 = p.x + pad, px2 = p.x + PLAYER_W - pad;
    const py1 = p.y + pad, py2 = p.y + PLAYER_H - pad;
    for (const obs of gs.obstacles) {
      const ox1 = obs.x + pad, ox2 = obs.x + obs.w - pad;
      const oy1 = GROUND_Y - obs.h + pad, oy2 = GROUND_Y - pad;
      if (px1 < ox2 && px2 > ox1 && py1 < oy2 && py2 > oy1) {
        gs.dead = true;
        sfxCrash();
        setUiState(prev => ({ phase: 'dead', score: gs.score, hiScore: Math.max(gs.score, prev.hiScore) }));
        draw(ctx, gs);
        drawGameOver(ctx, gs);
        return;
      }
    }

    draw(ctx, gs);
    rafRef.current = requestAnimationFrame(loop);
  }, [draw, uiState.hiScore]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Game Over overlay ─────────────────────────────────────────────────────
  const drawGameOver = (ctx, gs) => {
    const dark = isDark();
    ctx.fillStyle = dark ? 'rgba(2,6,23,0.65)' : 'rgba(248,250,252,0.65)';
    ctx.roundRect(0, 0, CANVAS_W, CANVAS_H, 16);
    ctx.fill();

    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = dark ? '#f1f5f9' : '#0f172a';
    ctx.fillText('💀 Process Killed', CANVAS_W / 2, CANVAS_H / 2 - 14);

    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillStyle = dark ? '#94a3b8' : '#64748b';
    ctx.fillText(`exit code: 1  |  score: ${gs.score}  |  Press SPACE or TAP to restart`, CANVAS_W / 2, CANVAS_H / 2 + 12);
  };

  // ── Jump ──────────────────────────────────────────────────────────────────
  const jump = useCallback(() => {
    const gs = stateRef.current;
    if (!gs) return;
    if (gs.dead) {
      // Restart
      stateRef.current = initState();
      setUiState(prev => ({ ...prev, phase: 'playing', score: 0 }));
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    if (gs.player.onGround) {
      gs.player.vy = JUMP_VY;
      gs.player.onGround = false;
      gs.player.jumping = true;
      sfxJump();
    }
  }, [initState, loop, sfxJump, sfxCrash, sfxLand, sfxMilestone]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Start ─────────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    ensureAudio(); // unlock AudioContext on first user gesture
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    stateRef.current = initState();
    setUiState(prev => ({ ...prev, phase: 'playing', score: 0 }));
    rafRef.current = requestAnimationFrame(loop);
  }, [initState, loop]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keyboard & click listeners ────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); if (uiState.phase === 'idle') { startGame(); } else { jump(); } } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [uiState.phase, startGame, jump]);

  // ── Draw idle screen ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || uiState.phase !== 'idle') return;
    const ctx = canvas.getContext('2d');
    const dark = isDark();

    // bg
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    const bg = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
    if (dark) { bg.addColorStop(0, 'rgba(15,23,42,0.85)'); bg.addColorStop(1, 'rgba(2,6,23,0.85)'); }
    else { bg.addColorStop(0, 'rgba(248,250,252,0.85)'); bg.addColorStop(1, 'rgba(226,232,240,0.85)'); }
    ctx.fillStyle = bg;
    ctx.roundRect(0, 0, CANVAS_W, CANVAS_H, 16);
    ctx.fill();

    // Ground
    ctx.strokeStyle = dark ? 'rgba(148,163,184,0.25)' : 'rgba(100,116,139,0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(CANVAS_W, GROUND_Y); ctx.stroke();
    ctx.setLineDash([]);

    // Player
    ctx.shadowColor = 'rgba(59,130,246,0.5)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = dark ? '#3b82f6' : '#2563eb';
    ctx.roundRect(70, GROUND_Y - PLAYER_H, PLAYER_W, PLAYER_H, 6);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$_', 70 + PLAYER_W / 2, GROUND_Y - PLAYER_H / 2);

    // Prompt
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = dark ? '#94a3b8' : '#64748b';
    ctx.fillText('⎵  Press SPACE or tap to deploy the runner', CANVAS_W / 2, CANVAS_H / 2 - 6);

    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillStyle = dark ? '#475569' : '#94a3b8';
    ctx.fillText('Dodge Bugs · ERR 500s · Downtimes  ·  How long can you survive?', CANVAS_W / 2, CANVAS_H / 2 + 16);
  }, [uiState.phase]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Score updates during play ─────────────────────────────────────────────
  useEffect(() => {
    if (uiState.phase !== 'playing') return;
    const id = setInterval(() => {
      if (stateRef.current && !stateRef.current.dead) {
        setUiState(prev => ({ ...prev, score: stateRef.current?.score ?? prev.score }));
      }
    }, 300);
    return () => clearInterval(id);
  }, [uiState.phase]);

  return (
    <div className="w-full mt-12 select-none" id="mini-game-container">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-widest uppercase">
            DevOps Runner v1.0
          </span>
        </div>
        {uiState.phase !== 'idle' && (
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 dark:text-slate-500">
              SCORE <span className="text-blue-500 font-bold">{String(uiState.score).padStart(5, '0')}</span>
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              BEST&nbsp; <span className="text-violet-500 font-bold">{String(uiState.hiScore).padStart(5, '0')}</span>
            </span>
            {uiState.phase === 'dead' && (
              <span className="text-red-400 animate-pulse">● CRASHED</span>
            )}
          </div>
        )}
        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          title={muted ? 'Unmute' : 'Mute'}
          className="text-base leading-none px-2 py-1 rounded-lg glass hover:scale-110 transition-transform text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          aria-label={muted ? 'Unmute game sounds' : 'Mute game sounds'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={() => uiState.phase === 'idle' ? startGame() : jump()}
        className="w-full cursor-pointer rounded-2xl ring-1 ring-slate-200/60 dark:ring-slate-700/40 shadow-xl shadow-slate-200/40 dark:shadow-black/40"
        style={{ touchAction: 'none' }}
        onTouchStart={(e) => { e.preventDefault(); uiState.phase === 'idle' ? startGame() : jump(); }}
        aria-label="DevOps Runner mini-game — press space or tap to jump"
        role="img"
      />

      {/* Footer hint */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-2 font-mono">
        {uiState.phase === 'idle'
          ? '[ SPACE / TAP ] to start  ·  jump over Bugs & Downtime to survive'
          : '[ SPACE / TAP ] to jump'}
      </p>
    </div>
  );
}
