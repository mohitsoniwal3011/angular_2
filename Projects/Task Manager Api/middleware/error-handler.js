const errorHandlerMiddleWare = (error , req, res, next) => {
    return res.status(500).json({msg: error});
}

module.exports = errorHandlerMiddleWare;