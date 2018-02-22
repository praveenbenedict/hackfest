function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Generating Random HeartBeat Data

var medicalDataTraining = [];
var outputDataTraining = [];
var medicalDataTest = [];
var outputDataTest = [];
for(i=0; i<10000; i++){
    //Generate Random TrainingValues for heart beat, Temperature and corresponding output
    var heart = Math.floor(getRandomArbitrary(60,75));
    var temp = Math.floor(getRandomArbitrary(90,105));
    var binaryOutput = Math.random();
    //Add heart beat, temperature and output Data to training Arrays  
    var heartTemp = [heart, temp];
    medicalDataTraining.push(heartTemp);
    outputDataTraining.push(binaryOutput);
    //Generate Random Test Values for heartbeat , temperature and corresponding output
    heart = Math.floor(getRandomArbitrary(60,75));
    temp = Math.floor(getRandomArbitrary(90,105));
    binaryOutput = Math.round(getRandomArbitrary(0,1));
    heartTemp = [heart, temp];
    medicalDataTest.push(heartTemp);
    outputDataTest.push(binaryOutput);
}


console.log(outputDataTraining);
var Xtrain = new Matrix(medicalDataTraining);
var Ytrain = Matrix.columnVector(outputDataTraining);
var Xtest = new Matrix(medicalDataTest);
var Ytest = Matrix.columnVector(outputDataTest);
var logreg = new LogisticRegression(numSteps = 1000, learningRate = 5e-3);
logreg.train(Xtrain, Ytrain);
var Yhat = logreg.predict(Xtest);
console.log(Yhat);