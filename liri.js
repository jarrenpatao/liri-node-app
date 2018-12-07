// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

var moment = require("moment");
var axios = require("axios");
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsintown = keys.bandsintown;
var omdbKey = keys.omdbKey;
var fs = require("fs");
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

heyLiri(command);

function heyLiri(command) {
  if (command === "concert-this") {
    concertThis(query);
  } else if (command === "spotify-this-song") {
    spotifyThis(query);
  } else if (command === "movie-this") {
    movieThis(query);
  } else if (command === "do-what-it-says") {
    runCommand();
  } else
  console.log("That wasn't a choice. Go back to school.")
}

function concertThis(query) {

  console.log(query);
  axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=" + bandsintown.id).then(
    function (response) {
      response.data.forEach(concert => {
        console.log("*-----------------------**********-------------------------*");
        console.log(
          concert.venue.name + "\n" + 
          concert.venue.city + ", " + concert.venue.region + "\n" +
          concert.datetime);
        console.log("*-----------------------**********-------------------------*");
      })
    }
  );
  console.log();
}


function spotifyThis(query) {

  if (query === "") {
    query = "Ordinary People";
  }
  spotify.search({ type: 'track', query: query }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("*-----------------------**********-------------------------*");
    console.log(
      "Artist: " + data.tracks.items[0].artists[0].name + "\n" +
      "Song: " + data.tracks.items[0].name + "\n" +
      "Song: " + data.tracks.items[3].preview_url + "\n" +
      "Song: " + data.tracks.items[0].album.name
      )
    console.log("*-----------------------**********-------------------------*");

  });
}


function movieThis(query) {

  if (query === "") {
    movie = "3 Ninjas";
  }

  axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=" + omdbKey.id).then(
    function (response) {
      console.log("*-----------------------**********-------------------------*");
      console.log(
        "Title: " + response.data.Title + "\n" +
        "Year: " + response.data.Year + "\n" +
        "Country: " + response.data.Country + "\n" +
        "Language: " + response.data.Language + "\n" +
        "Movie Plot: " + response.data.Plot + "\n" +
        "IMDB Rating: " + response.data.imdbRating + "\n" +
        "Rotten Tomatoes: " + response.data.Ratings[1] + "\n" +
        "Actors: " + response.data.Actors);
      console.log("*-----------------------**********-------------------------*");
    }
  )
};

function runCommand() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    var arr = data.split(",");
    var command = arr[0];
    var query = arr[1].split('"').join('');

    if (error) {
      return console.log(error);
    }

    if (command === "concert-this"){
      concertThis(query);
    }
    if (command === "spotify-this-song"){
      spotifyThis(query);
    }
    if (command === "movie-this"){
      movieThis(query);
    }

  });
}