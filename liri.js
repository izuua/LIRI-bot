require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify)
var input = []

input.push(process.argv[2]);
input.push(process.argv.slice(3).join(" "));


function concertCall(arr) {
    var artistName = arr[1];

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(`Venue: ${response.data[0].venue.name || "No venue found"}`);
            console.log(`Venue Location: ${response.data[0].venue.city || "No venue found"}`);
            console.log(`Date: ${moment(response.data[0].datetime).format("MM/DD/YYYY") || "No venue found"}`);

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

function spotifyCall(arr) {
    var songName = arr[1]
    if (!songName) {
        songName = "The Sign";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
      
      console.log(`Artist Name: ${data.tracks.items[0].album.artists[0].name || "no artist found"}`)

      console.log(`Song Name: ${data.tracks.items[0].name || "no name found"}`)

      //song name
      console.log(`Preview Link: ${data.tracks.items[0].preview_url || "no preview found"}`)
      
      console.log(`Album Name: ${data.tracks.items[0].album.name || "no album found"}`)
      });
}

function movieCall(arr) {
    var movieName = arr[1];
    if (!movieName) {
        movieName = "Mr Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=4859707d").then(
        function (response) {
            console.log(`Title: ${response.data.Title || "No title found"}`);
            console.log(`Release Date: ${response.data.Released || "No release date found"}`);
            console.log(`IMDB rating: ${response.data.Ratings[0].Value || "no rating found"}`);
            console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value || "no rating found"}`);
            console.log(`Country: ${response.data.Country || "No Country found"}`);
            console.log(`Language(s): ${response.data.Language || "No Language found"}`);
            console.log(`Plot: ${response.data.Plot || "No plot found"}`);
            console.log(`Actors: ${response.data.Actors || "No actors found"}`);

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

function randomCall() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        
          // Then split it by commas (to make it more readable)
          var dataArr = data.split(",");
          
          switch (dataArr[0].toLowerCase()) {
            case "concert-this":
                concertCall(dataArr);
                break;
            case "spotify-this-song":
                spotifyCall(dataArr);
                break;
            case "movie-this":
                movieCall(dataArr);
                break;
            default:
                console.log("No command chosen");
        }
    })
}

switch (input[0].toLowerCase()) {
    case "concert-this":
        concertCall(input);
        break;
    case "spotify-this-song":
        spotifyCall(input);
        break;
    case "movie-this":
        movieCall(input);
        break;
    case "do-what-it-says":
        randomCall();
        break;
    default:
        console.log("No command chosen. Type 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
}