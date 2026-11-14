# Strava als Quelle für Aktivitäten

**Status:** Recherche (14.11.2026), noch keine Entscheidung

Ziel wie bei [Komoot](komoot.md): Aktivitäten direkt per API laden. Im
[Datenmodell](data_model.md#source) wäre Strava eine Quelle der Art `strava`,
jede Aktivität ein Quellobjekt.

## Ergebnis in Kürze

- Strava hat eine **offizielle, dokumentierte API mit OAuth2**. Eine eigene App
  lässt sich selbst anlegen; Voraussetzung ist laut Doku ein
  Strava-Abo.
- Technisch liefert die API alles Nötige: Liste mit Zeitfilter, Sportart,
  Startzeit in UTC mit Zeitzone und die Punkte als Streams.
- Das Problem sind die **Nutzungsbedingungen**: Daten einer Person dürfen in
  der Anwendung nur dieser Person angezeigt werden. Das widerspricht dem Kern
  von Rudeltracks, dass die Familie gemeinsam auf die Aktivitäten schaut.
- Eine Route zum Download der Originaldatei (GPX/FIT) einer Aktivität gibt es
  in der API nicht. Die Originaldateien gibt es nur über den Datenexport im
  Strava-Konto (ZIP).

## API

Quellen: [Getting Started](https://developers.strava.com/docs/getting-started/),
[Authentication](https://developers.strava.com/docs/authentication/),
[Rate Limits](https://developers.strava.com/docs/rate-limits/),
[Reference](https://developers.strava.com/docs/reference/)

| Aspekt | Stand der Dokumentation |
|---|---|
| App anlegen | Selbst unter `strava.com/settings/api`; „A Strava subscription is required.“ |
| Kapazität | Neue Apps im „Single Player Mode“: nur das eigene Konto kann sich verbinden. Upgrade im Dashboard auf 10 Personen, darüber Review durch Strava |
| Anmeldung | OAuth2 Authorization Code; `localhost` und `127.0.0.1` sind als Callback zugelassen |
| Token | Access Token 6 Stunden; Refresh Token rotiert, der alte wird sofort ungültig, die Anwendung muss also immer den neuesten speichern |
| Scopes | `activity:read` nur für sichtbare Aktivitäten (Alle, Follower), ohne Privatsphäre-Zonen. `activity:read_all` zusätzlich für „Nur du“ und die Privatsphäre-Zonen |
| Rate Limits | je App: 200 Anfragen je 15 min und 2.000 je Tag gesamt, lesend 100 je 15 min und 1.000 je Tag. Nach Upgrade doppelt so viel. HTTP 429 bei Überschreitung |
| Webhooks | Für Änderungen und den Entzug der Berechtigung empfohlen; brauchen eine öffentlich erreichbare Callback-URL |

Aufrufe für den Import:

| Schritt | Aufruf |
|---|---|
| Liste | `GET /api/v3/athlete/activities?after=<epoch>&page=…&per_page=…`, Ergebnis `SummaryActivity[]` |
| Details | `GET /api/v3/activities/{id}` (`DetailedActivity`) |
| Punkte | `GET /api/v3/activities/{id}/streams?keys=latlng,altitude,time&key_by_type=true` |

Felder für Rudeltracks:

| Feld | Verwendung |
|---|---|
| `id` | `source_item.item_key`, `activity.source_key = strava:<id>` |
| `sport_type` (fein, z. B. `Hike`, `Ride`, `GravelRide`) | `activity_type` über eine Zuordnungstabelle |
| `name` | `activity.name` |
| `start_date` (UTC), `timezone`, `start_date_local` | `started_at`, `timezone` |
| `distance`, `moving_time`, `elapsed_time`, `total_elevation_gain` | Plausibilitätsprüfung |
| `external_id`, `upload_id`, `device_name` | Herkunft, z. B. Upload von Komoot oder Garmin; Hinweis für Duplikate |
| `private` | – |
| Streams `latlng`, `altitude`, `time` (Sekunden ab Start) | Track |

Ein Änderungszeitpunkt wie `changed_at` bei Komoot fehlt in der Liste.
Änderungen an alten Aktivitäten (z. B. Umbenennung) erkennt man ohne Webhooks
nur durch erneutes Abrufen der Liste und Vergleich der Felder.

Mengengerüst: Eine Aktivität kostet für den Erstimport zwei Anfragen (Liste
anteilig und Streams). 1.000 Aktivitäten passen bei 1.000 Leseanfragen pro
Tag also nicht in einen Tag, aber in zwei bis drei. Danach genügt eine Anfrage
pro Lauf plus eine je neuer Aktivität.

## Nutzungsbedingungen

Quelle: [Strava API Agreement](https://www.strava.com/legal/api), gültig ab
1. Juni 2026. Die separate [API Policy](https://www.strava.com/legal/api_policy)
ist noch nicht gelesen.

Wörtlich:

> Strava Data provided by a specific user can only be displayed or disclosed in
> your Developer Application to that user.

Weitere Punkte:

- Daten anderer Personen dürfen nicht angezeigt werden, selbst wenn sie auf
  Strava öffentlich sind.
- Bei Ende der Nutzung oder Kündigung müssen alle Strava-Daten gelöscht werden.
- Angemessene Sicherheitsmaßnahmen für die Daten sind Pflicht.
- Mindestalter 18 Jahre für die Person, die die App registriert.

Folgen für Rudeltracks:

- Wer die eigenen Strava-Aktivitäten nur selbst ansieht, ist abgedeckt.
- Die Familie sieht aber gemeinsam alle Aktivitäten, ohne Anmeldung
  ([ADR-005](../architecture/adr/adr-005-zugriff.md)). Über die API geladene
  Daten anderen Familienmitgliedern zu zeigen, verstößt dem Wortlaut nach gegen
  die Bedingungen, auch bei Aktivitäten, die die Familie gemeinsam unternommen
  hat.
- Die Löschpflicht passt nicht zu einem dauerhaften Familienarchiv.

Diese Einordnung ist keine Rechtsberatung, sondern die naheliegende Lesart.

## Datenexport als Alternative

Im Strava-Konto lässt sich unter „Mein Konto“ ein vollständiger Datenexport
anfordern. Er enthält die Aktivitäten im hochgeladenen Originalformat (GPX,
FIT, TCX, teils gzip) und eine `activities.csv` mit Name, Sportart und Datum.
Für Daten aus dem eigenen Export gilt das API Agreement nicht; es sind die
eigenen Daten.

Für Rudeltracks heißt das: eine Verzeichnisquelle, die zusätzlich FIT und TCX
liest und Sportart und Name aus der `activities.csv` übernimmt. Der Export ist
manuell, kann aber regelmäßig wiederholt werden; die Inhalts-Hashes verhindern
Duplikate.

## Überschneidung mit Komoot

Werden Komoot-Touren automatisch zu Strava übertragen, liegt dieselbe
Aktivität in beiden Quellen. Die Punkte können sich unterscheiden (Strava
verarbeitet hochgeladene Dateien), dann hilft der Inhalts-Hash nicht. Kandidat
zum Erkennen: gleiche Startzeit (± wenige Sekunden) und ähnliche Distanz;
`external_id` kann die Herkunft zusätzlich verraten.

## Optionen

| Option | Bewertung |
|---|---|
| A: Strava-API als Quelle `strava` | technisch einfach und stabil; Anzeige für die Familie nach den Bedingungen nicht erlaubt; Abo nötig |
| B: Strava-Datenexport als Verzeichnisquelle | erlaubt, kein Abo und keine Zugangsdaten; manuell; braucht FIT/TCX und CSV-Auswertung |
| C: Strava nicht anbinden | sinnvoll, wenn alle relevanten Aktivitäten auch in Komoot liegen |

## Vorschlag

Stand: Die meisten Aktivitäten liegen in Komoot und Strava, einige nur in einem
der beiden Dienste. Beide Quellen werden daher gebraucht, Option C entfällt.

1. Option B: den Datenexport als Verzeichnisquelle lesen. Die Quelle
   `directory` aus dem Walking Skeleton wird dafür um FIT/TCX und die
   Metadaten aus `activities.csv` erweitert.
2. Duplikaterkennung zwischen Komoot und Strava (siehe oben) ist damit
   Pflicht.
3. Option A nur, wenn Strava-Daten ausschließlich der jeweiligen Person
   angezeigt werden sollen. Das würde Anmeldung und Nutzerprofile
   ([RTCS-15](../requirements/RTCS-15-user-profiles.md)) voraussetzen.

## Offene Punkte

- API Policy lesen (Speicherfristen, Caching).
- Ob die Streams ohne `resolution` die volle Auflösung liefern, ist nicht
  bestätigt.
- Inhalt und Aufbau des Strava-Datenexports am echten Konto prüfen.
- Regeln der Duplikaterkennung Komoot ↔ Strava und welche Quelle bei
  Duplikaten führt.
