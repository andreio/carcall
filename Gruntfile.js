module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 3
                },
                files: {
                    "src/css/main.css": "src/less/main.less"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9090,
                    base: 'app',
                    keepalive: true
                }
            }
        },
        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery-ui/themes/smoothness/images/*'
                            , 'resources/css-quilt.png'],
                        dest: 'app/images'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ["src/html/*.html","resources/contacts.json"],
                        dest: "app/"

                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: {
                    'app/styles.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css'
                        , 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
                        , 'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css'
                        , 'bower_components/jquery-ui/themes/smoothness/jquery.ui.theme.css'
                        , 'bower_components/normalize-css/normalize.css'
                        , 'src/css/main.css'
                    ]
                }
            }
        },
        concat: {
            dist: {

                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/aoc/src/aoc.js',
                    'bower_components/moment/min/moment.min.js'],
                dest: 'app/lib.js'
            }
        },
        uglify: {
            min: {
                files: [
                    {
                        src: [
                            'src/js/calling.js',
                            'src/js/home.js',
                            'src/js/filters.js',
                            'src/js/main.js',
                            'src/js/aocConfig.js'
                        ],
                        dest: "app/app.js"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['less', 'cssmin', 'concat:dist', 'uglify', 'copy', 'connect']);


};
