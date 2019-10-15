const express = require("express");
const app = express()
const request = require('request')



require("./calendar")
.then((calendar) => {
	
	    /* ======== FOR DEMO ONLY ======== */
	
		app.get("/fake-push-end/", (req, res) => {
			console.log("Fake Push Starting");
			
			request.post('http://192.168.99.100:1880/calendar', {
			  json: calendar.getArrivalAndDeparture(0)
			}, (error, response, body) => {
			  if (error) {
				console.error(error)
				return
			  }
			  res.sendStatus(200)
			  console.log(`statusCode: ${response.statusCode}`)
			  console.log(body)
			})
		
		});
	
        /* ======== ENDPOINTS ======== */

        app.get("/rooms/:room_id", (req, res) => {
            const room_id = req.params.room_id;
            
            calendar.getArrivalAndDeparture(room_id)
            .then(r => res.json(r))
        });

        /* ======== START ======== */


        const server = app.listen(8000, () => {
            console.log("listening on port 8000")
            require("./socket").init(server);
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



