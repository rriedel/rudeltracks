# RTRCS-03 – Track-Filter

**Kurzname:** track-filter
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Filterung der dargestellten Tracks nach den zentralen Dimensionen Zeit, Aktivitätsart und Ort, ergänzt um eine Namenssuche. Wirkt auf Kartenansicht und andere Sichten.

## Anforderungen / Akzeptanzkriterien

- **Zeitraum:** Filter nach Datumsbereich (von/bis).
- **Aktivitätsart:** Auswahl einer oder mehrerer Arten (z. B. Wandern, Radfahren).
- **Ort:**
  - „Aktueller Kartenausschnitt" – nur Tracks im sichtbaren Bereich.
  - Ortssuche als Einstieg (siehe RTRCS-04).
- **Namenssuche:** Textsuche über Track-Titel (aus Komoot übernommen).
- Filter sind kombinierbar (UND-Verknüpfung über Dimensionen).
- Aktive Filter sind sichtbar und einzeln zurücksetzbar.
- Filterergebnis aktualisiert Karte und ggf. Trefferzahl unmittelbar.

## Abhängigkeiten

- RTRCS-01 (Kartenausschnitt als Filterkontext)
- RTRCS-04 (Ortssuche)
- Optional gespeichert über RTRCS-14 (Nutzerprofile)

## Offene Punkte

- Umgang mit teilweise im Ausschnitt liegenden Tracks (siehe auch RTRCS-05): mit anzeigen, aber optisch abgeschwächt.
