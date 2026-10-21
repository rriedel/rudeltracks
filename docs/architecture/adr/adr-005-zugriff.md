# ADR-005: Zugriff

- **Status:** Vorläufig angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks wird zunächst On-Premise innerhalb des lokalen Netzes betrieben.
Die Anwendung stellt unter anderem Tracks und Fotos bereit. Fernzugriff ist
für den aktuellen Betriebsumfang nicht geplant.

## Entscheidung

Der Zugriff auf die Anwendung wird innerhalb des lokalen Netzes vorerst nicht
eingeschränkt. Eine Anwendungsanmeldung ist zunächst nicht vorgesehen.
Fernzugriff ist vorerst nicht Teil des Betriebsumfangs.

## Begründung

Der zunächst auf das lokale Netz begrenzte Betrieb ermöglicht einen einfachen
Zugriff ohne zusätzliche Anwendungsanmeldung. Diese Festlegung gilt nur für
den aktuellen Betriebsumfang und ist keine Freigabe für Fernzugriff.

## Konsequenzen

- Wer die Anwendung im lokalen Netz erreichen kann, benötigt keine Anmeldung.
  Die Anwendung unterscheidet damit nicht anhand einer Anmeldung zwischen
  zugreifenden Personen; dies ist insbesondere für Tracks und Fotos zu
  berücksichtigen.
- Der Betrieb muss auf den vorgesehenen lokalen Zugriff begrenzt bleiben.
  Eine Bereitstellung für Fernzugriff ist von dieser Entscheidung nicht
  gedeckt.
- Der Verzicht auf eine Anwendungsanmeldung hebt den kontrollierten Zugriff
  des Backends auf Dateien nicht auf; siehe
  [ADR-001: Foto- und Thumbnail-Auslieferung](adr-001-bildauslieferung.md).

## Überprüfung

Falls Fernzugriff benötigt wird oder sich der Betriebsumfang ändert, müssen
Zugriffsschutz und Datenschutz vor der Änderung neu bewertet werden. Die
vorläufige Festlegung ist dann entsprechend zu überprüfen und anzupassen.
