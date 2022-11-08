const notFoundHandler   = (req, res )=> {
    res.status(404).send('<h1> Invalid Url Entered');
}
module.exports = notFoundHandler;