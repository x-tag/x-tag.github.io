'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    // Configuration to be run (and then tested).
    'smush-components': {
      options: {
        fileMap:{
          js: './dist/components.js',
          css: './dist/components.css'
        }
      }
    },
    bumpup: ['bower.json', 'package.json'],
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bumpup');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('smush', ['smush-components']);

};
