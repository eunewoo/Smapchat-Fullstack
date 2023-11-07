function logMiddleware(req, res, next) {

    console.log(`${req.method} request to ${req.originalUrl} with body:\n${req.body}\n`);
    console.log(`response headers:\n${res.getHeaders()}\n`);
    next();
}

module.exports = logMiddleware;