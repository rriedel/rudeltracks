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
- Auswahl eines Tracks öffnet die Detailansicht ([RTCS-09](RTCS-09-track-detail.md)); bei sichtbarer Liste wird die Auswahl mit [RTCS-06](RTCS-06-track-list-view.md) synchronisiert.
- Tracks, die nur teilweise im aktuellen Ausschnitt liegen, werden mit angezeigt, aber optisch abgeschwächt (z. B. dünner/ausgegraut).

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Karte)
- Wechselwirkung mit [RTCS-07](RTCS-07-smart-clustering.md) (Clustering ab geringer Abdeckung)
- Führt zu [RTCS-09](RTCS-09-track-detail.md) (Detailansicht)
- Auswahl synchronisiert mit [RTCS-06](RTCS-06-track-list-view.md) (Track-Liste)

## Offene Punkte

- Farbpalette und Anzahl unterscheidbarer Aktivitätsarten.
- Schwellwert „teilweise sichtbar", ab dem abgeschwächt dargestellt wird.
