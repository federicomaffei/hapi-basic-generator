'use strict';

var generators = require('yeoman-generator');
var name,
    description;

module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Please enter the name of the project',
            default : this.appname
        }, function (answers) {
            name = answers.name;
            this.prompt({
                type    : 'input',
                name    : 'description',
                message : 'Please enter the description of the project',
                default : 'Description'
            }, function (answers) {
                description = answers.description;
                done();
            }.bind(this));
        }.bind(this));
    },
    writing: function () {
        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('index.js')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { name: name, description: description }
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