#!/usr/bin/env babel-node
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function touch(){
  let file = process.argv[2].toString()
  let filePath = path.join(__dirname, file)
  let time = new Date()
  fs.utimes(filePath, time, time)
}
touch()
