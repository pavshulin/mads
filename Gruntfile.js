module.exports = function(grunt) {

  grunt.initConfig({

  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('help', function showHelpInfo () {
    console.log(grunt.file.read("README.md"));
  });

  grunt.registerTask('default', ['help']);

};
