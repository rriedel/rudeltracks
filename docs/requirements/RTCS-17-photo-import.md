# RTCS-17 – Foto-/EXIF-Import

**Kurzname:** photo-import
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Einlesen der Fotosammlung (> 10.000 JPGs, on-premise) und Extraktion der relevanten EXIF-Metadaten als Grundlage für die Darstellung und das Foto-Track-Matching. Fotos verbleiben am Speicherort; die Anwendung hält Referenzen und Metadaten.

## Anforderungen / Akzeptanzkriterien

- Rekursives Einlesen von JPG-Dateien aus einem konfigurierten Quellverzeichnis.
- Extraktion je Foto:
  - GPS-Position (falls vorhanden)
  - Aufnahmezeitpunkt
  - Zeitzone/Offset (falls vorhanden)
  - Kamera-/Gerätinfo
- Referenz auf die Originaldatei (Pfad) statt Kopie.
- Robuste Behandlung von Fotos ohne/mit fehlerhaften EXIF-Daten (nicht verwerfen, sondern als „unbestimmt" führen).
- Deduplizierung mehrfach vorhandener Fotos.
- Stabile, eindeutige Foto-Identität für Wiederholungsläufe (siehe [RTCS-19](RTCS-19-incremental-sync.md)).

## Abhängigkeiten

- Liefert Daten an: [RTCS-08](RTCS-08-photo-markers.md), [RTCS-18](RTCS-18-photo-track-matching.md)
- Thumbnail-Generierung wird in der Umsetzungsphase geklärt.

## Offene Punkte

- Kriterium für Deduplizierung (Pfad, Hash, EXIF-Kombination).
