import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarEmail = async ({ to, subject, text, html = null }) => {
  const email = transporter.sendMail({
    from: `LitSport ${process.env.EMAIL_USER}`,
    to,
    subject,
    text,
    html,
  });
  return email;
};

export { enviarEmail };
