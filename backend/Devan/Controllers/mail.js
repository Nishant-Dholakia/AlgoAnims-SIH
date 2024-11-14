const nodemailer = require('nodemailer')

async function mailforSignup(to , subject , text , html){
    let from = "devanchauhan012@gmail.com"

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, 
        secure: false,
        auth: {
            user: from,
            pass: "vxnp qqkp mumh ihyv", 
        }
    })

    const sendmsg = await transporter.sendMail({
        from : `<${from}>`,
        to : `${to}`,
        // subject : `thanks to sign up on AlgoAnims`,
        // text : `thanks to sign up on AlgoAnims`,
        // html :`<div>
        //     <h1>Thank you so much!</h1>
        // </div>`
        subject : subject,
        text : text,
        html : html,
    })
}
module.exports = mailforSignup;