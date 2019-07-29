require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify)

var axios = require("axios");

function concertCall() {
    var artistName = process.argv.slice(3).join("%20")

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
        function (response) {
            // venue name
            // venue location
            // date

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
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
        })
}

function spotifyCall() {
    var songName = process.argv.slice(3).join("%20")
    if (!songName) {
        songName = "The%20Sign";
    }

    console.log(songName);

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

function movieCall() {
    var movieName = process.argv.slice(3).join("%20")
    if (!movieName) {
        movieName = "Mr%20Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=4859707d").then(
        function (response) {
            console.log(`Title: ${response.data.Title || "undefined"}`);
            console.log(`Release Date: ${response.data.Released || "undefined"}`);
            console.log(`IMDB rating: ${response.data.Ratings[0].Value || "undefined"}`);
            console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value || "undefined"}`);
            console.log(`Country: ${response.data.Country || "undefined"}`);
            console.log(`Language: ${response.data.Language || "undefined"}`);
            console.log(`Plot: ${response.data.Plot || "undefined"}`);
            console.log(`Actors: ${response.data.Actors || "undefined"}`);

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
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
        })
}

switch (process.argv[2].toLowerCase()) {
    case "concert-this":
        console.log(process.argv[2])
        concertCall();
        break;
    case "spotify-this-song":
        console.log(process.argv[2])
        spotifyCall();
        break;
    case "movie-this":
        console.log(process.argv[2])
        movieCall();
        break;
    case "do-what-it-says":
        console.log(process.argv[2])
        break;
    default:
        console.log("No command chosen");
}