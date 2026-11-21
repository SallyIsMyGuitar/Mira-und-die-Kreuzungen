/*
  Führt den eingebauten selbsttest() des Spiels headless unter Node aus.
  Lädt index.html, extrahiert das <script>, stubbt die Browser-APIs,
  führt den Code aus und ruft selbsttest() auf.
  Ein fehlgeschlagener Test beendet den Prozess mit Exit-Code 1.
*/
'use strict';
const { readFileSync } = require('fs');

/* --- index.html laden und Script extrahieren --- */
const html = readFileSync('index.html', 'utf8');
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) {
  console.error('Kein <script>-Block in index.html gefunden.');
  process.exit(1);
}
let code = m[1];
/* automatischen Start über ?test entfernen; wir rufen selbsttest() explizit auf */
code = code.replace(/if \(location\.search\.indexOf\('test'\) >= 0\) selbsttest\(\);/, '');

/* --- Browser-APIs stubben --- */
const noop = () => {};
const stub = new Proxy(function () {}, {
  get: (t, p) => stub,
  apply: () => stub,
  construct: () => ({})
});
globalThis.location = { search: '', hash: '' };
globalThis.window = globalThis;
globalThis.document = new Proxy({}, {
  get: (t, p) => {
    if (p === 'getElementById' || p === 'querySelector' || p === 'querySelectorAll') return () => stub;
    if (p === 'createElement') return () => stub;
    if (p === 'addEventListener') return noop;
    if (p === 'body' || p === 'documentElement') return stub;
    return typeof p === 'string' ? noop : undefined;
  }
});
globalThis.requestAnimationFrame = noop;
globalThis.AudioContext = function () {
  this.currentTime = 0;
  this.destination = {};
  this.createOscillator = () => ({ connect: noop, start: noop, stop: noop });
};
globalThis.webkitAudioContext = globalThis.AudioContext;
Object.defineProperty(globalThis, 'navigator', { value: { maxTouchPoints: 0, userAgent: 'node', platform: 'node' }, configurable: true });
globalThis.addEventListener = noop;
globalThis.performance = { now: () => Date.now() };

/* --- Konsolenfehler als Testfehler werten --- */
let fehler = 0;
const origError = console.error;
console.error = (...a) => { fehler++; origError('KONSOLENFEHLER:', ...a); };

try {
  eval(code);
  const ok = globalThis.selbsttest();
  if (ok === false) { origError('selbsttest() meldete Fehler.'); process.exit(1); }
} catch (e) {
  origError('FEHLER beim Ausführen des Selbsttests:', e && e.message ? e.message : e);
  origError(e && e.stack ? e.stack.split('\n').slice(0, 10).join('\n') : '');
  process.exit(1);
}
if (fehler > 0) { origError(`${fehler} Konsolenfehler während des Tests.`); process.exit(1); }
console.log('Selbsttest headless: alle Tests bestanden.');
