const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found');
const router = require('./routes/routes');
const path = require('path');
app.use(express.json())
require('dotenv').config();
require('express-async-errors');

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        console.log('connected to DB ');    
        app.listen(port, ()=> {
            console.log(`server listening on port ${port}`);
        })
    } catch (error) {
        console.log('could not spin up the server');
        console.log(error);
    }
}

app.get('/', (req, res )=>{
    res.status(200).sendFile(path.join(__dirname, './start.html'));
})

app.use('/api/v1/products', router)
app.use(errorHandler)
app.use(notFoundHandler)
start();