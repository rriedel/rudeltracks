# 4. Lösungsstrategie

## Technologieentscheidungen

- Foto- und Thumbnail-Auslieferung: zunächst über das Backend anhand stabiler Foto-IDs und festgelegter Varianten; Details siehe [ADR-001](adr/adr-001-bildauslieferung.md)
- Kartenmaterial: vorläufig externe Vektor-Tile-Dienste; Details siehe [ADR-002](adr/adr-002-kartenkacheln.md)
- Persistenz: vorläufig PostgreSQL/PostGIS; Details siehe [ADR-003](adr/adr-003-persistenz.md)
- Frontend-/Backend-Aufteilung und serverseitige Importverarbeitung: vorläufig festgelegt; Details siehe [ADR-004](adr/adr-004-frontend-backend-aufteilung.md)
- Zugriff: zunächst ohne Anwendungsanmeldung im lokalen Netz, kein Fernzugriff; Details siehe [ADR-005](adr/adr-005-zugriff.md)
- Techstack Frontend (Browser): React, TypeScript und Vite mit TanStack Router, TanStack Query, Orval und MapLibre GL JS als clientseitige SPA; Details siehe [ADR-006](adr/adr-006-frontend-techstack.md)
- Techstack Backend: Java mit Quarkus als vorläufige Entscheidung; Details siehe [ADR-007](adr/adr-007-backend-techstack.md)
- ELT-Pipeline für Import von Track-Daten und Foto-Metadaten

## Offene Punkte

| Thema | Zu klärende Fragen |
|---|---|
| Kartenkacheln und Geocoding | Vorläufige Festlegung: externe Vektor-Tile-Dienste (siehe [ADR-002](adr/adr-002-kartenkacheln.md)). Anbieter- und Tarifwahl, Nutzungsbedingungen, Attribution, Aktualisierung und Datenschutz bleiben zu klären. Geocoding einschließlich Dienst und Betriebsmodell ist weiterhin offen. |
| Datenhaltung | Vorläufige Festlegung: PostgreSQL/PostGIS und die groben Ablageorte (siehe [ADR-003](adr/adr-003-persistenz.md)). Datenmodell und Indizes werden im Umsetzungsdesign festgelegt; Sicherungs- und Wiederherstellungsprozedur sowie kontrollierter Zugriff auf Originalfotos bleiben zu klären. |
| Frontend-/Backend-Aufteilung | Entscheidung und offene Umsetzungsdetails siehe [ADR-004](adr/adr-004-frontend-backend-aufteilung.md). |
| Importbetrieb und Fehlerbehandlung | Fotodateien sollen möglichst per Watcher erkannt werden; Tracks sollen über Strava- und Komoot-APIs bezogen werden. Einmalige interaktive Autorisierung ist akzeptabel, spätere Abrufe sollen möglichst automatisch erfolgen. API-Möglichkeiten, Abrufauslöser und -rhythmus, Anbieterlimits, Erkennung vollständig übertragener Fotos sowie Fehlerbehandlung und erneutes Matching sind noch zu klären. |
| Betrieb und Wiederherstellung | Anwendung und Datenbank sollen per Docker Compose auf dem On-Premise-Server betrieben werden. Update- und Konfigurationsprozess sowie konkrete Sicherungs- und Wiederherstellungstests sind noch zu klären. |
| Qualitätsziele | Welche messbaren Erwartungen gelten für Such- und Ladezeiten, Importdauer und unterstützte Mobilgeräte bei der vorgesehenen Datenmenge? |

## Top-Level-Zerlegung

-

## Erfüllung der Qualitätsziele

TBD

## Organisatorische Entscheidungen
