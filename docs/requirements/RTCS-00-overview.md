# RTCS – Feature-Übersicht

**Projekt:** rudeltracks (RTCS)
**Status:** Entwurf / Review
**Zweck:** Aktivitäten der Familie (Wandern, Radfahren) nach Zeit und Ort suchen und ihre GPS-Tracks auf einer Karte betrachten – einzeln oder mehrere gleichzeitig, optional inklusive der dabei aufgenommenen Fotos.

**Begriffe:** Eine *Aktivität* ist eine Unternehmung wie eine Wanderung oder Radtour mit Name, Zeitraum, Art und Kennzahlen. Ihr *Track* ist die aufgezeichnete Geometrie (GPS-Punkte mit Höhe und Zeit). Siehe [Glossar](../architecture/12-glossar.md).

## Rahmenbedingungen

- Webanwendung, Bedienung über Browser (Desktop + Mobile)
- Keine Lizenzkosten → nur frei zugängliches Kartenmaterial (OSM o. Ä.)
- Betrieb on-premise / self-host
- Daten (Aktivitäten, Tracks, Fotos) werden nicht öffentlich geteilt
- Zugriff read-only durch einen Familienkreis → keine harte Authentifizierung nötig

## Feature-Liste

### User-facing

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| [RTCS-01](RTCS-01-map-view.md) | map-view | Kartenansicht (primäres UI) | MVP |
| [RTCS-02](RTCS-02-dashboard.md) | dashboard | Dashboard & Statistiken | MVP |
| [RTCS-03](RTCS-03-activity-filter.md) | activity-filter | Aktivitäts-Filter (Zeit, Aktivitätsart, Ort, Name) | MVP |
| [RTCS-04](RTCS-04-location-search.md) | location-search | Ortssuche / Geocoding | MVP |
| [RTCS-05](RTCS-05-track-rendering.md) | track-rendering | Track-Darstellung & Farbcodierung | MVP |
| [RTCS-06](RTCS-06-activity-list-view.md) | activity-list-view | Aktivitäts-Listenansicht | MVP |
| [RTCS-07](RTCS-07-smart-clustering.md) | smart-clustering | Smarte Darstellung / Aktivitäts-Clustering | MVP |
| [RTCS-08](RTCS-08-photo-markers.md) | photo-markers | Foto-Marker auf der Karte | MVP |
| [RTCS-09](RTCS-09-activity-detail.md) | activity-detail | Aktivitäts-Detailansicht | MVP |
| [RTCS-10](RTCS-10-photo-lightbox.md) | photo-lightbox | Foto-Vollbildansicht / Lightbox | MVP |
| [RTCS-11](RTCS-11-photo-confidence-filter.md) | photo-confidence-filter | Foto-Konfidenzfilter (sicher / wahrscheinlich) | MVP |
| [RTCS-12](RTCS-12-timeline-view.md) | timeline-view | Zeitleisten-/Kalenderansicht | Phase 2 |
| [RTCS-13](RTCS-13-time-window-slider.md) | time-window-slider | Zeitfenster-Regler auf der Karte | Phase 2 |
| [RTCS-14](RTCS-14-heatmap.md) | heatmap | Heatmap | Phase 2 |
| [RTCS-15](RTCS-15-user-profiles.md) | user-profiles | Nutzerprofile & Personalisierung | Phase 2 |
| [RTCS-20](RTCS-20-participants.md) | participants | Personen-/Teilnehmer-Zuordnung | Phase 2 |

### Import-Pipeline

| Nr. | Kurzname | Feature | Phase |
|-----|----------|---------|-------|
| [RTCS-16](RTCS-16-gpx-import.md) | gpx-import | GPX-Import | MVP |
| [RTCS-17](RTCS-17-photo-import.md) | photo-import | Foto-/EXIF-Import | MVP |
| [RTCS-18](RTCS-18-photo-activity-matching.md) | photo-activity-matching | Foto-Aktivitäts-Matching mit Konfidenz | MVP |
| [RTCS-19](RTCS-19-incremental-sync.md) | incremental-sync | Inkrementelle Update-Läufe | MVP |

## In die Umsetzungsphase verschoben

Bewusst noch nicht als Feature ausgearbeitet, wird beim Umsetzungs-Design geklärt:

- Datenmodell & Speicherung (z. B. PostGIS / SQLite+SpatiaLite)
- Thumbnail-Generierung & Foto-Auslieferung
- Zeitzonen-Behandlung beim Foto-Aktivitäts-Matching
