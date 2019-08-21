const Cryptr = require('cryptr');
const cryptr = new Cryptr('PLUS_ONE_EMAIL');
const express = require('express');
const router = express.Router();
const Event = require("./eventM");
const Guest = require("./guestM");
const emailModule = require("./emailModule");
const firebaseAdmin = require("./firebaseModule");

//hanlde initial request for create event
router.get("/", (req, res)=>{
    console.log(`GET Template event`);
    const event = new Event();
    res.json({event});
});

router.get("/:id", async (req, res)=>{
    console.log(`GET Event: ${req.params.id}`);
    const id = req.params.id;
    const event = await firebaseAdmin.getEvent(id);
    res.json({event});
});

//handle create event and save event to firebase
router.post("/", async (req, res)=>{
    console.log("POST: Create a new event")
    const {id, name, startDateTime, endDateTime, address, email} = { ...req.body };
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    console.log(id, name, startDateTime, endDateTime, address, email)
    if(id&&name&&startDateTime&&endDateTime&&address&&email){
        const callBackAddress = `${origin}/event/${id}`;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log( "Call Back Address: ", callBackAddress);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        const event = new Event(id, name, startDateTime, endDateTime, address, email, undefined);
        emailModule.sendMail2Host(event, callBackAddress);
        console.log(event.id, event.name)
        await firebaseAdmin.createEvent(id, {...event});
        console.log("call firebaseAdmin.createEvent(id, {...event})", )
    }
    res.json({...req.body});
});

//update create event and save event to firebase
router.put("/", async (req, res)=>{
    console.log("Put: Update event detail")
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    const {id, name, startDateTime, endDateTime, address, description} = {...req.body};
    if(id&&name&&startDateTime&&endDateTime&&address){
        const firebaseEvent = await firebaseAdmin.getEvent(id);
        firebaseEvent.name = name;
        firebaseEvent.startDateTime = startDateTime;
        firebaseEvent.endDateTime = endDateTime;
        firebaseEvent.address = address;
        firebaseEvent.description = description;
        const callBackAddress = `${origin}/event/${id}`;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log( "Call Back Address: ", callBackAddress);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        firebaseAdmin.createEvent(id, firebaseEvent);
    }
    res.json({...req.body});
});

//handle add guest to a specific event
router.put("/guest", async (req, res)=>{
    console.log("Put: Add guest email to event")
    const origin = req.get('host');
    const {id, email} = {...req.body};
    const guest = new Guest(email, -1);
    const encryptedEmail = cryptr.encrypt(email);
    const encryptedEventId = cryptr.encrypt(id);
    const callBackAddress = `${origin}/app/api/event/response/${encryptedEventId}/${encryptedEmail}`;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("Guest accept invite address: ", `${callBackAddress}/1`);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("Guest refuse invite address: ", `${callBackAddress}/0`);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    let guestAppended = await firebaseAdmin.appendGuest(id, {...guest});
    const event = await firebaseAdmin.getEvent(id);
    emailModule.sendMail2Guest(event, guest, `${callBackAddress}/1`, `${callBackAddress}/0`);
    res.json({'event':{...event}});
});

//handle a guest response to a event
//email button should be js button that send http request to this router
router.get("/response/:id/:email/:response?", async (req, res)=>{
    console.log("Get: Guest responsed to the event");
    const id = cryptr.decrypt(req.params.id);
    const email = cryptr.decrypt(req.params.email);
    const response = req.params.response;
    console.log("Event id: ", id, "Email: ", email);
    let guestUpdate = await firebaseAdmin.updateGuestResponse(id, email, response);
    if(guestUpdate){
        console.log("Guest response update succeeded!");
    }else{
        console.log("Guest response update failed!");
    }
    res.redirect(`https://plus0nefinalproject.web.app/details/${id}`);
});

//handle pushlish new event details to guests
router.get("/notify-guests/:id", async (req, res) => {
    const eventId = req.params.id;
    const event = await firebaseAdmin.getEvent(eventId);
    const origin = req.get('host');
    emailModule.sendMail2All(event, origin);
    res.end();
});

router.post('/upload-image', async (req, res) => {
    const base64Image = req.body.file;
    const id = req.body.eventId;
    let event = await firebaseAdmin.getEvent(id);
    event = {...event, customImage: base64Image};
    event.customImage = base64Image;
    firebaseAdmin.createEvent(id, {...event});
    res.send(base64Image);
});
module.exports = router;