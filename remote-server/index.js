const {publish} = require('./mqtt');
const express = require('express')
const bodyParser = require('body-parser')
const PORT = 80;

const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))

app.post('/weather', async (req, res) => {
	
	console.log(JSON.stringify(req.body));
	
    const r = publish(JSON.stringify(req.body), 'weather');


	console.log(r);
   
   
    res.sendStatus(200);
})


app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})
