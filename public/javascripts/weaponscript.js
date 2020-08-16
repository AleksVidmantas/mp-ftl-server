
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 890;


var background = new Image();
background.src = "/images/weapon_subpart.png?" + new Date().getTime();

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
    setInterval(function(){
        var background = new Image();
        background.src = "/images/weapon_subpart.png?" + new Date().getTime();
        background.onload = function(){
            requestAnimationFrame(function(){
                ctx.drawImage(background,0,0); 
                ctx.save();
                ctx.translate(beamVals[0],beamVals[1])
                ctx.rotate(beamVals[2])
                ctx.drawImage(beamComplete,0,0)
                ctx.restore();
            })
        }
    }, 500);
    
}


function refresh(){
    

    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 890;

    
    
    ctx.drawImage(background,0,0);   

    console.log("Refreshing!");
    

    // // Make sure the image is loaded first otherwise nothing will draw.
    // background.onload = function(){
    //     requestAnimationFrame(function(){
            

    //     })
        
    // }
}
  
 