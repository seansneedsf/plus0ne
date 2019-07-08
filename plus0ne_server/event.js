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
    console.log(`GET Template event.`);
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
router.post("/", (req, res)=>{
    console.log("POST: Create a new event")
    const {id, name, date, time, address, email} = {...req.body};
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    if(id&&name&&date&&time&&address&&email){
        const callBackAddress = `${origin}/event/${id}`;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log( "Call Back Address: ", callBackAddress);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        const event = new Event(id, name, date, time, address, email, undefined);
        // TODO: unlock send email when ready (commented out sending email because is too annoying for testing)
        emailModule.sendMail2Host(event, callBackAddress);
        firebaseAdmin.createEvent(id, {...event});
    }
    res.json({...req.body});
});

//update create event and save event to firebase
router.put("/", async (req, res)=>{
    console.log("Put: Update event detail")
    const origin = (req.get('origin')?req.get('origin'):"http://localhost:3000");
    const {id, name, date, time, address} = {...req.body};
    if(id&&name&&date&&time&&address){
        const firebaseEvent = await firebaseAdmin.getEvent(id);
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
        firebaseAdmin.createEvent(id, {...firebaseEvent});
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
    const callBackAddress = `${origin}/api/event/response/${encryptedEventId}/${encryptedEmail}`;
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
    res.send("Thanks for your response!");
});

//handle pushlish new event details to guests
router.get("/notify-guests/:id", async (req, res) => {
    const eventId = req.params.id;
    const event = await firebaseAdmin.getEvent(eventId);
    const origin = req.get('host');
    emailModule.sendMail2All(event, origin);
});

router.post('/upload-image', async (req, res) => {
    const imageDetail = req.files;
    const id = req.body.eventId;
    let event = await firebaseAdmin.getEvent(id);
    const imageHex = imageDetail.file.data.toString('hex');
    const imageBase64 = 'data:image/jpeg;base64,' + Buffer.from(imageHex, 'hex').toString('base64');
    event = {...event, customImage: imageBase64};
    firebaseAdmin.createEvent(id, {...event});
    res.send(imageBase64);
});
module.exports = router;