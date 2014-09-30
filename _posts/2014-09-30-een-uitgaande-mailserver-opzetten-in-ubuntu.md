---
layout: post
title: Een uitgaande mailserver opzetten in Ubuntu
date: "2014-09-30 16:14"
categories: ruby ubuntu
---

Web applicaties vesturen vaak mailtjes. Denk aan het bevestigen van een account,
wachtwoord opvragen, o.i.d. Hiervoor is geen volwaardige mailserver nodig, een
server die enkelt mail verstuurd is voldoende. De volgende instructies zorgen
ervoor dat zo'n server wordt opgezet.

## Mailserver installeren en configureren

In plaats van apt-get wordt er tasksel gebruikt. Tasksel installeerd niet alleen
packages, hij stelt ze ook voor je in. Tasksel toond waar nodig een wizard om
de juiste instellingen per situatie te laden. Tasksel zal voor de mailserver
vragen voor welke situatie deze wordt gebruikt

```bash
# mailserver via tasksel installeren
sudo tasksel install mail-server
```

Kies tijdens de installatie voor `Internetsite`. Vervolg de wizard.

Let wel op dat als de mailserver een bepaald domein vertegenwoordigd dit goed wordt
ingesteld. Als dit niet goed wordt ingesteld zullen de mails altijd in de spambox
van de ontvanger terecht komen. Voor een locale ontwikkel server kan je de al aanwezige
instellingen gebruiken, kijk dan wel in je spambox als je mail verwacht.

Maak een self-signed certificate aan, de mailserver wordt niet extern benaderd maar
is wel een basis instelling.

## Testen

Stuur vervolgens een test mailtje via de terminal, vergeet niet het email adres
te wijzigen.

```
echo "Dit is de inhoud van een testmail" | mail -s "Dit is het onderwerp van de testmail" "aan@mailadres"
```

---

### lees meer
[Handleiding Ubuntu-server: Email Services](https://help.ubuntu.com/14.04/serverguide/email-services.html)
