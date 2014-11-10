
/* jshint node: true */
/* eslint-env node, browser */

var es    = require("event-stream");



module.exports = function() {

    "use strict";

    return es.map( function (file, callback) {

        file.contents = new Buffer(
            file.contents.toString().replace("/** @jsx React.DOM */", "")
        );

        callback(null, file);

    } );

};
