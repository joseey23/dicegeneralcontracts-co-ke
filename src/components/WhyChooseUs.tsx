import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Shield, Award, Users } from "lucide-react";

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

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative overflow-hidden" ref={ref}>
      <div className="navy-gradient section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">Why Dice GC</span>
              <div className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary-foreground mb-4">
              Trusted by Government. Built for Impact.
            </h2>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto">
              We combine engineering expertise with compliance, safety, and quality assurance to deliver infrastructure that lasts.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-primary-foreground/60 mt-2 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Safety First", desc: "Strict adherence to occupational safety standards on every project site." },
              { title: "Quality Assurance", desc: "ISO-aligned processes ensuring every build meets structural and aesthetic standards." },
              { title: "On-Time Delivery", desc: "Rigorous project management ensuring milestones and deadlines are consistently met." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6"
              >
                <h3 className="font-display font-bold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-primary-foreground/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
