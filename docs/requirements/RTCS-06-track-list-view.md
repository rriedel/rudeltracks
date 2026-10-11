# RTCS-06 – Track-Listenansicht

**Kurzname:** track-list-view
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Optionale Listenansicht der gefundenen Tracks, die zusammen mit der Kartendarstellung genutzt werden kann. Die Liste bietet einen kompakten Überblick und einen Einstieg in die Detailansicht eines Tracks.

## Anforderungen / Akzeptanzkriterien

- Die Liste kann zusätzlich zur Track-Darstellung als Wegzug auf der Karte eingeblendet werden.
- Karten- und Listendarstellung können gleichzeitig sichtbar sein.
- Pro Track werden mindestens Titel, Datum, Aktivitätsart, Distanz und Dauer angezeigt.
- Die Liste zeigt dieselben Such- und Filterergebnisse wie die Karte (siehe [RTCS-03](RTCS-03-track-filter.md)).
- Aus der Liste kann die Sichtbarkeit auf der Karte für einen oder mehrere ausgewählte Tracks gesteuert werden: ausgewählte Tracks ausblenden, ausschließlich ausgewählte Tracks anzeigen oder alle aktuellen Such- und Filtertreffer anzeigen.
- Die Auswahl eines Listeneintrags hebt den zugehörigen Track auf der Karte hervor und öffnet dessen Detailansicht ([RTCS-05](RTCS-05-track-rendering.md), [RTCS-09](RTCS-09-track-detail.md)).
- Bei sichtbarer Liste wird ein auf der Karte ausgewählter Track auch in der Liste kenntlich gemacht.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (gemeinsame Darstellung mit der Karte)
- [RTCS-03](RTCS-03-track-filter.md) (gefilterte Track-Ergebnisse)
- [RTCS-05](RTCS-05-track-rendering.md) (Wegzug und Auswahl auf der Karte)
- [RTCS-09](RTCS-09-track-detail.md) (Detailansicht eines ausgewählten Tracks)
- Wechselwirkung mit [RTCS-13](RTCS-13-time-window-slider.md) (synchronisierte Treffer bei Nutzung des Zeitfenster-Reglers in Phase 2)

## Offene Punkte

- Darstellungsform: Split-Screen, Overlay oder eine andere Variante.
- Responsives Verhalten und Bedienung insbesondere auf Mobile.
- Verhalten der Liste bei sehr vielen Treffern (z. B. Scrollen, Pagination oder Virtualisierung).