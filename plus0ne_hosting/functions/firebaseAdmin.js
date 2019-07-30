const admin = require("firebase-admin");
const serviceAccount = require("./plus0nefinalproject-firebase-adminsdk-7r3ex-e79db170d1.json");
serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID; 
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://plus0nefinalproject.firebaseio.com"
});
const initialDatabase = () => {
    return admin.firestore();
};


module.exports.initialDatabase = initialDatabase;
