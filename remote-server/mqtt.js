const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://34.76.135.146:1885')

const REMOTE_ACTION_TOPIC = 'remote_action';


client.on('connect', function () {

    client.subscribe(REMOTE_ACTION_TOPIC, function (err) {
        if (!err) {
        client.publish(REMOTE_ACTION_TOPIC, 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic, ':', message.toString())
})

/**
 * @param {string} str 
 * @returns {Error|string}
 */
async function publish(str){
   const res = await new Promise((resolve, reject) => {

    client.once('error', (error) => {
      reject(error);
    })

    client.publish(REMOTE_ACTION_TOPIC, str);
    setTimeout(() => resolve('ok'), 10)
  });

  return res;

}

module.exports = {publish};