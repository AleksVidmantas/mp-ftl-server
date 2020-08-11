var express = require('express');
var router = express.Router();

let cmdStack = []

router.post('/', function(req,res){
    console.log(req.body);
    req.body.queuePlace = cmdStack.length;
    
    console.log("end post /command")
    cmdStack.push(req.body)
    res.send({status:"Received"})
    // res.send(req)
})

router.get('/', function(req, res){
    if(cmdStack.length > 0){
        console.log(cmdStack)
        let cmd = cmdStack.shift();
        cmd.curQueueSize = cmdStack.length;
        console.log(cmd);
        res.send(cmd);
    }else {
        res.send({status:"EMPTY"})
    }

    
});
 

module.exports = router;