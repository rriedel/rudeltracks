# RTCS-11 – Foto-Konfidenzfilter

**Kurzname:** photo-confidence-filter
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Steuerung der Foto-Anzeige nach Sicherheit der Aktivitäts-/Positionszuordnung. Jedes Foto trägt eine Konfidenz-Stufe; unsicher zugeordnete Fotos lassen sich ausblenden.

## Konfidenz-Stufen

- **sicher** – eigener Geo-Tag im EXIF.
- **wahrscheinlich** – kein Geo-Tag, aber Aufnahmezeit fällt in den Zeitraum einer Aktivität.
- **unbestimmt** – weder brauchbarer Geo-Tag noch Zeit-Match.

## Anforderungen / Akzeptanzkriterien

- Jedes Foto hat eine gespeicherte Konfidenz-Stufe (aus [RTCS-18](RTCS-18-photo-activity-matching.md)).
- UI-Toggle „nur sicher zugeordnete Fotos anzeigen".
- Optisch unterscheidbare Marker je Stufe (z. B. durchgezogener vs. gestrichelter Rand).
- Konfidenz wird konsistent in Karte ([RTCS-08](RTCS-08-photo-markers.md)), Detailansicht ([RTCS-09](RTCS-09-activity-detail.md)) und Lightbox ([RTCS-10](RTCS-10-photo-lightbox.md)) angezeigt.

## Hinweis Phase 1

- In Phase 1 werden nur Fotos mit passendem Geo-Tag positioniert dargestellt. Die Konfidenz-Stufe wird dennoch von Beginn an im Datenmodell geführt, damit „wahrscheinlich"-Fotos ohne Migration nachrüstbar sind.

## Abhängigkeiten

- [RTCS-18](RTCS-18-photo-activity-matching.md) (Ermittlung der Konfidenz)
- [RTCS-08](RTCS-08-photo-markers.md), [RTCS-09](RTCS-09-activity-detail.md), [RTCS-10](RTCS-10-photo-lightbox.md) (Anzeige)

## Offene Punkte

- Genaue visuelle Kennzeichnung je Stufe.
