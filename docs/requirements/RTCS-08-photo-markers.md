# RTCS-08 – Foto-Marker auf der Karte

**Kurzname:** photo-markers
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Darstellung der einem Track zugeordneten Fotos an ihrer Aufnahmeposition auf der Karte. Umgang mit sich überlappenden Fotos durch Stapelung/Clustering.

## Anforderungen / Akzeptanzkriterien

- Fotos werden als Marker (Thumbnail) an ihrer Position dargestellt.
- Bei Überlappung mehrerer Fotos: Stapel-Darstellung (oberstes Foto + Badge mit Anzahl).
- Fotos werden bei Bedarf erst nach Selektion eines Tracks bzw. bei ausreichendem Zoom/Abstand eingeblendet.
- Klick/Tap auf einen Foto-Marker öffnet die Vollbildansicht ([RTCS-10](RTCS-10-photo-lightbox.md)).
- Nur Fotos mit passendem Geo-Tag werden positioniert dargestellt (siehe [RTCS-18](RTCS-18-photo-track-matching.md)); die Sichtbarkeit unsicher zugeordneter Fotos ist über [RTCS-11](RTCS-11-photo-confidence-filter.md) steuerbar.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Karte)
- [RTCS-10](RTCS-10-photo-lightbox.md) (Lightbox)
- [RTCS-11](RTCS-11-photo-confidence-filter.md) (Konfidenzfilter)
- [RTCS-18](RTCS-18-photo-track-matching.md) (Foto-Track-Matching)

## Offene Punkte

- Konkrete Regel fürs Einblenden (nach Track-Selektion vs. reiner Zoom-Schwellwert).
- Grenzabstand, ab dem gestapelt statt einzeln dargestellt wird.
