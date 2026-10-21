
# Bild-Auslieferung 

## nginx mit X-ACCEL-REDIRECT

**Funktionsweise**

1. Anfrage: Der Client fordert eine Datei über den Backend-Server an (z.B. `GET /download/123`).
2. Prüfung: Das Backend prüft die Rechte (z. B. ist der Nutzer eingeloggt?).
3. Header-Antwort: Statt die Datei selbst zu streamen, sendet das Backend einen leeren Body mit dem HTTP-Header `X-Accel-Redirect: /protected/file.zip` an Nginx.
4. Interne Weiterleitung: Nginxfängt diesen Header ab, gleicht den Pfad mit seinen location-Blöcken ab und liefert die Datei aus dem internen Verzeichnis aus.

## Beispiel-Konfiguration

### 1. Nginx-Konfiguration (nginx.conf oder Site-Config)

Der geschützte Speicherort muss mit dem Attribut `internal` versehen sein, damit er von außen nicht direkt über den Browser aufrufbar ist (sonst gäbe es den Fehler 404 Not Found):

```nginx
location /protected/ {
    internal;
    alias /var/www/private_files/;
    # Optional: Buffering oder Ratenbegrenzung steuern
    # X-Accel-Buffering yes;
}
```

### 2. Backend-Antwort (Beispiel in PHP)

```php
header("X-Accel-Redirect: /protected/geheime-datei.pdf");
header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename='geheime-datei.pdf'");
exit;
```

## Wichtige Regeln & Fallstricke

- Das internal-Flag: Ohne internal im Nginx-Block kann ein Angreifer die geschützte URL direkt im Browser aufrufen. Mit internal antwortet Nginx direkt mit 404 Not Found bei Direktaufrufen.
- Pfad-Zuordnung: Der im Header übergebene Pfad wird gegen die Nginx-Locations gematched, nicht direkt 1:1 auf das Dateisystem (außer du arbeitest mit alias oder root).
- MIME-Types: Nginx setzt den Content-Type standardmäßig anhand der Dateiendung des internen Ziels, nicht anhand dessen, was das Backend vorgibt (es sei denn, es wird explizit überschrieben).

## Funktion 

In einer typischen Produktivumgebung fungiert Nginx nach außen hin als Reverse Proxy und ist die erste Anlaufstelle für jeden Client-Request.

Der Ablauf sieht genau so aus:

```
[ Client ] 
   │
   │  1. GET /download/123 (Anfrage)
   ▼
[ Nginx (Reverse Proxy) ]
   │
   │  2. Weiterleitung an Backend (z.B. PHP-FPM, Node, Python)
   ▼
[ Backend-Applikation ]  <-- Prüft Login, DB, Rechte etc.
   │
   │  3. Antwort: "HTTP 200" + Header "X-Accel-Redirect: /protected/file.pdf"
   ▼
[ Nginx (Reverse Proxy) ] <-- Fängt den Header ab (wird NICHT an Client gesendet!)
   │
   │  4. Liest Datei direkt von der Festplatte
   ▼
[ Client ] <-- Erhält die Datei direkt von Nginx geliefert
```

Warum macht man das so?

Wenn Nginx nicht als Reverse Proxy davor geschaltet wäre, könnte es den X-Accel-Redirect-Header gar nicht abfangen.

- **Ohne Nginx (nur das Backend)**: Dein Backend müsste die Datei selbst einlesen und blockweise an den Client streamen. Bei einer 1 GB großen Datei blockiert dieser eine Download den Backend-Arbeiter (z. B. einen PHP-Prozess) für mehrere Minuten. Bei vielen gleichzeitigen Downloads stürzt dein Server ab, weil keine Prozesse mehr für normale Seitenaufrufe frei sind.
- **Mit Nginx und X-Accel-Redirect**: Dein Backend läuft in Millisekunden durch, prüft nur kurz die Datenbank ("Darf der User das?") und schickt den Header an Nginx zurück. Danach ist der Backend-Prozess sofort wieder frei für den nächsten User. Nginx, das extrem effizient im Ausliefern von statischen Dateien ist (unter Verwendung von Betriebssystem-Features wie sendfile), übernimmt das Senden im Hintergrund.

