var result = require("dotenv").config();
var fs = require('fs');
var inquirer = require('inquirer');
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsintown = keys.bandsintown;
var omdbKey = keys.omdbKey;
var moment = require('moment');
var axios = require('axios');


function bandsInTown(artist) {
  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsintown.id;

  console.log(`Searching for ${artist} concerts...\nURL: ${url}\n`);

  axios.get(url)
  .then(function (response) {
  // console.log(response);

    var data = response.data;
    data.forEach(element => {
      console.log(`Name: ${element.venue.name} \nLocation: ${element.venue.city}, ${element.venue.country} \nDate: ${moment(response.datetime).format("MM/DD/YYYY")}\n\n`);
    });
  })

  .catch(function (error) {
    console.log(error);
  });
}

function spotifySearch(song) {
  spotify
    .search({
      type: 'track',
      query: song
    })
    .then(function (response) {
            
      var data = response.tracks.items;

    })
    .catch(function (err) {
      console.log(err);
    });
}

function omdb(movie) {
  var url = "http://www.omdbapi.com/?t=" + query + "/?apikey=" + omdbKey.id + "&";

  axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

var input = process.argv[2];
var query = process.argv.slice(3).join(" ");
console.log(`Liri Command: ${input}`);


switch (input) {
  case "concert-this":
    console.log(`Query: ${query}`);
    bandsInTown(query);
    break;
  case "spotify-this-song":
    if (query == "") {
      query = "This Love";
    }
    console.log(`Query: ${query}\n`);
    spotifySearch(query);
    break;
  case "movie-this":
    console.log(`Query: ${query}`);
    omdb(query);
    break;
  case "do-what-it-says":
    readFile();
    break;
  default:
    console.log(`Not a valid input.`);
    break;
}