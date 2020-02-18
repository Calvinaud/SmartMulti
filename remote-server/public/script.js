// ======== SESSION ========

function logOut(){
  location.href = "index.html"
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

	var json = {};
	json["calendar"] = profile.getEmail;

	setTimeout(() => {
        sendAction(json, 'calendar');
    }, 2000);
}

// ======== ACTIONS ========
const ACTIONS = {
    TOGGLE: 'toggle'
}

function changeLocation(){
	console.log("Send location");
		
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;
	
	var json = {};
	json["country"] = country;
	json["city"] = city;

	
	setTimeout(() => {
        sendAction(json, 'weather');
    }, 2000);
}

function changeCalendar(){
	console.log("Send Calendar");
		
	var calendar = document.getElementById("calendar").value;	

	var json = {};
	json["calendar"] = calendar;

	setTimeout(() => {
        sendAction(json, 'calendar');
    }, 2000);
}


async function sendAction(json, destination){
			
	const resp = await fetch(destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    console.log(await resp.text());
}