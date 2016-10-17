#!/usr/bin/env babel-node
require('./helper')
let argv = require('yargs').argv
let fs = require('fs').promise
let path = require('path')
let recur = argv.R || false


async function ls(rootPath, recursive, write, callback) {

  let isFile =  await fs.stat(rootPath).then(function(stats){
    return stats.isFile()
  })

  if(isFile){
    if (write)
    process.stdout.write(rootPath + '\n')
    if(callback){
      callback(rootPath)
    }
    return
  }
  else{
    fs.readdir(rootPath).then(function(fileNames){
      fileNames.map(function(dir, index){
        let filePath = path.join(rootPath, dir)
        fs.stat(filePath).then(function(stats){
          if(stats.isFile()){
            ls(filePath,recursive,write,callback)
          }
          else{
            if(recursive){
              ls(filePath,recursive,write,callback)
            }
          }
        })
      })
    })
  }
}

async function main() {
  var dir = __dirname

  if(argv._.length > 0){
    dir = argv._[0]
  }
  await ls(dir,recur,true, undefined)
}

if (require.main === module) {
  main()
} else {
  module.exports = function(cb,recursive,callback){
    ls(cb,recursive,false,callback)
  }
}
