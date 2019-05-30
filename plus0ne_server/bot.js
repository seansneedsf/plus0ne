const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const projectId = "plus0nefinalproject";
const {WebhookClient} = require('dialogflow-fulfillment');
const dialogflow = require('dialogflow');
  //export GOOGLE_APPLICATION_CREDENTIALS="./Plus0neFinalProject-2823efbc5452.json"



const botMessage = [
    'Welcome! To get started creating your event, simply just text me a few details.',
    'What name do you want to give your event? Don’t worry, you can always change it later.',
    'Cool! What date and time is your event getting started?',
    'Great! Have an address for the event? If not, you can always start with a city or state.',
    'Perfect! Let’s create a link to your event. What email address can we send it to?',
    'You’re all set! We just sent the link to your email address. Check your spam folder just in case.',
    'Epic %EVENT NAME% %DATE%. Join soon as spots are filling up fast!'
];
router.post("/", async (req, res)=>{
    console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);
    console.info(`\n\n>>>>>>> %s <<<<<<<`, req.body.message);
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
        text: {
            // The query to send to the dialogflow agent
            text: req.body.message,
            // The language used by the client (en-US)
            languageCode: 'en-US',
        },
        },
    };
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log("Result: ", result);
        console.log("Result intent: ", result.intent);
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
});

router.get("/:idx", ( req, res )=>{
    res.send(botMessage[req.params.idx]);
});





module.exports = router;