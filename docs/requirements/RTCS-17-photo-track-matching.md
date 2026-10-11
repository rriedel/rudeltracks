# RTCS-17 – Foto-Track-Matching mit Konfidenz

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
- Die ermittelte Position und Konfidenz werden persistiert (Grundlage für RTCS-07 / RTCS-10).
- Phase 1: positionierte Darstellung nur für „sicher"-Fotos; Konfidenz-Feld wird dennoch für alle Fotos gepflegt.
- Nachvollziehbarkeit: Grundlage der Zuordnung ist erkennbar (Geo-Tag vs. Zeit-Match).

## Abhängigkeiten

- RTCS-15 (Track-Zeitfenster & Geometrie)
- RTCS-16 (Foto-Metadaten)
- Liefert an: RTCS-07, RTCS-08, RTCS-10

## Offene Punkte

- Zeitzonen-Behandlung beim Zeit-Match → bewusst in die Umsetzungsphase verschoben.
- Toleranzfenster für Zeit-Match und Schwellwert für räumliche Nähe.
