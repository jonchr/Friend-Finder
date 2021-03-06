var path = require("path");

function htmlRouting(app) {

	// Basic route that sends the user first to the AJAX Page
	app.get("/", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	// Sends the user the survey page
	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	//Console logs the passed information
	app.post("/print", function(req, res) {
		for (var i in req.body.message) console.log(req.body.message[i]);
	});

}

module.exports = htmlRouting;