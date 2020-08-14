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
      fs.rename(files.image.path, './public/images/'+files.image.name, function (err) {
      
             if (err) throw err;
            
      });
    //  });
      
    });
  
  res.send({status:"Recieved"})
})
module.exports = router;
