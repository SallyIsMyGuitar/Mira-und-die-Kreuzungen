# AGENTS.md – „Mira und die Kreuzungen“ (Arbeitstitel)

## 1. Projekt in einem Satz
Ein Lernspiel als **eine einzige Datei `index.html`** im Stil klassischer 8-Bit-Top-down-Abenteuer (NES-Ära): Die Heldin erkundet eine Welt, und jeder Kampf gegen ein Monster wird durch das **Lösen eines Systems linearer Gleichungen** entschieden.

## 2. Zielgruppe und Lehrplan
- Schülerinnen und Schüler der **9. Klasse, Realschule Bayern, Wahlpflichtfächergruppe I**
- LehrplanPLUS M9, Lernbereich 6 „Systeme linearer Gleichungen“: Die Schülerinnen und Schüler lösen Systeme linearer Gleichungen mit zwei Variablen **grafisch** und **algebraisch** mit dem **Einsetzungs-, Gleichsetzungs- und Additionsverfahren**.
- **Keine Sachaufgaben.** Es kommen nur vorgegebene Gleichungssysteme vor.
- Spieldauer: **kurze Einheit, ca. 20–30 Minuten** für einen Durchlauf.

## 3. Harte technische Vorgaben
- Genau **eine Datei `index.html`**: HTML, CSS und JavaScript in einer Datei. Vanilla JS, kein Framework, kein Build-Schritt.
- **Keine externen Ressourcen**: kein CDN, keine Webfonts, keine Bilddateien, keine Netzwerkanfragen (Datenschutz, Einbettung auf einer Schulwebseite). Sprites werden als Pixel-Arrays im Code definiert, Sound wird mit der Web Audio API erzeugt.
- Muss in **Safari auf dem iPad** und in Chrome/Safari auf dem Mac laufen.
- Keine Fehler in der Konsole. Kein `localStorage` nötig (kurze Einheit). Falls doch verwendet: in try/catch einschließen.
- Keine personenbezogenen Daten erfassen oder anzeigen.

## 4. Grafikstil
- Interne Auflösung **256 × 240 Pixel** (NES). Darstellung auf einem Canvas, ganzzahlig skaliert, `image-rendering: pixelated`, zentriert, schwarzer Rand.
- Oben ein HUD-Streifen von 64 px (Herzen, Gebietsname, gesammelte Gegenstände, Minikarte). Darunter das Spielfeld mit **16 × 11 Kacheln à 16 px**.
- Begrenzte Farbpalette im NES-Stil (ca. 25 Farben, als Konstante `PALETTE` definiert).
- Die Welt besteht aus einzelnen Bildschirmen. Läuft die Figur an den Rand, scrollt das Bild zum Nachbarbildschirm.
- Schrift: eine eigene 8×8-Pixelschrift als Bitmap im Code, inklusive ä, ö, ü, ß, −, |, ∧, { }, ( ) und Komma.

## 5. Urheberrecht (verbindlich)
- Nur **eigene** Figuren, Namen, Grafiken, Melodien und Texte. Der Stil darf an NES-Abenteuer erinnern, es darf aber nichts übernommen werden.
- Verboten in Code, Texten und Kommentaren: „Zelda“, „Link“, „Hyrule“, „Triforce“, „Ganon“, „Nintendo“ sowie nachgebaute Original-Sprites oder -Melodien.

## 6. Spielwelt und Ablauf
- **Heldin:** Mira, die Wegfinderin. Story in 2–3 Sätzen: Im Land Lineara kreuzen sich alle Wege an genau einem Punkt. Ein Zauber hat die Kreuzungen verwirrt. Mira muss die Schnittpunkte wiederfinden.
- **Gebiete** (in fester Reihenfolge, je 2 Bildschirme, je 3 Monster und 1 Gegenstand):

