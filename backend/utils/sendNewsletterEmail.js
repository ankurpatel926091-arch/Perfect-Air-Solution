import nodemailer from "nodemailer";

const sendNewsletterEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin notification
    const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
      to: adminRecipient,
      subject: "New Newsletter Subscriber",
      html: `<p>New subscriber: <b>${email}</b></p>`,
    });
    console.log(`Newsletter admin email sent to: ${adminRecipient}`);

    // Welcome email
    await transporter.sendMail({
      from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Newsletter",
      html: `
        <h3>Welcome!</h3>
        <p>Thank you for subscribing to our HVAC newsletter.</p>
        <p>You will receive updates, tips, and exclusive offers.</p>
        <br/>
        <p>Limra Sales And Services Team</p>
      `,
    });
    console.log(`Newsletter user email sent to: ${email}`);

    console.log("Newsletter emails sent");
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

export default sendNewsletterEmail;
