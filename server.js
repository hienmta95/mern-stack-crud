var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var items = require('./routes/api/items');

var app = express();

// Body parser Middleware
app.use(bodyParser.json());

// DB
var db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Routes
app.use('/', items);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
