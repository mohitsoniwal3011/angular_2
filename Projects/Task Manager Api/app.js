
const connectDB = require('./db/connect')
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
app.use(express.json()) // without this we will not get the json response in the body
app.use(express.static('./public'))
const notFound = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');
require('dotenv').config()
const port = 3000;



app.get('/', (req, res) => {
    res.send('<h2> Tasks Manager Api</h1>');
})


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`listening to port ${port}`);
        })
    } catch (error) {
        console.log('could not spin up the server: ');
        console.log(error);
    }
}



app.use('/api/v1/tasks', tasks)
app.use(notFound)  // used when route is not persent
app.use(errorHandlerMiddleWare)
start()