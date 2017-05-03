(function(){

    // My modules
    const User = require("../models/user");

    module.exports = function(app) {

        // Gets the username if authenticated.  Otherwise an empty string.
        app.get('/db/user', (req, res) => {
            if (req.isAuthenticated()) {
                User.findById(req.user._id, (err, user) => {
                    if (err) {
                        console.error('Error finding user by ID.', req.user._id, err)
                        res.status(503).end();
                    } else if (user) {
                        res.json({name: user.facebook.name, id: user._id});
                    } else {
                        res.status(404).end();
                    }
                });
            } else {
                res.end();
            }
        });
        
    };

})();