| Gebiet | Gegenstand | Verfahren |
|---|---|---|
| Wiese | Fernrohr | grafisch |
| Wald | Schwert | Gleichsetzungsverfahren |
| Sumpf | Bumerang | Einsetzungsverfahren |
| Höhle | Hammer | Additionsverfahren |
| Burg | – | Boss: gemischt mit Verfahrenswahl |

- Den Durchgang zum nächsten Gebiet blockiert ein Hindernis, das erst verschwindet, wenn alle Monster des Gebiets besiegt sind.
- **Herzen:** Anzahl je Niveau: **leicht 3, standard 3, plus 2** (Funktion `maxHerzen()`).
  - Jede falsche Antwort kostet ein Herz.
  - Nach jedem gewonnenen Kampf werden die Herzen **wieder vollständig aufgefüllt**.
  - Besiegte Monster lassen mit **30 % Wahrscheinlichkeit** ein Herz fallen. Einsammeln gibt ein Herz zurück (höchstens bis zum Maximum, sonst Meldung „Deine Herzen sind voll.“).
  - Bei 0 Herzen: freundlicher Game-over-Bildschirm, dann Neustart am Anfang des aktuellen Gebiets (kein Neustart des ganzen Spiels).
- **Monster:** 1 Treffer, also 1 richtig gelöste Aufgabe. Der Boss hat 4 Phasen.
- **Gegenstände als Werkzeuge im Kampf:** Ab dem Fund ist jeder Gegenstand **einmal pro Aufgabe** einsetzbar (neue Aufgabe oder neue Bossphase lädt ihn wieder auf), ohne Herzverlust oder sonstigen Nachteil.
  - **Fernrohr:** zeigt eine Skizze beider Geraden im Koordinatensystem (auch senkrechte Geraden `x = c`).
  - **Schwert:** zeigt den ersten Umformungsschritt aus dem Lösungsweg, ohne die Lösung zu verraten.
  - **Bumerang:** macht die Probe mit den eingegebenen Werten x und y und meldet je Gleichung „stimmt“ oder „stimmt nicht“. Die Antwort wird dadurch nicht abgegeben.
  - **Hammer:** zeigt beide Gleichungen in Normalform `ax + by = c`. Nur aktiv, wenn mindestens eine Gleichung nicht schon in Normalform oder aufgelöster Form steht.
  - Auf Niveau **plus** ist nur der Bumerang einsetzbar (Probe ist Kontrolle, keine Hilfe). Im grafischen Kampf ist ebenfalls nur der Bumerang sinnvoll.
- **Startbildschirm:** Titel, kurze Story, Wahl des Niveaus (leicht / standard / plus), Steuerungshinweise.
- **Endbildschirm:** Auswertung mit Trefferquote je Verfahren und Sonderfälle, benötigte Zeit, Anzahl der Fehlversuche. Kurzer Tipp, welches Verfahren noch geübt werden sollte.

## 7. Steuerung
- **Tastatur:** Pfeiltasten oder WASD zum Laufen, Enter zum Bestätigen.
- **iPad:** Touch-Steuerkreuz unten links, A-Taste unten rechts. Nur auf Touch-Geräten einblenden.
- **Kampfbildschirm:** eigenes **Bildschirm-Zahlenfeld** (0–9, Komma, Minus, Bruchstrich /, Löschen, OK). So verdeckt die iPad-Tastatur nichts. Die Eingabe über eine physische Tastatur funktioniert zusätzlich.

## 8. Mathematische Konventionen (Realschule Bayern)
- Dezimaltrennzeichen ist das **Komma**. Die Eingabe akzeptiert `0,75`, `0.75`, `3/4` und `-3/4` als gleichwertig.
- Darstellung eines Systems: zwei Zeilen, die zweite beginnt mit `∧`, Nummerierung I und II.
- Lösungsmenge immer in der Form `L = {(x|y)}`, zum Beispiel `L = {(1,2|0,3)}`.
- Sonderfälle:
  - keine Lösung: `L = { }`
  - unendlich viele Lösungen: `L = {(x|y) | y = 4x − 7}`
