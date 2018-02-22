const express = require('express');
const {Matrix} = require('ml-matrix');
const LogisticRegression = require('ml-logistic-regression');
var app = express();

var totalHeartRate = 0;
var totalTemp = 0;
app.get('/', function(req, res){

    var heartRate = req.query.hr;
    var temp = req.query.temp;
    totalTemp += temp;
    totalHeartRate += heartRate;
    console.log(heartRate);
    res.send("antocoder");
    console.log(req.ip);
});
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

app.listen(3000);



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