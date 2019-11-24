---
title: "alles war gut, bis ich es mit IE versuchte..."
date: 2013-12-06
---

Dieses Problem kennen alle Web-Entwickler: es sieht gut in Chrome aus aber in Firefox stimmen die Schriften nicht. Oder es sieht gut in Safari aus aber im IE ist der Abstand viel zu gross.

Auch wenn sich die Situation in den letzten Jahren deutlich entspannt hat, besonders zwischen FF, Safari, Chrome und **neuen** Versionen von IE.

Aber ältere Versionen (d.h. alles < 10) tun sich teilweise immer noch schwer mit Stylesheets welche auf anderen Browsern gute Resultate erzielen.

Bei unserer Webseite jedoch…war es ein Fehler beim entwickeln. Die Webseite basiert auf [Bootstrap](http://getbootstrap.com) und die Stylesheets werden mittels [SASS](http://sass-lang.com/) “pre-processed”. Durch einen unabsichtlichen mehrfach Import von Bootstrap hatten wir zuviele Regeln in einem einzelnen Stylesheet und nichts ging mehr.

Details zu den Stylesheet Limits gibt es [hier](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx).

Das Problem ist mittlerweile gefixed und die neue Version deployed. Nun sollte die Seite auch auf älteren IEs wieder besser aussehen. 

Sabine ist bereits dabei die Seite neu zu gestalten…Anpassungen folgen bald.
