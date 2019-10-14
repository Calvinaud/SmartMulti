
/**
 * @typedef GEvent
 *  @property {
 *      date: string,
 *      dateTime: string
 *  } start
 * @property {string} summary
 */


/**
 * @param {({maxResults: number}) => Promise} listEvents
 * @param {number} roomId 
 * @param {GEvent[]} events 
 */
async function getArrivalAndDeparture(listEvents, roomId){
    /** @type {GEvent[]} */
    const events =   await listEvents(1000);
    let arrival = events.find(event => event.summary.includes(`arrivée(${roomId})`));
    let departure = events.find(event => event.summary.includes(`départ(${roomId})`));

    return {
        roomId: roomId,
        arrival: arrival || null,
        departure: departure || null
    }
}

module.exports = {getArrivalAndDeparture};