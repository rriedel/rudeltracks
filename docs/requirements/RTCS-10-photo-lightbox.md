# RTCS-10 – Foto-Vollbildansicht / Lightbox

**Kurzname:** photo-lightbox
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Vollbild-Ansicht einzelner Fotos mit Navigation zwischen den Fotos eines Kontexts (Aktivität oder Kartenauswahl). Erreichbar aus Karte und Aktivitäts-Detailansicht.

## Anforderungen / Akzeptanzkriterien

- Foto in Vollbild mit Vor-/Zurück-Navigation innerhalb des aktuellen Kontexts.
- Aufruf aus Foto-Marker ([RTCS-08](RTCS-08-photo-markers.md)) und aus der Foto-Galerie einer Aktivität ([RTCS-09](RTCS-09-activity-detail.md)).
- Anzeige von Metadaten (Aufnahmezeit, ggf. zugeordnete Aktivität, Zuordnungssicherheit).
- Aktion „auf Karte zeigen" – zentriert die Karte auf die Foto-Position.
- Bedienung per Tastatur (Desktop) und Wischgesten (Mobile).

## Abhängigkeiten

- [RTCS-08](RTCS-08-photo-markers.md) (Foto-Marker)
- [RTCS-09](RTCS-09-activity-detail.md) (Foto-Galerie der Aktivität)
- Thumbnail-/Bildauslieferung (Umsetzungsphase)

## Offene Punkte

- Konkrete Bildvarianten und Auflösungen (Thumbnail vs. Lightbox-Vorschau) in der Umsetzungsphase festlegen. Die vorläufige Richtung für die Auslieferung über das Backend ist in der [Lösungsstrategie](../architecture/04-loesungsstrategie.md) beschrieben.
