import nodemailer from "nodemailer";

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
    html: `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Inquiry Type:</strong> ${isProductInquiry ? "Product Enquiry" : "General Contact"}</p>
      <p><strong>${isProductInquiry ? "Product" : "Service"}:</strong> ${requestedItem}</p>
      ${isProductInquiry ? `<p><strong>Price Range:</strong> ${productPrice || "N/A"}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message || "No message provided"}</p>
    `,
  };

  const userMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: isProductInquiry ? "We received your product enquiry" : "We received your request",
    html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for contacting <b>Limra Sales And Services</b>.</p>
      <p>Our team will contact you within 24 hours.</p>
      <br/>
      <p><b>Your Request Details:</b></p>
      <p><strong>${isProductInquiry ? "Product" : "Service"}:</strong> ${requestedItem}</p>
      ${isProductInquiry ? `<p><strong>Price Range:</strong> ${productPrice || "N/A"}</p>` : ""}
      <p><strong>Message:</strong> ${message || "N/A"}</p>
      <br/>
      <p>Regards,<br/>Limra Sales And Services Team</p>
    `,
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
