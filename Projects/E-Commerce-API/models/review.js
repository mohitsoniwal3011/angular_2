const mongoose = require('mongoose');


const ReviewSchema = mongoose.Schema({
    rating: {
        type: Number, 
        min  : 1, 
        max : 5 , 
        required : [true, 'Please provide rating']
    },
    title: {
        type: String, 
        trim : true, 
        required : [true , 'Please provide review title'],
        maxLength : [100, 'Title should be less then 100 words']
    },
    comment: {
        type: String,
        required : [true , 'Please provide review text'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
},{ timestamps: true });

async function  calculateAverageRating(productId){
    console.log("average rating method : ", productId);
}

ReviewSchema.statics.calculateAverageRating = async function(productId){
    const result =await  this.aggregate([
        {$match : {product : productId}}, 
        {
            $group : {
                _id : '$product',
                averageRating : {$avg : '$rating'},
                numOfReviews : {$sum : 1}
            }
        }
    ]);
    try {
        await this.model('Product').findOneAndUpdate({_id : productId}, {
            numOfReviews : result[0]?.numOfReviews || 0, 
            averageRating : result[0]?.averageRating || 0
        });
    } catch (error) {
        console.log("error while updating rating : ");
        console.log(error);
    }
    console.log("result : ", result);
}

ReviewSchema.post('save', async function(){
    await this.constructor.calculateAverageRating(this.product);
})

ReviewSchema.post('remove', async function(){
    console.log("inside post remove");
    await this.constructor.calculateAverageRating(this.product);
})

ReviewSchema.index({product : 1, user : 1 }, {unique : true });


module.exports = mongoose.model('Review', ReviewSchema);