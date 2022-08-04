const notFoundMiddleWare = (req, res) => {
    res.status(404).send('<h1>Invalid Route Accessed<h1>')
}

module.exports = notFoundMiddleWare;