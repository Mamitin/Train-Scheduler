// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCREqhvepbCrJdZ3hWKPQrUOwbsUlCY7XU",
    authDomain: "train-scheduler-650f9.firebaseapp.com",
    databaseURL: "https://train-scheduler-650f9.firebaseio.com",
    projectId: "train-scheduler-650f9",
    storageBucket: "train-scheduler-650f9.appspot.com",
    messagingSenderId: "750731861413",
    appId: "1:750731861413:web:d166cc6732a60c21221c4c",
    measurementId: "G-DT1N716W84"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


//Establish connection to database
var database = firebase.database();

// Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());
  
        // Log the value of the various properties
      /*  console.log(snapshot.val().Name);
        console.log(snapshot.val().Destination);
        console.log(snapshot.val().Frequency);
        console.log(snapshot.val().Time);*/
  
  
        // Change the HTML
        //$("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);
  
        // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

//Create variables




// Create table for current train schedule






//create form to add train