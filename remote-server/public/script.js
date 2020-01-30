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