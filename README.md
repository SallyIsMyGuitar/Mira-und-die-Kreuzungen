# Mira und die Kreuzungen

Ein Lernspiel zu **linearen Gleichungssystemen** für die 9. Klasse (Realschule Bayern, Wahlpflichtfächergruppe I, LehrplanPLUS M9, Lernbereich 6) im Stil klassischer 8-Bit-Abenteuer – als **eine einzige Datei `index.html`**.

## Spielidee

Im Land Lineara kreuzen sich alle Wege an genau einem Punkt. Ein Zauber hat die Kreuzungen verwirrt – Mira, die Wegfinderin, muss die Schnittpunkte wiederfinden. Jeder Kampf gegen ein Monster wird durch das Lösen eines linearen Gleichungssystems entschieden.

| Gebiet | Gegenstand | Verfahren |
|---|---|---|
| Wiese | Fernrohr | grafisch |
| Wald | Schwert | Gleichsetzungsverfahren |
| Sumpf | Bumerang | Einsetzungsverfahren |
| Höhle | Hammer | Additionsverfahren |
| Burg | – | Boss: gemischt mit Verfahrenswahl |

- **Niveaus:** leicht / standard / plus (Brüche, Klammern, binomische Formeln)
- **Sonderfälle:** „keine Lösung“ und „unendlich viele Lösungen“
- **Deutsche Konventionen:** Dezimalkomma (`0,75`), Lösungsmenge `L = {(x|y)}`, echtes Minuszeichen
- **Spieldauer:** ca. 20–30 Minuten

## Spielen

Einfach `index.html` im Browser öffnen (Chrome/Safari auf dem Mac, Safari auf dem iPad). Keine Installation, keine externen Ressourcen, keine Netzwerkanfragen – das Spiel läuft komplett lokal.

- **Tastatur:** Pfeiltasten/WASD zum Laufen, Enter zum Bestätigen
- **iPad:** Touch-Steuerkreuz und A-Taste werden automatisch eingeblendet
- **Kampfbildschirm:** Bildschirm-Zahlenfeld (0–9, Komma, Minus, Bruchstrich, OK)

## Testen

Das Spiel enthält einen integrierten Selbsttest:

- Im Browser: `index.html?test` aufrufen (Ausgabe in der Browser-Konsole) oder in der Konsole `selbsttest()` eingeben
- Automatisch: GitHub-Actions-Workflow (`.github/workflows/test.yml`) führt den Selbsttest headless mit Node aus und prüft u. a. die Referenzaufgaben, 2.400 generierte Aufgaben je Verfahren/Niveau, den Eingabe-Parser und die Formatierung

## Technik

- Eine einzige Datei: HTML, CSS und Vanilla JS, kein Framework, kein Build-Schritt
- Exakte Bruchrechnung über eine eigene `Bruch`-Klasse – keine Gleitkommazahlen in der Mathematik
- Sprites als Pixel-Arrays im Code, Sound über die Web Audio API
- Interne Auflösung 256 × 240 Pixel (NES-Stil), eigene 8×8-Pixelschrift

Details zur Spezifikation: siehe [AGENTS.md](AGENTS.md).
