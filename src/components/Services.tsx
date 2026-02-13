import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Wrench,
  Zap,
  PaintBucket,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Institutional Construction",
    description: "Government and institutional buildings constructed to the highest standards with NCA-certified quality.",
  },
  {
    icon: Wrench,
    title: "Civil Engineering & Infrastructure",
    description: "Roads, perimeter walls, drainage systems, and public infrastructure development across Kenya.",
  },
  {
    icon: Zap,
    title: "Mechanical & Electrical Installations",
    description: "HVAC systems, electrical wiring, storm arresting, and MEP services for commercial buildings.",
  },
  {
    icon: PaintBucket,
    title: "Renovations & Refurbishment",
    description: "Complete building restoration including re-roofing, plastering, painting, and structural repairs.",
  },
  {
    icon: LayoutGrid,
    title: "Interior Fit-Out & Acoustic Solutions",
    description: "Aluminium partitions, gypsum ceilings, soundproofing, and modern interior finishing.",
  },
  {
    icon: ShieldCheck,
    title: "Storm Arresting & Safety",
    description: "Lightning protection systems and safety installations for high-rise and government buildings.",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-lg p-8 border border-border hover:border-accent/50 hover-lift cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 orange-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-7 h-7 text-accent" />
        </div>
        <h3 className="font-display font-bold text-lg text-foreground mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-secondary" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Our Services</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            Engineering Solutions That Deliver
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From ground-breaking to handover, we provide end-to-end construction and engineering services across Kenya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
