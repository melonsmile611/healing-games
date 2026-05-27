"use client";

export type AudioNodes = (AudioNode | AudioScheduledSourceNode)[];

/* ─── helpers ─── */
function makeBuffer(ctx: AudioContext, seconds = 3): AudioBufferSourceNode {
  const sr  = ctx.sampleRate;
  const buf = ctx.createBuffer(1, Math.ceil(sr * seconds), sr);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

function pinkNoise(ctx: AudioContext): AudioBufferSourceNode {
  const sr  = ctx.sampleRate;
  const buf = ctx.createBuffer(1, sr * 6, sr);
  const d   = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.18;
    b6 = w * 0.115926;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  return src;
}

function reverb(ctx: AudioContext, duration = 1.5, decay = 2): ConvolverNode {
  const rate = ctx.sampleRate;
  const len  = Math.floor(rate * duration);
  const ir   = ctx.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  return conv;
}

/* ─── Rain ─── */
export function makeRain(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.7;
  master.connect(ctx.destination);

  // fine mist — highpassed pink noise
  const mist = pinkNoise(ctx);
  const mistHp = ctx.createBiquadFilter(); mistHp.type = "highpass"; mistHp.frequency.value = 2200;
  const mistG  = ctx.createGain(); mistG.gain.value = 0.5;
  mist.connect(mistHp); mistHp.connect(mistG); mistG.connect(master);
  mist.start();

  // main body — mid-frequency pink noise
  const mid   = pinkNoise(ctx);
  const midLp = ctx.createBiquadFilter(); midLp.type = "lowpass";  midLp.frequency.value = 1800;
  const midHp = ctx.createBiquadFilter(); midHp.type = "highpass"; midHp.frequency.value = 300;
  const midG  = ctx.createGain(); midG.gain.value = 0.8;
  mid.connect(midLp); midLp.connect(midHp); midHp.connect(midG); midG.connect(master);
  mid.start();

  // gust LFO
  const lfo  = ctx.createOscillator(); lfo.frequency.value = 0.07;
  const lfoG = ctx.createGain(); lfoG.gain.value = 0.15;
  lfo.connect(lfoG); lfoG.connect(midG.gain);
  lfo.start();

  // deep drip layer
  const deep   = pinkNoise(ctx);
  const deepLp = ctx.createBiquadFilter(); deepLp.type = "lowpass"; deepLp.frequency.value = 400;
  const deepG  = ctx.createGain(); deepG.gain.value = 0.4;
  deep.connect(deepLp); deepLp.connect(deepG); deepG.connect(master);
  deep.start();

  return [mist, mid, deep, lfo, mistHp, midLp, midHp, deepLp, mistG, midG, deepG, lfoG, master];
}

/* ─── Ocean waves ─── */
export function makeOcean(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.65;
  const rev    = reverb(ctx, 2.5, 1.5);
  master.connect(rev); rev.connect(ctx.destination);
  const nodes: AudioNodes = [master, rev];

  // three wave layers — base gain > 0 so LFO gives swell, not inversion
  const layers = [
    { period: 0.07, base: 0.40, swing: 0.35, lpFreq: 500  },
    { period: 0.14, base: 0.25, swing: 0.22, lpFreq: 1000 },
    { period: 0.26, base: 0.15, swing: 0.13, lpFreq: 2200 },
  ];
  layers.forEach(({ period, base, swing, lpFreq }) => {
    const src  = pinkNoise(ctx);
    const lp   = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = lpFreq;
    const g    = ctx.createGain(); g.gain.value = base;
    const lfo  = ctx.createOscillator(); lfo.frequency.value = period;
    const lfoG = ctx.createGain(); lfoG.gain.value = swing;
    lfo.connect(lfoG); lfoG.connect(g.gain);
    src.connect(lp); lp.connect(g); g.connect(master);
    src.start(); lfo.start();
    nodes.push(src, lp, g, lfo, lfoG);
  });

  // foam hiss on top
  const hiss   = pinkNoise(ctx);
  const hissHp = ctx.createBiquadFilter(); hissHp.type = "highpass"; hissHp.frequency.value = 3000;
  const hissG  = ctx.createGain(); hissG.gain.value = 0.22;
  hiss.connect(hissHp); hissHp.connect(hissG); hissG.connect(master);
  hiss.start();
  nodes.push(hiss, hissHp, hissG);

  return nodes;
}

/* ─── Fireplace ─── */
export function makeFireplace(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.7;
  master.connect(ctx.destination);
  const nodes: AudioNodes = [master];

  // body of fire — wide-band pink noise, 80 Hz–2 kHz
  const body   = pinkNoise(ctx);
  const bodyLp = ctx.createBiquadFilter(); bodyLp.type = "lowpass";  bodyLp.frequency.value = 2000;
  const bodyHp = ctx.createBiquadFilter(); bodyHp.type = "highpass"; bodyHp.frequency.value = 80;
  const bodyG  = ctx.createGain(); bodyG.gain.value = 0.7;
  // slow breathing
  const breathLfo  = ctx.createOscillator(); breathLfo.frequency.value = 0.25;
  const breathLfoG = ctx.createGain(); breathLfoG.gain.value = 0.12;
  breathLfo.connect(breathLfoG); breathLfoG.connect(bodyG.gain);
  body.connect(bodyLp); bodyLp.connect(bodyHp); bodyHp.connect(bodyG); bodyG.connect(master);
  body.start(); breathLfo.start();
  nodes.push(body, bodyLp, bodyHp, bodyG, breathLfo, breathLfoG);

  // random crackle pops
  let t = ctx.currentTime + 0.05;
  for (let i = 0; i < 30; i++) {
    t += 0.06 + Math.random() * 0.55;
    const src = makeBuffer(ctx, 0.08);
    const bp  = ctx.createBiquadFilter(); bp.type = "bandpass";
    bp.frequency.value = 500 + Math.random() * 1500;
    bp.Q.value = 2 + Math.random() * 5;
    const g   = ctx.createGain(); g.gain.value = 0;
    const vol = 0.4 + Math.random() * 0.55;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.03 + Math.random() * 0.09);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(t); src.stop(t + 0.15);
    nodes.push(src, bp, g);
  }

  // high hiss (burning)
  const hiss   = pinkNoise(ctx);
  const hissHp = ctx.createBiquadFilter(); hissHp.type = "highpass"; hissHp.frequency.value = 3000;
  const hissG  = ctx.createGain(); hissG.gain.value = 0.28;
  hiss.connect(hissHp); hissHp.connect(hissG); hissG.connect(master);
  hiss.start();
  nodes.push(hiss, hissHp, hissG);

  return nodes;
}

