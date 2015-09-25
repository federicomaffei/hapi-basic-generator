'use strict';

var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            },
            validate: {
                options: {
                    allowUnknown: true
                }
            }
        }
    }
});

server.connection({ port: 3000 });

server.register([
    {
        register: require('vision')
    },
    {
        register: require('hapi-plug-routes')
    }
], function(registerError) {
    if(registerError) {
        console.error('Failed to load plugin:', registerError);
    }

    server.views({
        engines: {
            jade: {
                module: require('jade')
            }
        },
        context: {},
        path: Path.join(__dirname, '/src/views'),
        layoutPath: Path.join(__dirname, '/src/views/layout')
    });

    server.start(function() {
        console.log('Server running at:', server.info.uri);
    });
});