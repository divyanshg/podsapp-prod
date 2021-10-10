const jwt = require("jsonwebtoken");
const axios = require("axios")

const config = process.env;

const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        const user = await axios.get("http://10.1.1.169:3400/user", { uid: decoded.uid })

        console.log(user)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;