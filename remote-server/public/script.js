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

function toggleBox(){
    console.log('toggle')


    setTimeout(() => {
        sendAction(ACTIONS.TOGGLE);
        document.getElementById("status-light") .classList.toggle('on')
    }, 1000)
}

async function sendAction(action){

    const resp = await fetch(action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    console.log(await resp.text());
}