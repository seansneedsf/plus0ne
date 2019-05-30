const Cryptr = require('cryptr');
const express = require('express');
const router = express.Router();
const Event = require("./eventM");
const Guest = require("./guestM");
const emailModule = require("./emailModule");
const cryptr = new Cryptr('PLUS_ONE_EMAIL');
const database = require("./firebaseModule");

//hanlde initial request for create event
router.get("/", (req, res)=>{
    res.json({event: new Event()});
});

router.get("/:id", async (req, res)=>{
    const eventId = req.params.id;
    const event = await database.getEvent(eventId);
    res.json({event});
});

//handle create event and save event to firebase
router.post("/", (req, res)=>{
    const origin = req.get('origin');
    const Id = req.body.Id;
    const name = req.body.name;
    const date = req.body.date;
    const time = req.body.time;
    const location = req.body.location;
    const email = req.body.email;
    const guests = req.body.guests;
    if(name&&date&&location&&email){
        const event = new Event(Id, name, date, time, location, email, guests);
        const callBackAddress = `${origin}/event/${event.Id}`;
        console.log("Event: ", event, "Call Back Address; ", callBackAddress);
        // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
        // emailModule.sendMail2Host(email, callBackAddress);
        database.createEvent(Id, {...event});
    }
});

//handle add guest to a specific event
router.post("/guest", async (req, res)=>{
    const origin = req.get('host');
    const eventId = req.body.Id;
    const email = req.body.email;
    const guest = new Guest(email, 0);
    const encryptedEmail = cryptr.encrypt(email);
    const encryptedEventId = cryptr.encrypt(eventId);
    const callBackAddress = `${origin}/api/event/response/${encryptedEventId}/${encryptedEmail}`;
    console.log("Guest: ", guest, "eventId", eventId, "Call Back Address; ", callBackAddress);
    let guestAppended = await database.appendGuest(eventId, {...guest});
    // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
    // emailModule.sendMail2Guest(email, callBackAddress);
    res.end();
});

//handle a guest response to a event
//email button should be js button that send http request to this router
router.get("/response/:id/:email/:response?", async (req, res)=>{
    console.log("Guest response hit!");
    const eventId = cryptr.decrypt(req.params.id);
    const email = cryptr.decrypt(req.params.email);
    const response = req.params.response;
    console.log("Event Id: ", eventId, "Email: ", email);
    let guestUpdate = await database.updateGuestResponse(eventId, email, response);
    if(guestUpdate){
        console.log("Guest response update succeeded!");
    }else{
        console.log("Guest response update failed!");
    }
});

module.exports = router;