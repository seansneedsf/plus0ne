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
    console.log("Request: Get a template event.")
    const event = new Event();
    res.json({event});
});

router.get("/:id", async (req, res)=>{
    console.log("Request: Get a specific event.");
    const id = req.params.id;
    const event = await database.getEvent(id);
    res.json({event});
});

//handle create event and save event to firebase
router.post("/", (req, res)=>{
    console.log("Request: Create a new event.")
    const {id, name, date, time, address, email} = {...req.body};
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    if(id&&name&&date&&time&&address&&email){
        const callBackAddress = `${origin}/event/${id}`;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log( "Call Back Address: ", callBackAddress);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
        // emailModule.sendMail2Host(email, callBackAddress);
        database.createEvent(id, {...req.body});
    }
    res.json({...req.body});
});

//handle create event and save event to firebase
router.put("/", async (req, res)=>{
    console.log("Request: Update event detail")
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    const {id, name, date, time, address} = {...req.body};
    if(id&&name&&date&&time&&address){
        const firebaseEvent = await database.getEvent(id);
        console.log("Firebase event: ", firebaseEvent);
        firebaseEvent.name = name;
        firebaseEvent.date = date;
        firebaseEvent.time = time;
        firebaseEvent.address = address;
        const callBackAddress = `${origin}/event/${id}`;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log( "Call Back Address: ", callBackAddress);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
        // emailModule.sendMail2Host(email, callBackAddress);
        database.createEvent(id, {...firebaseEvent});
    }
    res.json({...req.body});
});

//handle add guest to a specific event
router.put("/guest", async (req, res)=>{
    console.log("Request: Add guest email to event.")
    const origin = req.get('host');
    const {id, email} = {...req.body};
    const guest = new Guest(email, 0);
    const encryptedEmail = cryptr.encrypt(email);
    const encryptedEventId = cryptr.encrypt(id);
    const callBackAddress = `${origin}/api/event/response/${encryptedEventId}/${encryptedEmail}`;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("Guest accept invite address: ", `${callBackAddress}/1`);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("Guest refuse invite address: ", `${callBackAddress}/0`);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    let guestAppended = await database.appendGuest(id, {...guest});
    // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
    // emailModule.sendMail2Guest(email, callBackAddress);
    res.end();
});

//handle a guest response to a event
//email button should be js button that send http request to this router
router.get("/response/:id/:email/:response?", async (req, res)=>{
    console.log("Request: Guest responsed to the event.");
    const id = cryptr.decrypt(req.params.id);
    const email = cryptr.decrypt(req.params.email);
    const response = req.params.response;
    console.log("Event id: ", id, "Email: ", email);
    let guestUpdate = await database.updateGuestResponse(id, email, response);
    if(guestUpdate){
        console.log("Guest response update succeeded!");
    }else{
        console.log("Guest response update failed!");
    }
    res.end();
});

module.exports = router;