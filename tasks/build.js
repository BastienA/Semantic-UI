/*******************************
          Build Task
*******************************/

var
  gulp         = require('gulp-help')(require('gulp')),

  // config
  config       = require('./config/user'),
  runSequence  = require('run-sequence'),
  install      = require('./config/project/install')
;

// add sub-tasks
if(config.rtl) {
  require('./collections/rtl')(gulp);
}
require('./collections/build')(gulp);

module.exports = function(callback) {

  console.info('Building Semantic');

  if( !install.isSetup() ) {
    console.error('Cannot find semantic.json. Run "gulp install" to set-up Semantic');
    return;
  }

  var tasks = [];

  // check for right-to-left (RTL) language
  if(config.rtl == 'both') {
    tasks.push('build-rtl');
  }
  if(config.rtl === true || config.rtl === 'Yes') {
    gulp.start('build-rtl');
    return;
  }

  tasks.push('build-javascript');
  tasks.push('build-css');
  tasks.push('build-assets');

  runSequence(tasks, callback);
};
