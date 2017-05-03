(function(){

	// Node modules
	const express = require('express');
	const compress = require('compression');
	const cookieParser = require('cookie-parser');
	const bodyParser = require('body-parser');
	const session = require('express-session');
	const mongoose = require('mongoose');

	// My modules
	const passport = require('./config/passport');
	const pageRoutes = require("./routes/page-routes");
	const authRoutes = require("./routes/auth-routes");
	const dbRoutes = require("./routes/db-routes");

	// Create server
	const app = express();

	// Connect to db
	mongoose.connect(process.env.MONGODB_URI);

	// Set server setting
	app.set('port', (process.env.PORT || 5000));

	// Set server middleware
	app.use(compress());
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({ secret: 'nightlife-time', resave: true, saveUninitialized: true }));
	app.use(passport.initialize());
	app.use(passport.session());

	// Set server static files
	app.use('/favicon.ico', express.static("favicon.ico"));
	app.use(express.static('public/'));
	
  	authRoutes(app, passport);
	dbRoutes(app);
	pageRoutes(app);

  	// Start server
  	app.listen(app.get('port'), () => {
		console.log("App is running", app.get('port'));
  	});

})();