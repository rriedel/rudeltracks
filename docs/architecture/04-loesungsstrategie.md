# 4. Lösungsstrategie

## Technologieentscheidungen

- Kartenmaterial: Tile-Server selbst hosten public service: ??
- Persistenz: vorläufig PostgreSQL/PostGIS; Details siehe „Vorläufige Richtung: Datenspeicherung“
- Techstack Frontend (Browser)
- Techstack Backend 
- ELT-Pipeline für Import von Track-Daten und Foto-Metadaten

### Vorläufige Richtung: Datenspeicherung

Die folgenden Punkte sind eine vorläufige Architektur-Richtung und noch keine
verbindliche Technologieentscheidung:

- PostgreSQL mit PostGIS soll als eigener Container im Docker-Compose-Stack
  zusammen mit der Anwendung betrieben werden.
- Tracks, Track-Geometrien, Foto-Metadaten und Foto-Track-Zuordnungen sollen in
  der Datenbank gespeichert werden.
- Originalfotos bleiben im bestehenden Dateisystem; die Datenbank speichert
  Referenzen und Metadaten, nicht die Originaldateien.
- Thumbnails sollen als Dateien neben den verwalteten Anwendungsdaten abgelegt
  werden; in der Datenbank werden ihre Referenzen gespeichert.
- Das bestehende Backup-Verfahren deckt nach aktuellem Stand die Datenbank und
  die Docker-Volumes ab.

Das konkrete Datenmodell und die räumlichen bzw. zeitlichen Indizes bleiben dem
Umsetzungsdesign vorbehalten. Auch der kontrollierte Zugriff auf Originalfotos
sowie die konkrete Sicherungs- und Wiederherstellungsprozedur sind noch zu
klären.

### Zurückgestellt: Foto- und Thumbnail-Auslieferung

Die grundsätzliche Auslieferungsstrategie für Originalfotos und Thumbnails wird
bewusst zurückgestellt.

Bewertungskriterien für die spätere Entscheidung:

- Schutz der Originaldateien (keine direkten Dateipfade im Browser)
- Einfachheit der Betriebs- und Deployment-Struktur
- Caching-Verhalten und erwartete Performance auf Mobilgeräten
- Nachvollziehbarkeit von Zugriffen und Fehlerfällen
- Konsistenz mit dem On-Premise-Betrieb und bestehendem Backup-Verfahren

### Vorläufige Richtung: Frontend- und Backend-Aufteilung

- Das Frontend ist für Benutzeroberfläche, Kartenansicht und Interaktionen im
  Browser zuständig.
- Ein serverseitiges Backend stellt Such- und Detaildaten über eine API bereit
  und kapselt den Zugriff auf Datenbank und Dateisystem. Der Browser greift
  nicht direkt auf PostgreSQL oder lokale Dateipfade zu.
- Ein Anwendungsdienst soll zunächst sowohl das gebaute Frontend als auch die
  API ausliefern. PostgreSQL/PostGIS bleibt ein separater Dienst.
- Die Importverarbeitung läuft serverseitig. Neue Fotodateien sollen wegen
  ihres unregelmäßigen externen Eintreffens möglichst per Dateisystem-Watcher
  erkannt werden.
- Tracks sollen nach Möglichkeit über APIs von Strava und Komoot bezogen
  werden. Erforderliche Autorisierung und Möglichkeiten zur automatischen
  Erneuerung der Zugriffsberechtigung müssen noch geprüft werden.
- Eine einmalige interaktive Autorisierung ist akzeptabel, wenn danach
  möglichst automatische API-Abrufe möglich sind.
- Foto-Watcher und Track-API-Abrufe benötigen unterschiedliche Auslöser. Der
  Auslöser bzw. Abrufrhythmus für Tracks ist noch offen. Beim Foto-Watcher ist
  außerdem sicherzustellen, dass eine Datei vollständig übertragen wurde,
  bevor sie verarbeitet wird.

### Vorläufige Richtung: Zugriff

- Der Zugriff auf die Anwendung wird innerhalb des lokalen Netzes vorerst nicht
  eingeschränkt; eine Anwendungsanmeldung ist zunächst nicht vorgesehen.
- Fernzugriff ist vorerst nicht geplant. Falls er später benötigt wird, müssen
  Zugriffsschutz und Datenschutz dafür neu bewertet werden.

## Offene Punkte

| Thema | Zu klärende Fragen |
|---|---|
| Kartenkacheln und Geocoding | Selbst gehostete oder externe Dienste? Welche Auswirkungen haben Nutzungsbedingungen, Attribution, Kosten, Aktualisierung und die Übermittlung angefragter Kartenausschnitte? |
| Datenhaltung | Datenbankwahl und grobe Ablageorte sind vorläufig eingegrenzt. Datenmodell und Indizes werden im Umsetzungsdesign festgelegt. |
| Foto- und Thumbnail-Auslieferung | Entscheidung zurückgestellt. Offene Fragen: sichere Bereitstellung, Pfadbegrenzung, Caching, Umgang mit fehlenden Dateien und Betriebsaufwand der gewählten Variante. |
| Frontend-/Backend-Aufteilung | Die grobe Verantwortungsverteilung und gemeinsame Auslieferung von Frontend und API sind vorläufig festgehalten. Konkrete API-Schnittstellen und das Ausführungsmodell der serverseitigen Import-Pipeline bleiben offen. |
| Importbetrieb und Fehlerbehandlung | Fotodateien sollen möglichst per Watcher erkannt werden; Tracks sollen über Strava- und Komoot-APIs bezogen werden. Einmalige interaktive Autorisierung ist akzeptabel, spätere Abrufe sollen möglichst automatisch erfolgen. API-Möglichkeiten, Abrufauslöser und -rhythmus, Anbieterlimits, Erkennung vollständig übertragener Fotos sowie Fehlerbehandlung und erneutes Matching sind noch zu klären. |
| Zugriff und Datenschutz | Kein Zugriffsschutz innerhalb des lokalen Netzes vorgesehen; Fernzugriff ist nicht geplant. Bei einer späteren Änderung des Betriebsumfangs sind Zugriffsschutz und Datenschutz neu zu bewerten. |
| Betrieb und Wiederherstellung | Anwendung und Datenbank sollen per Docker Compose auf dem On-Premise-Server betrieben werden. Update- und Konfigurationsprozess sowie konkrete Sicherungs- und Wiederherstellungstests sind noch zu klären. |
| Qualitätsziele | Welche messbaren Erwartungen gelten für Such- und Ladezeiten, Importdauer und unterstützte Mobilgeräte bei der vorgesehenen Datenmenge? |

## Top-Level-Zerlegung

-

## Erfüllung der Qualitätsziele

TBD

## Organisatorische Entscheidungen
