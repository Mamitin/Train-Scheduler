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

//Capture button click
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  //  if (name.val().length === 0 || destination.val().length === 0 || firstTrain.val().length === 0 || frequency.val().length === 0) {
  // alert("You must fill our all required fields");

  //Grab values from text boxes
  name = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#first-train-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  //Code for handling push
  database.ref().push({
    name: name,
    destination: destination,
    first: firstTrain,
    frequency: frequency,
  });
});

var count = 0;

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (childSnapshot) {
  count++
  console.log("Count: " + count);

  // Print the data to the console.
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().first);
  console.log(childSnapshot.val().frequency);
  //console.log(childSnapshot.val().tMinutesTillTrain);

  var tableRow = $("<tr>")
  tableRow.append($("<td>").text(childSnapshot.val().name));
  tableRow.append($("<td>").text(childSnapshot.val().destination));
  tableRow.append($("<td>").text(childSnapshot.val().frequency));
  //trainTime( );
  minutes = trainTime(childSnapshot.val().frequency, childSnapshot.val().first);

  //Next train
  var nextTrain = moment().add(minutes, "minutes").format("hh:mm A");
  //console.log("arrival time " + moment(nextTrain).format("hh:mm"));

  tableRow.append($("<td>").text(nextTrain));
  tableRow.append($("<td>").text(minutes));


  $("#trainList").append(tableRow);

  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


function trainTime(tFrequency, firstTime) {
  // First time
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current time
  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("hh:mm"));

  // Diference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("difference in time: " + diffTime);

  //Time apart
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  //Minute until train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("minutes till train " + tMinutesTillTrain);


  return tMinutesTillTrain;

};

function validateForm() {
  var x = document.forms["form-group"]
  ["#train-input-name"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}


