# ADR-003: Persistenz

- **Status:** Vorläufig angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks verwaltet Tracks mit Geometrien sowie Foto-Metadaten und deren
Zuordnungen zu Tracks. Originalfotos liegen bereits in einem bestehenden
Dateisystem. Für räumliche Abfragen und den Betrieb der Anwendung wird eine
Persistenzlösung benötigt, die diese Daten und Dateien gemeinsam berücksichtigt.

Die Lösungsstrategie sieht einen On-Premise-Betrieb mit Docker Compose vor.
Das bestehende Backup-Verfahren deckt nach aktuellem Kenntnisstand die
Datenbank und Docker-Volumes ab. Die konkrete Sicherungs- und
Wiederherstellungsprozedur ist noch nicht festgelegt.

## Entscheidung

Wir legen PostgreSQL mit PostGIS vorläufig als Datenbank fest. Die Datenbank
wird als eigener Container im Docker-Compose-Stack betrieben und speichert
Tracks, Track-Geometrien, Foto-Metadaten sowie Foto-Track-Zuordnungen.

Originalfotos verbleiben im bestehenden Dateisystem; die Datenbank speichert
ihre Referenzen und Metadaten, nicht die Originaldateien. Thumbnails werden als
Dateien neben den verwalteten Anwendungsdaten abgelegt; ihre Referenzen liegen
in der Datenbank.

## Begründung

- PostGIS ergänzt PostgreSQL um räumliche Datentypen und Abfragen, die für
  Track-Geometrien benötigt werden.
- Die Trennung von Datenbank und Originalfotos erhält die vorhandene Ablage der
  Fotos und vermeidet, große Originaldateien in der Datenbank zu speichern.
- Die Ablage von Thumbnails als Anwendungsdateien hält die generierten
  Bilddateien außerhalb der Datenbank, während ihre Zuordnung über Referenzen
  in der Datenbank erfolgt.
- Ein separater Datenbankcontainer passt zum vorgesehenen Docker-Compose-
  Betrieb der Anwendung.

## Konsequenzen

- Das konkrete Datenmodell sowie räumliche und zeitliche Indizes werden im
  Umsetzungsdesign festgelegt.
- Die Anwendung muss Foto- und Thumbnail-Referenzen zuverlässig auf die
  verwalteten Dateien abbilden. Originalfotos dürfen nicht allein durch
  Datenbank-Backups als gesichert gelten.
- Der kontrollierte Zugriff auf Originalfotos sowie eine getestete Sicherungs-
  und Wiederherstellungsprozedur für Datenbank und verwaltete Dateien bleiben
  auszuarbeiten.
- Die Wahl ist vorläufig. Eine Änderung ist möglich, falls Umsetzungsdesign,
  Betriebsanforderungen oder Backup- und Wiederherstellungstests die Richtung
  nicht bestätigen.

## Überprüfung

Die vorläufige Festlegung wird im Umsetzungsdesign und vor dem produktiven
Betrieb anhand der räumlichen und zeitlichen Abfragen, der Datenmengen sowie
der getesteten Sicherungs- und Wiederherstellungsprozedur überprüft.
