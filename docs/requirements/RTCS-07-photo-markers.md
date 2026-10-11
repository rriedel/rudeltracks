# RTCS-07 – Foto-Marker auf der Karte

**Kurzname:** photo-markers
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Darstellung der einem Track zugeordneten Fotos an ihrer Aufnahmeposition auf der Karte. Umgang mit sich überlappenden Fotos durch Stapelung/Clustering.

## Anforderungen / Akzeptanzkriterien

- Fotos werden als Marker (Thumbnail) an ihrer Position dargestellt.
- Bei Überlappung mehrerer Fotos: Stapel-Darstellung (oberstes Foto + Badge mit Anzahl).
- Fotos werden bei Bedarf erst nach Selektion eines Tracks bzw. bei ausreichendem Zoom/Abstand eingeblendet.
- Klick/Tap auf einen Foto-Marker öffnet die Vollbildansicht (RTCS-09).
- Nur Fotos mit passendem Geo-Tag werden positioniert dargestellt (siehe RTCS-17); die Sichtbarkeit unsicher zugeordneter Fotos ist über RTCS-10 steuerbar.

## Abhängigkeiten

- RTCS-01 (Karte)
- RTCS-09 (Lightbox)
- RTCS-10 (Konfidenzfilter)
- RTCS-17 (Foto-Track-Matching)

## Offene Punkte

- Konkrete Regel fürs Einblenden (nach Track-Selektion vs. reiner Zoom-Schwellwert).
- Grenzabstand, ab dem gestapelt statt einzeln dargestellt wird.
