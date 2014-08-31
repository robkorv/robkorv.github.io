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

```
# maak een www dir aan in home
mkdir ~/www
# ga in de www dir ~/www
cd ~/www
# download de documentatie zip
wget https://github.com/twbs/bootstrap/archive/gh-pages.zip
# pak de zip uit
unzip gh-pages.zip
# verwijder de gedownloade zip
rm gh-pages.zip
```

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

### Nginx http virtual host

Maak `/etc/nginx/sites-available/bootstrap` aan met de volgende inhoud.

```nginx
server {
        # luister naar de default http port
        listen 80;

        # maak de site beschikbaar op http://bootstrap.localtest.me
        server_name bootstrap.localtest.me;

        # stel de root in op de bootstrap documentatie
        root /home/robkorv/www/bootstrap-gh-pages;

        location / {
                # Probeer de request als bestand te serveren, daarna
                # als directory, daarna terugvallen op 404 foutcode.
                try_files $uri $uri/ =404;
        }
}
```

```
# symlink de vhost naar sites-enabled
sudo ln -s /etc/nginx/sites-available/bootstrap /etc/nginx/sites-enabled/
# herstart nginx
sudo service nginx restart
```

Open http://bootstrap.localtest.me.

### Nginx https virtual host

Voeg het volgende toe in het http directive van `/etc/nginx/nginx.conf`. Hiermee
wordt de cpu wat ontlast doordat er minder SSL handshakes zullen plaatsvinden.

```nginx
http {

        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        ##
        # Basic Settings
        ##

```

De bootstrap vhost ziet er voor https als volgt uit. Let op, deze gebruikt een
zelf gesigneerde certificaat die door Ubuntu is gegenereerd. Gebruik deze
oplossing niet in productie!

```nginx
server {
        # luister naar de default http port
        listen 80;
        # maar redirect http naar https
        if ($scheme = http) {
                return 301 https://$server_name$request_uri;
        }

        # luister naar de https port met ssl
        listen 443 ssl;

        # ssl instellingen
        ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
        ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";

        # geef aan de client door dat alle requests over https moeten gaan
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # maak de site beschikbaar op http://bootstrap.localtest.me
        server_name bootstrap.localtest.me;

        # stel de root in op de bootstrap documentatie
        root /home/robkorv/www/bootstrap-gh-pages;

        location / {
                # Probeer de request als bestand te serveren, daarna
                # als directory, daarna terugvallen op 404 foutcode.
                try_files $uri $uri/ =404;
        }
}
```

Herstart Nginx met `sudo service nginx restart` en open
https://bootstrap.localtest.me. Je krijgt een waarschuwing omdat het certificaat
niet geauthoriseerd is.

### Nginx SPDY virtual host

Voeg `spdy` toe achter `ssl` in de
[Nginx https virtual host](#nginx-https-virtual-host)

```nginx
server {
        # luister naar de default http port
        listen 80;
        # maar redirect http naar https
        if ($scheme = http) {
                return 301 https://$server_name$request_uri;
        }

        # luister naar de https port met ssl
        listen 443 ssl spdy;

```

De volledige Nginx SPDY virtual host ziet er als volgt uit.

```nginx
server {
        # luister naar de default http port
        listen 80;
        # maar redirect http naar https
        if ($scheme = http) {
                return 301 https://$server_name$request_uri;
        }

        # luister naar de https port met ssl
        listen 443 ssl spdy;

        # ssl instellingen
        ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;
        ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";

        # geef aan de client door dat alle requests over https moeten gaan
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # maak de site beschikbaar op http://bootstrap.localtest.me
        server_name bootstrap.localtest.me;

        # stel de root in op de bootstrap documentatie
        root /home/robkorv/www/bootstrap-gh-pages;

        location / {
                # Probeer de request als bestand te serveren, daarna
                # als directory, daarna terugvallen op 404 foutcode.
                try_files $uri $uri/ =404;
        }
}
```


---

### lees meer

[SPDY is an experiment with protocols for the web](http://www.chromium.org/spdy)  
[Can I use SPDY?](http://caniuse.com/#feat=spdy)  
[Guide to Nginx + SSL + SPDY](https://www.mare-system.de/guide-to-nginx-ssl-spdy-hsts/)  
[Nginx Configuration](http://wiki.nginx.org/Configuration)  
[NGINX SSL Termination](http://nginx.com/resources/admin-guide/nginx-ssl-termination/)
