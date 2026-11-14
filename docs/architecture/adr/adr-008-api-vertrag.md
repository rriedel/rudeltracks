# ADR-008: API-Vertrag code-first

- **Status:** Angenommen
- **Datum:** 2026-11-14
- **Entscheidende:** Projektentscheidung

## Kontext

Frontend und Backend kommunizieren über eine REST-API
([ADR-004](adr-004-frontend-backend-aufteilung.md)). Das Frontend erzeugt
Typen, Client und TanStack-Query-Hooks mit Orval aus einer
OpenAPI-Spezifikation ([ADR-006](adr-006-frontend-techstack.md)). Das Backend
wird mit Quarkus umgesetzt ([ADR-007](adr-007-backend-techstack.md)).

ADR-006 lässt offen, ob die Spezifikation zuerst definiert wird (API-first)
oder vom Backend erzeugt wird (code-first). Frontend und Backend werden von
derselben Person im selben Repository entwickelt und gemeinsam ausgeliefert.

## Entscheidung

Der API-Vertrag wird code-first aus dem Backend erzeugt:

1. Die REST-Ressourcen und DTOs im Quarkus-Backend sind die einzige Quelle des
   Vertrags. Ergänzende Beschreibungen erfolgen über
   MicroProfile-OpenAPI-Annotationen.
2. `quarkus-smallrye-openapi` erzeugt daraus die OpenAPI-Spezifikation. Der
   Backend-Build legt sie als Datei im Repository ab.
3. Orval generiert aus dieser Datei Typen, Client und Query-Hooks für das
   Frontend. Der generierte Code wird nicht manuell bearbeitet.

## Begründung

- Es gibt nur eine Quelle der Wahrheit; eine manuell gepflegte YAML-Datei
  kann nicht vom Backend abweichen.
- Bei gemeinsamer Entwicklung und Auslieferung beider Seiten bringt ein
  vorab abgestimmter Vertrag (API-first) keinen Vorteil, kostet aber die
  Pflege einer zusätzlichen Spezifikation.
- Quarkus erzeugt die Spezifikation ohne zusätzlichen Aufwand; im Dev Mode
  steht sie sofort nach einer Änderung zur Verfügung.

## Konsequenzen

- Die abgelegte Spezifikation macht Vertragsänderungen im Diff sichtbar und
  erlaubt die Frontend-Generierung, ohne das Backend zu starten.
- Der Build muss sicherstellen, dass abgelegte Spezifikation und Backend
  übereinstimmen, z. B. durch einen Abgleich im CI oder im Build.
- Die Qualität des generierten Clients hängt von der Qualität der
  Backend-Annotationen ab: eindeutige `operationId`s, Pflichtfelder und
  Enum-Werte müssen im Backend sauber ausgedrückt sein.
- GeoJSON-Strukturen werden in der Spezifikation als eigene Schemas
  beschrieben, damit Orval brauchbare Typen erzeugt.

## Überprüfung

Die Entscheidung wird überprüft, wenn die API von weiteren, unabhängig
entwickelten Clients genutzt werden soll oder Frontend und Backend getrennt
ausgeliefert werden.
