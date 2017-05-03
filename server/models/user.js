(function(){

    const mongoose = require('mongoose');

    const userSchema = mongoose.Schema({
        facebook: {
            id: String,
            token: String,
            name: String
        }
    });

    module.exports = mongoose.model('User', userSchema);

})();