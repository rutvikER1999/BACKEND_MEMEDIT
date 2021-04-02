const express = require('express');
const doten = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

//ADD ROUTES
const postRoutes = require('./routes/posts');// posts router
const auth  = require('./routes/auth');// users router

// TO ADD .ENV VARIABLES
doten.config({ path: './config/config.env' });

//CONNECTION TO DATABASE
connectDB();

const app = express();

//parsing request body
app.use(express.json());

//cookie parser
app.use(cookieParser());

//development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//ROUTE THE ROUTES
app.use('/api/v1/posts', postRoutes);

app.use('/api/v1/auth', auth);

//custom routes error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mod on port number ${PORT}`.yellow.bold));

//handle unhandeled promise rejection

process.on('unhandledRejection', (err, promise) =>{
    console.log(`ERROR:${err.message}`.red)
    //close the server and exit
    server.close(() => process.exit(1));
});