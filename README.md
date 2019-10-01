Plus0ne
Plus0ne is a web app that allows you to create and manage your event without you or your guests ever needing to create an account.


Installation Instructions:
1. Install Node.js Version 10.15.3: https://nodejs.org/en/download/ 
2. Clone GitHub Repository: https://github.com/seansneedsf/plus0ne 
3. Navigate to \Plus0ne\plus0ne_react. Run the command “npm install”.
4. Navigate to \Plus0ne\plus0ne_hosting\functions. Run the command "npm install".
5. Create a .env file and put in the plus0ne_hosting and plus0ne_hosting/functions directory. The contents of the current .env file can be found at the end of this document.
6. Run the command “npm install -g firebase-tools@7.0.1” to install version 7.0.1 of Firebase Tools


React Build Instructions:
1. Navigate to plus0ne_react. Run the command “npm start” to test locally. 
2. Run the command “npm run build”. Afterwards, follow the Firebase instructions to deploy to Firebase.
Deployment Instructions:
1. Navigate to plus0ne_hosting/functions. Run the command “firebase deploy --only functions”
2. Navigate to plus0ne_hosting. Run the command “firebase deploy”
3. You can now access it at https://plus0nefinalproject.firebaseapp.com/
