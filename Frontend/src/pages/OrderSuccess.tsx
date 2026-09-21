import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Phone, Mail, ArrowRight, Home, Truck, ShieldCheck, Clock } from 'lucide-react';
import { BRAND } from '@/lib/colors';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const Confetti = () => {
  const colors = [BRAND.primary, BRAND.primaryLight, BRAND.dark, '#10b981', '#f59e0b', BRAND.accentOnDark];
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const [showConfetti, setShowConfetti] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: BRAND.bgSoft }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND.dark }}>No Order Found</h2>
        <button
          onClick={() => navigate('/')}
          style={{ background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)` }}
          className="text-white px-6 py-2 rounded-md"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const formattedDate = estimatedDate.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="min-h-screen pb-16 pt-8" style={{ background: BRAND.bgSoft }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Success Hero */}
          <div
            className="text-center mb-10"
            style={{
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: BRAND.primaryPale }}>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: BRAND.primarySky, animation: 'pulse 2s infinite' }}
                >
                  <CheckCircle
                    className="w-12 h-12"
                    style={{
                      color: BRAND.primary,
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'scale(1)' : 'scale(0)',
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                    }}
                  />
                </div>
              </div>
            </div>

            <h1
              className="font-bold mb-3"
              style={{ color: BRAND.dark, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-base max-w-md mx-auto" style={{ color: BRAND.slate400 }}>
              Thank you <span className="font-semibold" style={{ color: BRAND.dark }}>{order.fullName}</span>! Your order has been confirmed and a confirmation email has been sent to{' '}
              <span className="font-semibold" style={{ color: BRAND.primary }}>{order.email}</span>.
            </p>
          </div>

          {/* Order ID Banner */}
          <div
            className="rounded-md p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
              color: BRAND.white,
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.2s',
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: BRAND.textOnDarkMuted }}>Order Reference</p>
              <p className="text-xl font-bold text-white">{order._id || order.orderId || 'ORD-' + Date.now()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: BRAND.textOnDarkMuted }}>Order Date</p>
              <p className="font-semibold text-sm text-white">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Product Details */}
          <div
            className="bg-white rounded-md shadow-sm p-6 mb-6"
            style={{
              border: `1px solid ${BRAND.slate100}`,
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.35s',
            }}
          >
            <h2 className="flex items-center gap-2 text-base font-semibold mb-5" style={{ color: BRAND.dark }}>
              <Package className="w-5 h-5" style={{ color: BRAND.primary }} /> Your Order
            </h2>
            <div className="flex gap-4 items-start">
              {order.product?.imageUrl && (
                <div className="w-20 h-20 rounded-md p-2 flex items-center justify-center flex-shrink-0" style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.slate100}` }}>
                  <img src={order.product.imageUrl} alt={order.product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2" style={{ color: BRAND.dark }}>{order.product?.title}</h3>
                <p className="text-xs mb-1" style={{ color: BRAND.slate400 }}>Model: {order.product?.model}</p>
                <span className="text-[10px] border px-2 py-0.5 rounded-full" style={{ borderColor: BRAND.slate100, color: BRAND.slate400 }}>{order.product?.brand}</span>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-xs mb-1" style={{ color: BRAND.slate400 }}>Qty: {order.quantity}</p>
                <p className="text-base font-bold" style={{ color: BRAND.primary }}>{formatCurrency(order.amount)}</p>
                <p className="text-[10px] text-green-600 font-medium mt-1">FREE Delivery</p>
              </div>
            </div>
          </div>

          {/* Delivery Info + Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div
              className="bg-white rounded-md shadow-sm p-6"
              style={{
                border: `1px solid ${BRAND.slate100}`,
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.45s',
              }}
            >
              <h2 className="flex items-center gap-2 text-base font-semibold mb-4" style={{ color: BRAND.dark }}>
                <Truck className="w-5 h-5" style={{ color: BRAND.primary }} /> Estimated Delivery
              </h2>
              <div className="rounded-md p-4 text-center" style={{ background: BRAND.primaryPale, border: `1px solid ${BRAND.primarySky}` }}>
                <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: BRAND.primary }}>Expected By</p>
                <p className="text-sm font-semibold leading-snug" style={{ color: BRAND.dark }}>{formattedDate}</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.slate400 }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: BRAND.primaryLight }} /> Order confirmed & processing
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.slate400 }}>
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: BRAND.primary }} /> Free professional installation included
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-md shadow-sm p-6"
              style={{
                border: `1px solid ${BRAND.slate100}`,
                opacity: animateIn ? 1 : 0,
                transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease 0.5s',
              }}
            >
              <h2 className="flex items-center gap-2 text-base font-semibold mb-4" style={{ color: BRAND.dark }}>
                <MapPin className="w-5 h-5" style={{ color: BRAND.primary }} /> Delivery Address
              </h2>
              <div className="space-y-1.5 text-sm" style={{ color: BRAND.darkMid }}>
                <p className="text-base font-semibold" style={{ color: BRAND.dark }}>{order.fullName}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.state} – {order.pinCode}</p>
                <div className="pt-2 space-y-1" style={{ borderTop: `1px solid ${BRAND.slate100}` }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.slate400 }}>
                    <Phone className="w-3.5 h-3.5" /> {order.mobile}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: BRAND.slate400 }}>
                    <Mail className="w-3.5 h-3.5" /> {order.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div
            className="bg-white rounded-md shadow-sm p-6 mb-8"
            style={{
              border: `1px solid ${BRAND.slate100}`,
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.6s',
            }}
          >
            <h2 className="text-xl font-bold mb-5" style={{ color: BRAND.dark }}>What Happens Next?</h2>
            <div className="relative">
              <div className="absolute left-4 top-6 bottom-6 w-0.5" style={{ background: BRAND.slate100 }} />
              <div className="space-y-5">
                {[
                  { icon: Mail, bg: BRAND.primaryPale, color: BRAND.primary, title: 'Confirmation Email', desc: 'You will receive an order confirmation email shortly.' },
                  { icon: Package, bg: '#FEF3C7', color: '#D97706', title: 'Order Processing', desc: 'Your order is being prepared and quality-checked.' },
                  { icon: Truck, bg: '#D1FAE5', color: '#059669', title: 'Out for Delivery', desc: "We'll notify you when your order is dispatched." },
                  { icon: ShieldCheck, bg: BRAND.primaryPale, color: BRAND.dark, title: 'Installation', desc: 'Our technician will contact you to schedule free installation.' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 pl-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10" style={{ background: step.bg, color: step.color }}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold text-sm" style={{ color: BRAND.dark }}>{step.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: BRAND.slate400 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className="text-center"
            style={{ opacity: animateIn ? 1 : 0, transition: 'all 0.6s ease 0.7s' }}
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-md font-semibold text-sm transition-all duration-200 group"
              style={{
                background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.primary} 100%)`,
                boxShadow: `0 8px 24px ${BRAND.primary}33`,
              }}
            >
              <Home className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs mt-3" style={{ color: BRAND.slate400 }}>For any queries, contact our support team</p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
