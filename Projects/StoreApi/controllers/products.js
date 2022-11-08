const Product = require('../model/products')

const getAllProductsStatic  = async (req, res )=>{
    const products = await Product.find({
        // name : 'modern poster'
    }).select('name price');
    res.status(200).json({products : products});
}

const getAllProducts = async (req, res )=>{
    const {featured , company, name, sort, fields , numericFilters } = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === true ? true :false;
    } 
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex : name , $options : 'i'};
    } 
    // console.log(result);
    let sortList = 'createdAt';  // By Default the list will be sorted by date created 
    if(sort){
        sortList = sort.split(',').join(' ');
    }
    let selectList = '';
    if(fields){
        selectList = fields.split(',').join(' ');
    }
    if(numericFilters){
        const operatorMap = {
            '>' : '$gt', 
            '>=' : '$gte', 
            '=' : '$eq', 
            '<' : '$lt', 
            '<=' : '$lte'
        }
        const regEx  = /\b(<|>|>=|=|<=)\b/g
        const filters = numericFilters.replaceAll(regEx, (match ) => `-${operatorMap[match]}-` );
        const allowedFilters = ['price', 'rating'];
        filters.split(',').forEach((filter) => {
            const [field,operator,value] = filter.split('-');
            if(allowedFilters.includes(field)){
                queryObject[field] = {[operator] : Number(value)}
            } 
        })
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10 ; 
    const skip = (page-1)*limit
    let result =await Product.find(queryObject).sort(sortList).select(selectList).skip(skip).limit(limit);
    res.status(200).json({ nbHits : result.length,products : result})
}

const getSingleProduct= (req, res)=> {
    res.status(200).send(`get single product working  ${req.params.id}`);
}

module.exports = {
    getAllProducts, 
    getSingleProduct,
    getAllProductsStatic
};