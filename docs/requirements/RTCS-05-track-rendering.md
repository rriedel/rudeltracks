# RTCS-05 – Track-Darstellung & Farbcodierung

**Kurzname:** track-rendering
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Darstellung der Tracks als Wegzug (Linie) auf der Karte, einzeln oder mehrere gleichzeitig. Aktivitätsarten werden farblich unterschieden; eine Legende erklärt die Codierung.

## Anforderungen / Akzeptanzkriterien

- Track wird als Linienzug entlang der GPX-Geometrie gezeichnet.
- Mehrere Tracks gleichzeitig darstellbar.
- Farbcodierung nach Aktivitätsart mit sichtbarer Legende.
- Hover/Tap auf einen Track hebt ihn hervor (und zeigt Kurzinfo).
- Auswahl eines Tracks öffnet die Detailansicht (RTCS-08).
- Tracks, die nur teilweise im aktuellen Ausschnitt liegen, werden mit angezeigt, aber optisch abgeschwächt (z. B. dünner/ausgegraut).

## Abhängigkeiten

- RTCS-01 (Karte)
- Wechselwirkung mit RTCS-06 (Clustering ab geringer Abdeckung)
- Führt zu RTCS-08 (Detailansicht)

## Offene Punkte

- Farbpalette und Anzahl unterscheidbarer Aktivitätsarten.
- Schwellwert „teilweise sichtbar", ab dem abgeschwächt dargestellt wird.
