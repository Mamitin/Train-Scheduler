// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBxVsAk9KgE2-Wb7Eu4M4ORUKvmA3QDZAs",
  authDomain: "train-scheduler-6e4f6.firebaseapp.com",
  databaseURL: "https://train-scheduler-6e4f6.firebaseio.com",
  projectId: "train-scheduler-6e4f6",
  storageBucket: "train-scheduler-6e4f6.appspot.com",
  messagingSenderId: "783946995749",
  appId: "1:783946995749:web:4ca47302b83b5ba04147cc",
  measurementId: "G-0SMHXBWF3Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Establish connection to database
var database = firebase.database();

// Initial variables
var name = "";
var destination = "";
var frequency = "";
var arrival = "";
var minutes = "";
var firstTrain = "";

//Capure button click
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  console.log("test");

  //Grab values from text boxes
  name = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#next-arrival-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  //Code for handling push
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

var count = 0;

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (childSnapshot) {
  count++
  console.log("Count: " + count);

  var frequency = 0;
  var minutes = 0;

  // Print the data to the console.
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().frequency);


  var tableRow = $("<tr>")
  tableRow.append($("<td>").text(childSnapshot.val().name));
  tableRow.append($("<td>").text(childSnapshot.val().destination));
  tableRow.append($("<td>").text(childSnapshot.val().firstTrain));
  tableRow.append($("<td>").text(childSnapshot.val().frequency));


  $("#trainList").append(tableRow);

  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


function trainTime(tFrequency, firstTrain) {
  // First time
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  // Current time
  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("hh:mm"));

  // Diference between times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("difference in time: " + diffTime);

  //Time apart
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  //Minute until train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("minutes till train " + tMinutesTillTrain);

  //Next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("arrival time " + moment(nextTrain).format("hh:mm"));

  return [tMinutesTillTrain, nextTrain];

}

console.log(trainTime(5, "03:30"));



