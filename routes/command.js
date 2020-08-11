var express = require('express');
var router = express.Router();
const WebSocket = require('ws');
let cmdStack = []

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        if(message==="CMD_REQUEST"){
            if(cmdStack.length > 0){
                // console.log(cmdStack)
                // let cmd = cmdStack.shift();
                // cmd.curQueueSize = cmdStack.length;
                // console.log(cmd);
                // ws.send(JSON.stringify(cmd));
                let msg = [];
                for(let i = 0; i < cmdStack.length; i++){
                    msg.push(cmdStack[i])
                }
                cmdStack = []
                ws.send(JSON.stringify(msg))
            }else {
                ws.send(JSON.stringify({status:"EMPTY"}))
            }
        }else{
            ws.send(JSON.stringify({status:"INVALID_REQUEST"}))
        }
    });
  
    // ws.send('something');
});
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
        // console.log(cmdStack)
        // let cmd = cmdStack.shift();
        // cmd.curQueueSize = cmdStack.length;
        // console.log(cmd);
        // res.send(cmd);
        let msg = [];
        for(let i = 0; i < cmdStack.length; i++){
            msg.push(cmdStack[i])
        }
        cmdStack = []
            
        
        res.send(msg)
    }else {
        res.send({status:"EMPTY"})
    }

    
});
 

module.exports = router;