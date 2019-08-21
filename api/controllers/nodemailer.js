const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'redster652@gmail.com',
        pass: '2281337id'
    }
});

let result = transporter.sendMail({
    from: '"Lab2" redster652@gmail.com',
    to: "pouh.ilya@yandex.by",
    subject: "Message from Node js",
    text: "You are successful register!",
    html: "This <i>message</i> was sent from <strong>Node js</strong> server."
});

console.log(result);
