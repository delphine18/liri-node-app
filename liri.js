    
    require("dotenv").config();
    var keys = require('./keys.js');
    var request = require('request');
    var moment = require('moment');
    var fs = require('fs')


    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    var command = process.argv[2];
    var thing = process.argv[3];

    if(command === 'spotify-this-song'){
        spotifyThis(thing);
     } 
    else if(command === 'movie-this'){
        movieThis(thing);
     } 
    else if(command === 'concert-this'){
        concertThis(thing)
     } 
    else if(command === 'do-what-it-says'){
        doWhatItSays();
     } 

    function spotifyThis(song){
        if(!thing){
            song = "The Sign Ace of Base"
        }
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if(!thing) {
                song = "The Sign"
            }
            if (err) {
                return console.log('Error occurred: ' + err);
            }
                var response = data.tracks.items;
                response.forEach(song => {
                    console.log(song.artists[0].name) 
                    console.log(song.name)
                    console.log(song.href)
                    console.log(song.album.name)
                    console.log('----------------********************----------------')
                })
        });
    }

    function movieThis(movie){
    if(!thing) {
        movie = "Mr. Nobody"
    }
        request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) { 
            console.log("Title :" + JSON.parse(body).Title);
            console.log("Year :" + JSON.parse(body).Year);
            console.log("IMDB Rating :"  + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating :"+ JSON.parse(body).Ratings[1].Value);
            console.log("Country :" + JSON.parse(body).Country);
            console.log("Language : " + JSON.parse(body).Language);
            console.log("Plot :" + JSON.parse(body).Plot);
            console.log("Actors :" + JSON.parse(body).Actors);
            }
        });
    }


    function concertThis(artist){
        request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var bandArray = JSON.parse(body)
                bandArray.forEach(function(event){
                    console.log(event.venue.name)
                    console.log(event.venue.city)
                    console.log(moment(event.datetime).format('MM/DD/YYYY'))
                    console.log("-------------$$$$$$$$$$$$$$$--------------")
                })
            }
        });
    }

    
    function doWhatItSays() {
        fs.readFile('random.txt', 'utf8', function (err, data) {
            data = data.split(',');
            if (data[0] == 'concert-this') {
            var artist = data[1] 

            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
    
            if (!error && response.statusCode === 200){
           
            var bandArray = JSON.parse(body)
            bandArray.forEach(event=> {
                console.log(event.venue.name)
                console.log(event.venue.city)
                console.log(moment(event.datetime).format('MM/DD/YYYY'))
                console.log("-------------$$$$$$$$$$$$$$$--------------")

                });
            }
        })
    }
   })
}
  
   


  
                   