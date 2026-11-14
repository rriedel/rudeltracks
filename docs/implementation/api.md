# API-Skizze

**Status:** Entwurf für den Walking Skeleton (14.11.2026)

REST-API des Backends ([ADR-004](../architecture/adr/adr-004-frontend-backend-aufteilung.md),
[ADR-007](../architecture/adr/adr-007-backend-techstack.md)). Der Vertrag wird
code-first aus dem Backend als OpenAPI-Spezifikation erzeugt; daraus generiert
Orval Typen und TanStack-Query-Hooks für das Frontend
([ADR-008](../architecture/adr/adr-008-api-vertrag.md)).

## Grundsätze

- Präfix `/api`; das Frontend wird vom selben Dienst unter `/` ausgeliefert.
  Alle Pfade außerhalb von `/api` und den statischen Dateien liefern die
  `index.html` der SPA (Direktaufruf und Neuladen von Frontend-Routen).
- Ressourcen nach den Begriffen des [Datenmodells](data_model.md#begriffe):
  Aktivitäten unter `/api/activities`, ihre Geometrie als `track`.
- JSON; Geometrien als GeoJSON. Feldnamen in `camelCase`.
- Zeitpunkte als ISO 8601 in UTC, Datumsangaben im Filter als `YYYY-MM-DD`
  bezogen auf die lokale Zeit der Aktivität (`timezone`).
- IDs sind UUIDs ([Datenmodell](data_model.md#konventionen)).
- Fehler als `application/problem+json` (RFC 9457).
- Keine Authentifizierung ([ADR-005](../architecture/adr/adr-005-zugriff.md)).
- Keine Versionierung im Pfad; Frontend und Backend werden gemeinsam
  ausgeliefert.

## Gemeinsame Filterparameter

Gelten für `GET /api/activities` und `GET /api/activities/tracks`
gleichermaßen ([RTCS-03](../requirements/RTCS-03-activity-filter.md)):

| Parameter | Beispiel | Bedeutung |
|---|---|---|
| `from`, `to` | `2024-05-01` | Zeitraum, inklusiv, lokales Datum der Aktivität |
| `type` | `type=hike&type=racebike` | Aktivitätsart, mehrfach möglich, ODER-verknüpft |
| `q` | `Schrammstein` | Teiltext im Namen, unscharf (Trigram) |
| `bbox` | `13.9,50.8,14.3,51.0` | optional, Länge/Breite min/max; Aktivitäten, deren `bbox` den Ausschnitt schneidet |

Die Dimensionen sind UND-verknüpft. Im Skeleton filtert das Frontend den
Kartenausschnitt selbst (siehe
[Auslieferung](activities.md#auslieferung-an-die-karte)); `bbox` ist für die
Ausweichvariante und spätere Nutzer der API vorgesehen.

## Endpunkte für den Walking Skeleton

### `GET /api/activities`

Aktivitätsliste ohne Geometrie, für Liste, Trefferzahl, Ausschnittsfilter und
Clustering ([RTCS-06](../requirements/RTCS-06-activity-list-view.md),
[RTCS-07](../requirements/RTCS-07-smart-clustering.md)).

Zusätzliche Parameter: `sort` (`startedAt`, `-startedAt` (Default), `name`,
`distance`). Keine Pagination: Bei ca. 1.000 Aktivitäten und ca. 250 Byte je
Eintrag sind alle Treffer kleiner als 100 KB (gzip deutlich weniger). Das
Frontend virtualisiert die Liste.

```json
{
  "total": 1,
  "items": [
    {
      "id": "6f1c…",
      "name": "Schrammstein-Aussicht und Gratweg nach Schmilka",
      "type": "hike",
      "startedAt": "2026-10-13T10:42:12Z",
      "timezone": "Europe/Berlin",
      "distanceM": 13250.4,
      "durationS": 18420,
      "ascentM": 612.0,
      "bbox": [14.13, 50.90, 14.25, 50.94],
      "startPoint": [14.138, 50.918]
    }
  ]
}
```

### `GET /api/activities/tracks`

Tracks aller Treffer in vereinfachter Form als GeoJSON `FeatureCollection`
für die Kartenebene. Die Feature-ID ist die Aktivitäts-ID.

Zusätzlicher Parameter: `lod` (Default `1`). Im Skeleton gibt es nur die
Kartenstufe `1`; der Parameter hält gröbere Stufen offen
([Generalisierung](activities.md#generalisierung)).

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "6f1c…",
      "properties": { "type": "hike" },
      "geometry": { "type": "MultiLineString", "coordinates": [[[14.13825, 50.95637], …]] }
    }
  ]
}
```

`properties` enthält bewusst nur, was der Kartenstil braucht. Name, Datum und
Kennzahlen für die Kurzinfo kommen aus der Aktivitätsliste, die ohnehin geladen
ist.

### `GET /api/activities/{id}`

Detaildaten einer Aktivität ([RTCS-09](../requirements/RTCS-09-activity-detail.md)):
alle Felder der Liste, zusätzlich `endedAt`, `descentM`, `movingDurationS`,
`pointCount`, `hasTimestamps`, `externalRef`, später Fotoanzahl je Konfidenz.

### `GET /api/activities/{id}/track`

Track in voller Auflösung als GeoJSON `Feature` für Detailansicht und
Höhenprofil. Koordinaten mit Höhe (`[lon, lat, ele]`), Zeitstempel als
parallele Liste je Segment in `properties.times` (Unix-Sekunden), angelehnt an
die verbreitete `coordTimes`-Konvention.

### `GET /api/activity-types`

Aktivitätsarten für Filter und Legende: `code`, `label`, `category`,
`sortOrder`.

### Import

| Endpunkt | Zweck |
|---|---|
| `POST /api/import-runs` | Startet einen inkrementellen Lauf über alle aktiven Quellen oder eine Quelle (`{"sourceId": "…"}`); `202 Accepted` mit Lauf-IDs, `409`, wenn für die Quelle bereits ein Lauf aktiv ist |
| `GET /api/import-runs` | Letzte Läufe mit Quelle, Zählern und Status |
| `GET /api/import-runs/{id}/events` | Fehler und Änderungen eines Laufs |

Diese Endpunkte sind wie die gesamte Anwendung im lokalen Netz ohne Anmeldung
erreichbar (ADR-005). Ein Importlauf verändert nur abgeleitete Daten und ist
idempotent; das Risiko wird daher für den Skeleton akzeptiert.

Mit der Anbindung der Komoot- und Strava-APIs kommen Zugangsdaten für diese
Dienste hinzu. Dann wird neu bewertet, ob Import-Endpunkte und ggf. eine
Autorisierungsseite ohne Anmeldung erreichbar bleiben dürfen.

## Spätere Endpunkte (Skizze)

| Endpunkt | Feature |
|---|---|
| `GET /api/sources` | Konfigurierte Quellen und ihr Status, z. B. für die Autorisierung von API-Quellen |
| `GET /api/stats` | Dashboard-Kennzahlen ([RTCS-02](../requirements/RTCS-02-dashboard.md)) |
| `GET /api/activities/{id}/photos` | Fotos einer Aktivität mit Konfidenz ([RTCS-09](../requirements/RTCS-09-activity-detail.md)) |
| `GET /api/photos?…filter…&minConfidence=sicher` | Foto-Marker für die Karte ([RTCS-08](../requirements/RTCS-08-photo-markers.md), [RTCS-11](../requirements/RTCS-11-photo-confidence-filter.md)) |
| `GET /api/photos/{id}/{variant}` | Bildauslieferung, `variant` ∈ `thumb`, `preview`, `original` ([ADR-001](../architecture/adr/adr-001-bildauslieferung.md)) |
| `GET /api/geocode?q=…` | Ortssuche über Proxy zum Geocoder, falls nicht direkt aus dem Browser ([RTCS-04](../requirements/RTCS-04-location-search.md)) |

## Caching

- Die Aktivitätsdaten ändern sich nur durch Importläufe. Antworten von
  `/api/activities*` und `/api/activity-types` tragen ein `ETag` auf Basis des
  Datenstands (Ende des letzten Laufs mit Änderungen). Der Browser fragt mit
  `If-None-Match` nach und erhält bei unverändertem Stand `304`.
- Im Frontend gilt für diese Abfragen eine lange `staleTime` in TanStack Query;
  nach einem Importlauf genügt ein Neuladen.
- Bildvarianten sind über ihre ID unveränderlich und können lange gecacht
  werden (`Cache-Control: max-age=…, immutable`).

## Offene Punkte

- Darf der Browser den Geocoder direkt ansprechen, oder läuft die Suche über das
  Backend?
