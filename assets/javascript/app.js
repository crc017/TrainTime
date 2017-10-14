// Initialize Firebase
 $( document ).ready(function() {
    console.log( "ready!" );

  var config = {
    apiKey: "AIzaSyDjNFFXO8fnpMFyh5g807T_xpXB3YZJNOs",
    authDomain: "train-time-f8fb6.firebaseapp.com",
    databaseURL: "https://train-time-f8fb6.firebaseio.com",
    projectId: "train-time-f8fb6",
    storageBucket: "",
    messagingSenderId: "580439632661"
  };
  firebase.initializeApp(config);




$("#chooChoo").on("click", function(event){


	event.preventDefault();

	//var name = $("#trainName").val().trim();
	//var destination = $("#destination").val().trim();
	//var firstTime = $("#startTime").val().trim();
	//var frequency = $("#frequency").val().trim();

	var train = {
		name: $("#trainName").val().trim(),
		destination: $("#destination").val().trim(),
		firstTime: $("#startTime").val().trim(),
		frequency: $("#frequency").val().trim()
	}


	firebase.database().ref().push(train);

	//console.log(train.name);
	// console.log(train.destination);
	// console.log(train.firstTime);
	// console.log(train.frequency);

	//firebase.database().ref().clear;
	$("#trainName").val("");
	$("#destination").val("");
	$("#startTime").val("");
	$("#frequency").val("");

});

	//firebase.database().ref().remove();


	firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey) {

  		//console.log(childSnapshot.val());

  		var name = childSnapshot.val().name;
  		var destination = childSnapshot.val().destination;
  		var firstTime = childSnapshot.val().firstTime;
  		var frequency = childSnapshot.val().frequency;
  		


  		//firstTimeMilitary = moment(firstTime, "hmm").format("HH:mm")
  		var aYearAgo = moment(firstTime, "HH:mm").subtract(1, "years");
  		var timeDiff = moment().diff(moment(aYearAgo), "minutes");
  						
  		var timeOver = timeDiff % frequency;
  		var timeUntil = frequency - timeOver;
  		console.log("timeUntil" + timeUntil);
  		var nextTrain = moment().add(timeUntil, "minutes");
  		var nextTrainTime = moment(nextTrain).format("HH:mm");
  		console.log("nextTrainTime" + nextTrainTime);

  		//var timeUntil = 
		//console.log(timeDiff);
  		//moment(convertedDate).diff(moment(), "days")

  	$("#wellSection1").append("<tr class='trainRow'><td>" + name + "</td><td>" + destination + "</td><td class='freq'>" +
    		frequency + "</td><td class='arrivalTime'>" + nextTrainTime + "</td><td class='timeUntil'>" + timeUntil + "</td><td class='hidden firstTime'>" + firstTime + "</td></tr>");

  	
  	});



function generateArrivalTime(){
console.log("Function hit");

	$(".trainRow").each(function(){
		var arrivalTime = $(this).find(".arrivalTime").html();
		var frequency = $(this).find(".freq").html();
		var firstTime = $(this).find(".firstTime").html();



		var aYearAgo = moment(firstTime, "HH:mm").subtract(1, "years");
  		var timeDiff = moment().diff(moment(aYearAgo), "minutes");
		var timeOver = timeDiff % frequency;
  		var timeUntil = frequency - timeOver;

  		var nextTrain = moment().add(timeUntil, "minutes");
  		var nextTrainTime = moment(nextTrain).format("HH:mm");

  		$(this).find(".timeUntil").html(timeUntil);
  		$(this).find(".arrivalTime").html(nextTrainTime);

  		console.log(timeUntil);
	});
};
//setInterval(generateArrivalTime(), 1000);
setInterval(function(){
    generateArrivalTime();
},5000);



}); 

