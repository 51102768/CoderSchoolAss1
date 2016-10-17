#!/usr/bin/env babel-node
require('./helper')
let fs = require('fs').promise
let path = require('path')

async function mkdir(){
  let file = process.argv[2]
  let filePath = path.join(__dirname, file)
  fs.mkdir(filePath)
}
mkdir()
