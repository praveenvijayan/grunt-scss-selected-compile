/*
 * compile-selected
 * https://github.com/praveen/grunt-compile-selected
 *
 * Copyright (c) 2013 praveenvijayan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var fs = require('fs')
  , path = require('path')
  , mt 
  , diff
  , currentTime
  , cache={};

  function cacheKey (file) {
    return file;
  }

  function fileObj (file) {  
    return  {
        fname:file,
        mdate:fs.statSync(file).mtime.getTime()
    }
  }

  grunt.registerMultiTask('cs', 'Compiling selected files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var helpers = require('grunt-lib-contrib').init(grunt)
    , options = this.options()
    , partialObj = {}

    if(options.cssDir){
        var destDir = options.cssDir;
        delete options.cssDir;
    }else{
        destDir = '.tmp/css/'
        delete options.cssDir;
    }
        
    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');

    var files = grunt.file.expand(this.filesSrc),
        currentFiles=[], max;

    files.forEach(function(f,i){
      if(path.basename(f).match(/^_/)){
          partialsArray(f);
      }
    });
    
    function partialsArray (arg) {
        var fcon,
            partialFile = arg.replace('_',''),
            importName = path.basename(partialFile).replace(path.extname(partialFile),''),
            tmpArry = [];

        files.forEach(function(f, index){
          fcon = grunt.util.normalizelf(grunt.file.read(f));
          if(fcon.match("@import '"+importName+"'")){
            if(!path.basename(f).match(/^_/)){
              tmpArry.push(f)
            }
          }
        })

        partialObj[importName] = tmpArry;
    }

    var allPartFiles ='';

    files.forEach(function(f){
        var key = cacheKey(f);
        if (typeof cache[key] !== 'undefined'){
          if(cache[key].mdate !== fs.statSync(f).mtime.getTime()){
              if( !path.basename(f).match(/^_/)){
                currentFiles.push(f)
              }else{
                var fname = path.basename(f).replace(path.extname(f),'').replace('_','');
                allPartFiles = partialObj[fname];
                currentFiles = currentFiles.concat(allPartFiles);
              }
          }
        }else{
          if( !path.basename(f).match(/^_/)){
            currentFiles.push(f)
          }
        }
        cache[key] = fileObj(f);
    });

    grunt.util.async.forEachSeries(currentFiles, function(f, next) {
      var args;
      var bundleExec = options.bundleExec;
      delete options.bundleExec;
      args = [destDir+path.basename(f).replace('.scss','.css'), '--stdin'].concat(helpers.optsToArgs(options));

      if (process.platform === 'win32') {
        args.unshift('sass.bat');
      } else {
        args.unshift('sass');
      }

      if (bundleExec) {
        args.unshift('bundle', 'exec');
      }

      // If we're compiling scss or css files
      var extension = path.extname(f);
      if (extension === '.scss' || extension === '.css') {
        args.push('--scss');
      }

      args.push('--load-path', path.dirname(f));

      var sass = grunt.util.spawn({
        cmd: args.shift(),
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have Ruby and Sass installed and in your PATH for\n' +
            'this task to work. More info:\n' +
            'https://github.com/gruntjs/grunt-contrib-sass'
          );
        }
        next(error);
      });
      
      max = grunt.util.normalizelf(grunt.file.read(f));

      console.log('Compiled.. '+path.basename(f));

      sass.stdin.write(new Buffer(max));
      sass.stdin.end();
      sass.stdout.pipe(process.stdout).setMaxListeners(0);
      sass.stderr.pipe(process.stderr).setMaxListeners(0);
    }, cb)
 
  });

};