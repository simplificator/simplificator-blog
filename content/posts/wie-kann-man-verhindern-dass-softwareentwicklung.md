---
title: "Wie kann man verhindern, dass Softwareentwicklung ins Stocken kommt?"
date: 2013-05-24
language: de
author: Simplificator
tags:
  - consulting
  - quality
  - refactoring
---

Eine typische Situation nach den ersten Erfolgen mit einer Applikation: **Das Team ist langsam,** wehrt sich gegen Anforderungen. Neue Funktionen sind schwierig umzusetzen, und die Testphasen werden länger. Die Software-**Entwicklung wird immer schwieriger**.

<figure>
  {% image "./content/images/tumblr_inline_mnamcgRZFd1qz4rgp.jpg", "Verkehrsstau" %}
  <figcaption>Quelle: <a href="http://www.flickr.com/photos/tronics/380379732/sizes/z/in/photostream">Flickr</a></figcaption>
</figure>

Architektur einer Applikation ist eine relativ abstrakte Angelegenheit: Oft von technologischen Überlegungen getrieben, mit dem Wunsch eine allgemeine Lösung für alles zu haben. Auf der einen Seite gibt es den Hacker-Ansatz - auf eine schnelle, unspezifische Weise möglichst schnell zum Ziel zu kommen. Es gleicht einem Basar - alles geht irgendwie, es ist effizient - aber die Systeme sind schwierig zu warten weil die Struktur fehlt. Auf der anderen Seite gibt es die Architektur-Astronauten - sie haben ein Buch (oder mehrere) gelesen, sind überzeugt von dem Wert von Struktur, aber sie überborden: Grundlos bauen sie virtuelle Kathedralen, flechten Schichten über Schichten, machen alles extrem “flexibel” und verlieren die Entwicklungsgeschwindigkeit.

Der Hauptgrund ist die Komplexität der Aufgabe. **Architektur** ist nötig, aber schwierig, und **muss der Aufgabe angepasst sein**. Es ist nicht einfach objektive Bewertungskriterien zu finden, verschiedene Architekturen zu beurteilen. Dazu kommt, dass Architekturanpassungen normalerweise viel Aufwand bedeuten, ohne dass eine Applikation an Funktionalität gewinnt. Damit entscheiden sich Betriebe oft dazu, eine bestehende Architektur beizubehalten und mit den Problemen umzugehen.

**Wie wäre es hingegen**, wenn Entwickler eine klare Idee haben, wie ein System idealerweise umgesetzt würde? Wenn die Technologie-Entscheide vom Bedarf getrieben werden statt von Glaubenssätzen von Architektur-Astronauten? **Wenn die Entwicklungsgeschwindigkeit Schritt für Schritt zunimmt**, die Fehlerrate abnimmt, das Team mehr Produktivität gewinnt, und die Fähigkeit schnell zu reagieren? Wenn **Sicherheitsprobleme erkannt werden, bevor ein Problem auftritt?**

**Die zentrale Aufgabe ist, mit der Komplexität kontrolliert umzugehen.** Komplexität lässt sich nicht wegdiskutieren. Es gibt die inhärente Komplexität der Aufgabe, und es gibt die Komplexität des Systems. Die effizienteste Lösung ist, wenn die Komplexität der Aufgabe sauber modelliert wird - dies wird die zentrale Architektur. Gleichzeitig soll die Komplexität des Systems so klein wie möglich gehalten werden.

Durch _Refactoring_ kann diese Aufgabe auch später in der Entwicklung angegangen werden. Refactoring ist die Verbesserung der Struktur einer Applikation ohne der Veränderung der Funktion. Wenn die Architektur aus Refactoring entsteht, ist sie im Allgemeinen sinnvoll - sie hat eine Berechtigung von bestehendem Code her. Refactoring kann auch unnötige Komplexität reduzieren - wenn zu viele Schichten vorhanden sind in der Software, kann damit wieder Übersicht geschaffen werden.

Durch _Code Reviews_ können verschiedene Sichtweisen eines Problems berücksichtigt werden: Code Reviews können zum Beispiel aufdecken, wenn defensiv programmiert wird. Defensive Programmierung ist wenn Teile des Programms anderen Teilen “nicht glauben” dass sie sich anständig verhalten, und versuchen auf unerwartetes zu reagieren. Das bläht den Code auf. Code Reviews helfen, solche Strukturen zu erkennen und die Probleme zu lösen.

Durch _automatisierte Qualitätssicherung_ (Unit Tests und ähnlichem) können zentrale Funktionen gesichert werden, sodass die Testphase strukturierter und kürzer wird, und die Fehlerrate sinkt.

**Wir bieten eine Beratung an**, wo die Architektur eines Systems optimiert wird. Folgende Schritte können sinnvoll sein.

1. **Code Review**: Wir können in der ersten Stufe das System bezüglich Sicherheit, innerer Qualität, Modernität und Flexibilität beurteilen. Wir machen hierzu ein Code Review. Das Resultat ist ein Dokument, eine Arbeitsliste von Punkten wo gearbeitet werden soll, und allfällige Sicherheitsbedenken, die separate untersucht werden soll.
    
2. **Architekturberatung**: Wir beschreiben wie das System so verbessert werden kann, dass es besser für die Zukunft gerüstet ist. Wir schlagen Technologien vor und haben Beispiele dazu. Wir können die Entwicklungsprozesse optimieren helfen, und Vorschläge zum Umgang mit Anforderungen und Fehlern geben.
    
3. **Coaching**: Wir coachen die Entwickler, bezüglich Ressourcen, Büchern, Webseiten, welche diese Technologien und Architekturentscheidungen unterstützen können.
    
4. **Qualitätssicherung**: Wir können die Qualitätssicherung mit Unit Tests ermöglichen, sodass alte Fehler nicht mehr wiederkommen, und das Team höhere Sicherheit gewinnt beim Anpassen der Software.
    
5. **Entwicklungsbegleitung**: Wir begleiten nach Wunsch das Team von der Umsetzung bis zum fertigen Deployment.
    

Wir können in einem unverbindlichen Gespräch ein angepasstes Angebot formulieren. Wir können dies spontan machen oder etwas abmachen. Und wir haben guten Kaffee. Ruf an.

Jetzt. :-)

Kontakt: [044 500 47 50](tel://+41445004750), [info@simplificator.com](mailto:info@simplificator.com) oder [@simplificator](https://twitter.com/simplificator). Wir freuen uns.