/* ─── Stream / river ─── */
export function makeStream(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.6;
  master.connect(ctx.destination);
  const nodes: AudioNodes = [master];

  // main babble layer
  const src  = pinkNoise(ctx);
  const bp1  = ctx.createBiquadFilter(); bp1.type = "bandpass"; bp1.frequency.value = 800;  bp1.Q.value = 0.4;
  const bp2  = ctx.createBiquadFilter(); bp2.type = "bandpass"; bp2.frequency.value = 2000; bp2.Q.value = 0.5;
  const g1   = ctx.createGain(); g1.gain.value = 0.65;
  const g2   = ctx.createGain(); g2.gain.value = 0.3;
  const lfo  = ctx.createOscillator(); lfo.frequency.value = 0.85;
  const lfoG = ctx.createGain(); lfoG.gain.value = 0.18;
  lfo.connect(lfoG); lfoG.connect(g1.gain);
  src.connect(bp1); bp1.connect(g1); g1.connect(master);
  src.connect(bp2); bp2.connect(g2); g2.connect(master);
  src.start(); lfo.start();
  nodes.push(src, bp1, bp2, g1, g2, lfo, lfoG);

  // gentle low rumble under the babble
  const low   = pinkNoise(ctx);
  const lowLp = ctx.createBiquadFilter(); lowLp.type = "lowpass"; lowLp.frequency.value = 300;
  const lowG  = ctx.createGain(); lowG.gain.value = 0.35;
  low.connect(lowLp); lowLp.connect(lowG); lowG.connect(master);
  low.start();
  nodes.push(low, lowLp, lowG);

  return nodes;
}

/* ─── Wind through leaves ─── */
export function makeWind(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.6;
  master.connect(ctx.destination);
  const nodes: AudioNodes = [master];

  // main wind body
  const src  = pinkNoise(ctx);
  const bp   = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 600; bp.Q.value = 0.3;
  const lp   = ctx.createBiquadFilter(); lp.type = "lowpass";  lp.frequency.value = 1800;
  const g    = ctx.createGain(); g.gain.value = 0.55;
  const lfo  = ctx.createOscillator(); lfo.frequency.value = 0.15;
  const lfoG = ctx.createGain(); lfoG.gain.value = 0.28;
  lfo.connect(lfoG); lfoG.connect(g.gain);
  src.connect(bp); bp.connect(lp); lp.connect(g); g.connect(master);
  src.start(); lfo.start();
  nodes.push(src, bp, lp, g, lfo, lfoG);

  // leaf rustle — high-frequency noise bursts
  const rustle   = pinkNoise(ctx);
  const rustleHp = ctx.createBiquadFilter(); rustleHp.type = "highpass"; rustleHp.frequency.value = 4000;
  const rustleG  = ctx.createGain(); rustleG.gain.value = 0.28;
  const rLfo     = ctx.createOscillator(); rLfo.frequency.value = 1.8;
  const rLfoG    = ctx.createGain(); rLfoG.gain.value = 0.22;
  rLfo.connect(rLfoG); rLfoG.connect(rustleG.gain);
  rustle.connect(rustleHp); rustleHp.connect(rustleG); rustleG.connect(master);
  rustle.start(); rLfo.start();
  nodes.push(rustle, rustleHp, rustleG, rLfo, rLfoG);

  return nodes;
}

