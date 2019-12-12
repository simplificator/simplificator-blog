---
title: "Von Schlangen und Kamelen beim Programmieren"
date: 2013-08-22
language: de
---

Verschiedene Programmiersprachen, verschiedene Konventionen für die Namen von Klassen, Methoden, Variablen. 

Da gibt es uppercase, camelcase, snakecase und dashes. Und natürlich noch dashes/underscore in uppercase, upper-camelcase und so weiter.

Hier ein paar Beispiele:

- Uppercase: TOSTRING, USERNAME
- Uppercase mit Bindestrich: TO-STRING, USER-NAME
- Uppercase mit Unterstrich: TO\_STRING, USER\_NAME
- Camelcase: toString, userName
- Upper Camelcase: ToString, UserName
- Underscore/Snakecase: to\_string, user\_name
- Lowercase mit Bindestrich: to-string, user-name

Das befolgen von Konventionen ist wichtig um die Lesbarkeit des Codes zu erhöhen. Somit kann man sich besser in Code einarbeiten und Fehler vermeiden. Besonders bei Sprachen welche nicht kompiliert sind (ein Compiler merkt, ob man einmal _getUserName_ und ein anderes mal _GetUserName_ schreibt). Auch bei Webapplikationen, wo auf dem Server HTML gerendert wird und dann im Browser mit Javascript manipuliert wird, passieren immer mal wieder Fehler. 

Ein Beispiel:

**HTML**:

_<div class=”node-1234”>Ein Element</div>_

**Javascript:**

_$(“.node\_1234”).hide()_

Dies sieht auf den ersten Blick korrekt aus, aber später wird man feststellen, dass der Javascript Code nicht das macht was man erwartet.

Ich versuchen in meinen Projekten die folgenden Konventionen einzuhalten:

**Ruby:**

Klassen: Upper Camelcase (UserGroup)  
Methoden:  Snakecase (user\_group)  
Konstanten: Uppercase mit Unterstrich (USER\_GROUP)

**HTML/CSS:**

id: Lowercase mit Bindestrich (#user-group)  
class:Lowercase mit Bindestrich (.user-group)  
  

**Javascript:**

Klassen: Upper Camelcase (UserGroup)  
Methoden: Camelcase (userGroup)
