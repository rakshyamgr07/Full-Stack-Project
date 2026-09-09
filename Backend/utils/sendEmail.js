const { transporter } = require("./transporter")

async function sendVerificationEmail(to,token){
  const mailOptions = {
    from:process.env.EMAIL_USER,
    to,
    subject :"Email Verification",
    text:"Please Verify your email",
    html:`<h1>Click on the link to verify your email</h1>
    <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`
  }
  return transporter.sendMail(mailOptions)
}

async function sendResetPasswordEmail(to,token){
  const mailOptions = {
    from:process.env.EMAIL_USER,
    to,
    subject :"Reset Password",
    text:"Reset Your  password",
    html:`<h1>Click on the link to reset your password</h1>
    <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>`
  }
  return transporter.sendMail(mailOptions)
}
module.exports = { sendVerificationEmail, sendResetPasswordEmail}