
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
                // ctx.save();
                // ctx.translate(beamVals[0],beamVals[1])
                // ctx.rotate(beamVals[2])
                // ctx.drawImage(beamComplete,0,0)
                // ctx.restore();
            })
        }
    }, 800);
    
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
let active = ""
canvas.addEventListener('click', function(e) {
    var tag = document.createElement('img');
    console.log(e);
    tag.src = "images/crosshair.png";
    tag.setAttribute("class","crosshair")
    tag.setAttribute("id","active1")
    //click through image
    tag.style.pointerEvents="none";
    tag.style.touchAction="manipulation";


    var ac1 = document.getElementById("active1"); //resuer code to check if active already exists\
    if(ac1){
        ac1.remove();
    }

    const rect = document.getElementById("canvas").getBoundingClientRect()
    // beamLeft = e.clientX - rect.left
    // beamTop = e.clientY - rect.top
    // console.log("BeamLeft and Top updated to: " + beamLeft + beamTop + "canvas dat ")
        
    tag.setAttribute("id","active1");
    tag.style.position = 'absolute';
    tag.style.height = '190px';
    tag.style.width = '190x';
    tag.style.top = ((e.pageY || e.clientY) -95)+ 'px';
    tag.style.left = ((e.pageX || e.clientX) -95)+ 'px'; //-95px
    console.log("Clientvs other page " + e.clientX + " " + e.page )
    document.body.appendChild(tag);

    var http = new XMLHttpRequest();
    var ratioX = canvas.width / e.target.offsetWidth;
   
    var params = "type=personnel&command=click"+"&active="+active+"&posX="+(1120+ratioX*(e.clientX - rect.left))+"&posY="+(ratioX*(e.clientY - rect.top));
   
    http.open('POST', "/command/log", true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            // alert(http.responseText);
            console.log(http.responseText);
        }
    }
    http.send(params);

 }, false);

 //for use when the user selects tactical
function tacticalPost(item){
    console.log("Running through")
            activeBtns = document.getElementsByClassName("active");
            console.log(activeBtns.length)
            let length = activeBtns.length
            for (let j = 0; j < length; j++) { 
                console.log(j)
                activeBtns[0].classList.remove("active") //can we get a royal FUCK to live NodeLists, jesus this bug took be 3 horus to use 0 instead of j
                console.log("com")
            }
    item.classList.add("active");
    var http = new XMLHttpRequest();
   
    var params = "type=personnel&command="+item.id;
    active = item.id
    http.open('POST', "/command/log", true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            // alert(http.responseText);
            console.log(http.responseText);
        }
    }
    http.send(params);

}
