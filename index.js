// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

// DB Open!!!!!!
db.once('open', function () {
    console.log('DB connected');
});
// if error
db.on('error', function (err) {
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // route의 callback 함수에서 form으로 입력받은 데이터 사용가능
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port setting
var port = 3000;
app.listen(port, function () {
    console.log('server on! http://localhost:' + port);
});