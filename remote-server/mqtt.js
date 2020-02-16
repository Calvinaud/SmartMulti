const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://34.76.135.146:1885')

const ID_TOPIC = 'serv/';
const FROM_SERV = 'from_serv/';
const FROM_CONTROLLER = 'from_controler/';
const SEND_TOPIC = '/test'

client.on('connect', function () {

    client.subscribe(ID_TOPIC+SEND_TOPIC+"hello", function (err) {
        if (!err) {
			client.publish(ID_TOPIC+SEND_TOPIC+"hello", 'Hello mqtt')
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

    client.publish(ID_TOPIC+SEND_TOPIC+"", str);
    setTimeout(() => resolve('ok'), 10)
  });

  return res;
}

module.exports = {publish};