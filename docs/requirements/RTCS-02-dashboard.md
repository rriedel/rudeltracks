# RTCS-02 – Dashboard & Statistiken

**Kurzname:** dashboard
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Einstiegsseite mit Überblick und Statistiken über die gesammelten Aktivitäten. Bietet einen schnellen Gesamteindruck und Sprungpunkte in die Kartenansicht.

## Anforderungen / Akzeptanzkriterien

- Überblickskennzahlen, u. a.:
  - Anzahl Tracks gesamt und je Aktivitätsart
  - Gesamtdistanz und Gesamtdauer
  - Anzahl Fotos (gesamt / sicher zugeordnet / wahrscheinlich zugeordnet)
  - Zeitspanne der Daten (erste bis letzte Aktivität)
- Aufschlüsselung nach Aktivitätsart (z. B. Wandern vs. Radfahren).
- Einfache zeitliche Verteilung (z. B. Aktivitäten pro Jahr/Monat).
- Direkte Sprünge in Kartenansicht / gefilterte Sichten.

## Abhängigkeiten

- Datengrundlage aus der Import-Pipeline ([RTCS-15](RTCS-15-gpx-import.md), [RTCS-16](RTCS-16-photo-import.md), [RTCS-17](RTCS-17-photo-track-matching.md) und [RTCS-18](RTCS-18-incremental-sync.md))
- Verlinkt in: [RTCS-01](RTCS-01-map-view.md), [RTCS-03](RTCS-03-track-filter.md)

## Offene Punkte

- Konkrete Auswahl und Priorisierung der Kennzahlen.
- Umfang der Visualisierung (reine Zahlen vs. kleine Diagramme).
