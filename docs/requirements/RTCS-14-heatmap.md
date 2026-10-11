# RTCS-14 – Heatmap

**Kurzname:** heatmap
**Phase:** Phase 2
**Status:** Entwurf

## Beschreibung

Aggregierte Darstellung, wo sich die Familie am häufigsten bewegt hat. Verdichtet alle (gefilterten) Tracks zu einer Wärmekarte und zeigt Schwerpunkte der Aktivitäten.

## Anforderungen / Akzeptanzkriterien

- Heatmap-Layer über der Karte, aus den Track-Geometrien berechnet.
- Berücksichtigt die aktiven Filter (Zeit, Aktivitätsart, Ort) aus [RTCS-03](RTCS-03-track-filter.md).
- Umschaltbar zwischen Heatmap und normaler Track-Darstellung.
- Sinnvolle Intensitäts-/Farbskala mit Legende.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Karte)
- [RTCS-03](RTCS-03-track-filter.md) (Filter)
- Optional kombinierbar mit [RTCS-13](RTCS-13-time-window-slider.md) (Zeitfenster)

## Offene Punkte

- Vorberechnung/Aggregation vs. Berechnung zur Laufzeit (Performance bei ~1000 Tracks).
