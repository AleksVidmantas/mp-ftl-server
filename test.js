
// var nodemailer = require('nodemailer');



const sharp = require('sharp');  
var fs = require('fs');
// var files = fs.readdirSync('./');
// for(f in files){
//     console.log(files[f]);
//     sharp(files[f]).resize(600).toFile("thumb_"+files[f]).then(
//         function(newFileInfo){
//             console.log("Image resized");
//         })
//         .catch(function(err){
//             console.log("Failed")
//             console.log(err);
//         })

        

// }


sharp('./public/images/ftl.png').extract({ width: 1920, height: 880, left: 0, top: 0 }).toFile('./public/images/personnel_subpart.png')
    .then(function(new_file_info) {
        console.log("Image cropped and saved");
    })
    .catch(function(err) {
        console.log("An error occured");
    });