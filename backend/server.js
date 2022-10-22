
const dotenv = require("dotenv");
const path = require('path')

// Setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION') {
dotenv.config({ path: 'backend/components/config/config.env' })
// }


const express = require("express");
const app = express();
const productRouter = require("./components/products/productRoutes");
const orderRouter = require("./components/orders/orderRoutes");
const usersRouter = require("./components/users/usersRoutes");
const categoryRouter = require("./components/categories/categoryRoutes");
const paymentRouter = require("./components/payment/paymentRoutes");
const errorHandler = require("./components/middleware/error");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./components/databaseConfig/database");
const cors = require("cors");



// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 500 }));
app.use(cookieParser());

//  file upload
app.use('/uploads', express.static('uploads/'));

// connect to database
connectDatabase();


// router
const version = '/api/v1';
app.use(`${version}`, productRouter);
app.use(`${version}`, usersRouter);
app.use(`${version}`, paymentRouter);
app.use(`${version}`, orderRouter);
app.use(`${version}`, categoryRouter);





// handle uncaughtException
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`shutdown uncaught Exception`);
    process.exit(1);
});



const port = process.env.PORT || 4000;
const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`server starting on port : ${process.env.PORT || 4000} in ${process.env.NODE_ENV} mode`);
});


// handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`shut down server`);
    server.close(() => {
        process.exit(1);
    })

});


// handle error  listen EADDRINUSE: address already in use
process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});


//  if you want test version production local 

// if (process.env.NODE_ENV === 'PRODUCTION') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
//     })
// }

app.use(errorHandler); // middleware to handle error

process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});