/* ─── Forest birds ─── */
export function makeBirds(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.65;
  const rev    = reverb(ctx, 2.2, 2.5);
  master.connect(rev); rev.connect(ctx.destination);
  const nodes: AudioNodes = [master, rev];

  // ambient forest bed
  const bed   = pinkNoise(ctx);
  const bedLp = ctx.createBiquadFilter(); bedLp.type = "lowpass"; bedLp.frequency.value = 500;
  const bedG  = ctx.createGain(); bedG.gain.value = 0.18;
  bed.connect(bedLp); bedLp.connect(bedG); bedG.connect(master);
  bed.start();
  nodes.push(bed, bedLp, bedG);

  // bird call shapes: [baseFreq, bend, noteDur, repeatCount, gapBetween, delay]
  const calls = [
    [2800,  450, 0.12, 3, 0.18, 0.3 ],
    [3300, -280, 0.09, 2, 0.28, 1.1 ],
    [1950,  700, 0.22, 1, 0,    0.7 ],
    [4100, -900, 0.07, 4, 0.13, 1.8 ],
    [2400,  350, 0.15, 2, 0.22, 2.6 ],
    [3700, -500, 0.10, 3, 0.16, 3.4 ],
  ];
  calls.forEach(([freq, bend, dur, reps, gap, delay]) => {
    for (let r = 0; r < reps; r++) {
      const t   = ctx.currentTime + delay + r * (dur + gap);
      const osc = ctx.createOscillator(); osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq + bend, t + dur);
      const g = ctx.createGain(); g.gain.value = 0;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.012);
      g.gain.setValueAtTime(0.18, t + dur - 0.025);
      g.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + dur + 0.01);
      nodes.push(osc, g);
    }
  });

  return nodes;
}

/* ─── Cat purr ─── */
export function makePurr(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.55;
  master.connect(ctx.destination);

  // dual oscillators slightly detuned for a richer purr
  const osc1 = ctx.createOscillator(); osc1.type = "sawtooth"; osc1.frequency.value = 24;
  const osc2 = ctx.createOscillator(); osc2.type = "sawtooth"; osc2.frequency.value = 26.5;
  const lp1  = ctx.createBiquadFilter(); lp1.type = "lowpass"; lp1.frequency.value = 250;
  const lp2  = ctx.createBiquadFilter(); lp2.type = "lowpass"; lp2.frequency.value = 180;
  const g1   = ctx.createGain(); g1.gain.value = 0.55;
  const g2   = ctx.createGain(); g2.gain.value = 0.45;

  // in-out breathing rhythm at ~26 cycles/min
  const breathLfo  = ctx.createOscillator(); breathLfo.frequency.value = 0.43;
  const breathLfoG = ctx.createGain(); breathLfoG.gain.value = 0.28;
  breathLfo.connect(breathLfoG); breathLfoG.connect(master.gain);

  osc1.connect(lp1); lp1.connect(g1); g1.connect(master);
  osc2.connect(lp2); lp2.connect(g2); g2.connect(master);
  osc1.start(); osc2.start(); breathLfo.start();

  return [osc1, osc2, breathLfo, lp1, lp2, g1, g2, breathLfoG, master];
}

