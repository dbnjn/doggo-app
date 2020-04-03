const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const schema = new Schema({
    name: {
        type: String,
        index: true,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    mobileNo: {
        type: String,
    },
    registrationId: {
        type: ObjectId,
        required: true,
    },
}, {
    collection: "users",
    timestamps: true
});

const User = mongoose.model("User", schema);
module.exports = User;

