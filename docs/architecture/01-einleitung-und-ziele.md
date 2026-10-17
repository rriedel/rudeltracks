# 1. Einleitung und Ziele

## Aufgabenstellung

### Vision

Ich möchte die GPS-Track von Aktivitäten meiner Familie (Wandern, Radfahren) anhand von Zeit und/oder Ort suchen und auf einer Karte betrachten können, einzeln oder mehrere gleichzeitig, optional inklusive der dabei aufgenommenen Fotos.

### Ausgangslage Daten

- eine Sammlung (ca. 1000) GPS Tracks von Wanderungen, Radfahrten etc., jeweils mit Zeitstempel und Art der Aktivität
    - liegt aktuell als Sammlung von GPX-Dateien vor
    - kann künftig via API (von Komoot, Strave) extrahiert werden
- eine Sammlung von vielen (> 10.000) Fotos, in der Regel mit Geo-Tags, und Aufnahme-Zeitstempel, von denen eine Teilmenge während der getrackten Aktivitäten aufgenommen wurde. Liegen als JPG Dateien auf einem Server on premise vor

### Features 

- primäres UI: Kartenansicht
- Einstieg: Dashboard mit Überblick, Statistiken
- Filter für Tracks nach 
    - Zeitraum, 
    - Art der Aktivität, 
    - Ort: aktuell dargestellter Kartenausschnitt, oder Suche
- Darstellung der Tracks als Wegzug auf der Karte, inkl. Fotos auf oder in unmittelbarer Nähe des Wegzugs 
- "smarte" Darstellung: Falls Tracks nur einen kleinen (genauer zu definieren) Teil des Kartenauschnitts abdecken, keine Darstellung des Wegzugs, statt dessen Marker/Badge, ggf. mit Anzahl der Tracks in einem Bereich
- permanente Updates: Sowohl GPS Tracks als auch Fotos werden laufend aktualisiert, die Datengrundlage für die dargestellten Tracks muss also permanent angepasst werden

### Offene Punkte

- offen: Was passiert, wenn mehrere Fotos so nahe beieinander liegen, dass sie sich überlappen. Mögliche Ansätze: Fotos erst nach Selektion eines Tracks und ausreichend Abstand, oder Fotos stapeln (oberstes Foto + Badge mit Anzahl)
- offen: sollten Tracks, die nur teilweise in den aktuellen Kartenausschnitt passen, mit angezeigt werden?

## Qualitätsziele

- Extraktion von Tracks aus Aktivitäten von Komoot und Strava muss möglich sein, mindestens offline (auf Basis von manuell extrahierten Dateien), besser online (auf Basis der Anbieter-APIs)
- Suche und Filter in Echtzeit: Es muss möglich sein, interaktiv Filter (Kartenausschnitt, Zeitraum, ...) auszuwählen und die passenden Tracks incl. Fotos anzuzeigen (Wartezeit max. 300ms)
- flüssige Karten-Navigation (Verschieben, Zoomen), für Nutzer wahrnehmbare Wartezeiten sollen soweit möglich vermieden werden

## Stakeholder

Das Rudel