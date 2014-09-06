var es    = require('event-stream'),
    gutil = require('gulp-util');



module.exports = function() {

    'use strict';

    return es.map( function (file, callback) {

        file.contents = new Buffer( 
            file.contents.toString().replace('/** @jsx React.DOM */', '')
        );
        
        callback(null, file);

    } );

};
