import nodemailer from 'nodemailer';

// Create reusable transporter
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: process.env.MAIL_USER && process.env.MAIL_PASSWORD ? {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      } : undefined
    });
  }
  return transporter;
};

// Generate random password
export const generatePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Send new user credentials email
export const sendNewUserEmail = async (email, name, password) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Akun Anda Telah Dibuat - Media Promote',
      html: `
        <h2>Selamat Datang, ${name}!</h2>
        <p>Akun Anda telah dibuat. Berikut adalah kredensial login Anda:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Silakan login dan ubah password Anda saat pertama kali login.</p>
        <p><strong>PENTING:</strong> Untuk keamanan, harap segera ubah password Anda setelah login pertama kali.</p>
        <br>
        <p>Terima kasih,<br>Tim Media Promote</p>
      `
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    // Preview URL for ethereal.email (development only)
    if (process.env.MAIL_HOST === 'smtp.ethereal.email') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send forgot password email
export const sendForgotPasswordEmail = async (email, name, newPassword) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Reset Password - Media Promote',
      html: `
        <h2>Halo, ${name}!</h2>
        <p>Anda telah meminta reset password. Berikut adalah password baru Anda:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password Baru:</strong> ${newPassword}</p>
        <p>Silakan login menggunakan password baru ini dan segera ubah password Anda.</p>
        <p><strong>PENTING:</strong> Untuk keamanan, harap segera ubah password Anda setelah login.</p>
        <br>
        <p>Jika Anda tidak meminta reset password, harap abaikan email ini.</p>
        <br>
        <p>Terima kasih,<br>Tim Media Promote</p>
      `
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log('Forgot password email sent: %s', info.messageId);

    // Preview URL for ethereal.email (development only)
    if (process.env.MAIL_HOST === 'smtp.ethereal.email') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    return { success: false, error: error.message };
  }
};
