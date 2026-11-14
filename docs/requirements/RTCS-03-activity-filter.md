# RTCS-03 – Aktivitäts-Filter

**Kurzname:** activity-filter
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Filterung der dargestellten Aktivitäten nach den zentralen Dimensionen Zeit, Aktivitätsart und Ort, ergänzt um eine Namenssuche. Wirkt auf Kartenansicht und andere Sichten.

## Anforderungen / Akzeptanzkriterien

- **Zeitraum:** Filter nach Datumsbereich (von/bis).
- **Aktivitätsart:** Auswahl einer oder mehrerer Arten (z. B. Wandern, Radfahren).
- **Ort:**
  - „Aktueller Kartenausschnitt" – nur Aktivitäten, deren Track im sichtbaren Bereich liegt.
  - Ortssuche als Einstieg (siehe [RTCS-04](RTCS-04-location-search.md)).
- **Namenssuche:** Textsuche über den Namen der Aktivität (aus Komoot übernommen).
- Filter sind kombinierbar (UND-Verknüpfung über Dimensionen).
- Aktive Filter sind sichtbar und einzeln zurücksetzbar.
- Filterergebnis aktualisiert Karte und Aktivitätsliste (siehe [RTCS-06](RTCS-06-activity-list-view.md)) sowie ggf. die Trefferzahl unmittelbar.

## Abhängigkeiten

- [RTCS-01](RTCS-01-map-view.md) (Kartenausschnitt als Filterkontext)
- [RTCS-04](RTCS-04-location-search.md) (Ortssuche)
- Optional gespeichert über [RTCS-15](RTCS-15-user-profiles.md) (Nutzerprofile)

## Offene Punkte

- Umgang mit teilweise im Ausschnitt liegenden Tracks (siehe auch [RTCS-05](RTCS-05-track-rendering.md)): mit anzeigen, aber optisch abgeschwächt.
