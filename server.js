var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

function natural(unix){
    var date = new Date(unix * 1000);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var result = month + " " + day + ", " + year;
    return result;
}

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html"); 
});

app.get("/:time", function(req, res){
   if (!isNaN(req.params.time)){
       var nat = natural(req.params.time);
       if (nat == "undefined NaN, NaN") {
           res.json({unix: null, natural: null});
       } else {
       var full = {unix: Number(req.params.time), natural: nat};
           res.json(full);
       }
   } else {
       var timeUn = new Date(req.params.time);
       if (!isNaN(timeUn)){
           res.json({unix: (timeUn / 1000), natural: req.params.time});
       } else {
           res.json({unix: null, natural: null});
       }
   }
});

app.listen(port, function(){
    console.log("Listening on port " + port);
});