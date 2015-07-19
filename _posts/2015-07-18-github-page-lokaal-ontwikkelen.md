---
layout: post
title:  "Github page lokaal ontwikkelen"
date:   2015-07-18 15:57:23
categories: ruby ubuntu rbenv bundler
---

Met de volgende instructies kan je lokaal Github pages ontwikkelen. De instructies
zorgen ervoor dat je lokaal dezelfde setup hebt, als Github gebruikt voor het
genereren van pages.

Ik ga ervan uit dat ruby via rbenv beschikbaar is zoals bij
[Een ruby omgeving per project in Ubuntu]({{ site.baseurl }}/een-ruby-omgeving-per-project-in-ubuntu/)
is beschreven.


## Let's go

Maak een dir aan, bijvoorbeeld `my-gh-page` en zorg dat je in de dir staat voordat
je de commando's uitvoert.

Bezoek [GitHub Pages Dependency versions](https://pages.github.com/versions/) en
zorg dat je tenminste de ruby versie hebt die wordt genoemd. 
In dit voorbeeld wordt versie 2.2.2 geïnstalleerd.

1.  installeer ruby en bundler met de volgende commando's:
    
    ```bash
    # ruby installeren
    rbenv install 2.2.2
    # bundler installeren
    gem install bundler
    ```

2.  maak een `Gemfile` bestand aan met de volgende inhoud:

    ```ruby
    source 'https://rubygems.org'

    require 'json'
    require 'open-uri'
    versions = JSON.parse(open('https://pages.github.com/versions.json').read)

    gem 'github-pages', versions['github-pages']
    ```

3.  installeer vervolgens `github-pages` met
    `bundle install --binstubs .bundle/bin`.

4.  creëer een standaard template met `jekyll new .`.

5.  Bekijk de website met `jekyll serve`.

Lees meer over het maken van websites met Jekyll in de
[documentatie](http://jekyllrb.com/docs/home/).

---

### lees meer

[Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)  
[GitHub Pages](http://jekyllrb.com/docs/github-pages/)
