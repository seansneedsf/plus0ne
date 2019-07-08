const nodeMailer = require('nodemailer');
const emailTemplates = require("./email_templates/email");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('PLUS_ONE_EMAIL');

const transPorter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'plus0ne.event.noreply@gmail.com',
        pass: process.env.EMAIL_PWD	
    }
});
const mailOptions = {
    from: '"PlusOne" <plus0ne.event.noreply@gmail.com>', // sender address
    to: "xxx@xxx.xxx", // list of receivers
    subject: "Plus0ne Event", // Subject line
    html: '<b>Plus0ne </b>' // html body
};

const sendMail2Host = (event, manageEventURL) => {
    let email2hostLocal = emailTemplates.email2host;
    email2hostLocal = email2hostLocal.replace(/%URL%/g, manageEventURL);
    email2hostLocal = email2hostLocal.replace("%DATE%", event.date);
    email2hostLocal = email2hostLocal.replace("%TIME%", event.time);
    email2hostLocal = email2hostLocal.replace("%ADDRESS%", event.address);
    email2hostLocal = email2hostLocal.replace("%NAME%", event.name);
    email2hostLocal = email2hostLocal.replace("%IMAGEURI%", (event.customImage?event.customImage:"https://source.unsplash.com/335x180/?nature"));
    mailOptions.to = event.email;
    mailOptions.html = email2hostLocal;
    sendEmail(mailOptions);
}

const sendMail2Guest = (event, guest, acceptURL, declineURL) => {
    let email2guestLocal = emailTemplates.email2guest;
    email2guestLocal = email2guestLocal.replace("%DATE%", event.date);
    email2guestLocal = email2guestLocal.replace("%TIME%", event.time);
    email2guestLocal = email2guestLocal.replace("%ADDRESS%", event.address);
    email2guestLocal = email2guestLocal.replace("%NAME%", event.name);
    email2guestLocal = email2guestLocal.replace("%ACCEPT_URL%", acceptURL);
    email2guestLocal = email2guestLocal.replace("%DECLINE_URL%", declineURL);
    email2guestLocal = email2guestLocal.replace("%IMAGEURI%", (event.customImage?event.customImage:"https://source.unsplash.com/335x180/?nature"));
    mailOptions.to = guest.email;
    mailOptions.html = email2guestLocal;
    sendEmail(mailOptions);
}

const sendMail2All = ( event, origin ) =>{
    const hostCallBackAddress = `${origin}/event/${event.id}`;
    sendMail2Host(event, hostCallBackAddress);
    let email2guestLocal = emailTemplates.email2guest;
    email2guestLocal = email2guestLocal.replace("%DATE%", event.date);
    email2guestLocal = email2guestLocal.replace("%TIME%", event.time);
    email2guestLocal = email2guestLocal.replace("%ADDRESS%", event.address);
    email2guestLocal = email2guestLocal.replace("%NAME%", event.name);
    email2guestLocal = email2guestLocal.replace("%IMAGEURI%", (event.customImage?event.customImage:"https://source.unsplash.com/335x180/?nature"));
    const eventId = event.id;
    const encryptedEventId = cryptr.encrypt(eventId);
    const guests = event.guests;
    guests.forEach(guest => {
        let encryptedEmail = cryptr.encrypt(guest.email);
        let callBackAddress = `${origin}/api/event/response/${encryptedEventId}/${encryptedEmail}`;
        let acceptURL = `${callBackAddress}/1`;
        let declineURL = `${callBackAddress}/0`;
        email2guestLocal = email2guestLocal.replace("%ACCEPT_URL%", acceptURL);
        email2guestLocal = email2guestLocal.replace("%DECLINE_URL%", declineURL);
        mailOptions.to = guest.email;
        mailOptions.html = email2guestLocal;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log("Guest email: ", guest.email);
        console.log("Accept URL: ", acceptURL);
        console.log("Decline URL: ", declineURL);
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        sendEmail(mailOptions);        
    });
    console.log("Notified Guests!");
}

const sendEmail = (mailOptions) => {
    transPorter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Sending mail error: ",error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports.sendMail2Guest = sendMail2Guest;
module.exports.sendMail2Host = sendMail2Host;
module.exports.sendMail2All = sendMail2All;