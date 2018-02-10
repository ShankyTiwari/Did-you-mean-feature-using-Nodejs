/* 
* @author Shashank Tiwari
* did you mean using Nodejs
*/
'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const levenshteinDistance = require("levenshtein-distance");
const wordCollection = require('./data');

class Server {

	constructor() {
		this.port = process.env.PORT || 4000;
		this.host = `localhost`;

		this.app = express();
		this.http = http.Server(this.app);
	}

  	appConfig() {
		this.app.use(
			bodyParser.json()
		);
		this.app.use(require("express").static('client'));
 	}

	/* Including app Routes starts*/
  	includeRoutes(app) {
		app.get("/", function (req, res) {
			res.sendFile(__dirname + '/client/index.html');
		});
		
		app.post("/getSuggestion", function (request, response) {
			// Variable for server response
			let responseCollection = [];

			//Storing the user entered string into variable
			let getSuggestionString = request.body.suggestion;

            /*
            * Creating an object of the levenshtein-distance node module by passing the collection of words
            */
			let collection = new levenshteinDistance(wordCollection);

            /*
            * Calling the find() method on the object of the levenshtein-distance node module
            * Storing the response inside the responseCollection variable
            */

			collection.find(getSuggestionString, function (result) {
				responseCollection.push(result);
			});
			response.status(200).json(responseCollection);
	  	});
	}
	/* Including app Routes ends*/

	appExecute() {

		this.appConfig();
		this.includeRoutes(this.app);

		this.http.listen(this.port, this.host, () => {
			console.log(`Listening on http://${this.host}:${this.port}`);
		});
	}

}

const app = new Server();
app.appExecute();