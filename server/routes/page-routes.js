(function(){
    
    const path = require('path');

    module.exports = function(app) {

        // Always load index.html. React app routes the rest of the pages.
        app.get(/^(?!\/auth|db\/)/, (req, res) => {
            const indexPath = path.resolve(__dirname, '../..', 'public', 'index.html');

            res.sendFile(indexPath);
        });

    };

})();