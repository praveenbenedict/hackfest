const express = require('express');
const {Matrix} = require('ml-matrix');
const LogisticRegression = require('ml-logistic-regression');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Getting Sample Heart Rate And Running the Logistic Regression Classifier
function getSampleHeartData() {

    var heartData = [];
    
    for(i=0; i<10; i++){
        //Generate Random TrainingValues for heart beat, Temperature and corresponding output
        var heart = Math.floor(getRandomArbitrary(68,75));
        var temperature = Math.floor(getRandomArbitrary(96, 105));
        //Add heart beat, temperature and output Data to training Arrays  
        var heartObject = {heartRate: heart.toString(),temp: temperature.toString(), seconds: i.toString()};
        heartData.push(heartObject);
        //Generate Random Test Values for heartbeat , temperature and corresponding output
    }
    return heartData;

}

function checkAnamoly(heartData, req){
    var heartTemp = [];
    var i;
    for(i=0; i<10; i++){
        var temp = [heartData[i].heartRate, heartData[i].temp];
        heartTemp.push(temp);
    }
    console.log(heartTemp);
    var heartMatrix = new Matrix(heartTemp);
    var medicalDataTraining = [];
    var outputDataTraining = [];
    var medicalDataTest = [];
    var outputDataTest = [];
    for(i=0; i<10; i++){
        //Generate Random TrainingValues for heart beat, Temperature and corresponding output
        var heart = Math.floor(getRandomArbitrary(60,75));
        var temp = Math.floor(getRandomArbitrary(90,105));
        var binaryOutput = Math.round(Math.random());
        //Add heart beat, temperature and output Data to training Arrays  
        var heartTempd = [heart, temp];
        medicalDataTraining.push(heartTempd);
        outputDataTraining.push(binaryOutput);
        //Generate Random Test Values for heartbeat , temperature and corresponding output
        heart = Math.floor(getRandomArbitrary(60,75));
        temp = Math.floor(getRandomArbitrary(90,105));
        binaryOutput = Math.round(getRandomArbitrary(0,1));
        heartTemp = [heart, temp];
        medicalDataTest.push(heartTemp);
        outputDataTest.push(binaryOutput);
    }
    console.log("Crossed");
    var anamoly = fit(outputDataTraining);    
    var Xtrain = new Matrix(medicalDataTraining);
    var Ytrain = Matrix.columnVector(outputDataTraining);
    console.log(Xtrain);
    console.log(Ytrain);
    var logreg = new LogisticRegression(numSteps = 100, learningRate = 5e-3);
    console.log("djk");
    logreg.train(Xtrain, Ytrain);
    console.log("Trained");
    //console.log(heartMatrix);
    //var Ytest = columnVector[]
    var Yhat = logreg.predict(heartMatrix);
   // console.log(Yhat);
    return anamoly;
        
}
//Generating Random HeartBeat Data

// var medicalDataTraining = [];
// var outputDataTraining = [];
// var medicalDataTest = [];
// var outputDataTest = [];
// for(i=0; i<10000; i++){
//     //Generate Random TrainingValues for heart beat, Temperature and corresponding output
//     var heart = Math.floor(getRandomArbitrary(60,75));
//     var temp = Math.floor(getRandomArbitrary(90,105));
//     var binaryOutput = Math.random();
//     //Add heart beat, temperature and output Data to training Arrays  
//     var heartTemp = [heart, temp];
//     medicalDataTraining.push(heartTemp);
//     outputDataTraining.push(binaryOutput);
//     //Generate Random Test Values for heartbeat , temperature and corresponding output
//     // heart = Math.floor(getRandomArbitrary(60,75));
//     // temp = Math.floor(getRandomArbitrary(90,105));
//     // binaryOutput = Math.round(getRandomArbitrary(0,1));
//     // heartTemp = [heart, temp];
//     // medicalDataTest.push(heartTemp);
//     // outputDataTest.push(binaryOutput);
// }


// console.log(outputDataTraining);
// var Xtrain = new Matrix(medicalDataTraining);
// var Ytrain = Matrix.columnVector(outputDataTraining);
// var Xtest = new Matrix(medicalDataTest);
// var Ytest = Matrix.columnVector(outputDataTest);
// var logreg = new LogisticRegression(numSteps = 1000, learningRate = 5e-3);
// logreg.train(Xtrain, Ytrain);
// var Yhat = logreg.predict(Xtest);
// console.log(Yhat);

function fit(Ytrain, req){
    var one_count, zero_count, i;
    one_count = zero_count = 0;
    for(i = 0; i<10; i++){
        if(Ytrain[i] == 1){
            one_count++;
        }
        else{
            zero_count++;
        }
    }
    if(one_count >= zero_count){
        console.log("Anamoly Detected");
        //console.log(req.ip);
        return 1;
    }else{
        console.log('No Anamolies');
        return 0;
    }
}

module.exports = {
    getSampleHeartData,
    checkAnamoly
};