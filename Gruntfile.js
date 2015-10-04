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
    },
    less: {
      build: {
        options: {
          paths: ["src/css"]
        },
        files: {
          "public/style.css": "src/css/style.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('help', function showHelpInfo () {
    console.log(grunt.file.read("README.md"));
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['browserify', 'less:build']);
};
