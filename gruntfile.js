module.exports = function(grunt) {

  grunt.initConfig({

    'jshint'    : require("./.grunt-tasks/jshint.js"),
    'mochaTest' : require("./.grunt-tasks/mocha.js"),
    'bump'      : require("./.grunt-tasks/bump")

  });

  /// load tasks
  require('load-grunt-tasks')(grunt);

  /*
   * Build tasks:
   *
   */

  grunt.registerTask(
    'default',
    [
      'dev'
    ]);

  grunt.registerTask(
    'dev',
    [
      'jshint',
      'mochaTest'
    ]);

};