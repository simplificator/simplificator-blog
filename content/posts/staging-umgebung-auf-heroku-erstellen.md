---
title: "Staging Umgebung auf Heroku erstellen"
date: "2014-01-06"
---

Für einige Kunden verwenden wir das Rails Hosting von [heroku](http://heroku.com). Es bietet sich dann an, auch die staging Umgebung auf heroku zu betreiben damit keine wesentlichen Unterschiede zur produktions Umgebung bestehen.

Ein paar Schritte reichen dazu:

1. Staging App erstellen
2. Add-Ons hinzufügen, bei beiden Umgebungen mindestens pgbackups installieren
3. Umgebung setzen:   
    _heroku config:set RACK\_ENV=staging RAILS\_ENV=staging —app name-der-staging-app_
4. DB\_URL herausfinden (z.B. HEROKU\_POSTGRESQL\_RED\_URL)_: heroku config —app name-der-staging-app_
5. Datenbank von Produktion nach Staging kopieren: _heroku pgbackups:restore <DB\_URL> -a name-der-staging-app \`heroku pgbackups:url -a name-der-production-app\`_
6. Evtl. S3 Buckets Kopieren:  
    _s3cmd sync —skip-existing —recursive s3://source-bucket-name s3://target-bucket-name_  
    (vorgängig s3cmd installieren)
7. Evtl. S3 Permissions im neuen Bucket anpassen.
8. Fertig
