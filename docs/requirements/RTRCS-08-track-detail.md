# RTRCS-08 – Track-Detailansicht

**Kurzname:** track-detail
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Detailpanel zu einem ausgewählten Track mit Kennzahlen, Höhenprofil und einer Galerie der zugehörigen Fotos. Zentrale Ansicht zum „Nacherleben" einer einzelnen Aktivität.

## Anforderungen / Akzeptanzkriterien

- Anzeige von: Titel, Datum, Aktivitätsart, Distanz, Dauer, Auf-/Abstieg, Durchschnittstempo.
- Höhenprofil des Tracks.
- Galerie aller zugeordneten Fotos.
- Foto in der Galerie öffnet die Vollbildansicht (RTRCS-09).
- Interaktion Höhenprofil ↔ Karte wünschenswert (Position auf dem Track hervorheben).
- Kennzeichnung der Foto-Zuordnungssicherheit (sicher/wahrscheinlich), konsistent mit RTRCS-10.

## Abhängigkeiten

- RTRCS-05 (Auswahl eines Tracks)
- RTRCS-09 (Lightbox)
- RTRCS-10 (Konfidenz-Kennzeichnung)
- Datengrundlage aus RTRCS-15 (GPX-Import)

## Offene Punkte

- Umfang der Kennzahlen und Herleitung (aus GPX berechnet vs. aus Komoot übernommen).
