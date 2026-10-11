# RTCS-19 – Inkrementelle Update-Läufe

**Kurzname:** incremental-sync
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Betriebsmodell der Import-Pipeline: ein längerer initialer Voll-Lauf, danach regelmäßige inkrementelle Update-Läufe. Wiederholte Läufe sind idempotent und verändern bestehende, unveränderte Daten nicht.

## Anforderungen / Akzeptanzkriterien

- **Initial-Lauf:** vollständige Verarbeitung aller vorhandenen GPX- und Foto-Dateien.
- **Update-Läufe:** verarbeiten nur neue oder geänderte Dateien.
- Idempotenz: erneuter Lauf über unveränderte Daten erzeugt keine Duplikate und keine ungewollten Änderungen.
- Erkennung neuer/geänderter/entfernter Quelldateien.
- Neu importierte Fotos/Tracks lösen bei Bedarf ein erneutes Matching aus ([RTCS-18](RTCS-18-photo-track-matching.md)).
- Protokollierung der Läufe (verarbeitet / übersprungen / Fehler).

## Abhängigkeiten

- Steuert Ausführung von: [RTCS-16](RTCS-16-gpx-import.md), [RTCS-17](RTCS-17-photo-import.md), [RTCS-18](RTCS-18-photo-track-matching.md)

## Offene Punkte

- Auslösung der Update-Läufe (manuell, zeitgesteuert, Watcher) – Umsetzungsphase.
- Änderungserkennung (Zeitstempel, Hash, Dateiliste) – Umsetzungsphase.
