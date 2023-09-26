
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const jwtUtil = require('../utility/jwt_util');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwtUtil.verifyTokenAndReturnPayload(token)
            .then((payload) => {
                req.user = payload;
                next();
            })
            .catch((err) => {
                console.error(err);
                res.statusCode = 401;
                res.send({
                    message: "Failed to Authenticate Token"
                })
            })

    } else {
        res.sendStatus(401);
    }
};


module.exports = { authenticateJWT }
