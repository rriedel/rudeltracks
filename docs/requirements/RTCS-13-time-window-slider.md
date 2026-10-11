# RTCS-13 – Zeitfenster-Regler auf der Karte

**Kurzname:** time-window-slider
**Phase:** Phase 2 (hoher Wunsch)
**Status:** Entwurf

## Beschreibung

Ein bewegliches Zeitfenster direkt in der Kartenansicht: Nur Tracks innerhalb des Fensters werden angezeigt. Das Fenster ist in Breite und Position frei steuerbar und ermöglicht eine „Reise durch die Familienhistorie".

## Anforderungen / Akzeptanzkriterien

- Zeitfenster-Regler (Timeline) in der Kartenansicht.
- Vom Nutzer änderbare Fensterbreite (z. B. Tag / Woche / Monat / Jahr).
- Verschieben des Fensters per Drag.
- Positionierung per direkter Eingabe (z. B. Monat/Jahr).
- Karte und eine ggf. sichtbare Track-Liste ([RTCS-06](RTCS-06-track-list-view.md)) aktualisieren die angezeigten Tracks live beim Verschieben.
- Optional: Play/Animation – das Fenster läuft automatisch über die Zeitachse, Tracks erscheinen/verschwinden.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Karte)
- [RTCS-05](RTCS-05-track-rendering.md) / [RTCS-07](RTCS-07-smart-clustering.md) (Track-Darstellung)
- Wechselwirkung mit [RTCS-06](RTCS-06-track-list-view.md) (synchronisierte Treffer in der Liste)
- Verwandt mit [RTCS-12](RTCS-12-timeline-view.md) (Timeline) und [RTCS-14](RTCS-14-heatmap.md) (Heatmap)

## Offene Punkte

- Umfang der Animation (manuell vs. automatischer Play-Modus) für Erst-Umsetzung.
