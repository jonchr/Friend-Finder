	
	// Dependencies
	// =============================================================
	var express = require("express");
	var bodyParser = require("body-parser");

	// Sets up the Express App
	// =============================================================

	var PORT = process.env.PORT || 3000;
	var app = express();

	// Sets up the Express app to handle data parsing
	// RANT: For the longest time (3+ hours), my object was being passed from client to server undefined. I eventually found the reason for this was this block of code was after the next block. In this case, the order mattered, as simply swapping the two fixed it. Massive headache solved.
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	//Sets up the express app to require the html and api routes and passes the directory of static files
	app.use(express.static('./app/public'));
	require("./app/routing/htmlRoutes.js")(app);
	require("./app/routing/apiRoutes.js")(app);

	app.listen(PORT, function(err){
		if (err) throw err;
		console.log("Running on PORT " + PORT);
	});
	