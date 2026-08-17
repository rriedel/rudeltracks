# RTRCS-10 – Foto-Konfidenzfilter

**Kurzname:** photo-confidence-filter
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Steuerung der Foto-Anzeige nach Sicherheit der Track-/Positionszuordnung. Jedes Foto trägt eine Konfidenz-Stufe; unsicher zugeordnete Fotos lassen sich ausblenden.

## Konfidenz-Stufen

- **sicher** – eigener Geo-Tag im EXIF.
- **wahrscheinlich** – kein Geo-Tag, aber Aufnahmezeit fällt in das Zeitfenster eines Tracks.
- **unbestimmt** – weder brauchbarer Geo-Tag noch Zeit-Match.

## Anforderungen / Akzeptanzkriterien

- Jedes Foto hat eine gespeicherte Konfidenz-Stufe (aus RTRCS-17).
- UI-Toggle „nur sicher zugeordnete Fotos anzeigen".
- Optisch unterscheidbare Marker je Stufe (z. B. durchgezogener vs. gestrichelter Rand).
- Konfidenz wird konsistent in Karte (RTRCS-07), Detailansicht (RTRCS-08) und Lightbox (RTRCS-09) angezeigt.

## Hinweis Phase 1

- In Phase 1 werden nur Fotos mit passendem Geo-Tag positioniert dargestellt. Die Konfidenz-Stufe wird dennoch von Beginn an im Datenmodell geführt, damit „wahrscheinlich"-Fotos ohne Migration nachrüstbar sind.

## Abhängigkeiten

- RTRCS-17 (Ermittlung der Konfidenz)
- RTRCS-07, RTRCS-08, RTRCS-09 (Anzeige)

## Offene Punkte

- Genaue visuelle Kennzeichnung je Stufe.
