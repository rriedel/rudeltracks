# RTCS-04 – Ortssuche / Geocoding

**Kurzname:** location-search
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Suche nach Orten (Adresse, Ortsname, POI), um die Karte an eine gewünschte Stelle zu bewegen bzw. Tracks in einer Region zu finden. Geocoding über einen frei zugänglichen, self-host-fähigen Dienst.

## Anforderungen / Akzeptanzkriterien

- Eingabefeld für Ortssuche mit Ergebnisliste.
- Auswahl eines Ergebnisses zentriert/zoomt die Karte auf den Ort.
- Autocomplete / Type-ahead beim Tippen (bevorzugt).
- Toleranz gegenüber Tippfehlern (Fuzzy-Suche, bevorzugt).
- Geocoder ohne Lizenzkosten und self-host-fähig.

## Technische Vorüberlegung

- **Photon** (OSM-basiert, von Komoot) – bevorzugt wegen Autocomplete + Fuzzy-Suche.
- **Nominatim** (OSM) – solider Fallback, vollständige Adress-/POI-Suche.
- Pelias – zu schwergewichtig für den Projektumfang.

## Abhängigkeiten

- RTCS-01 (Karte)
- RTCS-03 (Ort als Filterdimension)

## Offene Punkte

- Endgültige Wahl Photon vs. Nominatim (Umsetzungsphase).
- Hosting des Geocoders (eigener Dienst vs. reduzierter Datenumfang).
