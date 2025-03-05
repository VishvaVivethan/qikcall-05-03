var createError = require('http-errors');
var express = require('express');
const cors = require('cors'); 
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./db');
var http = require('http');
const mongoose = require('mongoose');
const notificationsRouter = require('./routes/users');
var createError = require('http-errors');
const UserRegister = require('./schema/registeruser').UserRegister;
const registerUser = mongoose.model("registeruser", UserRegister);


const { sendNotification } = require('./sendNotification');


connectDB();
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// var app = require('../app');
var debug = require('debug')('backend:server');

var app = express();

// const bodyParser = require('body-parser');


// Express 4.0
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Express 3.0
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb' }));

var port = normalizePort('2525');
console.log(`Server running on port ${port}`);
app.set('port', port);

const baseUrl = process.env.BASE_URL || 'http://localhost:2525';


var server = http.createServer(app);

app.use(cors());

app.use(express.json());

// app.post('/send-fcm-token', sendNotification);
app.post('/send-fcm-token', async (req, res) => {
  const { token, userId } = req.body;  // Extract token and userId from the request body

  // Validate if token and userId are present
  if (!token || !userId) {
    return res.status(400).json({ success: false, error: 'FCM token and userId are required' });
  }

  try {
    // Look for the user in the database using their userId
    const user = await registerUser.findById(userId);  // Assuming you have a `registerUser` model

    // If user is found, update their FCM token
    if (user) {
      user.fcmToken = token;  // Update the user's FCM token field
      await user.save();      // Save the updated user object in the database
      
      console.log('FCM token updated for user:', userId);
      return res.status(200).json({ success: true, message: 'Token updated successfully' });
    } else {
      // If the user is not found in the database
      return res.status(404).json({ success: false, message: 'User not found' });
    }

  } catch (error) {
    // Handle any errors during database operations
    return res.status(500).json({ success: false, error: error.message });
  }
});



app.use('/api/notifications', notificationsRouter);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api', usersRouter);

//Test Data
app.get('/api/', (req, res) => {
  res.send('Test works');
  console.log(`Base URL: ${baseUrl}`)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
