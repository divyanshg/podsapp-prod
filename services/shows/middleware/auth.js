const jwt = require("jsonwebtoken");
const axios = require("axios")

const config = process.env;

const verifyToken = async (req, res, next) => {
    try {
        var token =
            req.body.token || req.query.token || req.headers["authorization"];

        var token = token.split(" ")[1]
    
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        const {data:user} = await axios.post("http://localhost:3400/user/", {
            uid: decoded.uid
        })

        req.user = user
    } catch (err) {
        console.log(err)
        return res.status(401).send(err);
    }
    return next();
};

module.exports = verifyToken;