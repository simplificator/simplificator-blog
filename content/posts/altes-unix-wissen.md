---
title: "Altes UNIX-Wissen"
date: "2012-06-25"
---

Ein ganz alter Blog Post wurde letzthin plötzlich wieder relevant - aber er war nirgends mehr online.

Niedergeschrieben für alle Zeiten :-)

## Wie man eine Hardisk wechselt, ohne die Daten zu verlieren.

godot 15. Juli 1999

Gegeben: `cpio`, `tar`, `dd`, ein Netzwerk, und eine Harddisk, die ihren Job bald aufgibt mit wichtigen Daten, und eine schöne neue schnelle Harddisk.

1. Falls man beide Harddisks einbauen kann:

Die ‘alte’ Harddisk sei in `/`, die neue in `/mnt` gemountet. Der Super- Befehl ist nun

```
cd /
find . -xdev | cpio -padm /mnt

```

- `-xdev` : nur Mountpoints, nicht der reingemountete Inhalt wird kopiert.
- `-p` : der ‘copy-pass’-mode von cpio: nicht von einem Archiv und nicht in ein Archiv, sondern von Filestruktur nach Filestruktur.
- `-a` : Access Times werden zurückgesetzt; die Files sind wie nie gelesen.
- `-d` : Erzeuge eventuell fehlende Verzeichnisse.
- `-m` : Preserve Modification Time: Die neuen Files sind nicht dann als verändert markiert, sondern wie früher.

Danach muss die `fstab` angepasst werden, eventuell `lilo` laufen gelassen werden (siehe ‘chroot’, unten).

1. Falls man nicht beide Harddisks einbauen kann:

Das Archiv muss im Netz ausgelagert werden. Irgendwo muss genug Platz vorhanden sein. Wir nehmen an, auf jukebox.fear.ch befindet sich im homedir von eisbaer Platz, und rsh muss gehen. Dafür muss in /home/eisbaer/.rhosts

akira.fear.ch root akira.fear.ch eisbaer

stehen, und das File mit chmod 600 .rhosts für andere zugemacht werden (sonst wird man nicht reingelassen). Testen: als root auf akira rsh -l eisbaer jukebox.fear.ch date.

Der Superbefehl lautet hier

```
cd /
find . -xdev | cpio -oa -H newc 
| rsh -l eisbaer jukebox.fear.ch "cat &gt;/home/eisbaer/akira.cpio"

```

\* `-xdev` : siehe oben. \* `-o` : copy-out mode von cpio (klingt falschrum: lese ‘copy out of filesystem). \* `-a` : reset access times. siehe oben. \* `-H newc`: Dies ist speziell. Da wir heutzutage Filesystems haben mit mehr als 65535 Files, reicht der alte Standard nicht mehr. Mit dem newc-fileformat keine Probleme. (wirklich!) \* `rsh` : Da cat auf syrinx läuft, wandert der standard-out von cpio von akira zu standard-in von syrinx. \* (  : Eine Bash-Konforme Art eine Zeile zu spalten. Weglassen und zusammenhängen.)

Nach diesem Befehl befindet sich der Harddiskinhalt im .cpio-Archiv. Wenn man knapp ist an Platz kann man gzip zwischenschalten (geht aber meistens länger): find . -xdev | cpio -oa -H newc | gzip - | rsh -l eisbaer jukebox.fear.ch “cat >/home/eisbaer/akira.cpio.gz”

Das Zurückspielen auf die neue Platte geht nur, wenn sie nicht selbst in Betrieb ist (sie muss im `/mnt` gemountet sein, während das System auf einer Bootdisk, einer anderen Partition (vielleicht auf der, wo noch ein Windows hinkommt?) oder einer CD ist). Eine Bootdisk, welche Netz und pcmcia und `cpio` und alles hat, ist z.b. tomsrtbt (suchen im Netz).

Dann heisst der Superbefehl cd /mnt rsh -l eisbaer jukebox.fear.ch “cat /home/eisbaer/akira.cpio” | cpio -idm -H newc

oder wenn das archiv gezippt ist

```
rsh -l eisbaer jukebox.fear.ch "cat /home/eisbaer/akira.cpio.gz" 
| gunzip - | cpio -idm -H newc

```

\* `-i` : copy-in mode (copy into the filesystem). Also aus dem Archiv lesen. \* `-d` : erzeuge eventuell fehlende Directories. \* `-m` : Modification time wie vorher (siehe oben). \* `-H newc` :Siehe oben (das gute fileformat). Nach diesem Befehl ist das .cpio-Archiv ausgepackt in `/mnt`.

Um die Festplatte dann in Betrieb zu nehmen, muss man man noch das fstab gegenenenfalls ändern, da die neue Festplatte vielleicht nicht auf dieselben Namen hört wie die alte.

Auch muss man mit dem neuen System den Lilo wieder richtig konfigurieren, wenn die Platten anders heissen sollten.

Speziell am Ganzen ist (gegenüber anderen Lösungen mit tar und sonstigem):

Keine Probleme mit den `/dev/`'s . Geht einfach. Werden kopiert (nicht der inhalt der devices, wär ja falsch, aber die nodes.) Keine Probleme mit Links, die ins Kraut zeigen. Die absoluten Links im `/mnt` zeigen halt auf `/` und nicht auf `/mnt`, aber das ist ja perfekt wenn nach einem Reboot `/mnt` im `/` liegt. Filebasiert (dd braucht dieselbe Plattengrösse, siehe unten). Keine Lämpen mit reingemounteten /dos oder sonstigen Partitionen. Werden nicht kopiert.

Zum Thema dd: dd if=/dev/hda1 of=/root/hda1.dd liest pur und roh die Partition aus. dd if=/root/hda1.dd of=/dev/hda1

spielt pur und roh das Ding zurück. Gut für ein Windows, welches gleich gross bleiben soll (muss).

Zum Thema chroot:

Um lilo die neuen Lokationen bekannt zu machen, muss man eben lilo ausführen. Dies ist aber schwierig wenn alles im /mnt ist….

Der Superbefehl hier ist

```
chroot /mnt           # danach tut /mnt so als wäre es /
lilo                  # welches hoffentlich in /etc/lilo.conf alias
                      # /mnt/etc/lilo/conf alles was es braucht findet
exit                  # exit beendet chroot

```

Das heisst, in der chroot-Umgebung kann man so tun als hätte man schon von der neuen Platte gebootet.

so, damit sollte dies für alle Ewigkeit notiert sein :-)
