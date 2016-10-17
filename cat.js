#!/usr/bin/env babel-node
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function cat(){
  let file = process.argv[2].toString()
  let filePath = path.join(__dirname, file)
  fs.stat(filePath).then(function(stats){
    if(stats.isFile()){
      fs.readFile(filePath).then(function(data){
        process.stdout.write(data)
      })
    }
    else{
      process.stdout.write('cat ' + process.argv[2] + ': Is a directory\n')
    }
  })

}
cat()
