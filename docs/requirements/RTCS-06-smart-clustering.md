# RTCS-06 – Smarte Darstellung / Track-Clustering

**Kurzname:** smart-clustering
**Phase:** MVP
**Status:** Entwurf

## Beschreibung

Zoom-abhängige, „smarte" Darstellung: Decken Tracks nur einen kleinen Teil des Kartenausschnitts ab, wird statt des Wegzugs ein Marker/Badge angezeigt – ggf. mit Anzahl der Tracks in einem Bereich. Vermeidet eine überladene Karte bei herausgezoomter Ansicht.

## Anforderungen / Akzeptanzkriterien

- Unterhalb eines definierten Abdeckungs-/Zoom-Schwellwerts werden Tracks nicht als Linie, sondern als Marker/Badge dargestellt.
- Mehrere nahe beieinanderliegende Tracks werden zu einem Cluster-Marker mit Anzahl zusammengefasst.
- Klick/Tap auf einen Cluster zoomt hinein bzw. löst ihn auf.
- Beim Hineinzoomen gehen Cluster fließend in die Wegzug-Darstellung (RTCS-05) über.

## Abhängigkeiten

- RTCS-01 (Karte)
- RTCS-05 (Wegzug-Darstellung)

## Offene Punkte

- Definition „kleiner Teil des Ausschnitts" (Schwellwert, ggf. relativ zur Ausschnittfläche).
- Cluster-Strategie (Zoom-basiert vs. flächenbasiert).
