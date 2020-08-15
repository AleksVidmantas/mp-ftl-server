
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 890;


var background = new Image();
background.src = "/images/weapon_subpart.png#" + new Date().getTime();

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
    
}


function refresh(){
    

    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 890;


    var background = new Image();
    background.src = "/images/weapon_subpart.png#" + new Date().getTime();

    console.log("Refreshing!");
    

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        ctx.drawImage(background,0,0);   
        
    }
}
  
  setInterval(refresh, 5*1000);