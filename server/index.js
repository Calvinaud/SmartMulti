require("./calendar").then(r => r.listEvents()).catch(reason => console.log(reason));

const express = require("express");
const app = express()

/* ======== ENDPOINTS ======== */


app.get("/", (req, res) => res.send("Hello there"));


/* ======== START ======== */


const server = app.listen(8000, () => {
    console.log("listening on port 8000")
    require("./socket").init(server);
    console.log("-".repeat(40))
});
