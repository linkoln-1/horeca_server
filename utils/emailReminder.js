import nodemailer from "nodemailer";

const sendRemindEmail = async (email, newEmail) => {
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
    subject: "Код подтверждения",
    text: "",
    html: `<h1 style="color:#a6a28e">${code}</h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(StatusCodes.OK).json(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(StatusCodes.OK).json("Email sent: " + info.response);
    }
  });
};

export { sendRemindEmail };
