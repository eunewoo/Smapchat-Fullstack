function corsMiddleware(req, res, next) {

    // Hardcoding this URL for now, can move to env variable later if we need to
    res.set('Access-Control-Allow-Origin', 'https://smapchat-bc4cd.web.app/');
    next();
}

module.exports = corsMiddleware;