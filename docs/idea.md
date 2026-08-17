# Projektidee

## Vision

Ich möchte die GPS-Track von Aktivitäten meiner Familie (Wandern, Radfahren) anhand von Zeit und/oder Ort suchen und auf einer Karte betrachten können, einzeln oder mehrere gleichzeitig, optional inklusive der dabei aufgenommenen Fotos.

## Ausgangslage Daten

- eine Sammlung (ca. 1000) GPS Tracks von Wanderungen, Radfahrten etc., exportiert aus Komoot, jeweils mit Zeitstempel und Art der Aktivität, liegt aktuell als Sammlung von GPX-Dateien vor
- eine Sammlung von vielen (> 10.000) Fotos, in der Regel mit Geo-Tags, und Aufnahme-Zeitstempel, von denen eine Teilmenge während der getrackten Aktivitäten aufgenommen wurde. Liegen als JPG Dateien auf einem Server on premise vor

## Features

- primäres UI: Kartenansicht, 
- Einstieg: Dashboard mit Überblick, Statistiken
- Filter für Tracks nach 
    - Zeitraum, 
    - Art der Aktivität, 
    - Ort: aktuell dargestellter Kartenausschnitt, oder Suche
- Darstellung der Tracks als Wegzug auf der Karte, dazugehörige Fotos. 
    - offen: Was passiert, wenn mehrere Fotos so nahe beieinander liegen, dass sie sich überlappen. Mögliche Ansätze: Fotos erst nach Selektion eines Tracks und ausreichend Abstand, oder Fotos stapeln (oberstes Foto + Badge mit Anzahl)
    - offen: sollten Tracks, die nur teilweise in den aktuellen Kartenausschnitt passen, mit angezeigt werden?
- "smarte" Darstellung: Falls Tracks nur einen kleinen (genauer zu definieren) Teil des Kartenauschnitts abdecken, keine Darstellung des Wegzugs, statt dessen Marker/Badge, ggf. mit Anzahl der Tracks in einem Bereich

## Rahmenbedingungen

- Umsetzung als Webanwendung, Bedienung über Browser, Plattform Desktop + Mobile
- keine Lizenzkosten, also nur frei zugängliches Kartenmaterial als Grundlage
- geplante PROD-Umgebung: on premise, self host
- Daten (Tracks, Fotos) sollen nicht öffentlich geteilt werden
