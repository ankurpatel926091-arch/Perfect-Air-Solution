export const WHATSAPP_PHONE = "918429152092";

export const openWhatsApp = (message: string) => {
  const encodedText = encodeURIComponent(message.trim());
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

export const sendContactViaWhatsApp = (data: {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}) => {
  const text = `*New Inquiry via Perfect Air Solution Website* ❄️\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📞 *Phone:* ${data.phone || "Not specified"}\n` +
    `✉️ *Email:* ${data.email || "Not specified"}\n` +
    `🛠️ *Service Needed:* ${data.service || "General Inquiry"}\n` +
    `📝 *Message/Requirement:* ${data.message || "Please contact me back regarding HVAC services."}`;

  openWhatsApp(text);
};

export const sendQuoteViaWhatsApp = (data: {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  serviceName?: string;
  city?: string;
  message?: string;
  notes?: string;
}) => {
  const sName = data.service || data.serviceName || "HVAC Service";
  const details = data.message || data.notes || "None";
  const text = `*New Free Quote / Booking Request* ❄️\n\n` +
    `👤 *Name:* ${data.name || "Customer"}\n` +
    `📞 *Phone:* ${data.phone || "+91 84291 52092"}\n` +
    (data.city ? `📍 *City:* ${data.city}\n` : "") +
    (data.email ? `✉️ *Email:* ${data.email}\n` : "") +
    `❄️ *Service Required:* ${sName}\n` +
    `📋 *Additional Details:* ${details}`;

  openWhatsApp(text);
};

export const sendOrderViaWhatsApp = (data: {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  totalAmount: number;
  itemsSummary: string;
}) => {
  const text = `*New Product Order Request* 🛒\n\n` +
    `👤 *Customer Name:* ${data.name}\n` +
    `📞 *Phone:* ${data.phone}\n` +
    `✉️ *Email:* ${data.email}\n` +
    `📍 *Address:* ${data.address}, ${data.city} - ${data.pincode}\n\n` +
    `📦 *Items:* ${data.itemsSummary}\n` +
    `💰 *Total Amount:* ₹${data.totalAmount.toLocaleString("en-IN")}\n\n` +
    `Please confirm my order details!`;

  openWhatsApp(text);
};
