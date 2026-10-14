# Kartenmaterial: Raster- und Vektor-Tiles

## Grundidee

Eine Webkarte wird aus gekachelten Ausschnitten aufgebaut. Der sichtbare Kartenausschnitt besteht aus mehreren Tiles, die passend zum Zoom-Level geladen werden.

- **Raster-Tiles** sind fertig gerenderte Kartenbilder (z. B. PNG oder JPEG). Farben, Beschriftungen und Details sind bereits im Bild enthalten.
- **Vektor-Tiles** enthalten Geometrien und Attribute von Kartenobjekten (üblicherweise als PBF). Der Browser rendert daraus mithilfe eines Kartenstils die sichtbare Karte.

Tracks, Fotos und Heatmaps der Anwendung sind eigene Datenebenen. Sie können grundsätzlich über einer Raster- oder Vektor-Grundkarte liegen; Vektor-Tiles sind für diese Overlays keine Voraussetzung.

## Vergleich

| Aspekt | Raster-Tiles | Vektor-Tiles |
|---|---|---|
| Darstellung | Vom Tile-Anbieter vorgerenderte Bilder | Rendering im Browser anhand von Geodaten und Stil |
| Anpassung der Grundkarte | Begrenzte Auswahl auf angebotene Kartenstile | Farben, Beschriftungen und Sichtbarkeit flexibel gestaltbar |
| Einstieg | Einfach einzubinden; wenige zusätzliche Entscheidungen | Stil, Tile-Quelle und Rendering müssen zusammenpassen |
| Betrieb | Bilder bereitstellen oder von einem Dienst laden | Zusätzlich Tile-Daten und Stil bereitstellen; Erzeugung und Aktualisierung der Daten berücksichtigen |
| Geräte | Geringe Anforderungen an das clientseitige Rendering | WebGL-fähiger Browser und ausreichende Geräte-Performance prüfen |
| Geeignet, wenn ... | ein fertiger Kartenstil genügt und der schnelle Einstieg zählt | ein eigener Kartenstil oder mehr Kontrolle über die Grundkarte wichtig ist |

Die Datenmenge und Ladezeit hängen von Tile-Quelle, Stil, Zoomstufe, Ausschnitt und Cache ab. Vektor-Tiles sind nicht pauschal kleiner oder schneller als Raster-Tiles.

## Auswirkungen auf die Bibliothekswahl

Tile-Format und Kartenbibliothek sind getrennte Entscheidungen. Leaflet ist ein naheliegender, einfacher Einstieg mit Raster-Tiles. MapLibre GL JS passt besonders gut zu Vektor-Tiles und flexiblen Kartenstilen, kann aber ebenfalls Raster-Tiles anzeigen. Die Bibliothek sollte anhand des benötigten Renderings und eines kleinen Prototyps gewählt werden, nicht allein anhand des Tile-Formats.

## Vorläufige Empfehlung für Rudeltracks

### Stand des Prototyps (14.10.2026)

