import { transporter } from '../config/nodemailer.config.js';

export const sendRecoveryEmail = async ({ _id: userID, email }, token) => {
  const mailOptions = {
    from: 'ign.lagunas',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<h2>Recupera tu contraseña entrando a este link: </h2> <a href="http://localhost:8080/api/password/change/${userID}/${token}">Recovery link</a>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(error);
  }
};
