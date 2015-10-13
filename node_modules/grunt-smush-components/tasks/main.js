'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    helpers = require('./lib/helpers'),
    bower = require('bower');

  grunt.registerTask('smush-components', 'Combine components js and css files.', function() {

    var options = this.options({
      fileMap: { js: 'components.js', css: 'components.css' },
      directory: 'bower_components' });

    var done = this.async();
    var async = grunt.util.async;

    function getDependencyMap(map) {
      var files = helpers.findDependencies(map),
        concatOptions = grunt.config.getRaw('concat') || {};

      for (var item in options.fileMap){
        concatOptions['smush-'+item] = {
          src: files[item].map(function(i){
            return path.join(options.directory, i);
          }),
          dest: options.fileMap[item]
        };
      }

      grunt.config.set('concat', concatOptions);
      for (var item in options.fileMap){
        grunt.task.run('concat:smush-' + item);
      };
      done();
    }

    bower.commands.list({directory: options.directory})
    .on('end', function(data){
      getDependencyMap(data);
    })
    .on('error', function(data){
      console.log("bower error:", data);
      done(data);
    });

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

};
