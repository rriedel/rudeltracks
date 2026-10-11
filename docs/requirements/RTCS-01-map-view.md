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
- Der aktuell sichtbare Kartenausschnitt ist als Kontext für Filter (siehe RTCS-03) abrufbar.

## Abhängigkeiten

- Basis für: RTCS-05, RTCS-06, RTCS-07, RTCS-12, RTCS-13

## Offene Punkte

- Auswahl der konkreten Map-Library (Umsetzungsphase).
- Tile-Quelle: gehostete OSM-Tiles vs. eigener Tile-Server.
