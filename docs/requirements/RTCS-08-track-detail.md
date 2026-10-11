# RTCS-08 – Track-Detailansicht

**Kurzname:** track-detail
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Detailpanel zu einem ausgewählten Track mit Kennzahlen, Höhenprofil und einer Galerie der zugehörigen Fotos. Zentrale Ansicht zum „Nacherleben" einer einzelnen Aktivität.

## Anforderungen / Akzeptanzkriterien

- Anzeige von: Titel, Datum, Aktivitätsart, Distanz, Dauer, Auf-/Abstieg, Durchschnittstempo.
- Höhenprofil des Tracks.
- Galerie aller zugeordneten Fotos.
- Foto in der Galerie öffnet die Vollbildansicht (RTCS-09).
- Interaktion Höhenprofil ↔ Karte wünschenswert (Position auf dem Track hervorheben).
- Kennzeichnung der Foto-Zuordnungssicherheit (sicher/wahrscheinlich), konsistent mit RTCS-10.

## Abhängigkeiten

- RTCS-05 (Auswahl eines Tracks)
- RTCS-09 (Lightbox)
- RTCS-10 (Konfidenz-Kennzeichnung)
- Datengrundlage aus RTCS-15 (GPX-Import)

## Offene Punkte

- Umfang der Kennzahlen und Herleitung (aus GPX berechnet vs. aus Komoot übernommen).