- Echtes Minuszeichen `−` in der Anzeige, Malpunkt `·`, implizite Multiplikation wie `2x`.
- Koeffizient 1 nicht anzeigen (`x` statt `1x`), `+ −3` immer zu `− 3` zusammenfassen, Glieder mit 0 weglassen.

## 9. Aufgabentypen

### 9.1 Antwortformen im Kampf
Je nach Aufgabe ist eine der folgenden Antworten richtig:
1. **Zahlenpaar:** Eingabefelder für x und y
2. Schaltfläche **„keine Lösung“**
3. Schaltfläche **„unendlich viele Lösungen“**

Alle drei Antwortmöglichkeiten werden immer angeboten.

### 9.2 Verfahren
- **Grafisch:** Im Kampfbildschirm wird ein Koordinatensystem gezeichnet (−8 bis 8, Gitter, Achsenbeschriftung) mit zwei Geraden in verschiedenen Farben und den Gleichungen daneben. Der Schnittpunkt ist ganzzahlig. Sonderfälle: parallele bzw. identische Geraden.
- **Gleichsetzungsverfahren:** Beide Gleichungen sind nach derselben Variablen aufgelöst (meist y, manchmal x).
- **Einsetzungsverfahren:** Eine Gleichung ist nach x oder y aufgelöst, die andere steht in Normalform `ax + by = c`.
- **Additionsverfahren:** Beide Gleichungen in Normalform. Je nach Niveau muss eine oder beide Gleichungen vorher multipliziert werden.
- **Boss (Burg):** Erst die Frage „Welches Verfahren ist hier am geschicktesten?“ (Auswahl aus drei Verfahren, Bonus bei sinnvoller Wahl, aber keine Strafe), dann lösen. Regel für die Bewertung: beide nach derselben Variablen aufgelöst → Gleichsetzen; eine aufgelöst → Einsetzen; beide in Normalform → Addition.

### 9.3 Niveaus

| | leicht | standard | plus |
|---|---|---|---|
| Lösungen | ganzzahlig, −9 bis 9 | ganzzahlig oder mit einer Dezimalstelle (z. B. 1,5; 0,2) | auch Brüche/Dezimalzahlen wie 0,75 oder 1/3 |
| Form der Gleichungen | schon passend zum Verfahren | Variablen auf beiden Seiten, Koeffizienten umstellen (wie `2y − 8x = −14`, `12x − 21 = 3y`) | zusätzlich Klammern (`3(2x − 4) + 6y = 0`) und binomische Formeln (`(3x − 2)² = 9x² − 4y`) |
| Sonderfälle | ca. 10 % | ca. 15 % | ca. 20 % |
| Hilfe | Lückenschritte (z. B. „Gleichsetzen ergibt: __x = __“) und Hinweis-Schaltfläche | Hinweis-Schaltfläche | ohne Hilfe |

### 9.4 Referenzaufgaben (aus dem Unterricht, als Testfälle verwenden)
- `2y = −2x + 3 ∧ x = 4y` → `L = {(1,2|0,3)}`
- `2y − 8x = −14 ∧ 12x − 21 = 3y` → unendlich viele Lösungen, `L = {(x|y) | y = 4x − 7}`
- `y + x = 8 ∧ 14x + 14y = 28` → `L = { }`
- `(3x − 2)² = 9x² − 4y ∧ (y − 1)² + 2x = y · y` → `L = {(0,75|1,25)}`

