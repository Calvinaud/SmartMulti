const express = require('express')
const bodyParser = require('body-parser')
const PORT = 8000;

const app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static('public'))
app.post('/login', (req, res) => {
    res.redirect('/home.html')
})


app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})