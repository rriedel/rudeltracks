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
- Eindeutige, stabile Track-Identität für Wiederholungsläufe (siehe RTCS-18).

## Abhängigkeiten

- Liefert Daten an: RTCS-02, RTCS-05, RTCS-08, RTCS-17
- Teil der Pipeline mit RTCS-16, RTCS-17, RTCS-18

## Offene Punkte

- Ableitung der Kennzahlen aus GPX vs. Übernahme aus Komoot-Metadaten.
- Zielspeicher/Datenmodell (Umsetzungsphase).
