const express = require("express");
const app = express()

require("./calendar")
.then((calendar) => {
        /* ======== ENDPOINTS ======== */

        app.get("/rooms/:room_id", (req, res) => {
            const room_id = req.params.room_id;
            
            calendar.getArrivalAndDeparture(room_id)
            .then(r => res.json(r))
        });
            

        /* ======== START ======== */


        const server = app.listen(8000, () => {
            console.log("listening on port 8000")
            require("./socket").initWebSocket(server);
            console.log("-".repeat(40))
        });


    },

    /* CASE CALENDAR INIT. FAILED */
    (reason) => {
        console.log(reason)
        process.exit(1);
        throw new Error("shutting down");
    }
);



