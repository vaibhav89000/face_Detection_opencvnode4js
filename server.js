require('./models/db');
const cv = require('opencv4nodejs');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const bodyparser = require('body-parser');
const multer = require('multer');
const webController = require('./controllers/webController');


var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);




// app.use(bodyparser.urlencoded({
//     extended: true
// }));
// app.use(bodyparser.json());

app.use(express.static('./public/uploads'));
// app.use('/home/upload', express.static(path.join(__dirname, './public/uploads'))) 
console.log(__dirname)
app.use('/home/', express.static(__dirname + '/public/uploads'))

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout',layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

const FTP = 10;
const  wCap = new cv.VideoCapture(0);



const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);


setInterval(()=>{
    const frame = wCap.read();

    const {objects ,numDetections } = classifier.detectMultiScale(frame);

    // if(!objects.length){
    //     console.log('no faces detected');
    // }

    const numDetectionsTh = 10;
    objects.forEach((rect,i)=>{

    const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
    frame.drawRectangle(rect,new cv.Vec3(250,50,30),thickness,cv.LINE_8);
    const image = cv.imencode('.jpg',frame).toString('base64');
    io.emit('image',image);

});
},1000)






server.listen(8000, ()=> {
    console.log('Express server started at :8000');
});

app.use('/home', webController);


module.exports = server;