Für den Nutzer sieht es so aus, als käme die Datei ganz normal vom Backend – er merkt von dem internen Hin-und-Her überhaupt nichts.
KI-Antworten können Fehler enthalten. Weitere Informationen

## Was ist mit asynchronen Architekturen im Backend?

Bei einer asynchronen Architektur wie Express (Node.js) oder Quarkus mit Virtual Threads (Java/Loom) blockiert ein I/O-Vorgang (wie das Lesen einer Datei) nicht mehr den gesamten Thread oder Server. Das System kann währenddessen problemlos andere Anfragen bedienen.

Trotzdem lautet die Antwort: **Ja, auch dann bringt X-Accel-Redirect (oder X-Sendfile) signifikante Vorteile.**

Hier sind die Gründe, warum es sich selbst bei hochperformanten, asynchronen Backends lohnt:

### 1. Speicherverbrauch (Memory Management)

- Im Backend: Wenn du eine 1 GB große Datei über Express oder Quarkus auslieferst, muss die Laufzeitumgebung (V8 bei Node, die JVM bei Java) die Daten puffern (Chuncks/Buffers). Bei vielen gleichzeitigen Downloads kann das den Heap-Speicher massiv belasten oder zu hoher Garbage-Collection-Aktivität führen.
- Mit Nginx: Nginx streamt die Datei direkt über den Linux-Kernel-Befehl sendfile. Dabei wandern die Daten direkt vom Festplatten-Cache in den Netzwerk-Socket (Zero-Copy). Die Daten berühren den RAM deines Anwendungs-Backends überhaupt nicht.

### 2. CPU-Effizienz und Kontextwechsel

- Im Backend: Node.js oder Quarkus müssen die Datei in User-Space-Buffer einlesen und diese dann wieder in den Kernel-Space (Netzwerk-Socket) schreiben. Das erfordert fortlaufend Kontextwechsel (Context Switches) zwischen User-Space und Kernel-Space. Das kostet CPU-Zyklen.
- Mit Nginx: Nginx überlässt das vollständig dem Betriebssystem-Kernel. Nginx selbst verbraucht dabei fast null CPU.

### 3. Protokoll-Features (HTTP/2, HTTP/3, Caching, TLS)

Nginx ist darauf optimiert, die Verbindung zum Client perfekt zu managen. Es übernimmt für dich:

- Graphem- / Range-Requests (Resuming): Wenn ein Download abbricht, unterstützt Nginx von Haus aus Accept-Ranges (Teildownloads). Dein Backend müsste dieses komplexe HTTP-Parsing (Byte-Ranges berechnen) selbst implementieren.
- Keep-Alive & HTTP/2 Multiplexing: Nginx hält die Verbindung zum Client hocheffizient offen, während die Verbindung zwischen Nginx und deinem Backend (oft HTTP/1.1 oder Unix-Sockets) sofort nach dem Header-Senden geschlossen/wiederverwendet werden kann.

## Zusammenfassung: Wann brauchst du es nicht?

Wenn du nur kleine Dateien (wie Avatare, kleine PDFs unter 5-10 MB) hast und die Nutzerzahlen moderat sind, ist der Unterschied bei Express/Quarkus vernachlässigbar. Da ist der Implementierungsaufwand im Code oft höher als der Nutzen.

Sobald es aber um große Dateien (Videos, ZIP-Archive) oder sehr hohen Traffic geht, schützt Nginx deine Anwendung vor Memory-Leaks und CPU-Spitzen, selbst wenn du Virtual Threads nutzt.

## Anwendungsfall: Viele kleine Dateien

Bei 1000 kleineren Bild-Dateien pro Nutzerinteraktion ändert sich die Priorität fundamental. Hier geht es nicht mehr um die maximale I/O-Performance einer einzelnen riesigen Datei, sondern um Masse, Latenz und Overhead.

In diesem konkreten Szenario ist der Einsatz von X-Accel-Redirect absolut zu empfehlen, allerdings aus völlig anderen Gründen als bei großen Dateien.

