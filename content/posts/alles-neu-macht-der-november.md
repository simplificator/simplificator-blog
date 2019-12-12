---
title: "Alles neu macht der November"
date: 2013-11-21
language: de
---

Unsere Webseite verwenden wir immer mal wieder um Technologien etwas genauer zu evaluieren. Aus einem grösseren Projekt kann man mehr Erfahrungen ziehen als aus einem einfachen “Hello World”. Oft trifft man im laufe eines Projektes auf ein grösseres Hindernis und erst dann zeigt sich ob die richtige Technologie gewählt wurde. Einfach genug für den Normalfall, mächtig genug für spezielle Features.

Nachdem wir zuletzt  Radiant, nanoc und auch eine gehostete CMS Lösung verwendet haben, haben wir in den letzten Tagen und Wochen LocomotiveCMS und auch eine eigene CMS Lösung angeschaut.

Dabei hat sich einmal mehr gezeigt, dass es im Bereich CMS keine “Silver Bullets” gibt. Es kommt auf den Einzelfall an.

Mittlerweile wurde die Webseite mit einem Custom CMS umgesetzt und auf Heroku deployt. Noch ist nicht alles perfekt, am Design wird noch gefeilt und auch die responsive Variante, speziell für Mobiles, braucht noch etwas Politur.  
Aber wir versuchen auch mit unserer Webseite ein agiles vorgehen zu leben. Die kleineren Probleme können wir in den nächsten Tagen verbessern und so Stück für Stück dem Ziel näher kommen.

Verglichen mit LocomotiveCMS hatten wir einen etwas höheren Initialaufwand, können nun aber schnell Erweiterungen Vornehmen und auf die ganze Palette von Bibliotheken und Tools zugreifen. Mit einer guten Testcoverage stellen wir sicher, dass die Seite so funktioniert wie gedacht.  
Gegen Locomotive sprach die momentan nicht aktuelle Dokumentation über Mehrsprachigkeit und die Template Entwicklung mittels Liquid.   
Während Liquid natürlich eine gute Lösung ist, wenn eine “non-evaling” Template Sprache benötigt wird, bevorzugen wir als Entwickler HAML/ERB und die Rails Helpers anstelle von Liquid und den Filtern.

Zuvor hatten wir eine statische Seite welche via nanoc generiert und über Heroku ausgelifert wurde. Der Entwicklungs und Update Zyklus war, wie sich nach einer Weile herausgestellt hat, unbefriedigend. Zu kompliziert für nicht Techniker, zu langsam für die Entwickler (autocompile mit einer grösseren nanoc Seite ist seeeehr langsam).  
Nun sind wir wieder da wo wir uns wohlfühlen und können auf bewährte Tools zurückgreifen.

Die nächsten Monate werden wir mal dabei bleiben, dann entscheiden wir ob es wieder etwas neues gibt.
