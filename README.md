# grunt scss selected compile

> Compiles css files up on saving. It won't compile all scss files. If you have too many files it saves lot of time. This plugin is same as grunt-contrib-sass but you don't have to specify each and every file in Grunt.js. 

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-scss-selected-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-scss-selected-compile');
```

## The "cs" task

### Overview
In your project's Gruntfile, add a section named `cs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

## Sass task
_Run this task with the `grunt sass` command._

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/) and [Sass](http://sass-lang.com/download.html). If you're on OS X or Linux you probably already have Ruby installed, try `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install sass` to install Sass.
### Options

#### trace
Type: `Boolean`

Show a full traceback on error.

#### cssDir
Type: `string`

Adds css destination folder. All compiled files will place in this path.

#### unixNewlines
Type: `Boolean`

Force Unix newlines in written files.

#### check
Type: `Boolean`

Just check syntax, don't evaluate.

#### style
Type: `String`

Output style. Can be `nested` (default), `compact`, `compressed`, or `expanded`.

#### precision
Type: `Number`

How many digits of precision to use when outputting decimal numbers. Defaults to 3.

#### quiet
Type: `Boolean`

Silence warnings and status messages during compilation.

#### compass
Type: `Boolean`

Make Compass imports available and load project configuration.

#### debugInfo
Type: `Boolean`

Emit extra information in the generated CSS that can be used by the FireSass Firebug plugin.

#### lineNumbers
Type: `Boolean`

Emit comments in the generated CSS indicating the corresponding source line.

#### loadPath
Type: `String|Array`

Add a (or multiple) Sass import path.

#### require
Type: `String|Array`

Require a (or multiple) Ruby library before running Sass.

#### cacheLocation
Type: `String`

The path to put cached Sass files. Defaults to `.sass-cache`.

#### noCache
Type: `Boolean`

Don't cache to sassc files.

#### bundleExec
Type: `Boolean`

Run `sass` with [bundle exec](http://gembundler.com/man/bundle-exec.1.html): `bundle exec sass`.

### Usage Examples

#### Example config

```javascript
grunt.initConfig({
  cs: {
        options: {
            style: 'expanded',
            cssDir: '.tmp/css/'
        },
        files: {
            src: ['<%= yeoman.app %>/css/*.*']
        }
    }
});

grunt.loadNpmTasks('grunt-compile-selected');

grunt.registerTask('default', ['jshint', 'cs']);
```
#####Use it with watch tasks
```
watch: {
    coffee: {
        files: ['<%= yeoman.app %>/js/{,*/}*.coffee'],
        tasks: ['coffee:dist']
    },
    coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
    },
    jade: {
        files: ['<%= yeoman.app %>/template/**/*.jade'],
        tasks: ['jade']
    },
    cs: {
        files: ['<%= yeoman.app %>/css/{,*/}*.{scss,sass}'],
        tasks: ['cs']
    }
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
