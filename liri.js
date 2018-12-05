require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'I want it that way' }, function(err, data) {
  
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  if (process.argv[2] === "concert-this") {
    
  }

console.log(data); 
});
