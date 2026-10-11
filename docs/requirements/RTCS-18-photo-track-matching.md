# RTCS-18 – Foto-Track-Matching mit Konfidenz

**Kurzname:** photo-track-matching
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Zuordnung von Fotos zu Tracks und Ermittlung einer Konfidenz-Stufe pro Foto. Bildet die Grundlage für die positionierte Foto-Darstellung und den Konfidenzfilter.

## Konfidenz-Logik

- **sicher** – Foto hat eigenen Geo-Tag; Position aus EXIF.
- **wahrscheinlich** – kein Geo-Tag, aber Aufnahmezeit liegt im Zeitfenster eines Tracks; Position per Interpolation entlang des Tracks.
- **unbestimmt** – weder brauchbarer Geo-Tag noch Zeit-Match.

## Anforderungen / Akzeptanzkriterien

- Für jedes Foto wird eine Konfidenz-Stufe bestimmt und gespeichert.
- Fotos werden – soweit möglich – einem Track zugeordnet (über Zeitfenster und/oder räumliche Nähe).
- Die ermittelte Position und Konfidenz werden persistiert (Grundlage für [RTCS-08](RTCS-08-photo-markers.md) / [RTCS-11](RTCS-11-photo-confidence-filter.md)).
- Phase 1: positionierte Darstellung nur für „sicher"-Fotos; Konfidenz-Feld wird dennoch für alle Fotos gepflegt.
- Nachvollziehbarkeit: Grundlage der Zuordnung ist erkennbar (Geo-Tag vs. Zeit-Match).

## Abhängigkeiten

- [RTCS-16](RTCS-16-gpx-import.md) (Track-Zeitfenster & Geometrie)
- [RTCS-17](RTCS-17-photo-import.md) (Foto-Metadaten)
- Liefert an: [RTCS-08](RTCS-08-photo-markers.md), [RTCS-09](RTCS-09-track-detail.md), [RTCS-11](RTCS-11-photo-confidence-filter.md)

## Offene Punkte

- Zeitzonen-Behandlung beim Zeit-Match → bewusst in die Umsetzungsphase verschoben.
- Toleranzfenster für Zeit-Match und Schwellwert für räumliche Nähe.
