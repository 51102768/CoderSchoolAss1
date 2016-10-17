#!/usr/bin/env babel-node
require('./helper')
let argv = require('yargs').argv
let fs = require('fs').promise
let path = require('path')
let ls = require('./ls.js')

function removedir(rootPath,cb){
    fs.stat(rootPath).then(function(stats){
      if(stats.isFile()){
        fs.unlink(rootPath,function(err){
          cb(null,true);
        })
      }
      else{
        fs.readdir(rootPath).then(function(files){
          let d_len = files.length;
          let d_index = 0;

          function checkNode(){
            if(d_len===d_index){
                fs.rmdir(rootPath,function(err){
                  cb(null,true);
                })
                return true
            }
            return false
          }

          if(!checkNode()){
            files.forEach(function(file){
              let filePath = path.join(rootPath, file)

              removedir(filePath,function removedirCallback(err,status){
                d_index ++;
                checkNode();
              })
            })
          }
        })
      }
    })
}
async function rm(){
  if(argv._.length > 0){
    var dir = __dirname

    if(argv._.length > 0){
      dir = argv._[0]
    }

    removedir(dir,function(){})

  }
}


rm()
