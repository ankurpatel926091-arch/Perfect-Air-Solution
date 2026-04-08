import nodemailer from "nodemailer";
import { renderEmailTemplate, renderInfoRows, styleTokens } from "../utils/emailTemplate.js";

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
    subject: "Order Confirmation",
    html: renderEmailTemplate({
      title: `Thank you for your order, ${order.customer.fullName}`,
      subtitle: "Your order has been placed successfully",
      bodyHtml: `
        <div style="${styleTokens.infoWrap}">
          ${renderInfoRows([
            { label: "Product", value: order.product?.title || "N/A" },
            { label: "Brand", value: order.product?.brand || "N/A" },
            { label: "Quantity", value: order.quantity || "N/A" },
            { label: "Total Amount", value: `INR ${order.amount}` },
          ])}
        </div>
        <p style="margin:14px 0 8px;font-size:13px;color:#475569;"><strong>Delivery Address</strong></p>
        <div style="${styleTokens.infoWrap}">
          <p style="margin:0;font-size:14px;line-height:1.7;color:#1e293b;">
            ${order.customer?.address || ""}, ${order.customer?.city || ""}, ${order.customer?.state || ""} - ${order.customer?.pinCode || ""}
          </p>
        </div>
      `,
      footerNote: "Limra Sales And Services Team",
    }),
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
    html: renderEmailTemplate({
      title: "New Service Booking Received",
      subtitle: "A customer submitted a booking form",
      bodyHtml: `
        <div style="${styleTokens.infoWrap}">
          ${renderInfoRows([
            { label: "Name", value: booking.name },
            { label: "Email", value: booking.email },
            { label: "Phone", value: booking.phone },
            { label: "Service", value: booking.service },
          ])}
        </div>
      `,
      footerNote: "Admin Notification",
    }),
  };

  const userMailOptions = {
    from: `"Limra Sales And Services" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "We received your booking request",
    html: renderEmailTemplate({
      title: `Hello ${booking.name}, your booking is confirmed`,
      subtitle: "Thank you for choosing Limra Sales And Services",
      bodyHtml: `
        <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#334155;">
          We have received your booking request and our team will contact you shortly for confirmation.
        </p>
        <div style="${styleTokens.infoWrap}">
          ${renderInfoRows([
            { label: "Name", value: booking.name },
            { label: "Phone", value: booking.phone },
            { label: "Service", value: booking.service },
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
