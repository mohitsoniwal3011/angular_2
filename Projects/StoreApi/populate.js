require('dotenv').config();
const mongoose = require('mongoose');
const productSchema = require('./model/products');
const connectDB = require('./db/connect')
const jsonProducts = require('./products.json'); 

const populatTable =  async ()=> {
    try {
        await connectDB(process.env.MONGO_URL);
        await productSchema.deleteMany();
        await productSchema.create(jsonProducts);
        console.log('sucess populating data...');
        process.exit(0);
    } catch (error) {
        console.log('could not populate data ');
        console.log(error);
        process.exit(1);
    }
}
populatTable()