import nodemailer from "nodemailer";
import { renderEmailTemplate, renderInfoRows, styleTokens } from "./emailTemplate.js";

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
      html: renderEmailTemplate({
        title: "New Newsletter Subscriber",
        subtitle: "A user subscribed from the website",
        bodyHtml: `
          <div style="${styleTokens.infoWrap}">
            ${renderInfoRows([{ label: "Subscriber Email", value: email }])}
          </div>
        `,
        footerNote: "Admin Notification",
      }),
    });
    console.log(`Newsletter admin email sent to: ${adminRecipient}`);

    // Welcome email
    await transporter.sendMail({
      from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Newsletter",
      html: renderEmailTemplate({
        title: "Welcome to Limra Newsletter",
        subtitle: "You are now subscribed",
        bodyHtml: `
          <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#334155;">
            Thank you for subscribing. You will receive HVAC updates, maintenance tips, and exclusive offers.
          </p>
          <div style="${styleTokens.infoWrap}">
            ${renderInfoRows([{ label: "Subscribed Email", value: email }])}
          </div>
        `,
        footerNote: "Limra Sales And Services Team",
      }),
    });
    console.log(`Newsletter user email sent to: ${email}`);

    console.log("Newsletter emails sent");
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

export default sendNewsletterEmail;
