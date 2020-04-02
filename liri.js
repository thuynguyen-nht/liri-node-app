require("dotenv").config();

var keys = require("./keys.js");


var moment = require('moment');

// Grab the axios package...
var axios = require("axios");

//grap spotify keys
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require("fs")

var arg1 = process.argv[2];

var arg2 = process.argv.slice(3).join(" ");

var nodeArgs = arg1 + "," + arg2;

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
runCommand(arg1, arg2)

//=======functions===============
function getArtistInfo(artist) {
    if (!artist) {
        artist = 'Lady Gaga'
    }

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            var artistResults = response.data;
            var output = [];

            var divider = "\n------------------------------------------------------------\n";

            for (var i in artistResults) {
                output.push({
                    "Venue Name: ": response.data[i].venue.name,
                    "Venue Location: ": response.data[i].venue.city,
                    "Date: ": moment(response.data[i].datetime).format("MM/DD/YYYY"),
                })
                // console.log("Venue Name: " + response.data[i].venue.name);
                // console.log("Venue Location: " + response.data[i].venue.city);
                // console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                // console.log("===================");
            }

            console.log(output)
            fs.appendFile("log.txt", '\n' + JSON.stringify(output) + divider, {
                flag: 'a+'
            }, function (err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("log.txt was updated!");

            });
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

    if (!movie) {
        movie = 'Matrix'
    }

    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);

            var output = [
                "------------------------",
                "Title: " + response.data.Title,
                "Release Year: " + response.data.Year,
                "IMDB Rating: " + response.data.imdbRating,
                "Rotten Tomatoes: " + response.data.Ratings[0].Value,
                "Country: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
                "------------------------",
            ].join("\n")


            fs.appendFile("log.txt", output, {
                flag: 'a+'
            }, function (err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("log.txt was updated!");
                console.log(output)
            });

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

    if (!song) {
        song = 'The Sign'
    }
    spotify.request('https://api.spotify.com/v1/search?q=track:' + song + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }
        // console.log(songResponse.tracks.items[0]);
        var songResponses = songResponse.tracks.items;
        var output = [];

        var divider = "\n------------------------------------------------------------\n";

        for (var i in songResponses) {
            output.push({
                "Artist: ": songResponses[i].artists[0].name,
                "Song: ": songResponses[i].name,
                "URL: ": songResponses[i].preview_url,
                "Album: ": songResponses[i].album.name,

            })

        }

        console.log(output)
        fs.appendFile("log.txt", '\n' + JSON.stringify(output) + divider, {
            flag: 'a+'
        }, function (err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("log.txt was updated!");

        });

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

        if (dataArr[0] === "concert-this") {
            getArtistInfo(dataArr[1])
        } else if (dataArr[0] === "spotify-this-song") {
            getSongInfo(dataArr[1])
        } else if (dataArr[0] === "movie-this") {
            getMovieInfo(dataArr[1])
        } else {
            doWhatItSays()
        }
    });
}