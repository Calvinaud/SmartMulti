require("./calendar").then(r => r.listEvents()).catch(reason => console.log(reason));

const express = require("express");
const app = express()


app.get("/", (req, res) => res.send("Hello there"));


app.listen(8000, () => {
    console.log("listening on port 8000")
});