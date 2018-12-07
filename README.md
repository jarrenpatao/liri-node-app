# Liri Node App
Liri - Language Interpretation and Recognition Interface

Creating a terminal interface to display through node.js

This CLI navigates through three api's: Bands In Town, Spotify, and OMDb. See all commands below to obtain information about concerts, movies, as well as individual songs by artists. This application uses node.js and will require a few dependencies noted below. Please download all dependencies with `npm i`

*axios for api calls* 
*moment.js for concert date and timestamps*
*node-spotify-api for song information*

* - Liri Run Commands **
- initialize all commands with `node liri.js [command] [query]`

- `spotify-this-song` will queue a song information search
  - process.argv[3] is the query word  
  - e.g. `node liri.js spotify-this-song "lil wayne"`

![spotify-this-song][STSSS.png]
  
- `concert-this` will queue a concert information search giving date and times
  - process.argv[3] is the query word  
  - e.g. `node liri.js concert-this cartel`
  
- `movie-this` will queue a movie information search
  - process.argv[3] is the query word  
  - e.g. `node liri.js movie-this crash`
  
![movie-this][MTSS.png]

Have fun!
