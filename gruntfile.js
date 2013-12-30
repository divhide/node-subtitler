module.exports = function(grunt) {

  grunt.initConfig({
    
    'jshint':       require("./.grunt-tasks/jshint.js"),
    'mochaTest':    require("./.grunt-tasks/mocha.js")

  });

  // load libs
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-mocha-test");

  /*
   * Build tasks:
   *
   */  
  
  grunt.registerTask(
    'default', 
    [
      'travis'
    ]);

  grunt.registerTask(
    'travis', 
    [
      'jshint',
      'mochaTest'
    ]);

};