---
title: "Vaults with Ansible"
date: 2017-03-30
---

When it comes to software versioning, you normally do not want to upload passwords or secrets into shared repositories. Too many people might have access to the code, and it's irresponsible to have secrets there without protection.

On the other hand, you actually do want to share such secrets among certain co-workers (the "circle of trust", implying that all other co-workers are not trustworthy 😉).

So, what we want are "protected" secrets in our versioning control system, that only the circle of trust has access to.

We are going to identify our files to be protect and encrypt them with [Ansible](https://www.ansible.com/). The encryption bases on a password, that we share with the people who may know our secrets. So, this password is chosen once and used for the same file "forever".

## Encrypt 🔐

Let's say we store our secrets in a file named `secrets.yml`, and the content looks like this

\[code lang="text"\] favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West \[/code\]

_Obviusly_ no one should ever know that we like those artists, but the circle of trust may know, if necessary.

Now we can use `ansible-vault encrypt` to encrypt our secrets.

\[code lang="shell"\] pi@raspberrypi:~ $ cat ./secrets.yml favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West

pi@raspberrypi:~ $ ansible-vault encrypt ./secrets.yml Vault password:   # enter a vault password here Encryption successful

pi@raspberrypi:~ $ cat ./secrets.yml $ANSIBLE\_VAULT;1.1;AES256 38373634613533646632343139633431313465386136613231316163633965623832313832623830 6537656536393339626161616632633062656161346630360a653833373033643565313632386338 34623537393861623236666132356231656165393033633035333338306436376563383234383030 3330346664326339300a313565313933333464643436353130363539666534323634346439636433 33396636353461653436613764373861396133623833386436303536636363333737653136656165 31643164303564373861343239643038656161346562343236323761663335363465633833363436 61373966343633663531653932326239346438626330653265343739646561346431323966313132 64626134356535366562

\[/code\]

Behold where it asks to enter a vault password (`# enter a vault password here`). We've chosen a wise, complicated password (= `foo`), and can now share this with the people in the circle of trust.

Further, we can check in `secrets.yml` and upload it to our versioning control system.

## Decrypt

Of course, at some point we will have to decrypt `secrets.yml`, we do this:

\[code lang="shell"\] pi@raspberrypi:~ $ ansible-vault decrypt ./secrets.yml Vault password:    # enter the vault password here Decryption successful

pi@raspberrypi:~ $ cat ./secrets.yml favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West \[/code\]

That's the whole magic.

## One more thing

Don't be confused that you'll get different contents of encrypted files, without changing the original content (and same vault password).

Eencrypt the file with `foo` twice, save the corresponding outputs to ./secrets1.yml and ./secrets\\2.yml

\[code lang="shell"\] pi@raspberrypi:~ $ cat ./secrets.yml favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West

pi@raspberrypi:~ $ ansible-vault encrypt ./secrets.yml --output=./secrets1.yml Vault password:  # &quot;foo&quot; goes here Encryption successful

pi@raspberrypi:~ $ ansible-vault encrypt ./secrets.yml --output=./secrets2.yml Vault password:  # &quot;foo&quot; goes here too Encryption successful \[/code\]

Compare the files: secrets1.yml and secrets2.yml

\[code lang="text"\] pi@raspberrypi:~ $ cat ./secrets1.yml $ANSIBLE\_VAULT;1.1;AES256 39356232653735336132323762643366336530666334333039373265336334373635336665643965 3230336463613962363730393530316566313432613761650a636666623132323462323466613164 62316434663763613637666133626536633639616362313236383964363331616436353331363631 3336343339363733390a343034616365323163346231303065393065313039373837393264363361 35343961623165383037626231333061316263626431623361323164333235393835363262363438 61626433323032323261376261303536313534663861623638383235343566353532393736396464 65326337346562633330366134633731643930323364333730316533383432643266373464633863 30356437636633363465

pi@raspberrypi:~ $ cat ./secrets2.yml $ANSIBLE\_VAULT;1.1;AES256 65323662356530333862393965386137666539636262656332323535363934343033363633353831 3738666430363738386465306134316333383734633762350a616433656465343866613766643237 33636537303962366131363965326637333633333161616562346334663134343666666266646264 6166366564313431370a353630363635643865346138613634633833653863376561336638386138 32616536646165313034303938343863316630373731353730326330306231653532306363366634 31376437643539646464636635306365653962666262623637303335613230383133326363383432 65626162303735303863373031396537363837626461613363336537323362653163663735303931 37633961326136663162

\[/code\]

Encrypted, they are not identical, but still they can both be decrypted with `foo`, eventually with the same result.

\[code lang="shell"\] pi@raspberrypi:~ $  ansible-vault decrypt ./secrets1.yml Vault password: Decryption successful

pi@raspberrypi:~ $  ansible-vault decrypt ./secrets2.yml Vault password: Decryption successful

pi@raspberrypi:~ $  cat ./secrets1.yml favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West

pi@raspberrypi:~ $  cat ./secrets2.yml favorite\_artists: - Lady Gaga - Justin Bieber - Kanye West \[/code\]
