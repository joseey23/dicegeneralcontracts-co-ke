import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Shield, Award, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const stats = [
  { icon: Award, value: 19, suffix: "+", label: "Projects Delivered" },
  { icon: Users, value: 8, suffix: "+", label: "Government Clients" },
  { icon: Shield, value: 6, suffix: "+", label: "Years of Experience" },
  { icon: CheckCircle2, value: 3, suffix: "", label: "NCA Certifications" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = duration / target;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-5xl md:text-6xl text-accent">
      {count}{suffix}
    </span>
  );
}

const values = [
  { title: "Safety First", desc: "Strict adherence to occupational safety standards on every project site. We maintain comprehensive safety protocols, regular site audits, and continuous training for all personnel." },
  { title: "Quality Assurance", desc: "ISO-aligned processes ensuring every build meets structural and aesthetic standards. We implement rigorous quality control at every stage from foundation to finishing." },
  { title: "On-Time Delivery", desc: "Rigorous project management ensuring milestones and deadlines are consistently met. Our proven track record with government clients demonstrates our commitment to timely delivery." },
  { title: "Government Trusted", desc: "We are a preferred contractor for multiple government agencies including NG-CDF Board, National Treasury, Ministry of Transport, KNEC, and KURA." },
  { title: "Certified Expertise", desc: "NCA-certified across Civil (NCA 2), Electrical (NCA 5), and Mechanical (NCA 6) engineering disciplines, ensuring compliance with national construction standards." },
  { title: "End-to-End Service", desc: "From initial design consultation through construction to handover and beyond — we manage the complete project lifecycle so you don't have to." },
];

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      <section className="navy-gradient pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide section-padding !py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">Why Dice GC</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl">
              Trusted by Government. Built for Impact.
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl">
              We combine engineering expertise with compliance, safety, and quality assurance to deliver infrastructure that lasts.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition-colors"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Ready to Work With Us?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Partner with a trusted, certified contractor for your next infrastructure project.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 orange-gradient text-accent-foreground px-8 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
