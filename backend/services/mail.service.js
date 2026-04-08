import nodemailer from "nodemailer";

 const getTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOrderEmail = async (order) => {

    const transporter = getTransporter();
    
  const mailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: order.customer.email,
    subject: "🛒 Order Confirmation",
    html: `
      <h2>Thank you for your order, ${order.customer.fullName}!</h2>
      <p>Your order has been placed successfully.</p>

      <h3>Order Details:</h3>
      <ul>
        <li><strong>Product:</strong> ${order.product.title}</li>
        <li><strong>Brand:</strong> ${order.product.brand}</li>
        <li><strong>Quantity:</strong> ${order.quantity}</li>
        <li><strong>Total Amount:</strong> ₹${order.amount}</li>
      </ul>

      <h3>Delivery Address:</h3>
      <p>
        ${order.customer.address}, ${order.customer.city}, 
        ${order.customer.state} - ${order.customer.pinCode}
      </p>

      <p>We will notify you when your order ships.</p>
      <br/>
      <p>Thanks,<br/>Limra Sales And Services Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Order confirmation email sent to: ${order.customer.email}`);
};

export const sendBookingEmail = async (booking) => {
  const transporter = getTransporter();
  const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const adminMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: adminRecipient,
    subject: "New Service Booking Received",
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Service:</strong> ${booking.service}</p>
    `,
  };

  const userMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "We received your booking request",
    html: `
      <h3>Hello ${booking.name},</h3>
      <p>Thank you for booking with <b>Limra Sales And Services</b>.</p>
      <p>Our team will contact you shortly to confirm your ${booking.service} request.</p>
      <br/>
      <p><strong>Your Details</strong></p>
      <p>Name: ${booking.name}</p>
      <p>Phone: ${booking.phone}</p>
      <p>Service: ${booking.service}</p>
      <br/>
      <p>Regards,<br/>Limra Sales And Services Team</p>
    `,
  };

  const [adminResult, userResult] = await Promise.allSettled([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);

  if (adminResult.status === "fulfilled") {
    console.log(`Booking admin email sent to: ${adminRecipient}`);
  }

  if (adminResult.status === "rejected") {
    console.error("Booking admin email failed:", adminResult.reason?.message || adminResult.reason);
  }

  if (userResult.status === "fulfilled") {
    console.log(`Booking user email sent to: ${booking.email}`);
  }

  if (userResult.status === "rejected") {
    console.error("Booking user email failed:", userResult.reason?.message || userResult.reason);
  }

  if (adminResult.status === "rejected" && userResult.status === "rejected") {
    throw new Error("Both booking emails failed");
  }
};
