const { get } = require("lodash");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../../models/loginRegistrationModel");

const { JWT_SECRET, CRYPTO_SECRET, JWT_ALGORITHM, CRYPTO_ALGORITHM } = process.env;

const jwtSecretKey = JWT_SECRET;
const jwtExpirySeconds = 60 * 60 * 24 * 2;

const loginHealthCheck =  (req, res) => {
    res.send("Login service running");
};

const authenticateUser =  async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ email });
        const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM).toString('hex');
        const dbHashedPassword = get(userDetails, "password");
        if (dbHashedPassword === hashedPassword) {
            const userToken = jwt.sign({ email }, jwtSecretKey, {
                algorithm: JWT_ALGORITHM,
                expiresIn: jwtExpirySeconds,
            });
            console.log("User found");
            // res.cookie("x-user-token", userToken, { maxAge: jwtExpirySeconds * 1000 });  //maxAge is in milliseconds
            // res.end();
            return res.status(200).send({
                userToken
            });
        } else {
            return res.status(403).send({message: "Username or Password incorrect. Please check!"});
        }

    } catch (error) {
        throw new Error(error || "error in creating user");
    }
};

module.exports = {
    loginHealthCheck,
    authenticateUser,
};