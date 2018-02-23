const express = require('express');
const {Matrix} = require('ml-matrix');
const LogisticRegression = require('ml-logistic-regression');
const simulate = require('./playground/logisticRegressionExample.js');
const say = require('say');
const request = require('request');
var heartDataGlobal;

var app = express();

var totalHeartRate = 0;
var totalTemp = 0;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', function(req, res){

    var heartRate = req.query.hr;
    var temp = req.query.temp;
    totalTemp += temp;
    totalHeartRate += heartRate;
    console.log(heartRate);
    res.send("antocoder");
    console.log(req.ip);
});
app.get('/getHeartData', function(req, res){
    var heartData = simulate.getSampleHeartData();
    res.json(heartData);
    heartDataGlobal = heartData;
    //console.log(heartData);
    
});

app.get('/checkAnamoly', function(req, res){
    //console.log(heartDataGlobal);
    console.log(req.ip);
    var isAnamoly = simulate.checkAnamoly(heartDataGlobal, req);
    res.json({isTrue: isAnamoly});
    var latitude = '13.0917';
    var longitude = '79.9728';
    if(isAnamoly == 1){
        request({
            url : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}8&radius=10000&types=hospital&key=AIzaSyBHDN7Y0J6zxjWHt3cZAev3mzUc8lS5hc0`,
            json: true,
        },
        function(error, response, body) {
            //console.log(body);
            console.log("Hospital Name: " + body.results[1].name + " has been notified");
            request( {
                    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${body.results[1].place_id}&key=AIzaSyBHDN7Y0J6zxjWHt3cZAev3mzUc8lS5hc0`,
                    json:true,
                },
                function(error, response, body){
                    console.log("Phone No: " + body.result.formatted_phone_number);
                    say.speak(`Adithan is suffering from a heart abnormality at latitude :${latitude} and longitude ${longitude}`, 'Alex', 0.5);
                    say.speak(`Adithan is suffering from a heart abnormality at latitude :${latitude} and longitude ${longitude}`, 'Alex', 0.5);
                }
            );
    });
    }
});

app.listen(3000);



// setInterval(function() {

//     var avgTemp = totalTemp/60;
//     var avgHeartRate = totalHeartRate/60;
//     console.log(avgTemp);
//     console.log(avgHeartRate);

// }, 1000*60);






// setInterval(function() {
//     //Set code to upload it to database

//     //Reset total values
//     totalTemp = 0;
//     totalHr = 0;
// }, (1000 * 60 * 10));





// our training set (X,Y) 
// var X = new Matrix([[0,-1], [1,0], [1,1], [1,-1], [2,0], [2,1], [2,-1], [3,2], [0,4], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5], [3,4], [1, 10], [1, 12], [2, 10], [2,11], [2, 14], [3, 11]]);
// var Y = Matrix.columnVector([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]);

// // the test set (Xtest, Ytest) 
// var Xtest = new Matrix([[0, -2], [1, 0.5], [1.5, -1], [1, 2.5], [2, 3.5], [1.5, 4], [1, 10.5], [2.5, 10.5], [2, 11.5]])
// var Ytest = Matrix.columnVector([0, 0, 0, 1, 1, 1, 2, 2, 2]);

// // we will train our model 
// var logreg = new LogisticRegression(numSteps = 1000, learningRate = 5e-3);
// logreg.train(X,Y);

// // we try to predict the test set 
// var finalResults = logreg.predict(Xtest);
// console.log(finalResults);