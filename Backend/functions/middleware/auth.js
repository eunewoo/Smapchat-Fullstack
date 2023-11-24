const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.authentication;

  if (token == null) {
    next();
    return;
  }

  jwt.verify(token, "asd12341254sFt1tHDSy75367GDwe4ty2352eFDSFTwet", (err, user) => {
    console.log(err)

    if (err) {
        next();
        return;
    }

    req.user = user.id;

    next();
  })
}

module.exports = auth;
