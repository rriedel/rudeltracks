# Aktivitäten: Import, Tracks und Auslieferung

**Status:** Entwurf für den Walking Skeleton (14.11.2026)

Ergänzt das [Datenmodell](data_model.md) und die [API](api.md) um die
fachlichen Regeln für Aktivitäten und ihre Tracks. Begriffe siehe
[Datenmodell](data_model.md#begriffe).

## Ausgangslage aus dem Prototyp

- Der [Kartenprototyp](../../prototype/maps/README.md) wurde mit ca. 700 Tracks
  getestet. Darstellung und Bedienung der Karte (MapLibre, Vektor-Tiles von
  Stadia Maps bzw. Thunderforest) waren flüssig.
- Das Laden über Vite-Imports der GPX-Dateien war inakzeptabel langsam. Das ist
  für die Anwendung nicht relevant, weil Aktivitäten künftig aus PostGIS über
  die Backend-API kommen.
- Offen ist damit nicht das Rendering, sondern die übertragene Datenmenge.

## GPX-Import

Umsetzung von [RTCS-16](../requirements/RTCS-16-gpx-import.md). Im Skeleton
ist die einzige Quelle ein Verzeichnis mit GPX-Dateien
(`source.kind = 'directory'`); jede Datei ist ein Quellobjekt und ergibt eine
Aktivität.

### Exportformate

Die Beispieldateien stammen aus zwei Export-Werkzeugen mit unterschiedlichem
Inhalt:

| Merkmal | Komoot-Webexport | `gpx.py`-Export |
|---|---|---|
| Erkennbar an | `creator="https://www.komoot.de"` | `creator="gpx.py -- https://github.com/tkrajina/gpxpy"` |
| Beispiele | Wanderungen 2026, `t00x.gpx` | Rennrad-Touren 2020/2021 |
| Name | `<trk><name>` | `<trk><name>` mit Zusatz ` (Completed)` |
| Aktivitätsart | `<trk><type>`, z. B. `hike` | **fehlt** |
| Komoot-Tour-ID | nicht im Inhalt | im Original `<link href="https://www.komoot.de/tour/<id>">` |
| Autor | nicht im Inhalt | im Original `<author>` mit Name und Komoot-Profil |
| Komoot-Kennzahlen | keine | `<desc>Distance: 68.43km, Estimated duration: 2.96h, Elevation up: 703.0m, …</desc>` |
| Wegpunkte | teilweise `<wpt>` | keine |
| Zeitstempel | UTC, teils mit Millisekunden | UTC |

In den Beispieldateien des `gpx.py`-Exports sind Autor und Links zu Tour und
Profil manuell entfernt worden; die Tour-ID steht dort nur noch im Dateinamen.

Woher die Unterschiede stammen, ist nicht geklärt. Möglich sind eine
Weiterentwicklung des Export-Werkzeugs oder eine automatische Synchronisation
zwischen Strava und Komoot, über die die älteren Rennrad-Touren nach Komoot
gelangt sind. Der Import muss deshalb mit beiden Varianten und fehlenden
Angaben umgehen.

Die Tour-ID im Dateinamen mancher Komoot-Webexporte
(`YYYY-MM-DD_<tour-id>_<name>.gpx`) ist dagegen unzuverlässig: Die Git-Historie
zeigt, dass `t001.gpx` inhaltlich unverändert in
`2026-10-13_3345858628_Schrammstein-Aussicht….gpx` umbenannt wurde. Der
Dateiname wird deshalb nicht ausgewertet.

### Regeln

- Einlesen rekursiv aus dem konfigurierten Quellverzeichnis, nur `*.gpx`.
- Alle `<trk>` einer Datei bilden den Track einer Aktivität; jedes `<trkseg>`
  wird eine Linie im `MultiLineString`. Segmente mit weniger als zwei gültigen
  Punkten werden verworfen.
- **Name:** `<trk><name>`, sonst `<metadata><name>`, sonst Dateiname ohne
  Endung. Der Zusatz ` (Completed)` wird entfernt.
- **Aktivitätsart:** `<trk><type>`; fehlt er, `unknown`. Für die Rennrad-Touren
  aus `gpx.py` bedeutet das vorerst `unknown`. Eine richtige Zuordnung kommt mit
  dem API-Import; bis dahin ist eine Zuordnung über die Quelle denkbar (z. B.
  ein eigenes Verzeichnis je Art mit Default-Art in `source.config`).
- **Komoot-Tour-ID:** aus `<link href=".../tour/<id>">` in `external_ref`
  übernehmen, falls vorhanden. Angaben zum Autor werden nicht übernommen.
- **Kennzahlen** werden immer aus dem Track berechnet, unabhängig von `<desc>`,
  damit alle Aktivitäten vergleichbar sind. Die Komoot-Werte in `<desc>` dienen
  im Skeleton als Plausibilitätsprüfung für die eigene Berechnung von Distanz
  und Auf-/Abstieg.
- Wegpunkte (`<wpt>`) und Routen (`<rte>`) werden zunächst ignoriert.
- Zeitstempel sind in beiden Formaten UTC. Fehlen sie, wird die Aktivität
  trotzdem importiert (`has_timestamps = false`).
- Fehlerhafte Dateien (ungültiges XML, keine gültigen Segmente) werden
  übersprungen und als `import_event` mit `action = 'error'` protokolliert; der
  Lauf läuft weiter.
- Identität und Änderungserkennung siehe [Datenmodell](data_model.md#activity).

Aufgabenteilung: Java parst die Datei (StAX, streamend) und schreibt den Track
in voller Auflösung. Abgeleitete Werte berechnet PostGIS in derselben
Transaktion: `bbox`, `start_point`, `distance_m` (über `geography`),
Generalisierungsstufen. Auf-/Abstieg berechnet Java aus geglätteten
Höhenwerten. Die Zeitzone am Startpunkt wird beim Import ermittelt (Verfahren
offen).

### Auslösung im Skeleton

- Beim Start der Anwendung und zeitgesteuert (Quarkus `@Scheduled`), jeweils
  als inkrementeller Lauf über alle aktiven Quellen.
- Manuell über `POST /api/import-runs` (siehe [API](api.md#import)).
- Dateisystem-Watcher folgt später
  ([ADR-004](../architecture/adr/adr-004-frontend-backend-aufteilung.md)).

### Ausblick: API-Import

Komoot und Strava werden als weitere Quellarten (`source.kind = 'komoot'`
bzw. `'strava'`) angebunden. Jede Tour bzw. Activity ist ein Quellobjekt; der
Ablauf aus Änderungserkennung, Abruf, Aktivität anlegen oder aktualisieren und
Protokoll bleibt gleich. Neu sind ein Parser je Anbieterformat und die
Autorisierung. Die API-Möglichkeiten werden im nächsten Schritt geprüft.

## Generalisierung

### Verfahren

Ein GPS-Track enthält viele Punkte, die für die Darstellung überflüssig sind,
etwa auf geraden Wegstücken und in Pausen. Die Vereinfachung entfernt Punkte,
solange die vereinfachte Linie nirgends weiter als eine **Toleranz** (in
Metern) von der Originallinie abweicht.

PostGIS bietet dafür `ST_SimplifyPreserveTopology` (Douglas-Peucker-Verfahren):
Die Linie wird zunächst durch die Verbindung von Start- und Endpunkt ersetzt.
Liegt der am weitesten entfernte Originalpunkt weiter als die Toleranz von
dieser Verbindung weg, bleibt er erhalten, und das Verfahren wird auf beide
Teilstücke wiederholt. Kurven und Richtungswechsel bleiben so erhalten, gerade
Strecken schrumpfen auf wenige Punkte.

Die Toleranz ist in Einheiten des Koordinatensystems angegeben. Damit sie in
Metern wirkt, wird nach EPSG:3857 transformiert und die Toleranz mit
`1/cos(Breite)` korrigiert (Web-Mercator-Verzerrung, bei 51° Faktor ca. 1,6).
Das Ergebnis wird nach WGS 84 zurücktransformiert und als eigene Stufe in
`track` gespeichert. Die volle Auflösung (`lod = 0`) bleibt unverändert
erhalten.

### Sichtbarkeit der Abweichung

Eine Abweichung ist unsichtbar, solange sie kleiner als etwa ein
Bildschirmpixel ist. In MapLibre (512-px-Kacheln) entspricht ein Pixel bei 51°
Breite:

| Zoom | Typischer Ausschnitt | Meter je Pixel |
|---|---|---|
| 8 | Bundesland | 190 |
| 10 | Region, ganze Rennrad-Tour | 48 |
| 12 | Wandergebiet | 12 |
| 14 | Einzelne Wanderung | 3 |
| 16 | Wegdetail | 0,75 |

Die Sichtbarkeit hängt nur von der Toleranz ab, nicht von der Punktdichte der
Aufzeichnung: 3 m Toleranz sind bis Zoom 14 unsichtbar, 25 m bis Zoom 11,
100 m bis Zoom 9.

### Messung an den Beispiel-Tracks

Douglas-Peucker auf die 12 Tracks des Prototyps, Koordinaten auf 5
Nachkommastellen gerundet, GeoJSON wie in der
[API](api.md#get-apiactivitiestracks).

**Aufzeichnung:**

| | Wanderungen (9) | Rennrad (3) |
|---|---|---|
| Ø Länge | 7,4 km | 65,7 km |
| Punktabstand Median / 90 %-Quantil | 1,6 m / 7,5 m | 14,2 m / 42,2 m |
| Zeitabstand Median | 4 s | 2 s |
| Punkte je km | 314 | 52 |

**Vereinfachung, je Track:**

| Toleranz | Wanderung: Punkte | Wanderung: gzip | Rennrad: Punkte | Rennrad: gzip |
|---|---|---|---|---|
| keine | 2.314 (100 %) | 6,6 KB | 3.407 (100 %) | 16,5 KB |
| 3 m | 275 (12 %) | 1,3 KB | 799 (23 %) | 4,3 KB |
| 5 m | 177 (8 %) | 0,9 KB | 584 (17 %) | 3,2 KB |
| 10 m | 95 (4 %) | 0,5 KB | 387 (11 %) | 2,2 KB |
| 25 m | 45 (2 %) | 0,3 KB | 220 (6 %) | 1,3 KB |
| 100 m | 14 (1 %) | 0,1 KB | 95 (3 %) | 0,6 KB |

**Hochrechnung** für 1.000 Aktivitäten, angenommen 600 Wanderungen und 400
Radtouren mit den obigen Mittelwerten:

| Toleranz | Punkte gesamt | gzip gesamt |
|---|---|---|
| keine | 2,75 Mio. | 10,3 MB |
| 3 m | 485.000 | 2,4 MB |
| 25 m | 115.000 | 0,7 MB |

Folgerungen:

- Rennrad-Touren sind schon in der Aufzeichnung viel dünner besetzt (Punkte
  alle ca. 14 m statt alle 2 m) und verlaufen gerader. Die Vereinfachung
  entfernt deshalb anteilig weniger Punkte (77 % statt 88 % bei 3 m). Wegen der
  größeren Länge bleiben je Tour trotzdem rund dreimal so viele Punkte übrig
  wie bei einer Wanderung.
- Bei hohem Zoom wirken Rennrad-Tracks auch in voller Auflösung eckig: Auf Zoom
  16 liegen die Punkte 20 bis 55 Pixel auseinander. Das ist eine Eigenschaft der
  Aufzeichnung; die volle Auflösung bringt dort optisch kaum etwas gegenüber der
  Kartenstufe.
- Eine ganze Rennrad-Tour passt etwa auf Zoom 10 bis 11 ins Bild. Dort wäre
  auch 25 m Toleranz unsichtbar; das spart gegenüber 3 m rund drei Viertel der
  Punkte.
- Absolut bleibt die Datenmenge auch mit hohem Radanteil bei wenigen MB, im
  lokalen Netz unkritisch. Der Prototyp hat ca. 700 Tracks in voller Auflösung
  (geschätzt 1,5 Mio. Punkte) flüssig dargestellt; die Kartenstufe mit 3 m
  liegt für 1.000 Aktivitäten bei ca. einem Drittel davon.

### Stufen für den Skeleton

| LOD | Toleranz | Verwendung |
|---|---|---|
| 1 | 3 m (konfigurierbar) | Kartenebene für alle Zoomstufen |
| 0 | keine | Ausgewählte Aktivität (Detailansicht, Höhenprofil, ab Zoom ca. 15 auf der Karte); Foto-Matching |

Die Empfehlung aus der Messung mit den Wanderungen bleibt bestehen. Erster
Kandidat für eine zusätzliche Stufe ist `lod = 2` mit 25 m für Zoom < 11. Sie
wird ergänzt, wenn die Messung auf Mobilgeräten oder ein hoher Radanteil im
echten Bestand das nahelegt. Das Schema erlaubt das ohne Änderung; eine neue
oder geänderte Stufe erfordert nur eine Neuberechnung aus `lod = 0`, keinen
Neuimport.

## Auslieferung an die Karte

**Ansatz für den Skeleton:** Das Frontend lädt für die aktuellen Filter
(Zeitraum, Aktivitätsart, Name) die Tracks aller Treffer in der Kartenstufe
(`lod = 1`) als GeoJSON. Es wird **nicht** auf den Kartenausschnitt
zugeschnitten.

- Verschieben und Zoomen der Karte lösen keine neuen Anfragen aus; nur ein
  Filterwechsel lädt neu, über TanStack Query gecacht.
- Die volle Auflösung wird nur für die ausgewählte Aktivität geladen.
- Der Ausschnittsfilter ([RTCS-03](../requirements/RTCS-03-activity-filter.md))
  und die Abschwächung teilweise sichtbarer Tracks
  ([RTCS-05](../requirements/RTCS-05-track-rendering.md)) werden im Frontend
  anhand von `bbox` aus der Aktivitätsliste berechnet. Damit hängt die Reaktion
  auf Kartenbewegungen nicht von der API ab.
- Koordinaten werden auf 5 Nachkommastellen (ca. 1 m) gerundet; die Antwort wird
  per gzip komprimiert.

**Ausweichvarianten**, falls die Messung im Skeleton zu große Antworten ergibt:

1. Gröbere Stufe für niedrige Zoomstufen (siehe oben).
2. Tracks zusätzlich nach Kartenausschnitt filtern (`bbox`-Parameter), mit
   etwas Rand, damit kleine Verschiebungen keine Anfrage auslösen.
3. Track-Ebene als Vektor-Tiles direkt aus PostGIS (`ST_AsMVT`) ausliefern.
   MapLibre lädt dann nur sichtbare Kacheln; Filter werden zu Tile-Parametern.

## Clustering

Für [RTCS-07](../requirements/RTCS-07-smart-clustering.md) liefert die
Aktivitätsliste `start_point` je Aktivität. Die Cluster-Marker entstehen im
Frontend über das eingebaute Clustering der MapLibre-GeoJSON-Quelle. Ab welcher
Zoomstufe bzw. Abdeckung statt Linien Marker gezeigt werden, bleibt in RTCS-07
offen und wird nach dem Skeleton anhand echter Daten festgelegt.

## Messungen im Walking Skeleton

Mit dem Bestand von ca. 700 Aktivitäten:

| Messung | Ziel |
|---|---|
| Antwortgröße (gzip) der Track-Antwort, alle Aktivitäten | Bestätigung der Hochrechnung, Entscheidung über Ausweichvarianten |
| Darstellung aller Tracks auf einem Mobilgerät | Bedarf für gröbere Stufen |
| Antwortzeit von Aktivitätsliste und Track-Antwort | Qualitätsziel „Filter in Echtzeit, max. 300 ms“ ([Kapitel 1](../architecture/01-einleitung-und-ziele.md#qualitätsziele)) |
| Zeit vom Filterwechsel bis zur aktualisierten Karte, Desktop und Mobilgerät | dto. |
| Dauer des initialen Imports und eines Laufs ohne Änderungen | Betriebsfähigkeit von RTCS-19 |
| Optik der Kartenstufe bei hohem Zoom | Feinjustierung der Toleranz |
| Eigene Distanz und Auf-/Abstieg im Vergleich zu den Komoot-Werten in `<desc>` | Plausibilität der Berechnung |

## Offene Punkte

- Aktivitätsart für Exporte ohne `<type>` bis zur API-Anbindung.
- Verfahren zur Zeitzonenbestimmung am Startpunkt.
- Pausenerkennung für die Bewegungsdauer.
- Glättung der Höhenwerte für Auf-/Abstieg.
