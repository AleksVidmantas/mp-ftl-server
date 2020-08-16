function engineerPost(item){
    var http = new XMLHttpRequest();
   
    var params = "type=engineering&command="+item.id;
    
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

//for use when the user selects tactical
function tacticalPost(item){
    var http = new XMLHttpRequest();
   
    var params = "type=tactical&command="+item.id;
    
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
//apply active flags for buttons and their colors
let activeBtns = ''
function setActive(item,type){
    if(type === "weapons"){
        if(item.id === "beamlock"){
            item.classList.add("active");
        }else if(item.id === "fire"){
            item.classList.add("disable-css-transitions")
            let originalColor = item.style.backgroundColor
            item.style.backgroundColor = "red"
            item.offsetHeight;
            item.classList.remove("disable-css-transitions")
            item.style.transition = "background-color 3.2s ease"
            item.offsetHeight;
            item.style.backgroundColor = "#2b2b2b"

            // item.style.backgroundColor = "black"

            //COMMUNICATION TO SERVER
            var http = new XMLHttpRequest();
            //determine if one or two cursors
            var params = "type="+type+"&command="+item.id+"&active="+activeBtns[0].id+"&posX="+mCoords[0][0]+"&posY="+mCoords[0][1];
            var activeCross2 = document.getElementById("active2");
            const canvasW = canvas.getBoundingClientRect().width;
const canvasH = canvas.getBoundingClientRect().height;
            if(document.getElementById("beamlock").classList.contains("active") && activeCross2){
                var params = "type="+type+"&command="+"beam"+item.id+"&active="+activeBtns[0].id+"&posX="+mCoords[0][0]+"&posY="+mCoords[0][1]+"&posX1="+mCoords[1][0]+"&posY1="+mCoords[1][1];
            }
            

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





        }else{ //if it's just a weapon select
            console.log("Running through")
            activeBtns = document.getElementsByClassName("active");
            console.log(activeBtns.length)
            let length = activeBtns.length
            for (let j = 0; j < length; j++) { 
                console.log(j)
                activeBtns[0].classList.remove("active") //can we get a royal FUCK to live NodeLists, jesus this bug took be 3 horus to use 0 instead of j
                console.log("com")
            }
            var element = canvas.getContext("2d");//remove beam img, and crosshiars
            var activeCross = document.getElementById("active1");
            if(activeCross){
                activeCross.remove();

            }
            var activeCross2 = document.getElementById("active2");
            if(activeCross2){
                activeCross2.remove();
                
            }
            beamLeft = 0;
            beamTop = 0;
            element.save();
            element.clearRect(0,0, canvas.width, canvas.height);
            var background = new Image();
            background.src = "/images/weapon_subpart.png";

            // Make sure the image is loaded first otherwise nothing will draw.
            background.onload = function(){
                ctx.drawImage(background,0,0);
                
                element.drawImage(image, 0,0)//beamLeft,beamTop);
                element.restore();
            }
            
            item.classList.add("active");

            var http = new XMLHttpRequest();
            //determine if one or two cursors
            var params = "type="+type+"&command="+item.id;
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
        
    }
 
    
    
    
}
let active="null"

window.onload = function() {
    try {
        var can = document.getElementsByTagName('canvas')[0];
        var ctx = can.getContext('2d');
        // ctx.strokeStyle = '#f00';
        // ctx.lineWidth   = 6;
        // ctx.lineJoin    = 'round';
        // ctx.strokeRect(140,60,40,40);
        var img = document.getElementsByTagName('img')[0];
        img.src = can.toDataURL();
    } catch{}

    //tac images
    try{
        document.getElementById('tacImg1').addEventListener('click', function (event) {
            genericImgPost("tactical","imageClick",event, this);
        });
    }catch(e){

    }
    try {
        document.getElementById('tacImg2').addEventListener('click', function (event) {
            genericImgPost("tactical","imageClick",event, this);
        });
    }catch(e){

    }
    
    
    //weapons img
    try {
        document.getElementById('wepImg1').addEventListener('click', function (event) {
            genericImgPost("weapons","imageClick",event, this);
        });
    }catch(e){

    }
    try {
        document.getElementById('canvas').addEventListener('click', function (event) {
            genericImgPost("weapons","imageClick",event, this);
        });
    }catch(e){

    }
    
    
  
};
let beamVals = [0,0,0] //x,y, theta transformation for element to translate
let beamComplete = ""//beam of artillery sighter, used in weaponscript
let beamTop = 0
let beamLeft = 0
let mCoords = [[0,0],[0,0]]
function genericImgPost(type,command,e,img){ //active referce to current button that is active , active1 is active crosshair, active2 is second
    //calculate where user click one
    var canvas  = document.getElementById('canvas'); //ROTATE AND DRAW IMAGE

   console.log("Values"+ canvas.width +  " " + e.target.offsetWidth);
    var ratioX = canvas.width / e.target.offsetWidth; //natty means images base, divided by pages image size, so like 1.4 times larger
    var ratioY = e.target.naturalHeight / e.target.offsetHeight; //higher val means higher scale
    console.log("Important value: "+ ratioX)
    var domX = e.x + window.pageXOffset - e.target.offsetLeft;
    var domY = e.y + window.pageYOffset - e.target.offsetTop;

    var imgX = Math.round(domX * ratioX);
    var imgY = Math.round(domY * ratioY);

    if(type==="weapons"){ //crosshair creation logic
        
        e = e || window.event;
        var tag = document.createElement('img');
        console.log(e);
        tag.src = "images/crosshair.png";
        tag.setAttribute("class","crosshair")
        //click through image
        tag.style.pointerEvents="none";
        tag.style.touchAction="manipulation";

        var ac2 = document.getElementById("active2"); //resuer code to check if active already exists\
        if(ac2){
            ac2.remove();
        }

        if(document.getElementById("beamlock").classList.contains("active")){ //if beamlock is activated, aka draw another beam and beam image
            var activeCross = document.getElementById("active1");
            if(activeCross){
                tag.setAttribute("id","active2"); //take this path if active1 is already placed
                
                
                var beamtag = document.createElement('img');
                console.log(e);
         

                if(window.matchMedia("max-width: 1200px)")){ //mobile beam 
                    // console.log("REAHEEDEF")
                    // beamtag.style.height = '20px';
                    // beamtag.style.width = 850/ratioX;//hardcoded and magic :(
                    // beamtag.style.top = ((e.pageY || e.clientY) -95)+ 'px';
                    // beamtag.style.left = ((e.pageX || e.clientX) -95)+ 'px';
                    // // beamtag.style.top = document.getElementById("active1").style.top;
                    // // beamtag.style.left = document.getElementById("active1").style.left;
                }else{ //for desktop
                    tag.style.height = '140px';
                    tag.style.width = '140x';
                    tag.style.top = ((e.pageY || e.clientY) -10)+ 'px';
                    tag.style.left = ((e.pageX || e.clientX)) + 'px';
                }
                document.getElementById("active2")
                // document.body.appendChild(tag);
                
                // beamtag.setAttribute("z-index:9999")
                
                tag.style.position = 'absolute';
                if(window.matchMedia("max-width: 1200px)")){
                    tag.style.height = '190px';
                    tag.style.width = '190x';
                    tag.style.top = ((e.pageY || e.clientY) -95)+ 'px';
                    tag.style.left = ((e.pageX || e.clientX) -95)+ 'px';
                }else{
                    tag.style.height = '140px';
                    tag.style.width = '140x';
                    tag.style.top = ((e.pageY || e.clientY) -40)+ 'px';
                    tag.style.left = ((e.pageX || e.clientX) -40)+ 'px';
                }
                document.body.appendChild(tag);
                let ey = document.getElementById("active1").y;
                let ex = document.getElementById("active1").x;
                let cx = tag.x;
                let cy = tag.y;
                dy = ey - cy;
                dx = ex - cx;
                theta = Math.atan(dy/dx);
                // theta *= 180/Math.PI // rads to degs
                canvas  = document.getElementById('canvas'); //ROTATE AND DRAW IMAGE
                // document.body.appendChild(beamtag);
            "images/beam.png"
                image = document.getElementById("beamimg")
                
                // document.body.appendChild(image)
                
                var element = canvas.getContext("2d");
                element.save();
                element.clearRect(0,0, element.width, element.height);
                var background = new Image();
                background.src = "/images/weapon_subpart.png";

                // Make sure the image is loaded first otherwise nothing will draw.
                background.onload = function(){
                    element.drawImage(background,0,0);
                    element.translate(beamLeft*ratioX, ratioX*beamTop)  
                    beamVals = [beamLeft*ratioX,ratioX*beamTop, theta]
                    beamComplete = image 
                    console.log("Compare values, beamsLT, at time of draw bl and bt" + beamLeft + " " + beamTop + " | " + ex + " " + ey + "Canvas dat: xy" +element.width + " " + element.height)
                    
                element.rotate(theta);
                
                element.drawImage(image, 0,0)//beamLeft,beamTop);
                element.restore();
                }
                
                if(ex > cx){
                    theta = -1.57-(1.57-theta);
                }

                
                

                console.log("THEATA: " + theta)
                console.log(tag.x)
                console.log(tag.y) //theta is GOOD
                // //beamtag.setAttribute("style", "transform: rotate(" + (theta) + "deg)");
                // beamtag.style.height = '20px';
                //     beamtag.style.width = 850/ratioX;//hardcoded and magic :(
                //     beamtag.style.top = ((e.pageY || e.clientY) -10)+ 'px';
                //     beamtag.style.left = ((e.pageX || e.clientX) -425)+ 'px';
                // document.body.appendChild(beamtag);
                
            }else{ //if no crosses exist
                const rect = document.getElementById("canvas").getBoundingClientRect()
                beamLeft = e.clientX - rect.left
            beamTop = e.clientY - rect.top
            console.log("BeamLeft and Top updated to: " + beamLeft + beamTop + "canvas dat ")
                
                tag.setAttribute("id","active1");
                tag.style.position = 'absolute';
                if(window.matchMedia("max-width: 1200px)")){
                    tag.style.height = '190px';
                    tag.style.width = '190x';
                    tag.style.top = ((e.pageY || e.clientY) -95)+ 'px';
                    tag.style.left = ((e.pageX || e.clientX) -95)+ 'px'; //-95px
                    console.log("Clientvs other page " + e.clientX + " " + e.page )
                }else{
                    tag.style.height = '140px';
                    tag.style.width = '140x';
                    tag.style.top = ((e.pageY || e.clientY) -40)+ 'px';
                    tag.style.left = ((e.pageX || e.clientX) -40)+ 'px';
                }
                console.log("Crosshair drawn to" + e.pageX + " or " + e.clientX)
                document.body.appendChild(tag);
                beamX = tag.x;
                beamY = tag.y;
                console.log("prime")
                
            
            console.log("PRIME" + tag.x + " " +tag.y)
            }
            

            
        }else{
            var activeCross = document.getElementById("active1");
            
            if(activeCross){
                activeCross.remove();
            }
            
            tag.setAttribute("id","active1");
            tag.style.position = 'absolute';
            if(window.matchMedia("max-width: 1200px)")){ //mobile
                tag.style.height = '190px';
                tag.style.width = '190x';
                tag.style.top = ((e.pageY || e.clientY) -95)+ 'px';
                tag.style.left = ((e.pageX || e.clientX) -95)+ 'px';
                // beamTop = ((e.pageY || e.clientY) -95)+ 'px';
                // beamLeft = ((e.pageX || e.clientX) -95)+ 'px';
            }else{
                tag.style.height = '140px';
                tag.style.width = '140x';
                tag.style.top = ((e.pageY || e.clientY) -40)+ 'px';
                tag.style.left = ((e.pageX || e.clientX) -40)+ 'px';
            }
            document.body.appendChild(tag);
            console.log("prime")
            console.log("PRIME" + tag.x + " " +tag.y)
            
        }
       
    
        
        
        
        
        
        // tag.setAttribute("z-index:9999")
      
    }
    console.log(imgX, imgY);var x = 1120+imgX//-imgForOffSet.x//e.pageX ;//- imgForOffSet.offsetLeft;
    var y = 1080-imgY//-imgForOffSet.y// e.pageY; //- imgForOffSet.offsetTop;
    // alert("X Coordinate: " + x + " Y Coordinate: " + y);

    
    const rect = document.getElementById("canvas").getBoundingClientRect()

    const xf = e.clientX - rect.left
    const yf = e.clientY - rect.top

    // beamTop = yf;
    // beamLeft = xf;
    var activeCrossParam2 = document.getElementById("active2");
            
    if(activeCrossParam2){
        // var params = "type="+type+"&command="+command+"&active="+active+"&posX="+activeCrossParam1.x+"&posY="+activeCrossParam1.y;
       console.log("Param2 true")
        mCoords[1][0] = Math.floor((e.clientX - rect.left)*ratioX);
        mCoords[1][1] = Math.floor((e.clientY - rect.top)*ratioX);
            
    }else{
        console.log("Param2 true NOTS")
        // var params = "type="+type+"&command="+command+"&active="+active+"&posX="+xf+"&posY="+yf;
        mCoords[0][0] = Math.floor((e.clientX - rect.left)*ratioX);
        mCoords[0][1] = Math.floor((e.clientY - rect.top)*ratioX);
    }

   
}
