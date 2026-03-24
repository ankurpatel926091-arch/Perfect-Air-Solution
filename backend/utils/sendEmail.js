import nodemailer from "nodemailer";

const sendEmail = async (contact) => {
  try {
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
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
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
      from: `"Limra Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: isProductInquiry ? "We received your product enquiry" : "We received your request",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting <b>Limra Services</b>.</p>
        <p>Our team will contact you within 24 hours.</p>
        <br/>
        <p><b>Your Request Details:</b></p>
        <p><strong>${isProductInquiry ? "Product" : "Service"}:</strong> ${requestedItem}</p>
        ${isProductInquiry ? `<p><strong>Price Range:</strong> ${productPrice || "N/A"}</p>` : ""}
        <p><strong>Message:</strong> ${message || "N/A"}</p>
        <br/>
        <p>Regards,<br/>Limra Services Team</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

export default sendEmail;
