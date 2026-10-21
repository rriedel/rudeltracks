# ADR-007: Backend-Techstack

- **Status:** Vorläufig angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks benötigt ein Backend für die Browser-API, den Zugriff auf
PostgreSQL/PostGIS sowie serverseitige Importverarbeitung für Track-Daten und
Foto-Metadaten (siehe [ADR-003](adr-003-persistenz.md) und
[ADR-004](adr-004-frontend-backend-aufteilung.md)). Das Backend soll zusammen
mit der Datenbank per Docker Compose auf einem On-Premise-Server betrieben
werden.

Erfahrung ist mit Java, Spring und Quarkus sowie mit Python und FastAPI
vorhanden. Für die Entwicklungsumgebung ist eine gute Developer Experience
wichtig, insbesondere Live Reload und schnelle Feedback- bzw. Startzeiten.
Quarkus Dev Mode ist aus eigener Erfahrung bekannt. Spring Boot bleibt eine
grundsätzlich geeignete Alternative, seine Developer Experience ist jedoch
weniger aktuell vertraut.

## Entscheidung

Java mit Quarkus wird als vorläufiger Backend-Techstack gewählt. Die
Entwicklung soll Quarkus Dev Mode für Live Reload und den schnellen
Entwicklungszyklus nutzen. Die konkrete Auswahl der Quarkus-Erweiterungen,
der API- und Persistenzbibliotheken sowie des Build- und Deployment-Modus
bleibt dem Umsetzungsdesign vorbehalten.

## Begründung

- Quarkus ist aus eigener Erfahrung mit einer guten Developer Experience
  vertraut und unterstützt den gewünschten Live-Reload- und Feedback-Zyklus.
- Java passt zum vorhandenen Erfahrungswissen und bietet eine konsistente
  Sprache für API und serverseitige Importverarbeitung.
- Quarkus deckt die Anforderungen an ein API-Backend und den Betrieb im
  vorgesehenen Docker-Compose-Setup ab.
- Spring Boot und FastAPI sind valide Alternativen, bieten für die aktuellen
  Anforderungen aber keinen ausreichend gewichtigen Vorteil, um den Wechsel
  bzw. den Einsatz eines anderen Sprachstacks zu begründen.

## Konsequenzen

- Backend-API und Importverarbeitung werden zunächst in Java umgesetzt.
- Der API-Vertrag soll OpenAPI bereitstellen, damit das Frontend den in
  [ADR-006](adr-006-frontend-techstack.md) vorgesehenen Orval-Workflow nutzen
  kann.
- Für die Entwicklung wird Quarkus Dev Mode genutzt; der Backend-Prozess soll
  dabei unabhängig von Datenbank und benötigten Infrastrukturdiensten lokal
  oder in einer dafür geeigneten Entwicklungsumgebung laufen können.
- Die Entscheidung legt weder den Einsatz nativer Images noch konkrete
  Build-, Persistenz- oder Migrationsbibliotheken fest.
- Die Wahl bleibt vorläufig, bis ein kleiner Umsetzungsprototyp den
  Entwicklungszyklus, die Integration mit PostgreSQL/PostGIS und den
  Docker-Compose-Betrieb bestätigt hat.

## Überprüfung

Die Entscheidung wird anhand eines Prototyps mit einer repräsentativen
API-Funktion, Datenbankzugriff und einem typischen Importpfad überprüft.
Dabei werden Live Reload, Entwicklungsstart und der Betriebsablauf mit
Docker Compose praktisch validiert. Sie wird erneut bewertet, falls Quarkus
die Anforderungen an Developer Experience, Integration oder Betrieb nicht
erfüllt oder konkrete Messwerte einen anderen Stack nahelegen.
