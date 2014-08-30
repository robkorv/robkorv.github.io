---
layout: post
title:  "Nginx met SPDY in Ubuntu"
date:   2014-08-17 20:46:23
categories: ubuntu nginx
---

SPDY is een verbetering van het HTTPS protocol en is zo'n 40% sneller. Encryptie
is vereist voor SPDY, het is daarom alleen in productie te gebruiken als er een
geauthoriseerd SSL/TLS sleutel aanwezig is.

SPDY is nog experimenteel, wat niet inhoud dat het niet productie gereed is.
Experimenteel houdt voor SPDY in dat niet elke browser er mee overweg kan. SPDY
is een laag boven op HTTPS, een browser zonder SPDY ondersteuning zal de site via
traditionele HTTPS laden. SPDY wordt overigens in elke moderne browser ondersteund
met uitzondering van Internet Explorer. Google, Facebook, YouTube en Twitter zijn
enkele grote sites die met SPDY serveren.

Met de volgend instructies kan je via Nginx serveren met SPDY.

## Nginx installeren

Het [Nginx team](https://launchpad.net/~nginx) op launchpad verzorgt een up to
date PPA. Hierdoor is de nieuwste stabiele versie altijd beschikbaar, ook als de
versie in de standard Ubuntu repository verouderd is.

```bash
# nginx stable ppa aan het systeem toevoegen
sudo add-apt-repository ppa:nginx/stable
# package list updaten
sudo apt-get update
# nginx installeren
sudo apt-get install nginx
```

Open http://localhost/ en de standaard `Welcome to nginx!` pagina zal laden.

## Nginx configureren

Als voorbeeld, zal de volgende configuratie instructies, de documentatie van
[bootstrap](http://getbootstrap.com/) lokaal hosten met Nginx via SPDY.

### Nginx configuratie layout in Ubuntu

* `/etc/nginx/nginx.conf`
  * Basis instellingen beheerd door het Nginx team.
* `/etc/nginx/sites-available/`
  * Site specifieke configuraties, oftewel virtual host configs. Deze erven de
  instellingen uit `nginx.conf`.
* `/etc/nginx/sites-enabled/`
  * Symlinks naar virtual hosts uit `/etc/nginx/sites-available/`, een virtual
  host die hier gelinkt is wordt opgepakt door Nginx.

Zo wordt de `Welcome to nginx!` pagina door Nginx gehost.

```bash
ls -lah /etc/nginx/sites-available/
# totaal 12K
# drwxr-xr-x 2 root root 4,0K aug 27 22:19 .
# drwxr-xr-x 5 root root 4,0K aug 27 22:19 ..
# -rw-r--r-- 1 root root 2,6K apr 24 18:23 default

ls -lah /etc/nginx/sites-enabled/
# totaal 8,0K
# drwxr-xr-x 2 root root 4,0K aug 27 22:19 .
# drwxr-xr-x 5 root root 4,0K aug 27 22:19 ..
# lrwxrwxrwx 1 root root   34 aug 27 22:19 default -> /etc/nginx/sites-available/default

# default uitzetten
sudo rm /etc/nginx/sites-enabled/default
sudo service nginx restart
# * Restarting nginx nginx
#   ...done.
# http://localhost/ zal nu niets laden.

# default aanzetten
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
sudo service nginx restart
# * Restarting nginx nginx
#   ...done.
# http://localhost/ zal nu weer default laden.
```

---

### lees meer

[SPDY is an experiment with protocols for the web](http://www.chromium.org/spdy)  
[Can I use SPDY?](http://caniuse.com/#feat=spdy)  
[Guide to Nginx + SSL + SPDY](https://www.mare-system.de/guide-to-nginx-ssl-spdy-hsts/)  
[Nginx Configuration](http://wiki.nginx.org/Configuration)
