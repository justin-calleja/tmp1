var fs = require('fs');
var dirs = require('dirs');
var path = require('path');
var JSONStream = require('JSONStream');
var through2 = require('through2');

var objStream = through2.obj(function(chunk, encoding, callback) {
  console.log('chunk:', chunk);
  // this.push(chunk);
  callback();
});

var dataFiles = dirs.sync('./data/');
// console.log('dataFiles:', dataFiles);
dataFiles.forEach(fileName => {
  var filePath = path.join(__dirname, fileName);
  // console.log('filePath:', filePath);
  // fs.createReadStream(filePath).pipe(objStream).pipe(JSONStream.parse('*')).pipe(process.stdout);
  fs.createReadStream(filePath).pipe(JSONStream.parse('*')).pipe(objStream);
});

var repl = require('repl');

var replServer = repl.start({
  prompt: '> '
});

var combineReducers = require('redux').combineReducers;
console.log('combineReducers:', combineReducers);

replServer.context
