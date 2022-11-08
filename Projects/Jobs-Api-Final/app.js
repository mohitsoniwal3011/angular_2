const express = require('express');
require('dotenv').config();
const  connectDB= require('./db/connect')
const app = express();
const path = require('path');
const cors = require('cors');
const notFoundMiddleWare = require('./midddleware/not-found');
const errorHandlerMiddleWare = require('./midddleware/error-handler');
const authHandlerRouter =  require('./routers/auth')
const jobsHandlerRouter =  require('./routers/jobs');
const utilityHandlerRouter  = require('./routers/utils')
const { StatusCodes } = require('http-status-codes');
const authMiddleWare = require('./midddleware/auth');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
app.use(express.static(path.join(__dirname, './public')))
app.use(cors({
    origin : '*',
}))
const port = process.env.PORT || 3000;
app.use(express.json());
// app.use(helmet());
app.use(
    helmet({
    contentSecurityPolicy: false,
    })
    );
app.use(xss());
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
const start = async ()=> {
    try {
        connectDB(process.env.MONGO_URL);
        console.log("connected to DB...");
        app.listen(port , ()=>{
            console.log(`server listening on port ${port}`);
        })
    } catch (error) {
        console.log("count not spin up the server");
        console.log(error);
    }
}

start();
app.use('/api/v1/auth', authHandlerRouter);
app.use('/api/v1/jobs', authMiddleWare,jobsHandlerRouter);
app.use('/api/v1/util', authMiddleWare,utilityHandlerRouter)
app.use(errorHandlerMiddleWare);
app.get('/*', (req, res )=> {
    res.status(200).sendFile(path.join(__dirname, './public/index.html'))
})
app.use(notFoundMiddleWare);