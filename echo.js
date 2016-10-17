#!/usr/bin/env babel-node
require('./helper')
let argv = require('yargs').argv

async function echo(){
  if(argv.e){
    let string = argv.e.replace('\\n','\n').replace('\\b','\b').replace('\\r','\r').replace('\\v','\v').replace('\\t','\t')
    process.stdout.write(string)
  }
  else{
    let string = await process.argv.splice(2).join(' ')
    process.stdout.write(string)
  }
  if(argv.n){
    return
  }
  else{
    process.stdout.write('\n')
  }
}
echo()
