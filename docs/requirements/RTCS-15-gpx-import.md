# RTCS-15 – GPX-Import

**Kurzname:** gpx-import
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Einlesen der aus Komoot exportierten GPX-Dateien (~1000) in den Datenbestand der Anwendung. Extraktion von Metadaten und Geometrie als Grundlage für Karte, Filter und Detailansicht.

## Anforderungen / Akzeptanzkriterien

- Rekursives Einlesen von GPX-Dateien aus einem konfigurierten Quellverzeichnis.
- Extraktion je Track:
  - Titel
  - Aktivitätsart
  - Start-/Endzeitpunkt (Zeitstempel)
  - Geometrie (Track-Punkte)
  - Abgeleitete Kennzahlen: Distanz, Dauer, Auf-/Abstieg (soweit berechenbar)
- Robuste Behandlung fehlerhafter/unvollständiger GPX-Dateien (überspringen + protokollieren, kein Abbruch des Gesamtlaufs).
- Eindeutige, stabile Track-Identität für Wiederholungsläufe (siehe [RTCS-18](RTCS-18-incremental-sync.md)).

## Abhängigkeiten

- Liefert Daten an: [RTCS-02](RTCS-02-dashboard.md), [RTCS-05](RTCS-05-track-rendering.md), [RTCS-08](RTCS-08-track-detail.md), [RTCS-17](RTCS-17-photo-track-matching.md)
- Teil der Pipeline mit [RTCS-16](RTCS-16-photo-import.md), [RTCS-17](RTCS-17-photo-track-matching.md), [RTCS-18](RTCS-18-incremental-sync.md)

## Offene Punkte

- Ableitung der Kennzahlen aus GPX vs. Übernahme aus Komoot-Metadaten.
- Zielspeicher/Datenmodell (Umsetzungsphase).
