const nodeMailer = require('nodemailer');
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
    from: '"PlusOne Event Center" <plus0ne.event.noreply@gmail.com>', // sender address
    to: "xxx@xxx.xxx", // list of receivers
    subject: "Plus0ne Event", // Subject line
    html: '<b>Plus0ne </b>' // html body
};

const sendMail2Host = (email, callbackAddress) => {
    mailOptions.to = email;
    //TODO: set mailOptions html to host email
    sendEmail(mailOptions);
}

const sendMail2Guest = (emails, callbackAddress) => {
    emails.forEach(emial =>{
        mailOptions.to = emial;
        //TODO: set mailOptions html to guest email
        sendEmail(mailOptions);
    });
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