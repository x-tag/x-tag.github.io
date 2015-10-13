'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    'smush-components': {
      test: {
        fileMap:{
          js: './dist/components.js',
          css: './dist/components.css'
        }
      },
      test2: {
        fileMap:{
          js: './dist/components2.js',
          css: './dist/components2.css'
        },
        packages: ['test-package2']
      }
    },
    bumpup: ['bower.json', 'package.json'],
  });

  grunt.loadTasks('../tasks');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('test', ['smush-components']);

};
