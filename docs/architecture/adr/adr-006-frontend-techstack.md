# ADR-006: Frontend-Techstack

- **Status:** Angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Rudeltracks ist eine interaktive, kartenorientierte Webanwendung für Desktop
und Mobile. Filter, Trackliste, Detailansicht und Foto-Lightbox müssen
zusammenspielen. Der Kartenprototyp verwendet bereits Vite und MapLibre GL JS.
Gemäß [ADR-004](adr-004-frontend-backend-aufteilung.md) liefert zunächst ein
Anwendungsdienst das gebaute Frontend und die API gemeinsam aus.

Umfassende Erfahrung mit React sowie ein bewährtes Setup mit TanStack Router,
TanStack Query und Orval sind vorhanden. TypeScript und Vite sind gesetzt.
Ein Bedarf an serverseitigem HTML-Rendering oder Suchmaschinenoptimierung ist
für den aktuellen internen Einsatz nicht erkennbar.

## Entscheidung

Das Frontend wird als clientseitige Single-Page-Anwendung mit folgendem Stack
umgesetzt:

| Baustein | Technologie | Aufgabe |
|---|---|---|
| UI | React mit TypeScript | Komponenten und Interaktionen |
| Entwicklung und Build | Vite | Entwicklungsserver und statisches Build-Ergebnis |
| Routing | TanStack Router | Navigation und typisierte URL-Suchparameter |
| Serverzustand | TanStack Query | API-Abfragen, Cache sowie Lade- und Fehlerzustände |
| API-Client | Orval auf Basis von OpenAPI | Generierte Typen, Client und Query-Hooks |
| Karte | MapLibre GL JS | Kartenrendering und Overlays |

Ein Fullstack-Framework und serverseitiges HTML-Rendering sind zunächst nicht
vorgesehen. Eine zusätzliche globale Zustandsbibliothek wird vorerst nicht
eingeführt.

Die Zuständigkeiten für Zustand werden wie folgt getrennt:

- Navigierbarer Zustand wie Filter und ausgewählter Track liegt in der URL.
  Ob und wie der Kartenausschnitt dort abgebildet wird, bleibt dem
  Umsetzungsdesign vorbehalten.
- Vom Backend gelieferte Daten werden über TanStack Query verwaltet.
- Flüchtiger UI-Zustand, etwa geöffnete Menüs, liegt im React-State.
- Karteninstanz und Renderingzustand liegen bei MapLibre, gekapselt in einer
  eigenen Kartenkomponente. Die MapLibre-API wird zunächst direkt verwendet;
  ein Framework-Wrapper wird nur bei konkretem Nutzen ergänzt.

## Begründung

- Die vorhandene React-Erfahrung und das eingespielte Tooling ermöglichen
  produktives Arbeiten ohne zusätzlichen Framework-Wechsel. Vue und Svelte
  sind grundsätzlich geeignete Alternativen, bieten für die aktuellen
  Anforderungen aber keinen Vorteil, der einen Wechsel rechtfertigt.
- TypeScript unterstützt klare Typen für API-Daten und UI-Zustände. Orval
  leitet Client und Query-Hooks aus dem OpenAPI-Vertrag ab und reduziert
  manuell gepflegten Integrationscode.
- TanStack Router unterstützt adressierbare Filter und Auswahlzustände sowie
  Browser-Navigation; TanStack Query trennt Serverdaten vom lokalen UI-Zustand.
- Vite und MapLibre führen den bereits erprobten Ansatz fort. Die UI-Framework-
  Wahl allein bestimmt nicht die Kartenleistung; Datenmengen, Layer-Aufbau und
  gezielte Kartenupdates sind dafür maßgeblich.
- Ein statisches Frontend passt zur gemeinsamen Auslieferung mit der API, ohne
  ein Fullstack-Framework oder serverseitiges HTML-Rendering einzuführen.

## Konsequenzen

- Die API benötigt einen verlässlichen OpenAPI-Vertrag und einen reproduzierbaren
  Orval-Generierungsprozess. Ob die Spezifikation zuerst definiert oder vom
  Backend erzeugt wird, bleibt eine gesonderte Workflow-Entscheidung.
- Generierte TypeScript-Typen ersetzen keine Laufzeitvalidierung von API-Daten.
- Query-Keys müssen die für eine Anfrage relevanten Filter berücksichtigen.
  Kartenbewegungen sollen nicht bei jedem Animationsschritt neue API-Anfragen
  oder URL-Updates auslösen; die konkrete Steuerung wird im Umsetzungsdesign
  festgelegt.
- Serverdaten werden nicht zusätzlich in einem globalen Store oder im
  Komponenten-State dupliziert.
- Die gemeinsame Auslieferung muss den direkten Aufruf und das Neuladen von
  Frontend-Routen ermöglichen, ohne API- oder Datei-Routen zu überlagern.
- Komponentenbibliothek und Styling bleiben offen. MapLibre ist weiterhin mit
  repräsentativen Track- und Fotomengen auf mobilen Zielgeräten zu validieren.

## Überprüfung

Die Umsetzung wird anhand der verknüpften Karten-, Filter- und Detailansichten,
der Browser-Navigation sowie der API-Client-Generierung validiert. Die
Entscheidung wird überprüft, wenn konkrete Anforderungen an Rendering,
Zustandsverwaltung oder Integration durch diesen Stack nicht ausreichend
abgedeckt werden.
