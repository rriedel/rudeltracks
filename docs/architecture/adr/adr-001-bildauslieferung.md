# ADR-001: Foto- und Thumbnail-Auslieferung

- **Status:** Angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks verwaltet Originalfotos in einem bestehenden Dateisystem und
generiert Bildvarianten für Foto-Marker, Galerien und die Lightbox. Das
Frontend soll keine lokalen Dateipfade erhalten. Die Anwendung wird zunächst
On-Premise im lokalen Netz betrieben; eine Anwendungsanmeldung ist derzeit
nicht vorgesehen.

Für die Übertragung der Bilddateien stehen zwei betrachtete Varianten zur
Auswahl:

1. Das Backend löst die Datei kontrolliert auf und streamt sie an den Client.
2. Das Backend prüft die Anfrage und übergibt die Dateiübertragung über
   `X-Accel-Redirect` an einen vorgeschalteten Nginx.

## Entscheidung

Wir starten mit Variante 1: Das Backend liefert Originalfotos und generierte
Bildvarianten aus. Das Frontend adressiert Bilder über stabile Foto-IDs und
festgelegte Varianten, nicht über Dateisystempfade.

Variante 3 (Nginx mit `X-Accel-Redirect`) ist eine mögliche Ausbaustufe. Dabei
bleiben Auswahl der Datei und gegebenenfalls die Berechtigungsprüfung im
Backend; Nginx übernimmt nur die Übertragung der Datei. Der Wechsel erfolgt,
wenn Messungen zeigen, dass die Bildübertragung das Backend relevant belastet
oder ein konkreter Betriebsbedarf die Trennung rechtfertigt.

## Begründung

- Der aktuelle On-Premise-Einsatz und die erwartete Nutzung rechtfertigen
  zunächst den einfacheren Betriebs- und Deployment-Aufbau ohne zusätzlichen
  Reverse Proxy.
- Backend-seitiges Streaming hält die Zuordnung von Foto-ID zu Datei und die
  Fehlerbehandlung an einem Ort. Es vermeidet eine zusätzliche Abstimmung von
  Anwendung, Nginx-Routen, Dateisystem-Mounts und Berechtigungen.
- Die Sammlung von mehr als 10.000 Fotos begründet für sich allein keinen
  separaten Auslieferungsdienst. Entscheidend sind tatsächliche
  Abrufmuster, Dateigrößen und gemessene Last.
- Die Ausbaustufe ist möglich, ohne die Frontend-URLs oder die fachliche
  Auswahl der Bildvariante zu ändern. Sie kann daher bei nachgewiesenem Bedarf
  umgesetzt werden, statt Nginx-Komplexität vorab einzuführen.

## Konsequenzen

- Das Backend muss die zulässige Foto-ID und Variante auf eine verwaltete
  Datei abbilden, die Datei sicher öffnen und den Inhalt streamen. Lokale
  Dateipfade werden nicht an den Client gegeben.
- Bildgrößen, konkrete API-Routen, Cache-Header und Fehlerantworten werden im
  Umsetzungsdesign festgelegt.
- Die Implementierung soll Übertragungen streamen, statt ganze Dateien in den
  Anwendungsspeicher zu laden.
- Bei Variante 3 muss das Backend weiterhin die Anfrage prüfen und darf nur
  einen kontrollierten internen Zielpfad an Nginx übergeben. Die interne
  Nginx-Route darf nicht direkt von außen erreichbar sein. Nginx übernimmt
  dann den Datei-Body und gegebenenfalls geeignete Datei- und Cache-Header.
- Die spätere Ausbaustufe erfordert zusätzliche Konfiguration und Tests des
  Zusammenspiels von Backend, Nginx und Dateisystem. Sie ist nicht Teil des
  initialen Umfangs.

## Überprüfung

Die Entscheidung wird überprüft, wenn Last- oder Antwortzeitmessungen,
Ressourcenverbrauch oder beobachtete Fehler zeigen, dass die Bildübertragung
die API oder die Bedienung relevant beeinträchtigt. Eine Umstellung sollte
anhand repräsentativer gleichzeitiger Bildabrufe validiert werden.
