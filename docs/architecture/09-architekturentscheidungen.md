# 9. Architekturentscheidungen

Dokumentiere hier wichtige Architekturentscheidungen und ihre Begründungen.
Größere Entscheidungen können als einzelne ADRs abgelegt und von hier aus
verlinkt werden.

## Übersicht

| Entscheidung | Status | Begründung / Dokument |
|---|---|---|
| Foto- und Thumbnail-Auslieferung zunächst über das Backend | Angenommen | [ADR-001: Foto- und Thumbnail-Auslieferung](adr/adr-001-bildauslieferung.md) |
| Kartenmaterial zunächst über externe Vektor-Tile-Dienste | Vorläufig angenommen | [ADR-002: Kartenkacheln](adr/adr-002-kartenkacheln.md) |
| PostgreSQL/PostGIS und grobe Ablageorte für die Persistenz | Vorläufig angenommen | [ADR-003: Persistenz](adr/adr-003-persistenz.md) |
| Frontend-/Backend-Aufteilung und serverseitige Importverarbeitung | Vorläufig angenommen | [ADR-004: Frontend- und Backend-Aufteilung](adr/adr-004-frontend-backend-aufteilung.md) |
| Zugriff zunächst ohne Anwendungsanmeldung im lokalen Netz, kein Fernzugriff | Vorläufig angenommen | [ADR-005: Zugriff](adr/adr-005-zugriff.md) |
| Frontend als React-/TypeScript-SPA mit Vite, TanStack Router/Query, Orval und MapLibre GL JS | Angenommen | [ADR-006: Frontend-Techstack](adr/adr-006-frontend-techstack.md) |
| Backend mit Java und Quarkus | Vorläufig angenommen | [ADR-007: Backend-Techstack](adr/adr-007-backend-techstack.md) |
