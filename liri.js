require("dotenv").config();

var keys = require("./keys.js");


var moment = require('moment');

// Grab the axios package...
var axios = require("axios");

//grap spotify keys
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require("fs")

var nodeArgs = process.argv;

// var command = process.argv[2];

// var arg2 = process.argv.slice(3).join(" ");

//=============Switch statment======



function chooseCommand(command, searchTerm) {
    switch (command) {
        case "concert-this":
            getArtistInfo(searchTerm);
            break;
        case "movie-this":
            getMovieInfo(searchTerm);
            break;
        case "spotify-this-song":
            getSongInfo(searchTerm);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log('Humm! I do not know that. Let try again.');
    }

}

function runCommand(userCommand, userSearch) {

    chooseCommand(userCommand, userSearch);

}

//call out runCommand
runCommand(process.argv[2], process.argv[3])

//=======functions===============
function getArtistInfo(artist) {

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

function getMovieInfo(movie) {

    var movie = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movie = movie + "+" + nodeArgs[i];
        } else {
            movie += nodeArgs[i];

        }
    }
    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            console.log("===================");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + response.data.Ratings[0].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("===================");

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

function getSongInfo(song) {

    var song = ""
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            song = song + "+" + nodeArgs[i];
        } else {
            song += nodeArgs[i];

        }
    }
    spotify.request('https://api.spotify.com/v1/search?q=track:' + song + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }
        // console.log(songResponse.tracks.items[0]);
        var songResponses = songResponse.tracks.items;

        for (var i in songResponses) {
            console.log("Artist: " + songResponses[i].artists[0].name);
            console.log("Song: " + songResponses[i].name);
            console.log("URL: " + songResponses[i].preview_url);
            console.log("Album: " + songResponses[i].album.name);
            console.log('===============');
        }

    });
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        switch (dataArr[0]) {
            case "concert-this":
                getArtistInfo(dataArr[1]);
                break;
            case "movie-this":
                getMovieInfo(dataArr[1]);
                break;
            case "spotify-this-song":
                getSongInfo(dataArr[1]);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log('Humm! I do not know that. Let try again.');
        }



    });
}