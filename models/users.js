const mongoose = require("mongoose");

const schema = mongoose.Schema({
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
schema.set('toObject', { virtuals: true });
schema.method('toGraph', function toGraph() {
    return JSON.parse(JSON.stringify(this));
});

module.exports = schema;
