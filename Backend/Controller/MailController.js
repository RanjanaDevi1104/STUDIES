// import nodemailer from 'nodemailer';

// export const sendMail = async(req,res)=>{
//     const{name,email,contact,message}=req.body;

//     try{
// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS,
//     }
// })

// // mail content 

// const MailOptions = {
//     from:process.env.EMAIL_USER,
//     to:process.env.EMAIL_USER,
//     subject:"New From Submission",
//     text:`
//     NEW ENQUIRY RECEIVED:

//     Name:${name}
//     Email:${email}
//     contact:${contact}
//     message:${message}
//     `,
// };

// // send mail 

// await transporter.sendMail(MailOptions);
// res.send({Success:true,Message:"Mail Send Successfully"})

//     }catch(error){
//         res.send({Message:"error Sending Message"})
//     }
// }




import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (req, res) => {
  const { name, email, contact, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",  
      to: process.env.EMAIL_USER,
      subject: "New Form Submission",
      text: `
NEW ENQUIRY RECEIVED:

Name: ${name}
Email: ${email}
Contact: ${contact}
Message: ${message}
      `,
    });

    res.send({
      success: true,
      message: "Mail sent successfully",
      data: response,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error sending message",
    });
  }
};