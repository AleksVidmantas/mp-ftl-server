function engineerPost(item){
    var http = new XMLHttpRequest();
   
    var params = "type=engineering&command="+item.id;
    
    http.open('POST', "/command", true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);

}