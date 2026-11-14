# 8. Querschnittliche Konzepte

## Fachliche Konzepte

## Architektur- und Entwurfsmuster

## Sicherheit und Datenschutz

## Persistenz und Datenhaltung

- Datenmodell (Entwurf): [Datenmodell](../implementation/data_model.md)
- Tracks werden in mehreren Generalisierungsstufen vorberechnet:
  [Generalisierung](../implementation/activities.md#generalisierung)
- Stabile UUIDs für Aktivitäten und Fotos; Wiederholungsläufe ordnen über einen
  fachlichen Schlüssel zu (`source_key`, Hash der Trackpunkte bzw. Anbieter-ID)
- Importe abstrahieren von der Herkunft: Quellen (Verzeichnis, später Komoot
  und Strava) liefern Quellobjekte, deren Änderungen einheitlich erkannt und
  protokolliert werden

## Fehlerbehandlung und Protokollierung

## Test und Qualitätssicherung
