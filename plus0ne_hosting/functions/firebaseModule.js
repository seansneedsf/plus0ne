const admin = require("firebase-admin");
const serviceAccount = require("./plus0nefinalproject-firebase-adminsdk-7r3ex-e79db170d1.json");
serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID; 
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY;
const DOCUMENT = "events";
const initialDatabase = () =>{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://plus0nefinalproject.firebaseio.com"
    });
    return admin.firestore();
}

const database = initialDatabase();

const createEvent = (eventId, eventDetail) => {
    database.collection("events").doc(eventId).set(eventDetail).then(()=>{
        console.log("Document successfully written!");
        return;
    }).catch((error)=>{
        console.error("Error writing document: ", error);
    });
}

async function getEvent(eventId){
    const docRef = database.collection("events").doc(eventId);
    let event = undefined;
    await new Promise((resolve, reject) => {
        docRef.get().then(result =>{
            if(result.data()){
                event = result.data();
            }
            resolve();
            return;
        }).catch(err=>{
            console.log("Error retrieving:", err);
            reject(error);
        })
    });
    return  event;
}

async function appendGuest(eventId, guest){
    const docRef = database.collection("events").doc(eventId);
    const eventDetail = await getEvent(eventId);
    console.log("event detail: ", eventDetail);
    let guestIndex = eventDetail.guests.findIndex(g => g.email === guest.email);
    if(guestIndex !== -1){
        console.log("Guest already exists..")
        return true;
    }
    eventDetail.guests.push(guest);
    let appened = false;
    await new Promise((resolve, reject) => {
        docRef.set(eventDetail).then(()=>{
            appened= true;
            console.log("Document successfully written!");
            resolve();
            return;
        }).catch((error)=>{
            console.error("Error writing document: ", error);
            reject(error);
        });
    });
    return  appened;
}

async function updateGuestResponse(eventId, email, response){
    const docRef = database.collection("events").doc(eventId);
    const eventDetail = await getEvent(eventId);
    let guestIndex = eventDetail.guests.findIndex(g => g.email === email);
    if(guestIndex === -1){
        console.log("No update: Guest does not exists....");
        return false;
    }
    eventDetail.guests[guestIndex].response = response;
    await new Promise((resolve, reject) => {
            docRef.set(eventDetail).then(()=>{
                appened= true;
                console.log("Document successfully written!");
                resolve();
                return;
            }).catch((error)=>{
                console.error("Error writing document: ", error);
                reject(error);
            });
        });
    return true;
}
module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.appendGuest = appendGuest;
module.exports.updateGuestResponse = updateGuestResponse;