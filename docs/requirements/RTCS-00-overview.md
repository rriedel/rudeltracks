# RTCS – Feature-Übersicht

**Projekt:** rudeltracks (RTCS)
**Status:** Entwurf / Review
**Zweck:** GPS-Tracks der Familie (Wandern, Radfahren) nach Zeit und Ort suchen und auf einer Karte betrachten – einzeln oder mehrere gleichzeitig, optional inklusive der dabei aufgenommenen Fotos.

## Rahmenbedingungen

- Webanwendung, Bedienung über Browser (Desktop + Mobile)
- Keine Lizenzkosten → nur frei zugängliches Kartenmaterial (OSM o. Ä.)
- Betrieb on-premise / self-host
- Daten (Tracks, Fotos) werden nicht öffentlich geteilt
- Zugriff read-only durch einen Familienkreis → keine harte Authentifizierung nötig

## Feature-Liste

### User-facing

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| RTCS-01 | map-view | Kartenansicht (primäres UI) | MVP |
| RTCS-02 | dashboard | Dashboard & Statistiken | MVP |
| RTCS-03 | track-filter | Track-Filter (Zeit, Aktivität, Ort, Name) | MVP |
| RTCS-04 | location-search | Ortssuche / Geocoding | MVP |
| RTCS-05 | track-rendering | Track-Darstellung & Farbcodierung | MVP |
| RTCS-06 | smart-clustering | Smarte Darstellung / Track-Clustering | MVP |
| RTCS-07 | photo-markers | Foto-Marker auf der Karte | MVP |
| RTCS-08 | track-detail | Track-Detailansicht | MVP |
| RTCS-09 | photo-lightbox | Foto-Vollbildansicht / Lightbox | MVP |
| RTCS-10 | photo-confidence-filter | Foto-Konfidenzfilter (sicher / wahrscheinlich) | MVP |
| RTCS-11 | timeline-view | Zeitleisten-/Kalenderansicht | Phase 2 |
| RTCS-12 | time-window-slider | Zeitfenster-Regler auf der Karte | Phase 2 |
| RTCS-13 | heatmap | Heatmap | Phase 2 |
| RTCS-14 | user-profiles | Nutzerprofile & Personalisierung | Phase 2 |

### Import-Pipeline

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| RTCS-15 | gpx-import | GPX-Import | MVP |
| RTCS-16 | photo-import | Foto-/EXIF-Import | MVP |
| RTCS-17 | photo-track-matching | Foto-Track-Matching mit Konfidenz | MVP |
| RTCS-18 | incremental-sync | Inkrementelle Update-Läufe | MVP |

### Phase 2

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| RTCS-19 | participants | Personen-/Teilnehmer-Zuordnung | Phase 2 |

## In die Umsetzungsphase verschoben

Bewusst noch nicht als Feature ausgearbeitet, wird beim Umsetzungs-Design geklärt:

- Datenmodell & Speicherung (z. B. PostGIS / SQLite+SpatiaLite)
- Thumbnail-Generierung & Foto-Auslieferung
- Zeitzonen-Behandlung beim Foto-Track-Matching
