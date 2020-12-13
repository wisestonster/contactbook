// index.js

var express = require('express');
var mongoose = require('mongoose');

var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.set('useUnifiedTopology', true); // 1
mongoose.connect(process.env.MONGO_DB); // 2
var db = mongoose.connection; //3

// DB Open
db.once('open', function () {
    console.log('DB connected');
});
// if error
db.on('error', function (err) {
    console.log('DB ERROR : ', err);
});

// View Engine setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Port setting
var port = 3000;
app.listen(port, function () {
    console.log('server on! http://localhost:' + port);
});