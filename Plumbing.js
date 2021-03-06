/*
 * Warning: shameless self-plug!
 * Plumber is the Guardian’s tool of choice for build systems.
 * https://github.com/plumberjs/plumber
 */

var all       = require('plumber-all');
var glob      = require('plumber-glob');
var requireJS = require('plumber-requirejs');
var uglifyJS  = require('plumber-uglifyjs');
var write     = require('plumber-write');

module.exports = function (pipelines) {
  var unlinkPluginRequireJs = requireJS({
    paths: {
      'scribe-common': '../bower_components/scribe-common/src',
      'lodash-amd': '../bower_components/lodash-amd'
    }
  });


  var toBuildDir = write('./build');
  var writeBoth = all(
    // Send the resource along these branches
    [uglifyJS(), toBuildDir],
    toBuildDir
  );

  pipelines['build'] = [
    glob('src/scribe-plugin-intelligent-unlink-command.js'),
    unlinkPluginRequireJs,
    writeBoth
  ];
};
