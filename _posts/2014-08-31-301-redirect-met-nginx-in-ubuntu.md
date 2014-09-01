---
layout: post
title:  "301 Redirect met Nginx in Ubuntu"
date:   2014-08-31 21:18:40
categories: ubuntu nginx virtualhost redirect
---

Een 301 is een HTTP status code waarmee je aan de client doorgeeft dat het bezochte
adres permanent is verhuist naar een ander adres. Dit is ook de manier om aan
zoekmachines door te geven dat een url is verplaatst. Handig bij domein wijzigingen
en url aanpassingen dus.

De volgend instructies zijn geschreven voor `nginx/1.6.0`. Lees
[Nginx installeren]({{ site.baseurl }}/nginx-met-spdy-in-ubuntu/#nginx-installeren)
voor instructies om de meest recente Nginx te installeren in Ubuntu.

Redirecten met Nginx gaat via een virtualhost.

## Nginx redirect virtual host

Als voorbeeld, zal de volgende instructies http://btstrp.localtest.me redirecten
naar http://bootstrap.localtest.me. Zie
[Nginx http virtual host]({{ site.baseurl }}/nginx-met-spdy-in-ubuntu/#nginx-http-virtual-host)
voor de vhost waarnaartoe geredirect wordt.

Maak `/etc/nginx/sites-available/btstrp-redirect` aan met de volgende inhoud.

```nginx
server {
    server_name btstrp.localtest.me;
    return 301 http://bootstrap.localtest.me$request_uri;
}
```

```bash
# symlink de vhost naar sites-enabled
sudo ln -s /etc/nginx/sites-available/btstrp-redirect /etc/nginx/sites-enabled/
# herstart nginx
sudo service nginx restart
```

Open http://btstrp.localtest.me en zie dat deze geredirect wordt. Het hele url
wordt geredirect, http://btstrp.localtest.me/examples/carousel/ zal dezelfde locatie
openen op bootstrap.localtest.me.

---

### lees meer
[HTTP 301 - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/HTTP_301)
