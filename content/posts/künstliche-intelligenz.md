---
title: "Der aktuelle Stand der künstlichen Intelligenz: Transformer und darüber hinaus"
date: 2024-02-27
language: de
author: Lukas Eppler
tags:
  - Künstliche Intelligenz
  - Ray Kurzweil
  - Transformer
  - Maschinelles Lernen
---

**1. Warum Künstliche Intelligenz?**

Künstliche Intelligenz (KI) hat das Ziel, menschenähnliche Intelligenz in Maschinen zu replizieren. Dies beinhaltet die Fähigkeit, komplexe Aufgaben zu lösen, zu lernen und sich anzupassen, und sogar kreativ zu sein.

Die Auswirkung der generativen KI ist erheblich. Eine kürzliche [McKinsey-Umfrage](https://www.mckinsey.com/de/news/presse/genai-ist-ein-hilfsmittel-um-die-produktivitaet-zu-steigern-und-das-globale-wirtschaftswachstum-anzukurbeln) hebt hervor, dass drei Viertel aller Befragten erwarten, dass generative KI innerhalb der nächsten drei Jahre signifikante oder disruptive Veränderungen in der Wettbewerbslandschaft ihrer Branche verursachen wird. Die Einführung von gen KI wird voraussichtlich besonders transformativ in wissensbasierten Branchen sein, wie Technologie, Finanzdienstleistungen und Pharmazeutika, aufgrund ihrer Stärken in sprachbasierten Aufgaben​​.

Die Landschaft der künstlichen Intelligenz (KI) entwickelt sich in einem enormen Tempo. Eine der bemerkenswertesten Fortschritte ist die Generierung realistischer Videoinhalte, vergleichbar mit Produkten professioneller Animationsstudios (siehe zum Beispiel [Sora](https://openai.com/sora)). Aber auch die textbasierten Chatbots entwickeln sich in rasender Geschwindigkeit.

In der Flut von Neuigkeiten ist es schwierig zu verstehen was überhaupt grundsätzlich passiert, und wie die Entwicklungen für uns relevant oder interessant sein kann.

In diesem Blogpost möchte ich eine Navigationshilfe bieten. Wir werfen einen kurzen Blick auf die Geschichte der KI, von den Anfängen in den 1980er Jahren bis zum "KI-Winter" und der anschliessenden Wiederbelebung in letzter Zeit. Wir diskutieren, warum KI heute so wichtig ist und wie die generative KI verschiedene Branchen beeinflusst. Wir betrachten die bemerkenswerten Prognosen von Ray Kurzweil, einem bekannten Futuristen und Erfinder, über die Zukunft der KI.

Wir diskutieren die neuesten Fortschritte, insbesondere die Entwicklung von "Transformern", und wie sie die Art und Weise, wie wir über KI und maschinelles Lernen denken, grundlegend verändert haben. Wir betrachten auch die Fähigkeit von Transformern, Bilder zu generieren, und die Rolle des "Finetuning" und "RAGs" bei der Entwicklung von Chatbots. Und wir diskutieren, wie das jetzt nutzbringend eingesetzt werden kann.

**Die Geschichte der KI: Voraussagen von Ray Kurzweil**

Ray Kurzweil ist ein bekannter Futurist und Erfinder, der für seine präzisen Voraussagen über technologische Entwicklungen bekannt ist, und einer meiner Referenzpersonen wenn es um Zukunftsvisionen geht. Er hat eine beeindruckende Erfolgsbilanz bei der Vorhersage technologischer Entwicklungen:

1. **Das Wachstum des Internets:** Kurzweil prognostizierte in den 1980er Jahren, dass das Internet die Welt verändern würde, lange bevor es Mainstream wurde. Er beschrieb es als ein Netzwerk, welches jeder und jeden miteinander verbindet, ausreichend für Text und später Audio und Video. Er sagte voraus, dass das Internet die Art und Weise, wie wir kommunizieren, Geschäfte machen und Informationen austauschen, revolutionieren würde.

2. **Die Dominanz mobiler Geräte:** Kurzweil sagte (auch 1980) voraus, dass mobile Geräte und drahtlose Kommunikation dominieren würden, und insbesondere, dass wir ab 2010 Computer in Alltagsgegenstände und Schmuck einbauen würden. Heute sind Smartphones, Tablets und Smart Watches allgegenwärtig, und der Oura-Ring kann man wohl auch als Schmuck bezeichnen.

3. **Die Rolle der Künstlichen Intelligenz:** Kurzweil hat immer betont, dass Künstliche Intelligenz (KI) eine entscheidende Rolle in unserer Zukunft spielen wird. Heute ist KI in vielen Aspekten unseres Lebens präsent, von unseren Smartphones bis hin zu unseren Autos und Häusern.

Kurzweil hat vorausgesagt, dass wir bis 2029 Maschinen haben werden, die den Turing-Test bestehen, was bedeutet, dass sie menschenähnliche Intelligenz aufweisen. Kurzweil glaubt, dass diese Maschinen in der Lage sein werden, jede intellektuelle Aufgabe zu erfüllen, die ein Mensch kann.

Darüber hinaus prognostiziert Kurzweil, dass wir bis 2045 die Singularität erreichen werden - einen Punkt, an dem die technologische Entwicklung so schnell voranschreitet, dass sie das menschliche Verständnis übersteigt. An diesem Punkt, so Kurzweil, werden Maschinen die Haupttreiber des technologischen Fortschritts sein, und die menschliche Zivilisation wird sich auf unvorstellbare Weise verändern. Was immer wir über solche Voraussagen denken, es ist es wohl wert sich Gedanken zu machen wo wir uns dann persönlich befinden, und wie wir uns in einer solchen Welt einbringen wollen.

Die Genauigkeit der Voraussagen basieren auf der Idee, dass technologische Fortschritte exponentiell und nicht linear sind, also einen gewissen Prozentsatz pro Jahr ausmachen. Das funktioniert dann ein bisschen wie die Zinseszins-Rechnung. Und wir haben wenig Intuition für exponentielle Prozesse: Wenn ein Waldweiher von Algen übernommen wird welche sich alle zwei Tage verdoppeln, sieht es eine Woche vor dem Kollaps des Weihers noch ganz in Ordnung aus. Damit sind für viele Menschen technologische Entwicklungen "plötzlich da" gewesen - das Internet, selbstfahrende Autos, oder eben AI.

**2. Wo war die KI bisher?**

In den 1980er Jahren erlebte die KI einen enormen Aufschwung. Die Technologie war neu und aufregend, und viele (auch ich) glaubten, dass sie das Potenzial hatte, in nächster Zeit die Welt zu verändern.

Es gab in dieser Zeit einige bemerkenswerte Fortschritte. Expertensysteme, die in der Lage waren, menschliches Wissen in bestimmten Bereichen zu emulieren, wurden entwickelt und in einer Vielzahl von Anwendungen eingesetzt, von medizinischen Diagnosesystemen bis hin zu Börsenhandelsprogrammen. Es gab auch Fortschritte in der maschinellen Lernforschung, insbesondere in den Bereichen neuronale Netze und genetische Algorithmen.

Aber dann kam das, was nun als "KI-Winter" bekannt ist. Der Enthusiasmus der 1980er Jahre verblasste, als die Technologie ihre Versprechen nicht erfüllen konnte. Viele der damals entwickelten Systeme waren zu teuer, zu unzuverlässig oder einfach zu schwierig zu benutzen. Die Investitionen in die KI-Forschung und -Entwicklung gingen zurück, und viele glaubten, dass die KI eine Sackgasse war.

Das war aber nicht das Ende. In den 1990er Jahren und 2000er Jahren gab es eine langsame, stille, stetige Wiederbelebung des Interesses an der KI. Mit der Entwicklung des Internets und der Verbesserung der Computerhardware wurden neue Möglichkeiten für die Anwendung von KI-Technologien eröffnet. Und mit dem Aufkommen von Big Data und maschinellem Lernen hat die KI in den letzten Jahren einen beispiellosen Aufschwung erlebt.

**3. Was ist jetzt geschehen?**

Die jüngsten Fortschritte in der KI basieren auf der Idee von "Transformern".  Die Idee der "Transformer" wurde erstmals in dem Paper "Attention is All You Need" von Vaswani et al. im Jahr 2017 eingeführt. Dieses Paper stellte eine neue Methode zur Verarbeitung von Sequenzen vor, die auf dem Konzept der "Aufmerksamkeit" basiert. 

**Die Transformer: Eine extreme Form der Tab-Completion**

Die Transformer-Technologie kann man sich wie eine extreme Form der Tab-Completion vorstellen, die wir alle von unseren Smartphones und Computern kennen. Wenn wir anfangen, einen Satz zu tippen, schlägt uns das Gerät basierend auf dem, was wir bisher getippt haben, eine mögliche Fortsetzung des Satzes vor.  Dabei geht die Transformer-Technologie einige Schritte weiter. Sie analysiert nicht nur die unmittelbar vorhergehenden Wörter, sondern den gesamten Kontext, in dem ein Wort oder eine Phrase erscheint. Sie kann also den Kontext eines ganzen Absatzes oder sogar eines ganzen Dokuments berücksichtigen, um die wahrscheinlichste Fortsetzung eines Satzes vorzuschlagen. So wurde das System trainiert, und so wird immer nur genau das nächste Wort erstellt. Dass dies so gut funktioniert und so intelligent wirkt, ist tatsächlich sehr überraschend.

Die Transformer-Technologie ist das Herzstück vieler moderner KI-Modelle, einschliesslich des bekannten GPT-Modells von OpenAI. Diese Modelle sind in der Lage, menschenähnliche Texte zu generieren, die in ihrem Kontext sinnvoll und kohärent sind. Sie können sogar kreativ sein und neue Ideen und Konzepte generieren, die auf dem Kontext basieren, in dem sie verwendet werden.

Transformer haben die Art und Weise, wie wir über KI und maschinelles Lernen denken, grundlegend verändert. Sie sind ein Schlüsselwerkzeug in der aktuellen KI-Forschung und -Entwicklung.

Darüber hinaus ermöglichen Transformer auch die Entwicklung von Netzwerken wie Midjourney, die Bilder generieren und analysieren können, oder das oben erwähnte Sora für Filme. Auch für Musik gibt es Netzwerke.

**Wie ist ein Transformer fähig, Bilder zu generieren?**

Die Fähigkeit von Transformern, Bilder zu generieren, basiert auf der gleichen Grundidee wie die Textgenerierung: Sie analysieren den Kontext und versuchen, die wahrscheinlichste Fortsetzung zu finden. In diesem Fall ist der "Kontext" jedoch kein Text, sondern ein Bild oder ein Teil eines Bildes.

Ein Transformer, der für die Bildgenerierung trainiert wurde, kann ein Bild analysieren und basierend auf diesem Kontext ein neues Bild oder einen Teil eines Bildes generieren. Dies kann zum Beispiel verwendet werden, um fehlende Teile eines Bildes zu ergänzen, ein Bild in einem bestimmten Stil neu zu zeichnen oder sogar völlig neue Bilder zu erstellen. Dies kann schrittweise geschehen, von einer Wolke von zufälligem Chaos langsam zu einem kohärenten Bild.

**Finetuning**

Ein Chatbot muss aus dem Stegreif direkt Antwort geben, analog einer mündlichen Prüfung ohne mitgebrachte Unterlagen. Da die Chatbots nur auf allgemein zugänglichem Wissen trainiert wurden, können sie nur Auskunft geben über Dinge, welche allgemein bekannt sind. Eine Möglichkeit das Wissen zu erweitern wäre das weitertrainieren des Netzwerks mit privaten Daten. Das Trainieren eines gesamten Netzwerks ist jedoch eine sehr teure Aktivität und lohnt sich oft nicht für eine einzelne Anwendung.

Es gibt jedoch Alternativen: Das sogenannte "Finetuning", und die "RAG"-Methode (Retrieval-Augmented Generation). Diese Techniken ermöglichen es, spezifische Daten von Unternehmen in die Modelle zu integrieren, um bessere und informiertere Antworten zu liefern, ohne ein Netzwerk neu trainieren zu müssen.

Das Finetuning hat in dieser Analogie die Funktion, den Bot in einen Kurs zu schicken: Das Allgemeinwissen ist schon da, und der Bot lernt aus einer Menge von Fragen und Antworten, wie diese Beispielfragen richtig beantwortet werden, um dann auf neue Fragen vorbeitet zu sein. Es ist in diesem Sinne ähnlich wie die Fallstudie-Methode von Harvard: Gib den Lernenden genügend Beispiele, lass sie Voraussagen machen, gib Feedback über erfolgreiche und erfolglose Strategien, und wiederhole das Ganze hunderte Male. Die Finetuning-Methode funktioniert gut wenn man strukturierte Daten hat, wie zum Beispiel Produktlisten, Buchbeschriebe, oder FAQs.

Der neueste Trick ist jedoch die RAG-Methode: Dabei kommen Embeddings zum Zug, und dazu möchte ich nochmals etwas ausholen.

**I have a dream...**

Stelle dir vor, du schaust dir den Film von Martin Luther Kings Rede "I have a dream..." an. Du wirst unmittelbar nachdem du den Film gesehen hast deinen Verstand in einen anderen Zustand versetzt haben. Dies beeinflusst deine Entscheidungen und Aussagen: Du würdest gewisse Dinge anders betrachten, anders beurteilen, und anders agieren. Wenn man diesen Zustand als Vektor aus deinem Kopf herausnehmen könnte, wäre das ein Embedding.

Einer KI kann man ein Buch zeigen, einen Film, eine Seite eines PDF-Dokumentes, und es wird hierzu einen Vektor erstellen können mit ein paar tausend Zahlen. Diese Zahlen repräsentieren die Essenz des Buchs oder der PDF-Seite. Es stellt sich nun heraus, dass Themen die inhaltlich nahe beieinanderliegen, auch Vektoren erstellen die nahe beieinanderliegen. Damit bekommen wir ein Instrument in die Hand, welches uns erlaubt, mit grossen Datenmengen strukturiert umzugehen.

Ein RAG macht nun folgendes: Wenn die Benutzerin eine Frage stellt, wird diese Frage auch vektorisiert, in ein Embedding verwandelt. Sagen wir, wir haben eine Bibliothek von Büchern mit Zusammenfassungen - der den gesamten Inhalten - vektorisiert. Nun fragen wir "Welche grossen Denker haben das Konzept der Gewaltlosigkeit geprägt?" - Der Vektor dieser Frage wäre dann zum Beispiel nahe beim Buch "Stride Toward Freedom: The Montgomery Story" von Martin Luther King. Die Zusammenfassung des Buches kann nun Teil der Frage werden. In der Zusammenfassung wird King's Argument vorkommen, dass Gewaltlosigkeit nicht passiv, sondern eine aktive Form des Widerstands gegen Ungerechtigkeit ist. Und damit kann der Chatbot arbeiten.

In der Realität werden dutzende Seiten zu Hilfe genommen. Der Bot kann sozusagen zuerst in die Bibliothek bevor die Frage beantwortet werden muss. Die RAG-Methode funktioniert besonders gut bei lesbaren Texten (PDFs, Word), aber mit Zusatzmitteln können auch grafische Unterlagen (Pläne) verwendet werden.

Mit der RAG-Methode können "Halluzinationen" - inkorrekte Antworten, die von KI-Modellen generiert werden - reduziert werden. Durch die Kombination von Textgenerierung mit Informationsabruf verbessert RAG die Genauigkeit und das Kontextbewusstsein von KI-generierten Inhalten. Dies macht es besonders nützlich für Unternehmensanwendungen, bei denen faktische Genauigkeit entscheidend ist.

**4. Was kann man jetzt damit tun?**

Die Integration von KI in bestehende Webanwendungen ist heute einfacher denn je. Für Entwickler ist KI nur ein weiteres Interface, das man nutzen kann, um leistungsfähige und effiziente Lösungen zu erstellen. Aber für Kunden kann KI eine Revolution bedeuten, indem sie Aufgaben automatisiert, die früher viel manuelle Arbeit erforderten.

Stell dir vor, du betreibst einen Online-Shop. Mit KI kannst du automatisch Produktbeschreibungen generieren, basierend auf den Merkmalen des Produkts. Oder du kannst ein KI-Modell verwenden, um personalisierte Produktempfehlungen für jeden Kunden zu erstellen, basierend auf deren bisherigem Kaufverhalten und Präferenzen.

Oder nimm das Beispiel eines Kundenservice-Centers. Mit KI kannst du einen Chatbot erstellen, der einfache Kundenanfragen automatisch beantwortet, ohne dass ein menschlicher Agent eingreifen muss. Dies kann die Effizienz deines Kundenservice erheblich steigern und gleichzeitig die Wartezeiten für deine Kunden reduzieren.

Diese Beispiele sind nur die Spitze des Eisbergs. Mit KI eröffnen sich unzählige Möglichkeiten, um deine Geschäftsprozesse zu verbessern und deinen Kunden einen besseren Service zu bieten. Es ist an der Zeit, diese Möglichkeiten zu erkunden und zu nutzen.

**Die Zukunft wird grossartig**

In der Zukunft werden nicht Maschinen den Menschen Arbeit abnehmen. Aber Menschen mit Maschinen sind als Symbiose stärker als Menschen alleine, aber auch als Maschinen alleine. Das war schon immer so, nun wird dies einfach noch wichtiger: Die Kombination von menschlicher Kreativität und maschineller Effizienz wird uns in die Lage versetzen, bisher unvorstellbare Aufgaben zu bewältigen und neue Höhen der Produktivität und Innovation zu erreichen.

Die KI-Technologie ist ein mächtiges Werkzeug, das uns dabei helfen kann, unsere Ziele zu erreichen. Aber es ist wichtig zu betonen, dass KI nur ein Werkzeug ist. Es ist kein Ersatz für menschliche Intelligenz, Kreativität oder Urteilsvermögen. Es ist ein Werkzeug, das wir nutzen können, um unsere Fähigkeiten zu erweitern und unsere Arbeit effizienter und effektiver zu machen.

Die Zukunft der KI ist also nicht eine Welt, in der Maschinen die Menschen ersetzen. Es ist eine Welt, in der Menschen und Maschinen zusammenarbeiten, um gemeinsam Grossartiges zu erreichen. Es ist eine Welt, in der die KI uns dabei hilft, das Beste aus unseren menschlichen Fähigkeiten zu machen und unsere Ziele schneller und effizienter zu erreichen.

Die Zukunft wird grossartig, und wir haben die Möglichkeit, diese Zukunft zu gestalten. Lass uns diese Möglichkeit nutzen und gemeinsam eine bessere, effizientere und kreativere Welt schaffen.

Interessiert? Oben klicken und Kontakt aufnehmen. :-)
