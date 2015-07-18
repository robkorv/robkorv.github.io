robkorv-web
===========

Build with [jekyll](https://github.com/jekyll/jekyll)

## needs

* [ruby](https://github.com/ruby/ruby)
* [bundler](https://github.com/bundler/bundler/)
* [node](https://github.com/joyent/node)
* [gulp](https://github.com/gulpjs/gulp/)

## build

```bash
git clone https://github.com/robkorv/robkorv-web.git
cd robkorv-web
bundle install
npm install
gulp build
```

Compiled site is in `_site`.


## develop

I recommend you use [rbenv](https://github.com/sstephenson/rbenv) to setup a
ruby environment. The following rbenv plugins are highly recommended:  
[rbenv-binstubs](https://github.com/ianheggie/rbenv-binstubs)  
[rbenv-gem-rehash](https://github.com/sstephenson/rbenv-gem-rehash)  
[rbenv-update](https://github.com/rkh/rbenv-update)  
[ruby-build](https://github.com/sstephenson/ruby-build)

Use an editor that has support for [editorconfig](http://editorconfig.org/). I
use [Sublime 3](http://www.sublimetext.com/3).
[Atom](https://github.com/atom/atom) is also very good and free.

```bash
git clone https://github.com/robkorv/robkorv-web.git
cd robkorv-web
bundle install --binstubs .bundle/bin
npm install
gulp watch
```
