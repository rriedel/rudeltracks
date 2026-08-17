# RTRCS-15 – GPX-Import

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
- Eindeutige, stabile Track-Identität für Wiederholungsläufe (siehe RTRCS-18).

## Abhängigkeiten

- Liefert Daten an: RTRCS-02, RTRCS-05, RTRCS-08, RTRCS-17
- Teil der Pipeline mit RTRCS-16, RTRCS-17, RTRCS-18

## Offene Punkte

- Ableitung der Kennzahlen aus GPX vs. Übernahme aus Komoot-Metadaten.
- Zielspeicher/Datenmodell (Umsetzungsphase).
