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
| [RTCS-01](RTCS-01-map-view.md) | map-view | Kartenansicht (primäres UI) | MVP |
| [RTCS-02](RTCS-02-dashboard.md) | dashboard | Dashboard & Statistiken | MVP |
| [RTCS-03](RTCS-03-track-filter.md) | track-filter | Track-Filter (Zeit, Aktivität, Ort, Name) | MVP |
| [RTCS-04](RTCS-04-location-search.md) | location-search | Ortssuche / Geocoding | MVP |
| [RTCS-05](RTCS-05-track-rendering.md) | track-rendering | Track-Darstellung & Farbcodierung | MVP |
| [RTCS-06](RTCS-06-smart-clustering.md) | smart-clustering | Smarte Darstellung / Track-Clustering | MVP |
| [RTCS-07](RTCS-07-photo-markers.md) | photo-markers | Foto-Marker auf der Karte | MVP |
| [RTCS-08](RTCS-08-track-detail.md) | track-detail | Track-Detailansicht | MVP |
| [RTCS-09](RTCS-09-photo-lightbox.md) | photo-lightbox | Foto-Vollbildansicht / Lightbox | MVP |
| [RTCS-10](RTCS-10-photo-confidence-filter.md) | photo-confidence-filter | Foto-Konfidenzfilter (sicher / wahrscheinlich) | MVP |
| [RTCS-11](RTCS-11-timeline-view.md) | timeline-view | Zeitleisten-/Kalenderansicht | Phase 2 |
| [RTCS-12](RTCS-12-time-window-slider.md) | time-window-slider | Zeitfenster-Regler auf der Karte | Phase 2 |
| [RTCS-13](RTCS-13-heatmap.md) | heatmap | Heatmap | Phase 2 |
| [RTCS-14](RTCS-14-user-profiles.md) | user-profiles | Nutzerprofile & Personalisierung | Phase 2 |

### Import-Pipeline

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| [RTCS-15](RTCS-15-gpx-import.md) | gpx-import | GPX-Import | MVP |
| [RTCS-16](RTCS-16-photo-import.md) | photo-import | Foto-/EXIF-Import | MVP |
| [RTCS-17](RTCS-17-photo-track-matching.md) | photo-track-matching | Foto-Track-Matching mit Konfidenz | MVP |
| [RTCS-18](RTCS-18-incremental-sync.md) | incremental-sync | Inkrementelle Update-Läufe | MVP |

### Phase 2

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| [RTCS-19](RTCS-19-participants.md) | participants | Personen-/Teilnehmer-Zuordnung | Phase 2 |

## In die Umsetzungsphase verschoben

Bewusst noch nicht als Feature ausgearbeitet, wird beim Umsetzungs-Design geklärt:

- Datenmodell & Speicherung (z. B. PostGIS / SQLite+SpatiaLite)
- Thumbnail-Generierung & Foto-Auslieferung
- Zeitzonen-Behandlung beim Foto-Track-Matching
