robkorv-web
===========

Build with [jekyll](https://github.com/jekyll/jekyll)

## needs

* [ruby](https://github.com/ruby/ruby)
* [bundler](https://github.com/bundler/bundler/)

## run

```bash
git clone https://github.com/robkorv/robkorv-web.git
cd robkorv-web
bundle install
jekyll serve
```

Open [localhost:4000](http://localhost:4000).

## develop

I recommend you use [rbenv](https://github.com/sstephenson/rbenv) to setup a
ruby environment. The following rbenv plugins are highly recommended:  
[rbenv-binstubs](https://github.com/ianheggie/rbenv-binstubs)  
[rbenv-gem-rehash](https://github.com/sstephenson/rbenv-gem-rehash)  
[rbenv-update](https://github.com/rkh/rbenv-update)  
[ruby-build](https://github.com/sstephenson/ruby-build)

Use an editor that has support for [editorconfig](http://editorconfig.org/). I
use [atom](https://github.com/atom/atom).

```bash
git clone https://github.com/robkorv/robkorv-web.git
cd robkorv-web
bundle install --binstubs .bundle/bin
guard
```

Open [localhost:4000](http://localhost:4000). When you edit source files the
browser automatically reloads. Use `q` followed by `enter` to leave guard.
