# RTCS-14 – Nutzerprofile & Personalisierung

**Kurzname:** user-profiles
**Phase:** Phase 2
**Status:** Entwurf

## Beschreibung

Leichte Mehrbenutzerfähigkeit ohne echte Authentifizierung: Familienmitglieder wählen ein Profil, um persönliche Suchfilter und einen Verlauf zu speichern. Dient der Personalisierung, nicht der Zugriffssicherung (alle Daten read-only im Familienkreis).

## Anforderungen / Akzeptanzkriterien

- Auswahl eines Profils (Familienmitglied) ohne Passwort.
- Pro Profil speicherbar:
  - Gespeicherte/benannte Suchfilter (aus [RTCS-03](RTCS-03-track-filter.md)).
  - Verlauf zuletzt betrachteter Tracks / Suchen.
- Profilwechsel jederzeit möglich.
- Kein Feature zur Zugriffsbeschränkung – reine Personalisierung.

## Abhängigkeiten

- [RTCS-03](RTCS-03-track-filter.md) (Filter, die gespeichert werden)

## Offene Punkte

- Speicherort der Personalisierung (server- vs. clientseitig) – Umsetzungsphase.
