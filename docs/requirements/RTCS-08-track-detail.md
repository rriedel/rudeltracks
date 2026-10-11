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
- Foto in der Galerie öffnet die Vollbildansicht ([RTCS-09](RTCS-09-photo-lightbox.md)).
- Interaktion Höhenprofil ↔ Karte wünschenswert (Position auf dem Track hervorheben).
- Kennzeichnung der Foto-Zuordnungssicherheit (sicher/wahrscheinlich), konsistent mit [RTCS-10](RTCS-10-photo-confidence-filter.md).

## Abhängigkeiten

- [RTCS-05](RTCS-05-track-rendering.md) (Auswahl eines Tracks)
- [RTCS-09](RTCS-09-photo-lightbox.md) (Lightbox)
- [RTCS-10](RTCS-10-photo-confidence-filter.md) (Konfidenz-Kennzeichnung)
- Datengrundlage aus [RTCS-15](RTCS-15-gpx-import.md) (GPX-Import)

## Offene Punkte

- Umfang der Kennzahlen und Herleitung (aus GPX berechnet vs. aus Komoot übernommen).