/* ─── Keyboard typing ─── */
export function makeTyping(ctx: AudioContext): AudioNodes {
  const nodes: AudioNodes = [];
  let t = ctx.currentTime + 0.08;

  for (let burst = 0; burst < 6; burst++) {
    const len = 3 + Math.floor(Math.random() * 7);
    for (let k = 0; k < len; k++) {
      const keyT = t + k * (0.09 + Math.random() * 0.09);

      // key-down thump
      const dn   = makeBuffer(ctx, 0.06);
      const dnBp = ctx.createBiquadFilter(); dnBp.type = "bandpass";
      dnBp.frequency.value = 2000 + Math.random() * 1200; dnBp.Q.value = 3;
      const dnG  = ctx.createGain(); dnG.gain.value = 0;
      dnG.gain.setValueAtTime(0.35 + Math.random() * 0.2, keyT);
      dnG.gain.exponentialRampToValueAtTime(0.001, keyT + 0.045);
      dn.connect(dnBp); dnBp.connect(dnG); dnG.connect(ctx.destination);
      dn.start(keyT); dn.stop(keyT + 0.07);

      // key-up click (softer, slightly higher)
      const upT  = keyT + 0.055 + Math.random() * 0.03;
      const up   = makeBuffer(ctx, 0.04);
      const upBp = ctx.createBiquadFilter(); upBp.type = "bandpass";
      upBp.frequency.value = 3200 + Math.random() * 1000; upBp.Q.value = 4;
      const upG  = ctx.createGain(); upG.gain.value = 0;
      upG.gain.setValueAtTime(0.14, upT);
      upG.gain.exponentialRampToValueAtTime(0.001, upT + 0.03);
      up.connect(upBp); upBp.connect(upG); upG.connect(ctx.destination);
      up.start(upT); up.stop(upT + 0.05);

      nodes.push(dn, dnBp, dnG, up, upBp, upG);
    }
    t += len * 0.14 + 0.35 + Math.random() * 0.65;
  }
  return nodes;
}

/* ─── Wind chimes ─── */
export function makeWindChimes(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.75;
  const rev    = reverb(ctx, 3.5, 1.6);
  master.connect(rev); rev.connect(ctx.destination);
  const nodes: AudioNodes = [master, rev];

  // pentatonic scale — chimes stay in key
  const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];

  let t = ctx.currentTime + 0.15;
  for (let i = 0; i < 14; i++) {
    const freq = scale[Math.floor(Math.random() * scale.length)];
    const osc  = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = freq;
    // add slight second harmonic for richness
    const osc2 = ctx.createOscillator(); osc2.type = "sine"; osc2.frequency.value = freq * 2.76;
    const g    = ctx.createGain(); g.gain.value = 0;
    const g2   = ctx.createGain(); g2.gain.value = 0;
    const decay = 1.8 + Math.random() * 1.4;
    g.gain.setValueAtTime(0.28, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    g2.gain.setValueAtTime(0.07, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + decay * 0.6);
    osc.connect(g);   g.connect(master);
    osc2.connect(g2); g2.connect(master);
    osc.start(t);  osc.stop(t + decay + 0.05);
    osc2.start(t); osc2.stop(t + decay + 0.05);
    nodes.push(osc, osc2, g, g2);
    t += 0.28 + Math.random() * 0.7;
  }
  return nodes;
}

/* ─── Bees / summer meadow ─── */
export function makeBees(ctx: AudioContext): AudioNodes {
  const master = ctx.createGain(); master.gain.value = 0.5;
  master.connect(ctx.destination);

  // main buzz — two detuned sawtooth oscillators
  const osc1  = ctx.createOscillator(); osc1.type = "sawtooth"; osc1.frequency.value = 195;
  const osc2  = ctx.createOscillator(); osc2.type = "sawtooth"; osc2.frequency.value = 207;
  const lp    = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
  const g1    = ctx.createGain(); g1.gain.value = 0.09;
  const g2    = ctx.createGain(); g2.gain.value = 0.07;

  // wing-beat flutter (200 Hz)
  const flutter  = ctx.createOscillator(); flutter.frequency.value = 200;
  const flutterG = ctx.createGain(); flutterG.gain.value = 18;
  flutter.connect(flutterG);
  flutterG.connect(osc1.frequency);
  flutterG.connect(osc2.frequency);

  // slow volume swell (bee passing by)
  const passLfo  = ctx.createOscillator(); passLfo.frequency.value = 0.22;
  const passLfoG = ctx.createGain(); passLfoG.gain.value = 0.28;
  passLfo.connect(passLfoG); passLfoG.connect(master.gain);

  osc1.connect(lp); lp.connect(g1); g1.connect(master);
  osc2.connect(g2); g2.connect(master);
  osc1.start(); osc2.start(); flutter.start(); passLfo.start();

  return [osc1, osc2, flutter, passLfo, lp, g1, g2, flutterG, passLfoG, master];
}

/* ─── stop all ─── */
export function stopAll(nodes: AudioNodes) {
  nodes.forEach(n => {
    try { if ("stop" in n) (n as AudioScheduledSourceNode).stop(); } catch (_) {}
    try { n.disconnect(); } catch (_) {}
  });
}