Der [Kartenprototyp](../../prototype/README.md) verwendet MapLibre GL JS mit der [Thunderforest Vector Styles API](https://www.thunderforest.com/docs/vector-styles-api/), derzeit mit dem Stil `atlas`. Das Laden der Tiles und die Interaktion mit der Karte funktionieren nach dem bisherigen Praxistest gut und flüssig.

Die aktuelle Einschränkung ist die Stilauswahl: Der gewünschte Kartentyp `landscape` wird von dieser API derzeit noch nicht unterstützt. Die Verfügbarkeit als Rasterkarte bedeutet nicht, dass derselbe Stil auch über die Vector Styles API verfügbar ist. Laut bisherigem Kenntnisstand sind weitere Kartentypen von Thunderforest angekündigt; daraus ergibt sich noch keine Zusage oder ein Termin für `landscape`.

### Optionen für den gewünschten Kartenstil

| Option | Vorteile | Nachteile / Risiken | Aktuelle Einordnung |
|---|---|---|---|
| 1. Auf zusätzliche Thunderforest-Vektorstile warten | Bestehende, flüssig bedienbare MapLibre-Anbindung bleibt erhalten; kein eigener Styling-Aufwand. | `landscape` bleibt vorerst nicht verfügbar; Unterstützung und Zeitpunkt sind offen. | **Aktuelle Präferenz.** Vorerst mit `atlas` weiterarbeiten und die angebotenen Stile beobachten. |
| 2. Eigenen Stil für MapLibre erstellen | Darstellung könnte gezielt an die gewünschte Landscape-Karte angenähert werden. | Sehr hoher Aufwand für Gestaltung, Abstimmung mit dem Tile-Schema und Pflege. | Aktuell keine Option. |
| 3. Auf Raster-Tiles ausweichen | Gewünschten fertigen Landscape-Stil als Rasterkarte nutzen. | Weniger flüssige Bedienung wird als Nachteil erwartet; das konkrete Verhalten auf Zielgeräten wäre zu prüfen. | Nur als Notlösung, falls der gewünschte Stil nicht länger warten kann. MapLibre kann auch Raster-Tiles anzeigen; ein Bibliothekswechsel ist dafür nicht erforderlich. |
| 4. Anderen Anbieter ausprobieren, insbesondere Stadia Maps | Möglicherweise passender fertiger Vektorstil ohne Eigenentwicklung. | Eignung der Stile, Integration, Kosten, Attribution und Nutzungsbedingungen müssen erst geprüft werden. | Alternative bei erneutem Entscheidungsbedarf; noch nicht evaluiert. |

**Vorläufige Entscheidung:** Option 1 verfolgen. Kein eigener Stil, kein Raster-Fallback und kein Anbieterwechsel werden derzeit umgesetzt. Die Entscheidung erneut prüfen, wenn Thunderforest passende neue Stile bereitstellt oder der gewünschte Landscape-Stil für die weitere Umsetzung zwingend benötigt wird.

Diese Tendenz ersetzt die ursprüngliche Empfehlung, den ersten Prototyp mit Raster-Tiles zu beginnen. Sie ist keine endgültige Festlegung für den Produktivbetrieb. Track-Linien, viele Foto-Marker, Touch-Bedienung und die Performance auf mobilen Zielgeräten sind weiterhin gesondert zu prüfen.

## Tile-Dienste (Kandidaten)

Die folgende Liste ist eine Vorauswahl, keine Empfehlung oder Anbieterprüfung. Angebote, Preise und Nutzungsbedingungen können sich ändern; vor einer Entscheidung die jeweils verlinkten aktuellen Konditionen prüfen.

### Gehostete Dienste

| Dienst | Tile-Angebot | Einordnung für Rudeltracks |
|---|---|---|
| [OpenStreetMap Standard Tiles](https://operations.osmfoundation.org/policies/tiles/) | Raster | Einfach für Entwicklung und geringe interaktive Nutzung. Öffentlich finanzierter Best-Effort-Dienst ohne SLA; sichtbare Attribution, Caching und weitere Nutzungsregeln sind verpflichtend. Kein Offline-Download oder Vorladen großer Gebiete. Nicht als verlässlicher Produktionsdienst einplanen. |
| [MapTiler Cloud](https://www.maptiler.com/cloud/) | Raster und Vektor | Gehostete Kartenstile und eigene Stilanpassung; bietet APIs für Webkarten. Interessant, wenn ein fertiger Stil oder später ein angepasster Stil genutzt werden soll. Nutzungsplan und Konditionen prüfen. |
| [Stadia Maps](https://stadiamaps.com/) | Raster und Vektor | Fertige Kartenstile und Dokumentation für MapLibre, Leaflet und OpenLayers. Ein Kandidat für einen schnellen Prototyp; Kontingente, Attribution und Tarifbedingungen prüfen. |
| [Thunderforest](https://www.thunderforest.com/maps/) | Raster und Vektor | Spezialisierte Stile wie OpenCycleMap, Landscape und Outdoors passen thematisch zu Wandern und Radfahren. Raster- und Vektor-APIs getrennt dokumentiert; API-Schlüssel und Tarifbedingungen erforderlich. |
| [Jawg Maps](https://www.jawg.io/en/maps) | Raster und Vektor | Anpassbare Kartenstile; der Anbieter nennt überwiegend OpenStreetMap-basierte Daten und EU-Hosting. Preise, Datenschutzangaben und konkrete Tile-Nutzungsbedingungen prüfen. |

### Selbst betreiben

| Baustein | Tile-Angebot | Einordnung |
|---|---|---|
| [OpenMapTiles](https://openmaptiles.org/docs/) | Vektor | Open-Source-Schema und Werkzeuge zum Erzeugen eigener Vektor-Tiles aus OpenStreetMap-Daten; zusätzlich sind Datenerzeugung/-aktualisierung und ein Tile-Server nötig. Lizenz- und Attributionspflichten beachten. |
| [TileServer GL](https://tileserver.readthedocs.io/en/latest/) | Vektor und daraus gerenderte Raster-Tiles | Kann vorbereitete Tile-Daten und Kartenstile bereitstellen. Zusammen mit OpenMapTiles eine mögliche On-Premise-Variante; Betrieb und Updates liegen dann bei uns. |
| [Martin](https://maplibre.org/martin/) | Vektor-Tiles aus unterstützten Quellen | Tile-Server für unter anderem PostGIS, MBTiles und PMTiles. Eher interessant, wenn Tile-Daten oder Geodaten bereits vorliegen; ersetzt nicht automatisch die Erzeugung weltweiter OSM-Tiles. |

Für den ersten Vergleich bieten sich MapTiler Cloud oder Stadia Maps als allgemeine Kandidaten und Thunderforest wegen der Outdoor-Stile an. Wenn externe Kartendienste ausgeschlossen sind, wäre OpenMapTiles mit einem selbst betriebenen Tile-Server die zu prüfende Richtung, allerdings mit deutlich mehr Betriebsaufwand. Externe Anbieter erhalten bei der Kartennutzung Anfragen zum sichtbaren Gebiet; das ist bei privaten Familien-Tracks in der Datenschutzabwägung zu berücksichtigen.

## Betrieb und offene Punkte

- „Kostenlos“ bedeutet nicht automatisch, dass ein öffentlicher Tile-Dienst für den Produktivbetrieb geeignet ist. Nutzungsbedingungen, Attribution, Nutzungslimits und Verfügbarkeit des konkreten Dienstes prüfen.
- Bei externen Tiles werden die angefragten Kartenausschnitte an den jeweiligen Anbieter übermittelt. Für den On-Premise-Betrieb Datenschutz- und Netzwerkvorgaben berücksichtigen.
- Ein eigener Tile-Server erhöht die Kontrolle über Verfügbarkeit und Datenfluss, verursacht aber Aufwand für Bereitstellung, Updates, Speicher und Betrieb. Bei Vektor-Tiles kommt die Aufbereitung und Aktualisierung der Vektordaten hinzu.
- Noch zu klären: Dürfen externe Tile-Dienste in Produktion genutzt werden? Ist eigener Tile-Betrieb gewünscht? Reicht ein fertiger Raster-Kartenstil dauerhaft aus?
