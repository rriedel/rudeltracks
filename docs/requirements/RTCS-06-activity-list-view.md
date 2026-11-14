# RTCS-06 – Aktivitäts-Listenansicht

**Kurzname:** activity-list-view
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Optionale Listenansicht der gefundenen Aktivitäten, die zusammen mit der Kartendarstellung genutzt werden kann. Die Liste bietet einen kompakten Überblick und einen Einstieg in die Detailansicht einer Aktivität.

## Anforderungen / Akzeptanzkriterien

- Die Liste kann zusätzlich zur Track-Darstellung als Wegzug auf der Karte eingeblendet werden.
- Karten- und Listendarstellung können gleichzeitig sichtbar sein.
- Pro Aktivität werden mindestens Titel, Datum, Aktivitätsart, Distanz und Dauer angezeigt.
- Die Liste zeigt dieselben Such- und Filterergebnisse wie die Karte (siehe [RTCS-03](RTCS-03-activity-filter.md)).
- Aus der Liste kann die Sichtbarkeit auf der Karte für eine oder mehrere ausgewählte Aktivitäten gesteuert werden: ausgewählte Aktivitäten ausblenden, ausschließlich ausgewählte Aktivitäten anzeigen oder alle aktuellen Such- und Filtertreffer anzeigen.
- Die Auswahl eines Listeneintrags hebt den zugehörigen Track auf der Karte hervor und öffnet die Detailansicht der Aktivität ([RTCS-05](RTCS-05-track-rendering.md), [RTCS-09](RTCS-09-activity-detail.md)).
- Bei sichtbarer Liste wird eine auf der Karte ausgewählte Aktivität auch in der Liste kenntlich gemacht.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (gemeinsame Darstellung mit der Karte)
- [RTCS-03](RTCS-03-activity-filter.md) (gefilterte Aktivitäten)
- [RTCS-05](RTCS-05-track-rendering.md) (Wegzug und Auswahl auf der Karte)
- [RTCS-09](RTCS-09-activity-detail.md) (Detailansicht einer ausgewählten Aktivität)
- Wechselwirkung mit [RTCS-13](RTCS-13-time-window-slider.md) (synchronisierte Treffer bei Nutzung des Zeitfenster-Reglers in Phase 2)

## Offene Punkte

- Darstellungsform: Split-Screen, Overlay oder eine andere Variante.
- Responsives Verhalten und Bedienung insbesondere auf Mobile.
- Verhalten der Liste bei sehr vielen Treffern (z. B. Scrollen, Pagination oder Virtualisierung).