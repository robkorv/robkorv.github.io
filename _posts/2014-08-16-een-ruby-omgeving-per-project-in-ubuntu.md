---
layout: post
title:  "Een ruby omgeving per project in Ubuntu"
date:   2014-08-16 14:31:26
categories: ruby ubuntu
---

Met de volgende instructies kan een Ruby ontwikkel omgeving op directory niveau
ingesteld worden, onafhankelijk van Ubuntu's package manager. Hiermee voorkom je
de situatie dat een project een Ruby versie nodig heeft, die niet wordt
aangeboden door de packagemanager. Een ander groot voordeel is dat
verschillende Ruby versies naast elkaar gebruikt kunnen worden.

## rbenv en plugins installeren

1.  clone de repositories naar de juiste directories.

    ```bash
    git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
    git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
    git clone https://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash
    git clone https://github.com/ianheggie/rbenv-binstubs.git ~/.rbenv/plugins/rbenv-binstubs
    git clone https://github.com/rkh/rbenv-update.git ~/.rbenv/plugins/rbenv-update
    ```

2.  voeg het volgende toe aan `~/.bashrc`.

    ```bash
    # rbenv
    export PATH="$HOME/.rbenv/bin:$PATH"
    eval "$(rbenv init -)"
    ```

3.  sluit de huidige terminal en start een nieuwe. Test het commando `rbenv`.

    ```bash
    rbenv
    # rbenv 0.4.0-98-g13a474c
    # Usage: rbenv <command> [<args>]
    #
    # Some useful rbenv commands are:
    #    commands    List all available rbenv commands
    #    local       Set or show the local application-specific Ruby version
    #    global      Set or show the global Ruby version
    #    shell       Set or show the shell-specific Ruby version
    #    install     Install a Ruby version using ruby-build
    #    uninstall   Uninstall a specific Ruby version
    #    rehash      Rehash rbenv shims (run this after installing executables)
    #    version     Show the current Ruby version and its origin
    #    versions    List all Ruby versions available to rbenv
    #    which       Display the full path to an executable
    #    whence      List all Ruby versions that contain the given executable
    #
    # See `rbenv help <command>' for information on a specific command.
    # For full documentation, see: https://github.com/sstephenson/rbenv#readme
    ```

## rbenv gebruiken

### ruby installeren

Installeer de volgende dependencies om ruby te kunnen builden met rbenv.

```bash
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6 libreadline6-dev zlib1g zlib1g-dev
```

```bash
# laat alle installeerbare ruby versies zien
rbenv install -l
# installeer ruby versie 2.1.2
rbenv install 2.1.2
```

### ruby versie gebruiken

Ga naar de root directory van het project waar je een bepaalde ruby versie wilt
gebruiken.

```bash
cd mijn-app
# laat de geinstalleerde ruby versies zien
rbenv versions
# gebruik ruby versie 2.1.2 in deze en bovenliggende directories
rbenv local 2.1.2
# laat de actieve ruby in deze directory zien
rbenv version
```

Het command `rbenv local 2.1.2` creeërt een `.ruby-version` bestand in de huidige
directory. Hierin wordt de ruby versie opgeslagen. Voeg dit bestand toe aan
versiebeheer zodat de ruby versie wordt opgelagen in het project.

### bundler gebruiken

Als bundler binnen het project wordt gebruikt roep de `install` dan op de volgende
wijze aan.

```bash
bundle install --binstubs .bundle/bin
```

Hierdoor kunnnen de commando's die bundler installeert zonder `bundle exec`
aangeroepen worden.

### rbenv updaten

```bash
rbenv update
# updating rbenv
#  |  Already on 'master'
#  |  Your branch is up-to-date with 'origin/master'.
#  |  From https://github.com/sstephenson/rbenv
#  |  * branch            master     -> FETCH_HEAD
#  |  Already up-to-date.
#
# updating rbenv-binstubs
#  |  Already on 'master'
#  |  Your branch is up-to-date with 'origin/master'.
#  |  From https://github.com/ianheggie/rbenv-binstubs
#  |  * branch            master     -> FETCH_HEAD
#  |  Already up-to-date.
#
# updating rbenv-gem-rehash
#  |  Already on 'master'
#  |  Your branch is up-to-date with 'origin/master'.
#  |  From https://github.com/sstephenson/rbenv-gem-rehash
#  |  * branch            master     -> FETCH_HEAD
#  |  Already up-to-date.
#
# updating rbenv-update
#  |  Already on 'master'
#  |  Your branch is up-to-date with 'origin/master'.
#  |  From https://github.com/rkh/rbenv-update
#  |  * branch            master     -> FETCH_HEAD
#  |  Already up-to-date.
#
# updating ruby-build
#  |  Already on 'master'
#  |  Your branch is up-to-date with 'origin/master'.
#  |  From https://github.com/sstephenson/ruby-build
#  |  * branch            master     -> FETCH_HEAD
#  |  Already up-to-date.
#
# reloading rbenv
#  |  done
```

---

### lees meer

[rbenv](https://github.com/sstephenson/rbenv)  
[ruby-build](https://github.com/sstephenson/ruby-build)  
[rbenv-gem-rehash](https://github.com/sstephenson/rbenv-gem-rehash)  
[rbenv-binstubs](https://github.com/ianheggie/rbenv-binstubs)  
[rbenv-update](https://github.com/rkh/rbenv-update)
