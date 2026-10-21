# ADR-002: Kartenkacheln

- **Status:** Vorläufig angenommen
- **Datum:** 2026-10-21
- **Entscheidende:** Projektentscheidung

## Kontext

Die Anwendung benötigt Kartenmaterial für die Kartenansicht. Im Prototyp
wurden Thunderforest und Stadia Maps als externe Vektor-Tile-Dienste erprobt.
Die Auslieferung der Vektor-Tiles ist schnell genug für eine flüssige
Bedienung. Bei der erwarteten Nutzung werden die Frei-Kontingente
voraussichtlich nicht ausgeschöpft; dies ist keine garantierte Kostenfreiheit.

Die endgültige Auswahl eines Anbieters ist noch nicht erfolgt. Neben der
Leistung und den Kosten sind Nutzungsbedingungen, Attribution, Aktualisierung
und die Datenschutzabwägung zur Übermittlung angefragter Kartenausschnitte zu
berücksichtigen. Geocoding ist eine separate Fragestellung und wird von dieser
Entscheidung nicht umfasst.

## Entscheidung

Wir legen vorläufig fest, externe Vektor-Tile-Dienste für das Kartenmaterial
zu verwenden. Ein selbst gehosteter Tile-Server ist zunächst nicht vorgesehen.
Die Anbieter- und Tarifwahl wird erst nach Prüfung der offenen Bedingungen
festgelegt.

## Begründung

- Die im Prototyp erprobte Auslieferung ist für die erwartete Bedienung
  ausreichend flüssig.
- Die verfügbaren Frei-Kontingente werden bei der erwarteten Nutzung
  voraussichtlich nicht ausgeschöpft, ohne damit Kostenfreiheit zu garantieren.
- Ein externer Dienst vermeidet vorerst den Betriebsaufwand eines selbst
  gehosteten Tile-Servers.

## Konsequenzen

- Die Kartenansicht ist für die Tile-Auslieferung auf einen externen Dienst und
  eine Verbindung zu diesem Dienst angewiesen.
- Vor der endgültigen Anbieter- und Tarifwahl sind Nutzungsbedingungen,
  Attribution, Aktualisierung, Kosten und Datenschutz zu prüfen.
- Geocoding-Dienst und -Betriebsmodell, einschließlich Kosten und Umgang mit
  Suchanfragen, müssen unabhängig davon entschieden werden.
- Ein selbst gehosteter Tile-Server bleibt eine mögliche Alternative, falls
  die Prüfung der externen Dienste oder der spätere Betrieb dies erfordert.

## Überprüfung

Die vorläufige Festlegung wird bei der endgültigen Anbieter- und Tarifwahl
überprüft sowie erneut, falls Kosten, Nutzungsbedingungen, Datenschutz,
Verfügbarkeit oder Kartenaktualität die Nutzung eines externen Dienstes nicht
mehr rechtfertigen.
