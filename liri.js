//node packages + keys
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

//variables
var argv = process.argv;
var action = process.argv[2];
var x = "";

//mutilple words
for (var i=3; i<argv.length; i++){
    if(i>3 && i<argv.length){
      x = x + "+" + argv[i];
    } else{
      x = x + argv[i];
    }
  }

//commands
switch(action){
    case "my-tweets":
        myTweets();
    break;

    case "spotify-this-song":
        if(x){
            mySpotify(x);
        }else{
            mySpotify("I Want it That Way")
        }
    break;

    case "movie-this":
        if(x){
            myMovie(x);
        }else{
            myMovie("Mr. Nobody")
        }
    break;

    case "do-what-it-says":
        myDoWhat();
    break;
    
}

function myTweets(){
    var params = {screen_name: 'shreedamin', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log("twitter is good");
        for(var i = 0; i < tweets.length; i++){
            //tweet
            console.log(tweets[i].text);
            //tweet timestamp
            console.log(tweets[i].created_at);

        }
      }else{
          console.log("Twiiter is broken" + error)
      }
    })
};

function mySpotify(song){
    spotify.search({ type: "track", query: song}, function(error, data){
        if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
                var song = data.tracks.items[i];
                console.log("_______________________________")
                //artist name
                console.log(data.tracks.items[0].artists[0].name);
                //song name
                console.log(data.tracks.items[0].name);
                //link to song
                console.log(data.tracks.items[0].preview_url);
                //album
                console.log(data.tracks.items[0].album.name);
                console.log("_______________________________")
            }
        }else{
            console.log("Spotify is broken" + error);
        }if(song === "" ){
            console.log("_______________________________")
            //artist name
            console.log(data.tracks.items[0].artists[0].name);
            //song name
            console.log(data.tracks.items[0].name);
            //link to song
            console.log(data.tracks.items[0].preview_url);
            //album
            console.log(data.tracks.items[0].album.name);
            console.log("_______________________________")
        }
    })
};

function myMovie(movie){
    var queryURL = "http://www.omdbapi.com/?t="+movie+"&apikey=f478145b";

    request(queryURL, function (error, response, body){
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
            console.log("_______________________________") 
            console.log(body.Title);
            console.log(body.Year);
            console.log(body.imdbRating);
            console.log(body.tomatoRating);
            console.log(body.Country);
            console.log(body.Language);
            console.log(body.Plot);
            console.log(body.Actors);
            console.log("_______________________________")
        }else{
            console.log("Movie Search is broken");
            
        }
        console.log("_______________________________")
        if(movie === "Mr. Nobody"){
            console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>" + "\nIts on Netflix!\n")
            console.log("_______________________________")
        }
    })
};

function myDoWhat(){
    fs.readFile('random.txt', "utf8", function (error, data){
        var txt = data.split(",");

        mySpotify(txt[1]);

    })
  
};




