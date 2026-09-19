import { motion } from "framer-motion";
import { Percent, Zap, Calendar, PartyPopper } from "lucide-react";

const rentalPlans = [
  { name: "Monthly", price: "₹1,499", period: "/month", features: ["1 Ton Split AC", "Free Installation", "Basic Maintenance"], popular: false },
  { name: "Seasonal", price: "₹3,999", period: "/season", features: ["1.5 Ton Split AC", "Free Installation", "Full Maintenance", "Free Relocation"], popular: true },
  { name: "Event", price: "₹999", period: "/day", features: ["Portable / Tower AC", "Same-Day Delivery", "Setup Included"], popular: false },
];

const MegaSale = () => (
  <section className="py-24 bg-muted">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sale Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-md bg-hero-gradient p-10 sm:p-14 mb-20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="animate-pulse-glow inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold">
                <Zap size={14} />
                MEGA SALE
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
              End of Season Sale
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Up to <span className="text-accent font-bold text-2xl">40% OFF</span> on selected brands.
              Limited period offer!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PartyPopper className="text-accent" size={48} />
            <Percent className="text-accent/50" size={80} strokeWidth={1} />
          </div>
        </div>
      </motion.div>

      {/* Rental Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Flexible Options</span>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-3">AC Rental Plans</h2>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {rentalPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ boxShadow: "0 25px 60px -15px hsl(32 95% 52% / 0.25)" }}
            className={`relative p-8 rounded-md border transition-all duration-300 ${
              plan.popular
                ? "bg-card border-accent shadow-glow-accent"
                : "bg-card border-border"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <Calendar className="text-accent mb-4" size={28} />
            <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-md font-semibold transition-all duration-300 cursor-pointer ${
              plan.popular
                ? "bg-accent text-accent-foreground shadow-glow-accent hover:shadow-glow-accent-strong"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MegaSale;
