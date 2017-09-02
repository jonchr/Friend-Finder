var path = require("path");

var friends = require("../data/friends.js");

function apiRouting(app) {

	//Returns all breeds
	app.get("/api/friends", function(req, res) {
	  res.json(friends);

	});

	//Receives a new profile from the client
	app.post("/api/friends", function(req, res) {
		
		//Console Logs the passed object in the node console
		var newEntry = req.body
		console.log(newEntry);
		
		//Stores the submitted scores
		var scores = newEntry.scores;

		//Vars representing the best match 
		var minCompDiff = 41; //theoretical max difference in compatibility is 40
		var match;

		//Runs compatibility matches for the submitted profile against all stored profiles
		for (var i in friends) {

			//Var for difference in compatibility for current stored profile
			var compDiff = 0;

			//Runs through each of the questions
			for(var j in friends[i].scores) {
				
				//Adds the max difference (4) if one of the profiles did not answer the question
				if(isNaN(scores[j]) || isNaN(friends[i].scores[j])) compDiff += 4;
				//Else, calculates and adds the difference
				else compDiff += Math.abs(scores[j] - friends[i].scores[j]); 

			}
			
			//Makes match the current profile if the current profile has better compatibility
			if(compDiff < minCompDiff) {
				match = friends[i];
				minCompDiff = compDiff;
			}
		}

		//Adds the passed object to the friends object
		friends.push(newEntry);

		//Calculates and adds the match's compatibility score to the object before sending so that the client can report on it
		match.compatibility = Math.floor((40 - minCompDiff)/.4) + "%";

		//Sends the matches profile back to the client
		res.send(match);

	});

}

module.exports = apiRouting;