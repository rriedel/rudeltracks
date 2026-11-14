# 12. Glossar

| Begriff | Definition |
|---|---|
| Aktivität | Eine Unternehmung wie eine Wanderung oder Radtour, mit Name, Zeitraum, Aktivitätsart und Kennzahlen. Zentrales Fachobjekt; im Code `activity`. |
| Aktivitätsart | Art einer Aktivität, z. B. Wandern oder Rennrad; aus der Quelle übernommen (`hike`, `racebike`, …) und zu Kategorien gruppiert. |
| Track | Die aufgezeichnete Geometrie einer Aktivität: GPS-Punkte mit Höhe und Zeit, gegliedert in Segmente. Im engeren Sinn nur die Geometrie, nicht die Aktivität selbst. |
| Generalisierungsstufe (LOD) | Vereinfachte Fassung eines Tracks für die Kartendarstellung; `0` ist die volle Auflösung. |
| Quelle | Konfigurierter Ursprung von Daten, z. B. ein GPX-Verzeichnis, ein Fotoverzeichnis oder ein Komoot- bzw. Strava-Konto. |
| Quellobjekt | Einzeln abrufbare Einheit einer Quelle, z. B. eine Datei oder eine Tour in einer Anbieter-API. Grundlage der Änderungserkennung. |
| Importlauf | Ein Durchlauf über eine Quelle, der neue, geänderte und entfernte Quellobjekte verarbeitet und protokolliert. |
| Foto-Zuordnung | Verknüpfung eines Fotos mit einer Aktivität samt Konfidenz (sicher, wahrscheinlich, unbestimmt). |
