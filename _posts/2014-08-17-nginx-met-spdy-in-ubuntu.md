---
layout: post
title:  "Nginx met SPDY in Ubuntu"
date:   2014-08-17 20:46:23
categories: ruby nginx
---

SPDY is een verbetering van het HTTPS protocol en is zo'n 40% sneller. Encryptie
is vereist met SPDY, het is daarom alleen in productie te gebruiken als er een
geauthoriseerd SSL/TLS sleutel aanwezig is.

SPDY is nog experimenteel, wat niet inhoud dat het niet productie gereed is.
Experimenteel houdt voor SPDY in dat niet elke browser er mee overweg kan. SPDY
is een laag boven op HTTPS, een browser zonder SPDY ondersteuning zal de site via
traditionele HTTPS laden. SPDY wordt overigens in elke moderne browser ondersteund
met uitzondering van Internet Explorer. Google, Facebook, YouTube en Twitter zijn
enkele grote sites die met SPDY serveren.

Met de volgend instructies kan je via Nginx serveren met SPDY.

---

## lees meer

[SPDY is an experiment with protocols for the web](http://www.chromium.org/spdy)  
[Can I use SPDY?](http://caniuse.com/#feat=spdy)  
