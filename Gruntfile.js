module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'example/script.js': ['src/js/**/*.js']
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
          "example/style.css": "src/css/style.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**'],
        tasks: ['build'],
        options: {
          spawn: false,
          debounceDelay: 1500
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('help', function showHelpInfo () {
    console.log(grunt.file.read("README.md"));
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['browserify', 'less:build']);
};
