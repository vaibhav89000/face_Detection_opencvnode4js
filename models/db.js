const mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost:27017/CustomerDB',{ useNewUrlParser: true , useUnifiedTopology: true},(err)=> {
    if(!err) { console.log('mongodb connection succeded')}
    else { console.log('error in db connection:' + err)}
});
