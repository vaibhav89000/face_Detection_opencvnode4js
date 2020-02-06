const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const server = require('../server');

const io = require('socket.io').listen(server);
//const Employee = mongoose.model('Employee');
// const Customer = mongoose.model('Customer');
var cv = require('opencv4nodejs');


router.get('/videocam',(req,res)=>{
    res.sendFile('F:/pythonproject/nodewithopencv/project/views/web/webcam.html');
});


const storage = multer.diskStorage({

    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


//init upload
const upload = multer({
    storage: storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
    // limits: {fileSize: 100000}
}).single('myImage');

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images only');
    }
}


router.get('/', (req, res) => {
    res.render("web/index");
});


router.post('/upload',(req,res) =>{
    // res.send('test');
    upload(req,res,(err) => {
        if(err){
            res.render('web/index',{
                msg: err
            });
        }
        else
        {
            if(req.file == undefined){
                res.render('web/index',{
                    msg: 'Error: No file selected'
                });
            }
            else
            {
                console.log(req.file.filename);
                res.render('web/index',{
                    msg: 'File uploaded',
                    file: req.file.filename,
                });
                
            }
            
        }
    });
    
});


module.exports = router;

















//set storage engine

// const storage = multer.diskStorage({

//     destination: './public/uploads',
//     filename: function(req,file,cb){
//         cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });


// //init upload
// const upload = multer({
//     storage: storage,
//     fileFilter: function(req,file,cb){
//         checkFileType(file,cb);
//     }
//     // limits: {fileSize: 100000}
// }).single('myImage');

// function checkFileType(file,cb){
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//         return cb(null,true);
//     }else{
//         cb('Error: Images only');
//     }
// }







// cv.imread("./vaibhav.jpg", function(err, im){
//   if (err) throw err;
//   if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

//   im.detectObject(cv.FACE_CASCADE,{}, function(err, faces){
//     if (err) throw err;

//     for (var i = 0; i < faces.length; i++){
//       var face = faces[i];
//       im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
//     }

//     im.save('./vaibhav-faces.jpg');
//     console.log('Image saved as friends-faces.png');
//   });
// });


// router.get('/web', (req, res) => {
    
//     console.log("i am in");
//     const image = cv.imread('D:/vaibhav.jpg');
//     // res.send(image)
//     cv.imshow('Image', image);
//     cv.waitKey(0);
//     cv.destroyAllWindows();
    
// });

