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

function setActive(item){
    active = item.id;
}
let active="null"

window.onload = function() {

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
        document.getElementById('wepImg2').addEventListener('click', function (event) {
            genericImgPost("weapons","imageClick",event, this);
        });
    }catch(e){

    }
    
    
  
};

function genericImgPost(type,command,e,imgForOffSet){
    var x = 1120+e.pageX - imgForOffSet.offsetLeft;
        var y = 190+e.pageY - imgForOffSet.offsetTop;
        // alert("X Coordinate: " + x + " Y Coordinate: " + y);

        var http = new XMLHttpRequest();
    
        var params = "type=tactical&command=image"+"&active="+active+"&posX="+x+"&posY="+y;
        
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
