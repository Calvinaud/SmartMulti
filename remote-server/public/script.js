// ======== SESSION ========

function logOut(){
  location.href = "index.html"
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// ======== ACTIONS ========
const ACTIONS = {
    TOGGLE: 'toggle'
}

async function changeLocation(){
	console.log("Send location");
		
	var city = document.getElementById("city").value;
	var country = document.getElementById("country").value;
	
	var autre = '{country: '+country+', city: '+city+'}';
	setTimeout(() => {
        sendAction(city, country);
    }, 2000);

}
async function sendAction(newCity, newCountry){
	
	var json = {};
	json["country"] = newCountry;
	json["city"] = newCity;
	
	
	const resp = await fetch('weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    console.log(await resp.text());
}