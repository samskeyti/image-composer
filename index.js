var Jimp = require("jimp");

var fs = require('fs');

function readFiles(dirname, onRead, cb) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.error(err);
      return;
    }
    filenames.forEach(function(filename) {
      //console.log(filename);
      if(filename.endsWith('.jpg')){
        onRead(dirname + '/' + filename);
      }
    });
    cb();
  });
}

var IMAGES = [];

function addImage(f){
    IMAGES.push(f);
}

function processImages(){
    console.log(IMAGES.length);
    for(var i=0; i<IMAGES.length; i++){
        processImage(i, IMAGES[i]);
    }
}

var COUNTER = 0;

const D = 100;
const X = 42;
const Y = 42;

function processImage(i, f){
    console.log(i + ' ' + f);
    Jimp.read(f).then(function(img){
        console.log(i + ' ' + img);
        //img.resize(100, 100).write('./resized/' + i + '.jpg');
        IMAGE.composite(img.resize(D, D), i%X * D, Math.floor(i/X) *D);
        COUNTER++;
        if(COUNTER==X*Y){
            IMAGE.write('mosaic.jpg');
        }
    }).catch(function(err){
        console.error(i + ' ' + err);
    });
}



var IMAGE = new Jimp(D*X, D*Y, function(err, image){
    image.write('mosaic.jpg', function(){
        readFiles('./images', addImage, processImages);
    });
});
