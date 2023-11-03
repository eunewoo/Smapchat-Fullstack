export default function logMiddleware(req, res, next) {

    console.log(`${req.method} request to ${req.originalUrl} with body:\n\n${req.body}`);
    next();
}