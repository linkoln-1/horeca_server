import nodemailer from "nodemailer";
import { generate } from "random-words";

const sendRemindEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    const codeRecovery = Math.floor(Math.random() * 8999 + 1000);

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_FROM_REMIND,
        pass: process.env.EMAIL_APP,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_REMIND,
      to: email,
      subject: "Код для подтверждения",
      text: "",
      html: `<h1 style="color:#a6a28e">${codeRecovery}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // res.status(StatusCodes.OK).json(error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve({ codeRecovery: codeRecovery, info: info.response });
      }
    });
  });
};

export { sendRemindEmail };
