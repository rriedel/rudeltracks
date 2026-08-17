# RTRCS-07 – Foto-Marker auf der Karte

**Kurzname:** photo-markers
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Darstellung der einem Track zugeordneten Fotos an ihrer Aufnahmeposition auf der Karte. Umgang mit sich überlappenden Fotos durch Stapelung/Clustering.

## Anforderungen / Akzeptanzkriterien

- Fotos werden als Marker (Thumbnail) an ihrer Position dargestellt.
- Bei Überlappung mehrerer Fotos: Stapel-Darstellung (oberstes Foto + Badge mit Anzahl).
- Fotos werden bei Bedarf erst nach Selektion eines Tracks bzw. bei ausreichendem Zoom/Abstand eingeblendet.
- Klick/Tap auf einen Foto-Marker öffnet die Vollbildansicht (RTRCS-09).
- Nur Fotos mit passendem Geo-Tag werden positioniert dargestellt (siehe RTRCS-17); die Sichtbarkeit unsicher zugeordneter Fotos ist über RTRCS-10 steuerbar.

## Abhängigkeiten

- RTRCS-01 (Karte)
- RTRCS-09 (Lightbox)
- RTRCS-10 (Konfidenzfilter)
- RTRCS-17 (Foto-Track-Matching)

## Offene Punkte

- Konkrete Regel fürs Einblenden (nach Track-Selektion vs. reiner Zoom-Schwellwert).
- Grenzabstand, ab dem gestapelt statt einzeln dargestellt wird.
