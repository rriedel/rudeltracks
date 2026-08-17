# RTRCS – Feature-Übersicht

**Projekt:** rudeltracks (RTRCS)
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
| RTRCS-01 | map-view | Kartenansicht (primäres UI) | MVP |
| RTRCS-02 | dashboard | Dashboard & Statistiken | MVP |
| RTRCS-03 | track-filter | Track-Filter (Zeit, Aktivität, Ort, Name) | MVP |
| RTRCS-04 | location-search | Ortssuche / Geocoding | MVP |
| RTRCS-05 | track-rendering | Track-Darstellung & Farbcodierung | MVP |
| RTRCS-06 | smart-clustering | Smarte Darstellung / Track-Clustering | MVP |
| RTRCS-07 | photo-markers | Foto-Marker auf der Karte | MVP |
| RTRCS-08 | track-detail | Track-Detailansicht | MVP |
| RTRCS-09 | photo-lightbox | Foto-Vollbildansicht / Lightbox | MVP |
| RTRCS-10 | photo-confidence-filter | Foto-Konfidenzfilter (sicher / wahrscheinlich) | MVP |
| RTRCS-11 | timeline-view | Zeitleisten-/Kalenderansicht | Phase 2 |
| RTRCS-12 | time-window-slider | Zeitfenster-Regler auf der Karte | Phase 2 |
| RTRCS-13 | heatmap | Heatmap | Phase 2 |
| RTRCS-14 | user-profiles | Nutzerprofile & Personalisierung | Phase 2 |

### Import-Pipeline

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| RTRCS-15 | gpx-import | GPX-Import | MVP |
| RTRCS-16 | photo-import | Foto-/EXIF-Import | MVP |
| RTRCS-17 | photo-track-matching | Foto-Track-Matching mit Konfidenz | MVP |
| RTRCS-18 | incremental-sync | Inkrementelle Update-Läufe | MVP |

### Phase 2

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| RTRCS-19 | participants | Personen-/Teilnehmer-Zuordnung | Phase 2 |

## In die Umsetzungsphase verschoben

Bewusst noch nicht als Feature ausgearbeitet, wird beim Umsetzungs-Design geklärt:

- Datenmodell & Speicherung (z. B. PostGIS / SQLite+SpatiaLite)
- Thumbnail-Generierung & Foto-Auslieferung
- Zeitzonen-Behandlung beim Foto-Track-Matching
