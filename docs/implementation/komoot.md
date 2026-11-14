# Komoot als Quelle für Aktivitäten

**Status:** Recherche (14.11.2026), noch keine Entscheidung

Ziel: Aktivitäten direkt von Komoot laden, ohne Umweg über ein Export-Werkzeug
und GPX-Dateien. Im [Datenmodell](data_model.md#source) wäre Komoot eine
Quelle der Art `komoot`, jede Tour ein Quellobjekt.

## Ergebnis in Kürze

- Komoot hat eine **offizielle API mit OAuth2**. Zugangsdaten gibt es aber nur
  über einen Account Manager bei Komoot, also faktisch für Geschäftspartner.
  Ein Verfahren für private Projekte ist nicht dokumentiert.
- Werkzeuge wie KomootGPX nutzen eine **inoffizielle API** mit E-Mail und
  Passwort des Komoot-Kontos. Sie liefert alles Nötige, ist aber nicht
  dokumentiert und kann sich jederzeit ändern.
- Die Rennrad-Touren im Prototyp stammen sehr wahrscheinlich aus
  **KomootGPX**, einem Werkzeug auf Basis dieser inoffiziellen API.

## Offizielle API

Quelle: [komoot OAuth2-Dokumentation](https://static.komoot.de/doc/auth/oauth2.html)

| Aspekt | Stand der Dokumentation |
|---|---|
| Zugangsdaten | `client-id` und `client-secret`: „Ask your account manager at komoot to retrieve them.“ Kein öffentliches Antragsverfahren |
| Abläufe | Authorization Code (Standard), Device Code (Geräte ohne Browser), Refresh Token |
| Token | Access Token kurzlebig, Refresh Token langlebig; konkrete Laufzeiten nicht genannt. Trennt die Person die Verbindung, liefert der Refresh `invalid_grant` |
| Scopes | Nur `profile` und `tour-upload` genannt; ein Scope zum Lesen von Touren ist nicht beschrieben |
| Touren | Ein einziges Beispiel: `GET https://external-api.komoot.de/v007/users/<username>/tours/` mit Bearer Token. Antwortformat, Pagination und Geometrie-Abruf sind nicht dokumentiert |
| Rate Limits | HTTP 429 mit `Retry-After`; keine Zahlen genannt |
| Nutzungsbedingungen | Auf der Seite keine |

Bewertung: Technisch passt die offizielle API gut (OAuth2, Refresh Token,
kein Passwort in der Anwendung). Für ein privates Familienprojekt ist der
Zugang aber unwahrscheinlich. Ob eine Anfrage bei Komoot Aussicht hat, lässt
sich nur durch Nachfragen klären.

## Inoffizielle API

Quelle: Quellcode von [KomootGPX](https://github.com/timschneeb/KomootGPX)
(GPL-3.0, Version 1.6.2). Andere Werkzeuge wie
[export-komoot](https://github.com/pieterclaerhout/export-komoot) nutzen
dieselbe Schnittstelle und weisen darauf hin, dass sie jederzeit brechen kann.

| Schritt | Aufruf |
|---|---|
| Anmeldung | `GET https://api.komoot.de/v006/account/email/<email>/` mit HTTP Basic Auth (E-Mail, Passwort). Antwort enthält `username` (User-ID), ein API-Token (Feld `password`) und `user.displayname` |
| Tourenliste | `GET https://api.komoot.de/v007/users/<user-id>/tours/`, Basic Auth mit User-ID und Token; Pagination über `_links.next.href` |
| Tour mit Geometrie | `GET https://api.komoot.de/v007/tours/<tour-id>?_embedded=coordinates,…&format=coordinate_array`; Punkte in `_embedded.coordinates.items[]` |

Felder einer Tour, die KomootGPX verwendet:

| Feld | Bedeutung | Verwendung in Rudeltracks |
|---|---|---|
| `id` | Tour-ID | `source_item.item_key`, `activity.source_key = komoot:<id>` |
| `type` | `tour_recorded` oder `tour_planned` | nur `tour_recorded` importieren |
| `sport` | Sportart, z. B. `hike`, `racebike` | `activity_type` – löst das Problem fehlender Aktivitätsarten |
| `name` | Name | `activity.name` |
| `date` | Startzeitpunkt mit Zeitzone | Basis für Punkt-Zeitstempel |
| `changed_at` | letzte Änderung | `source_item.revision` für die Änderungserkennung |
| `distance`, `duration`, `elevation_up`, `elevation_down` | Komoot-Kennzahlen | Plausibilitätsprüfung |
| `status` | privat oder öffentlich | – |
| `_embedded.coordinates.items[]` | `lat`, `lng`, `alt`, `t` | Track; `t` ist ein Offset in Millisekunden ab `date` |

Bewertung:

- Fachlich vollständig: Sportart, Änderungszeitpunkt und Geometrie sind
  vorhanden. Die Änderungserkennung über `changed_at` passt direkt auf das
  Modell mit Quellobjekten.
- Die Anwendung braucht **E-Mail und Passwort** des Komoot-Kontos. Wie lange
  das Token aus der Anmeldung gültig ist, ist nicht bekannt.
- Keine Zusage zur Stabilität. Ändert Komoot die Schnittstelle, bricht der
  Import, bis der Client angepasst ist. Da die Aktivitäten in der eigenen
  Datenbank liegen, betrifft das nur neue oder geänderte Touren.
- Ob die Nutzungsbedingungen von Komoot automatisierten Zugriff auf das eigene
  Konto erlauben, ist ungeprüft.

## Herkunft der Beispieldateien

Die Rennrad-Touren (`creator="gpx.py …"`) passen zu KomootGPX:

- KomootGPX erzeugt die GPX-Datei mit der Bibliothek gpxpy.
- Der Name erhält bei aufgezeichneten Touren den Zusatz ` (Completed)`.
- `<desc>` hat genau das Format `Distance: …km, Estimated duration: …h,
  Elevation up: …m, Elevation down: …m`.
- `<author>` mit Profil-Link und `<link>` zur Tour werden geschrieben, die
  Sportart nicht.
- Das Dateinamensmuster mit Option `-D` ist `{date}_{title}-{id}.gpx`, also
  `2020-09-30_Rennrad-Tour-266814267.gpx`.

Die aktuelle Version weicht in zwei Punkten ab: Sie setzt `creator` auf den
Anzeigenamen des Kontos und schreibt lokale Zeitstempel ohne `Z`. Die Dateien
stammen daher vermutlich aus einer älteren Version; das stützt die Vermutung
einer Weiterentwicklung des Werkzeugs.

## Optionen

| Option | Aufwand | Risiko | Zugangsdaten |
|---|---|---|---|
| A: Offizielle API | gering, sobald Zugang besteht | gering | OAuth2; Zugang von Komoot nötig |
| B: Inoffizielle API in Rudeltracks | mittel: eigener Client in Java | Schnittstelle kann brechen | E-Mail und Passwort in der Konfiguration |
| C: KomootGPX extern, Rudeltracks liest das Verzeichnis | gering, bereits durch die Verzeichnisquelle abgedeckt | wie B, aber außerhalb der Anwendung | E-Mail und Passwort für KomootGPX |

Bei B entfällt das Zusammenführen von Datei- und API-Importen, wenn die
API-Quelle die Verzeichnisquelle vollständig ersetzt: Die Verzeichnisquelle
wird deaktiviert, ihre Aktivitäten werden ausgeblendet, und alle Touren kommen
neu über die API.

## Vorschlag

1. Bei Komoot nach Zugang zur offiziellen API fragen (Option A). Kostet wenig;
   eine Zusage würde die Frage sauber lösen.
2. Parallel ein kleiner Spike mit der inoffiziellen API und dem eigenen Konto:
   Tourenliste und eine Tour abrufen. Damit prüfen:
   - Anzahl der Touren und Pagination,
   - Werte von `sport` im echten Bestand,
   - Format von `t` und `date`, also UTC oder lokal,
   - Gültigkeit des Tokens aus der Anmeldung.
3. Je nach Ergebnis Option B als Quelle `komoot` umsetzen. Bis dahin bleibt der
   Walking Skeleton bei der Verzeichnisquelle.

## Offene Punkte

- Zugang zur offiziellen API.
- Nutzungsbedingungen für automatisierten Zugriff auf das eigene Konto.
- Ablage von E-Mail und Passwort (z. B. Docker Secret) und Neubewertung von
  [ADR-005](../architecture/adr/adr-005-zugriff.md), sobald die Anwendung
  Zugangsdaten hält.