## 10. Architektur in `index.html`
Der Code wird in klar kommentierte Abschnitte in dieser Reihenfolge gegliedert:
1. `CONFIG` (Konstanten, Palette, Niveaus)
2. `Bruch` – exakte Bruchrechnung (kürzen, + − · :, Vergleich, Ausgabe als Dezimalzahl mit Komma oder als Bruch). **Alle Mathematik läuft über `Bruch`, nie über Gleitkommazahlen.**
3. `Gleichung` / `System` – Darstellung und Formatierung von Gleichungen
4. `Generator` – erzeugt Aufgaben **rückwärts von der gewünschten Lösung aus**, getrennt nach Verfahren und Niveau
5. `Loeser` – löst jedes System unabhängig vom Generator und erzeugt den **Lösungsweg Schritt für Schritt** im jeweiligen Verfahren (inklusive Probe)
6. `Eingabe` – Parser für Zahleneingaben, Prüfung der Antwort
7. `Grafik` – Pixelschrift, Sprites, Kacheln, Koordinatensystem
8. `Welt` – Karten der Bildschirme als Kachel-Arrays, Gebiete, Hindernisse
9. `Figuren` – Spielerin, Monster (einfache KI: zufällig laufen, manche verfolgen), Boss
10. `Kampf` – Kampfbildschirm, Zahlenfeld, Feedback
11. `Audio` – Soundeffekte und kurze eigene Melodien mit Web Audio (erst nach der ersten Nutzereingabe starten)
12. `Spiel` – Zustandsmaschine (Titel → Welt ↔ Kampf → Game over / Ende), Hauptschleife mit `requestAnimationFrame`
13. `Selbsttest` – siehe Abschnitt 12

## 11. Feedback im Kampf (didaktisch wichtig)
- **Richtig:** kurze positive Rückmeldung, Treffer-Animation, Monster verliert Leben.
- **Falsch:** Mira verliert ein Herz. Dann wird der **vollständige Lösungsweg** im passenden Verfahren angezeigt, Zeile für Zeile, wie im Heft. Dazu ein gezielter Hinweis, wenn ein typischer Fehler erkennbar ist:
  - Vorzeichen vertauscht (Eingabe ist −x oder −y der Lösung)
  - x und y vertauscht
  - nur eine Variable richtig → „Hast du den zweiten Wert richtig eingesetzt?“
  - Sonderfall nicht erkannt bzw. fälschlich angenommen
- Danach folgt eine **neue Aufgabe** desselben Typs (nicht dieselbe Aufgabe).
- Texte duzen die Spielerin bzw. den Spieler, sind kurz und freundlich und ohne Fachjargon außerhalb der Mathematik.

## 12. Qualität und Tests
- Eine Funktion `selbsttest()` (in der Konsole aufrufbar und über `?test` in der URL automatisch gestartet) prüft:
  - die Referenzaufgaben aus 9.4 mit dem `Loeser`
  - je Verfahren und Niveau **200 generierte Aufgaben**: Die Lösung des `Loeser` muss der beabsichtigten Lösung des `Generator` entsprechen, alle Koeffizienten bleiben im erlaubten Zahlenbereich (Beträge höchstens 20, außer bei binomischen Formeln), keine Gleichung ist trivial (z. B. `0 = 0` vor dem Umformen)
  - den Eingabe-Parser (`0,75`, `0.75`, `3/4`, `-3/4`, `−3/4`, Leerzeichen, ungültige Eingaben)
  - Ausgabe als Tabelle in der Konsole, am Ende „Alle Tests bestanden“ oder eine Liste der Fehler.

## 13. Arbeitsweise für den Agenten
- Arbeite **nur die aktuelle Etappe** ab und greife nicht vor.
- Wenn eine Vorgabe unklar ist: **nachfragen**, keine eigenen Annahmen treffen.
- Nach jeder Etappe: kurze Zusammenfassung (Was ist fertig? Was ist bekannt offen? Wie teste ich es?).
- Bestehenden, funktionierenden Code nicht ohne Grund umschreiben. Änderungen gezielt vornehmen.
- Bezeichner im Code: Englisch oder Deutsch, aber einheitlich. Kommentare und alle sichtbaren Texte auf **Deutsch** mit korrekten Umlauten.
