/****
*
* TIMELAPSE APP
* ==============================================
*
*  FLICKR UPLOADER
*
*/

/* Includes */
var moment    = require('moment');
var fs        = require('graceful-fs');
var path      = require('path');


/***
/* Upload a File routine
*/
module.exports.uploadImage = function(filePath, fileName, cb){

  var today = moment().format('YYYY-MM-DD');
  /* First, Create Container for Today */
  uploadFile(today, filePath, fileName, cb);

};

function uploadFile (container, fpath, name, callback){

    moveFile(container, fpath, name, function(e){
      if(e) console.log(chalk.red('error on moveFile: ') + e);
      // else console.log(chalk.yellow('SUCCESS copy image to: '),fpath);
      var fileUrl = 'newfileurl';
      console.log(chalk.cyan.bold('FILE URL: ') + fileUrl);
      var data = {date: container, file: fileUrl, type: 'photo'};
      callback(null, data);
    });
}

function moveFile(container, fpath, name, cb){
  fs.exists(path.join(global.SAVE_IMG_FOLDER, container), function(exists){
    if(exists){
      // console.log('folder exists')
      cutPasteFile(fpath, path.join(global.SAVE_IMG_FOLDER, container, name), cb);
    } else {
      console.log('folder NOT exist, creating now');
       fs.mkdirSync(path.join(global.SAVE_IMG_FOLDER, container));
       cutPasteFile(fpath, path.join(global.SAVE_IMG_FOLDER, container, name), cb);
    }
  });

  function cutPasteFile(oldPath, newPath, _cb){
    fs.rename(oldPath, newPath, function(e, stats){
      if(e) console.log(chalk.red('error fs.rename: ') + e);
      _cb(e);
    });
  }
}

