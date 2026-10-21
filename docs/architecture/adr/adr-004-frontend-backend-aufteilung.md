# ADR-004: Frontend- und Backend-Aufteilung

- **Status:** Vorläufig angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks benötigt eine klare Aufteilung zwischen browserseitiger Oberfläche
und serverseitigen Diensten. Neben der Karten- und Suchoberfläche umfasst der
Betrieb den Zugriff auf Datenbank und Dateisystem sowie eine serverseitige
Importverarbeitung für Fotodateien und Track-Daten.

Die Anwendung wird On-Premise betrieben. Für die Persistenz ist PostgreSQL mit
PostGIS vorgesehen (siehe ADR-003), und die Bildauslieferung erfolgt zunächst
über das Backend (siehe ADR-001).

## Entscheidung

Wir legen vorläufig folgende Aufteilung fest:

- Das Frontend ist für Benutzeroberfläche, Kartenansicht und Interaktionen im
  Browser zuständig.
- Ein serverseitiges Backend stellt Such- und Detaildaten über eine API bereit
  und kapselt den Zugriff auf Datenbank und Dateisystem. Der Browser greift
  nicht direkt auf PostgreSQL oder lokale Dateipfade zu.
- Ein Anwendungsdienst liefert zunächst sowohl das gebaute Frontend als auch
  die API aus. PostgreSQL/PostGIS bleibt ein separater Dienst.
- Die Importverarbeitung läuft serverseitig.

## Begründung

- Die Trennung von UI und serverseitigem Datenzugriff reduziert direkte
  Kopplung zwischen Browser, Datenbank und Dateisystem.
- Ein gemeinsamer Anwendungsdienst für Frontend und API hält die initiale
  Betriebs- und Deployment-Struktur einfach.
- Serverseitige Importverarbeitung passt zum unregelmäßigen Eintreffen externer
  Datenquellen und ermöglicht kontrollierte Verarbeitungsschritte.

## Konsequenzen

- API-Schnittstellen für Such-, Detail- und Importfunktionen sind verbindlich
  zu definieren und zwischen Frontend und Backend abzustimmen.
- Neue Fotodateien sollen möglichst per Dateisystem-Watcher erkannt werden; für
  Tracks sind Strava- und Komoot-APIs bevorzugte Quellen.
- Für Track-Abrufe müssen Auslöser bzw. Abrufrhythmen sowie Autorisierung und
  mögliche automatische Erneuerung der Zugriffsberechtigung festgelegt werden.
- Beim Foto-Watcher ist sicherzustellen, dass Dateien erst verarbeitet werden,
  wenn sie vollständig übertragen wurden.

## Überprüfung

Die vorläufige Festlegung wird im Umsetzungsdesign anhand der API-Gestaltung,
des Importbetriebs und der Betriebsstabilität überprüft. Eine Anpassung ist
möglich, falls sich für Deployment, Importlast oder Integrationen ein anderes
Ausführungsmodell als zweckmäßiger erweist.