### Warum X-Accel-Redirect bei 1000 Bildern der Retter ist

Wenn ein Client 1000 Bilder anfordert (selbst wenn sie über HTTP/2 oder HTTP/3 gemultiplext werden), bedeutet das für dein Backend: 1000-mal Authentifizierung und Rechteprüfung.

#### Szenario A: Auslieferung komplett über das Backend (Express / Quarkus)

Jedes einzelne Bild erzeugt einen Request, der tief in dein Backend wandert:

1. Laufzeit-Overhead: Quarkus/Express müssen 1000-mal die HTTP-Infrastruktur durchlaufen, Router matchen und Controller aufrufen.
2. Datenbank-Overhead: Wenn du in der App prüfst: Darf User X das Bild Y sehen?, feuerst du im schlimmsten Fall 1000 Datenbankabfragen ab. Selbst mit Virtual Threads oder asynchronem I/O zwingst du damit deine Datenbank oder deinen Cache (Redis) in die Knie.
3. Garbage Collection (GC): 1000 Datei-Buffer in Express/Java erzeugen tausende Kurzzeit-Objekte im RAM. Das führt zu GC-Spitzen, die dein Backend kurzzeitig ausbremsen.

#### Szenario B: Auslieferung mit X-Accel-Redirect & Nginx Caching (Best Practice)

Du nutzt X-Accel-Redirect, kombinierst es aber clever mit Nginx-Caching (`proxy_cache`).
Das Backend prüft die Rechte beim **ersten** Mal und sagt Nginx per Header: *„Ja, darf er, und du darfst dieses Bild für diesen Nutzer (oder global) für 5 Minuten cachen.“*

1. Rechteprüfung minimieren: Nginx übernimmt ab dem zweiten Bild den Request komplett aus seinem Cache, ohne dass Express/Quarkus auch nur ein einziges Mal gefragt werden.
2. Entlastung der App: Dein Backend sieht von den 1000 Anfragen vielleicht nur noch einen Bruchteil, der Rest wird mit der maximalen Performance von Nginx (direkt aus dem Linux-Page-Cache) beantwortet.

## Das Problem bei 1000 Bildern: Der "Handshake-Overhead"

Wenn der Client 1000 GET-Requests schickt, muss Nginx diese 1000-mal an Express/Quarkus weiterleiten (Reverse Proxy), um das X-Accel-Redirect abzuholen.
Wenn dieser interne Weg (Nginx \(\rightarrow \) Backend) zu langsam ist, hast du trotz Virtual Threads einen Flaschenhals.

### Optimierungs-Strategien für diesen Usecase:

1. Keep-Alive zum Backend (Pflicht!):
Sorge dafür, dass Nginx die Verbindungen zum Backend nicht nach jedem Bild schließt. Nutze in Nginx ein `upstream`-Glied mit `keepalive`, damit die Anfragen über bestehende Sockets rasend schnell durchgereicht werden.
2. Token-basierte URLs statt X-Accel-Redirect (Alternative Architektur):
Bei 1000 Bildern kann es effizienter sein, gar kein X-Accel-Redirect zu nutzen. Stattdessen generiert dein Backend einmalig für eine Seite 1000 URLs, die eine zeitlich begrenzte, kryptografische Signatur enthalten (z. B. `image123.jpg?token=ab45c6...&expires=171890`).
	• Vorteil: Nginx kann diese URLs komplett alleine validieren (z. B. mit dem Modul `secure_link`). Dein Backend sieht bei den Bildaufrufen 0 Requests. Es hat nur einmal die URLs signiert.

### Zusammenfassung

Für 1000 Thumbnails ist X-Accel-Redirect in Kombination mit Nginx-Caching eine sehr solide Lösung, da es dein Backend vor einer Request-Sintflut schützt.

Sollte die Performance bei extremen Nutzerzahlen dennoch einbrechen (weil Nginx immer noch 1000-mal beim Backend nachfragen muss), ist der Wechsel auf signierte URLs (secure_link in Nginx) der Königsweg für diesen spezifischen Fall.
