module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'public/script.js': ['src/js/**/*.js']
        },
        options: {
          transform: ['babelify']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('help', function showHelpInfo () {
    console.log(grunt.file.read("README.md"));
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['browserify']);
};
