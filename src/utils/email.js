import nodemailer from 'nodemailer';

export async function sendVerificationEmail(user, verificationUrl) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: user.email,
            subject: 'Xác thực tài khoản của bạn',
            html: `
        <p>Xin chào <b>${user.full_name}</b>,</p>
        <p>Cảm ơn bạn đã đăng ký. Vui lòng click vào liên kết bên dưới để xác thực tài khoản:</p>
        <a href="${verificationUrl}">Xác thực tài khoản</a>
        <p>Nếu bạn không đăng ký, vui lòng bỏ qua email này.</p>
      `,
        };

        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Không gửi được email xác thực');
    }
}
