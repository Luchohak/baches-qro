const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const config = require('./database/DB');

const ServerPortRouter = require('./routes/ServerPortRouter');
const ServerReportRouter = require('./routes/ServerReportRouter');
const ServerUserRouter = require('./routes/ServerUserRouter');

// Set up mongoose connection
let dev_db_url = 'mongodb://Admin:admin123@ds125453.mlab.com:25453/pothole-qro';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/serverport', ServerPortRouter);
app.use('/serverreport', ServerReportRouter);
app.use('/serveruser', ServerUserRouter);

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});