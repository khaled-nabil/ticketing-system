const jwt = require('jsonwebtoken');
const {SECRET} = require('../constants/authentication');

const getUserByToken = (token = null) => {
    if(token) {
        return jwt.verify(token,SECRET, function(err, decoded) {
            if (err) {
                return null;
            }else{
                return decoded.id;
            }
        });
    }
    return null;
};
module.exports = {getUserByToken};
