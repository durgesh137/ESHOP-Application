/**
 * This file comprises the details for checking the access token  using jsonwebtoken:
 * =>  whether it is valid one, or 
 * => TTL is still valid or not etcetera
*/
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

/**
 * function validates the access token using jwt
 */
const verifyToken = (req, res, next) => {

    /**
     * 1. check if the token is present
     */
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: "Please login first to access this endpoint!"
        });
    }
    /**
     * 2. validate the token using jsonwebtoken
     */
    jwt.verify(token, authConfig.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(410).send({
                message: "Please login first to access this endpoint!"
            });
        }

        /**
         * Fetch the userId from token and set it to the request object
        */
        req._id = decoded.id; //  decoded.id is the userId
        next();
    })

}

module.exports = {
    verifyToken : verifyToken
}