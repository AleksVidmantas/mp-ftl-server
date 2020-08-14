var express = require('express');
var router = express.Router();

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
  console.log(req);
  res.send({status:"Recieved"})
})
module.exports = router;
