require("dotenv").config()
const BASE_URI = `https://doggodebanjan.herokuapp.com:${process.env.PORT}/api`;
const DOG_CEO_BASE_URI = "https://dog.ceo/api";

export {
    BASE_URI,
    DOG_CEO_BASE_URI,
};
