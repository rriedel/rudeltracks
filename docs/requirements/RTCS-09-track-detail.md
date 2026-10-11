# RTCS-09 – Track-Detailansicht

**Kurzname:** track-detail
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Detailpanel zu einem ausgewählten Track mit Kennzahlen, Höhenprofil und einer Galerie der zugehörigen Fotos. Zentrale Ansicht zum „Nacherleben" einer einzelnen Aktivität.

## Anforderungen / Akzeptanzkriterien

- Anzeige von: Titel, Datum, Aktivitätsart, Distanz, Dauer, Auf-/Abstieg, Durchschnittstempo.
- Höhenprofil des Tracks.
- Galerie aller zugeordneten Fotos.
- Foto in der Galerie öffnet die Vollbildansicht ([RTCS-10](RTCS-10-photo-lightbox.md)).
- Interaktion Höhenprofil ↔ Karte wünschenswert (Position auf dem Track hervorheben).
- Kennzeichnung der Foto-Zuordnungssicherheit (sicher/wahrscheinlich), konsistent mit [RTCS-11](RTCS-11-photo-confidence-filter.md).

## Abhängigkeiten

- [RTCS-05](RTCS-05-track-rendering.md) (Auswahl eines Tracks)
- [RTCS-10](RTCS-10-photo-lightbox.md) (Lightbox)
- [RTCS-11](RTCS-11-photo-confidence-filter.md) (Konfidenz-Kennzeichnung)
- Datengrundlage aus [RTCS-16](RTCS-16-gpx-import.md) (GPX-Import)
- Aufruf durch Track-Auswahl in [RTCS-06](RTCS-06-track-list-view.md) (Track-Liste)

## Offene Punkte

- Umfang der Kennzahlen und Herleitung (aus GPX berechnet vs. aus Komoot übernommen).
