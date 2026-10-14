# RTCS-01 – Kartenansicht

**Kurzname:** map-view
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Zentrale und primäre Oberfläche der Anwendung. Eine interaktive Karte auf Basis von frei zugänglichem Kartenmaterial, auf der Tracks und Fotos dargestellt werden. Grundlage für nahezu alle anderen Features.

## Anforderungen / Akzeptanzkriterien

- Interaktive Karte mit Zoom, Pan und (auf Mobile) Touch-Gesten.
- Kartenmaterial ohne Lizenzkosten (z. B. OpenStreetMap-Tiles), self-host-fähig.
- Responsives Layout für Desktop und Mobile.
- Sinnvoller Startausschnitt (z. B. Bounding-Box aller Tracks oder letzte Nutzerposition/-ansicht).
- Bedienelemente für Zoom und aktuellen Standort.
- Der aktuell sichtbare Kartenausschnitt ist als Kontext für Filter (siehe [RTCS-03](RTCS-03-track-filter.md)) abrufbar.

## Abhängigkeiten

- Basis für: [RTCS-05](RTCS-05-track-rendering.md), [RTCS-07](RTCS-07-smart-clustering.md), [RTCS-08](RTCS-08-photo-markers.md), [RTCS-13](RTCS-13-time-window-slider.md), [RTCS-14](RTCS-14-heatmap.md), [RTCS-06](RTCS-06-track-list-view.md)

## Offene Punkte

### Kartenbibliothek

| Option | Vorteile | Nachteile / Risiken |
|---|---|---|
| Leaflet | Schlank, leicht einzurichten, großes Plugin-Ökosystem; gut für Rasterkarten und grundlegende Overlays. | Viele Marker und komplexe Overlays können zusätzliche Optimierung erfordern; weniger auf vektorbasierte Kartenstile und WebGL ausgelegt. |
| MapLibre GL JS | WebGL-Rendering, flexible Kartenstile und gute Grundlage für umfangreiche Overlays sowie Vektor-Tiles. | Mehr Aufwand bei Einrichtung und Styling; WebGL und die gewählte Tile-Quelle müssen auf Zielgeräten getestet werden. |
| OpenLayers | Umfangreiche Funktionen und Formate; geeignet für anspruchsvolle Geodaten- und Interaktionsanforderungen. | Größere API- und Konfigurationsfläche als für die zunächst beschriebene Kartenansicht möglicherweise nötig. |

**Vorläufige Tendenz:** MapLibre GL JS als Kandidat für einen Prototyp, wenn Track-, Foto- und Heatmap-Overlays sowie wachsende Datenmengen im Vordergrund stehen. Leaflet bleibt die einfachere Alternative, falls Rasterkarten und eine möglichst geringe Komplexität ausreichen. OpenLayers ist vor allem dann interessant, wenn konkrete Anforderungen an Geodatenformate oder GIS-Funktionen hinzukommen. Noch keine Entscheidung.

### Kartenmaterial und Tile-Betrieb

| Option | Vorteile | Nachteile / Risiken |
|---|---|---|
| Öffentlicher OSM-Tile-Dienst | Einfacher Einstieg ohne eigenen Kartenserver. | Nutzungsbedingungen, Kapazität und Verfügbarkeit des konkreten Dienstes beachten; nicht ohne Prüfung als Produktionsdienst einplanen. |
| Gehosteter Tile-Anbieter | Kein eigener Tile-Betrieb; je nach Anbieter zusätzliche Stile und Betriebszusagen. | Nutzungsgrenzen, mögliche Kosten, Datenschutz und Offline-/On-Prem-Bedarf hängen vom Anbieter ab. |
| Eigener Tile-Server | Datenfluss und Verfügbarkeit on premise kontrollierbar; unabhängig von einem externen Karten-API-Anbieter. | Betrieb, Updates, Speicher, Ressourcenbedarf und Bereitstellung der Kartendaten liegen beim Projekt. |

Raster-Tiles sind der einfache gemeinsame Nenner und passen besonders gut zu Leaflet. Vektor-Tiles ermöglichen flexiblere, clientseitig gestaltbare Kartenstile und passen gut zu MapLibre; sie erhöhen aber die Anforderungen an Tile-Pipeline und Betrieb. Bibliothek und Tile-Quelle sollten daher getrennt entschieden werden.

### Noch zu entscheiden

- Ist der Zugriff auf externe Dienste in der Produktionsumgebung zulässig, oder muss die Karte vollständig on premise funktionieren?
- Ist ein eigener Tile-Betrieb im Projektumfang akzeptabel, oder soll zunächst ein gehosteter Dienst genutzt werden?
- Soll der Prototyp MapLibre GL JS mit einer Raster- und einer Vektor-Tile-Quelle vergleichen? Dabei Track-Darstellung, viele Foto-Marker, Touch-Bedienung und mobile Zielgeräte prüfen.
- Vor der Festlegung eines Tile-Anbieters dessen Nutzungsbedingungen, Attribution, Datenschutz, Kosten und Verfügbarkeit prüfen.
