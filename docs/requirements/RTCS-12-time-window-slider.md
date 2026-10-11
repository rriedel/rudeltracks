# RTCS-12 – Zeitfenster-Regler auf der Karte

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
- Karte aktualisiert die sichtbaren Tracks live beim Verschieben.
- Optional: Play/Animation – das Fenster läuft automatisch über die Zeitachse, Tracks erscheinen/verschwinden.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Karte)
- [RTCS-05](RTCS-05-track-rendering.md) / [RTCS-06](RTCS-06-smart-clustering.md) (Track-Darstellung)
- Verwandt mit [RTCS-11](RTCS-11-timeline-view.md) (Timeline) und [RTCS-13](RTCS-13-heatmap.md) (Heatmap)

## Offene Punkte

- Umfang der Animation (manuell vs. automatischer Play-Modus) für Erst-Umsetzung.
