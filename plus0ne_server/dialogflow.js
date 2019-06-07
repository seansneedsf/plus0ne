const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const projectId = "plus0nefinalproject";
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();
//export GOOGLE_APPLICATION_CREDENTIALS="./Plus0neFinalProject-2823efbc5452.json"


router.post("/", async (req, res)=>{
    let sessionId = uuid.v4(); 
    let userMessage = '';
    if(!req.body.sessionId){
        console.log("UUID IS NOT DEFINED!!!");
        userMessage = 'create event';
    }else{
        sessionId = req.body.sessionId;
        userMessage = req.body.message;
    } 

    console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`, sessionId);
    console.info(`\n\n>>>>>>> %s <<<<<<<`, req.body.message);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
        text: {
            // The query to send to the dialogflow agent
            text: userMessage,
            // The language used by the client (en-US)
            languageCode: 'en-US',
        },
        },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    // console.log('Detected intent');
    const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);

    if (result.intent) {
        console.log("Result: ", result);
        console.log("Parameters: ", {...result.parameters.fields})
        // console.log("Result intent: ", result.intent);
        // console.log(`  Intent: ${result.intent.displayName}`);
        if(result.intent.displayName === 'Event - Followup - Name - Datetime - Location - Email'){
            //Save event to firebase from here
            res.json({...result.parameters.fields});
        }
    } else {
        //handle no itent
        console.log(`  No intent matched.`);
    }
    res.json({sessionId: sessionId, response: result.fulfillmentText});
});
module.exports = router;