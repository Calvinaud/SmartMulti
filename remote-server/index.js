const express = require('express')
const bodyParser = require('body-parser')
const {publish} = require('./mqtt');
const PORT = 8000;




const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static('public'))

app.post('/login', (req, res) => {
    res.redirect('/home.html')
})

app.post('/toggle', async (req, res) => {
    const r = publish('toggle');
    if(typeof r == 'string'){
        res.sendStatus(200);
    } else {
        res.sendStatus(500).json(r.message)
    }
})


app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})