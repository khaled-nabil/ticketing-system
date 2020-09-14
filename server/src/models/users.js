const mongoose = require("mongoose");

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    }
});
User.set('toObject', { virtuals: true });
User.method('toGraph', function toGraph() {
    return JSON.parse(JSON.stringify(this));
});
module.exports = mongoose.model('User', User);
