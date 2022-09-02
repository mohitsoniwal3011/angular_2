require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const path = require('path');
require('express-async-errors');
const app = express();
const authHandlerRouter = require('./routes/auth')
const userhandlerRouter = require('./routes/user')
const productHandlerRouter = require('./routes/products');
const reviewHandlerRouter = require('./routes/review');
const orderHandlerRouter = require('./routes/order');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
app.use(morgan('tiny'));
app.use(cookieParser(process.env.SECRET_KEY))
app.use(express.static(path.join(__dirname, './public')));
app.use(fileUpload());
app.use(express.json());
const notFoundErrorMiddleWare = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');

//security packages 
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(cors());
app.use(xss());
app.use(mongoSanitize());


const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.status(200).send('<h1> E commerce api working </h1>');
})


app.get('/api/v1', (req, res) => {
    console.log("cookie parser  --> ", req.signedCookies);
    res.status(200).send('cookies working')
})

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`server listening on port ${port}...`);
        })
        await connectDB(process.env.MONGO_URL);
        console.log("connected to db...");
    } catch (error) {
        console.log("could not spin up the server");
        console.log(error);
    }
}


start();
app.use('/api/v1/auth', authHandlerRouter);
app.use('/api/v1/users', userhandlerRouter);
app.use('/api/v1/products', productHandlerRouter);
app.use('/api/v1/reviews', reviewHandlerRouter);
app.use('/api/v1/orders', orderHandlerRouter);
app.use(notFoundErrorMiddleWare);
app.use(errorHandlerMiddleWare)