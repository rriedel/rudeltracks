# RTCS-10 – Foto-Vollbildansicht / Lightbox

**Kurzname:** photo-lightbox
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Vollbild-Ansicht einzelner Fotos mit Navigation zwischen den Fotos eines Kontexts (Track oder Kartenauswahl). Erreichbar aus Karte und Track-Detailansicht.

## Anforderungen / Akzeptanzkriterien

- Foto in Vollbild mit Vor-/Zurück-Navigation innerhalb des aktuellen Kontexts.
- Aufruf aus Foto-Marker ([RTCS-08](RTCS-08-photo-markers.md)) und aus Track-Galerie ([RTCS-09](RTCS-09-track-detail.md)).
- Anzeige von Metadaten (Aufnahmezeit, ggf. Track-Bezug, Zuordnungssicherheit).
- Aktion „auf Karte zeigen" – zentriert die Karte auf die Foto-Position.
- Bedienung per Tastatur (Desktop) und Wischgesten (Mobile).

## Abhängigkeiten

- [RTCS-08](RTCS-08-photo-markers.md) (Foto-Marker)
- [RTCS-09](RTCS-09-track-detail.md) (Track-Galerie)
- Thumbnail-/Bildauslieferung (Umsetzungsphase)

## Offene Punkte

- Auslieferung in mehreren Auflösungen (Thumbnail vs. Vollbild) – Detail in Umsetzungsphase.
