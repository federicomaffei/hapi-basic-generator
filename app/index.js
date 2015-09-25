'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('index.js')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
        );
        this.fs.copyTpl(
            this.templatePath('./src/views/index.jade'),
            this.destinationPath('./src/views/index.jade')
        );
        this.fs.copyTpl(
            this.templatePath('./src/views/layout/layout.jade'),
            this.destinationPath('./src/views/layout/layout.jade')
        );
        this.fs.copyTpl(
            this.templatePath('./src/routes/pages.js'),
            this.destinationPath('./src/routes/pages.js')
        );
    },
    installingModules: function() {
        this.npmInstall(['hapi', 'path', 'hapi-plug-routes', 'jade', 'vision', 'nodemon'], { 'save': true });
    }
});