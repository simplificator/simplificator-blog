---
title: "MS Access und Ruby?"
date: 2014-02-24
---

Auch das geht.

Während MS Access sicher nicht zu unseren favorisierten Tools gehört um Daten zu verarbeiten, so kann es trotzdem vorkommen, dass unsere Kunden Applikationen auf Access Basis betreiben.

Access kann diverse Datenquellen nutzen unter anderem Datenbanken welche direkt in der MDB Datei eingebettet sind.

Sollen nun solche Daten von aussen bearbeitet, ergänzt oder gelöscht werden, so kann dies ohne grossen Aufwand via SQL erfolgen. Dazu muss nur eine DSN eingerichtet (die geübten Entwickler können das natürlich auch auf Linux versuchen, z.B. mit libmdbodbc, wir haben das ganze auf einem Windows Server gemacht) und, schon etwas komplizierter, ruby mit odbc zum laufen bekommen werden.

Aus historischen Gründen müssen wir Ruby 1.8.7 verwenden, odbc sollte durch folgende Schritte zum laufen bekommen werden

1. Download [http://www.ch-werner.de/rubyodbc/i386-msvcrt-ruby-odbc.zip](http://www.ch-werner.de/rubyodbc/i386-msvcrt-ruby-odbc.zip)
2. Kopiere den Inhalt des Zipfiles nach C:ProgramsRuby187libruby1.8i386-mingw32 (und ja: es macht weniger Probleme wenn Ruby in einem Verzeichnis ohne Spaces installiert ist)
3. gem install dbi
4. gem install dbd-odbc
5. Das wars.

Testen:

in irb

> require ‘rubygems’  
> require ‘dbi’
> 
> username = nil # depends on the DSN  
> password = nil # depends on the DSN
> 
> DBI.connect(‘dbi:odbc:DSN\_NAME’, username, password) do |connection|
> 
>   res = connection.execute(“SELECT \* FROM SOMETABLE”)  
>   res.each do |row|  
>     ….  
>   end  
>   res.finish
> 
> end

Natürlich fängt der Spass hier erst an, in unserem Use-Case sind noch CSV Import von verschlüsselten Attachments und zwei weitere Datenbanken dabei. Stundenweise Spass mit falsch encodierten Dateien und SQL Server sind garantiert:-)

Natürlich würde ich persönlich gerne die ganze Access Applikation als Webapplikation neu bauen. Auf aktuellen Technologien aufsetzend und hübsch gestaltet. Aber der Aufwand würde sich aktuell nicht rechtfertigen lassen und dann ist die Wahl via ODBC auf eine Access DB zuzugreifen auch im Sinne des Kunden.
