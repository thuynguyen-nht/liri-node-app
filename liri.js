require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var moment = require('moment');

// Grab the axios package...
var axios = require("axios");

var nodeArgs = process.argv;
// var command = process.argv[2];

// var keyWorks = process.argv.split(2);

//Crete an empty variable for holding the artist name
var artist = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        artist = artist + "%20" + nodeArgs[i];
    } else {
        artist += nodeArgs[i];

    }
}
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)

if (nodeArgs[2] === "concert-this") {

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            var artistResults = response.data;

            for (var i in artistResults) {

                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("===================");
            }


        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}