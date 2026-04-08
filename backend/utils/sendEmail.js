import nodemailer from "nodemailer";
import { renderEmailTemplate, renderInfoRows, styleTokens } from "./emailTemplate.js";

const sendEmail = async (contact) => {
  const {
    name,
    email,
    phone,
    service,
    inquiryType,
    productTitle,
    productPrice,
    message,
  } = contact;

  const isProductInquiry = inquiryType === "product";
  const requestedItem = productTitle || service || "N/A";
  const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: adminRecipient,
    subject: isProductInquiry ? "New Product Enquiry" : "New Contact Form Submission",
    html: renderEmailTemplate({
      title: isProductInquiry ? "New Product Enquiry Received" : "New Contact Request Received",
      subtitle: "A new lead has been submitted from website",
      bodyHtml: `
        <div style="${styleTokens.infoWrap}">
          ${renderInfoRows([
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Phone", value: phone || "N/A" },
            { label: "Inquiry Type", value: isProductInquiry ? "Product Enquiry" : "General Contact" },
            { label: isProductInquiry ? "Product" : "Service", value: requestedItem },
            ...(isProductInquiry ? [{ label: "Price Range", value: productPrice || "N/A" }] : []),
          ])}
        </div>
        <p style="margin:14px 0 8px;font-size:13px;color:#475569;"><strong>Message</strong></p>
        <div style="${styleTokens.infoWrap}">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#1e293b;">${message || "No message provided"}</p>
        </div>
      `,
      footerNote: "Admin Notification",
    }),
  };

  const userMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: isProductInquiry ? "We received your product enquiry" : "We received your request",
    html: renderEmailTemplate({
      title: `Hello ${name}, your request is received`,
      subtitle: "Thank you for contacting Limra Sales And Services",
      bodyHtml: `
        <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#334155;">
          We have received your request successfully. Our team will contact you within 24 hours.
        </p>
        <div style="${styleTokens.infoWrap}">
          ${renderInfoRows([
            { label: isProductInquiry ? "Product" : "Service", value: requestedItem },
            ...(isProductInquiry ? [{ label: "Price Range", value: productPrice || "N/A" }] : []),
            { label: "Message", value: message || "N/A" },
          ])}
        </div>
      `,
      footerNote: "Regards, Limra Sales And Services Team",
    }),
  };

  const [adminResult, userResult] = await Promise.allSettled([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);

  if (adminResult.status === "fulfilled") {
    console.log(`Contact admin email sent to: ${adminRecipient}`);
  }

  if (adminResult.status === "rejected") {
    console.error("Admin email failed:", adminResult.reason?.message || adminResult.reason);
  }

  if (userResult.status === "fulfilled") {
    console.log(`Contact user email sent to: ${email}`);
  }

  if (userResult.status === "rejected") {
    console.error("User email failed:", userResult.reason?.message || userResult.reason);
  }

  if (adminResult.status === "rejected" && userResult.status === "rejected") {
    throw new Error("Both admin and user emails failed");
  }

  console.log("Contact emails processed");
};

export default sendEmail;
