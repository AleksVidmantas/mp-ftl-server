const sharp = require('sharp');
sharp.cache({ files : 0 });
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/engineering', function(req, res, next){
  res.render('engineering')
});

router.get('/tactical', function(req, res, next){
  res.render('tactical')
})

router.get('/weapons', function(req, res, next){
  res.render('weapons')
})

router.get('/personnel', function(req,res,next){
  res.render('personnel');
})

router.post('/image', function(req,res,next){
  const form = formidable({multiples: true});
    
    form.parse(req, (err, fields, files) => {
      console.log(files.image.path);
      
        //files.fileToUpload.forEach(file => { //for each in case of multiple images
            
        // sharp()

        //relocate image from tmp into project
      fs.rename(files.image.path, './public/images/screenshot.png', function (err) {
        fs.copyFile('./public/images/screenshot.png', './public/images/weapon_subpartcopy.png', (err) => {
          if (err) throw err;
            console.log(err);
          
  
      //    console.log('source.txt was copied to destination.txt');
          
        });
        if (err)  throw err;
        // let imgSS = fs.createWriteStream('./public/images/screenshot.png')
        // imgSS.on('close', function(path){

        // })

        sharp('./public/images/weapon_subpartcopy.png').extract({ width: 800, height: 890, left: 1120, top: 0 }).toFile('./public/images/weapon_subpart.png').then(function(new_file_info) {
          console.log("Image cropped and saved");
          sharp('./public/images/weapon_subpartcopy.png').extract({ width: 1920, height: 880, left: 0, top: 0 }).toFile('./public/images/personnel_subpart.png').then(function(new_file_info) {
            console.log("Image cropped and saved");
            })
          })
      .catch(function(err) {
          console.log(err);
      });
            
      });

      
    //  });
      
    });
  
  res.send({status:"Recieved"})
})
module.exports = router;
