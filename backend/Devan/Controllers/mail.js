const nodemailer = require('nodemailer')

async function mailforSignup(to){
    let from = "devanchauhan012@gmail.com"

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // Port for TLS
        secure: false, // Set to true if you are using port 465
        auth: {
            user: from, // your email
            pass: "vxnp qqkp mumh ihyv", // your app password
        }
    })

    const sendmsg = await transporter.sendMail({
        from : `<${from}>`,
        to : `${to}`,
        subject : `thanks to sign up on AlgoAnims`,
        text : `thanks to sign up on AlgoAnims`,
        html :`<div>
            <h1>Thank you so much!</h1>
        </div>`
    })
}
module.exports = mailforSignup;