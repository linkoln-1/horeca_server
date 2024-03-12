import nodemailer from "nodemailer";
import { generate } from "random-words";

const sendRemindEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    const word = generate({ minLength: 4, maxLength: 6 });
    const number = Math.floor(Math.random() * 8999 + 1000);
    const new_pass = word + number;

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
      subject: "Новый пароль пользователя",
      text: "",
      html: `<h1 style="color:#a6a28e">${new_pass}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(StatusCodes.OK).json(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve({ newPassword: new_pass, info: info.response });
      }
    });
  });
};

export { sendRemindEmail };


