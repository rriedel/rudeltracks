# Kartenverbindungs-Prototyp

Isolierter Test für MapLibre GL JS und den Thunderforest-Kartenstil `atlas` über die Vector Styles API. MapLibre lädt den vollständigen Stil sowie die darin referenzierten Tiles, Schriften und Icons automatisch. Die GPX-Tracks aus dem Track-Ordner werden als eigene Ebenen über der Grundkarte angezeigt.

**Stand 14.10.2026:** Tile-Laden und Karteninteraktion funktionieren im bisherigen Praxistest gut und flüssig. Der gewünschte Stil `landscape` wird von der Vector Styles API derzeit noch nicht unterstützt. Aktuelle Präferenz ist, auf weitere Thunderforest-Stile zu warten und vorerst `atlas` zu verwenden. Die [Optionen und ihre Abwägung](../docs/implementation/map.md#optionen-für-den-gewünschten-kartenstil) sind in der Implementierungsdokumentation festgehalten.

## Starten

1. Das Repository in VS Code öffnen und **Reopen in Container** ausführen.
2. `prototype/.env.example` nach `prototype/.env.local` kopieren.
3. In `.env.local` den Platzhalter durch den Thunderforest-API-Key ersetzen.
4. Im Verzeichnis `prototype` `npm run dev` ausführen.

Der Dev Container installiert beim Erstellen die aktuelle Node-LTS-Version und führt `npm install` für den Prototyp aus. Vite lädt `.env.local` beim Start; den Server nach Änderungen an der Datei neu starten. Der Browser-Key ist in den Netzwerkanfragen sichtbar; für einen veröffentlichten Prototyp den Key im Thunderforest-Konto passend einschränken und Usage Limits prüfen. Den echten Key nicht committen.

Zoom, Pan und Touch-Gesten sind aktiv. Die Statusanzeige meldet, sobald MapLibre den Kartenstil und alle GPX-Tracks geladen hat, und nennt die Anzahl der geladenen Tracks. Fehler beim Laden der Karte oder Verarbeiten der Tracks werden dort angezeigt. Thunderforest- und OpenStreetMap-Attribution werden auf der Karte angezeigt.

## GPX-Tracks

Alle Dateien mit der Endung `.gpx` direkt im Ordner [tracks/](tracks/) werden automatisch eingebunden, sortiert nach Dateinamen. Weitere Tracks können dort ohne Codeänderung abgelegt werden; für die Veröffentlichung ist ein neuer Build nötig. Vite importiert sie als Text; der Browser konvertiert die Tracksegmente in GeoJSON. Jedes Segment bleibt eine separate Linie, damit keine künstlichen Verbindungen über Aufzeichnungslücken entstehen.

Die Tracks werden der Reihe nach rot, blau, grün, violett und orange dargestellt, jeweils mit weißer Umrandung. Bei mehr als fünf Tracks wiederholen sich die Farben. Der Kartenausschnitt wird beim Laden mit Randabstand auf alle vollständigen Tracks gesetzt. Höhe und Zeitstempel werden noch nicht ausgewertet; Routen und Wegpunkte sind nicht Teil dieser Trackdarstellung. Ungültiges XML, ungültige Koordinaten, fehlende Tracksegmente und Segmente mit weniger als zwei Punkten werden mit der betroffenen Datei als Fehler gemeldet. Ein leerer Track-Ordner wird ebenfalls als Fehler gemeldet.

Es gibt noch keinen Upload oder Importdialog und kein Backend. Alle eingebundenen GPX-Dateien werden beim Build mit ausgeliefert und sind bei Veröffentlichung öffentlich zugänglich. Nur unkritische Tracks auf diese Weise einbinden.

## Verwendeter Endpunkt

- Aktuell verwendeter Atlas-Kartenstil: `https://api.thunderforest.com/styles/atlas/style.json?apikey=...`
- Dokumentation: <https://www.thunderforest.com/docs/vector-styles-api/>