import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const certs = [
  { grade: "NCA 2", title: "Civil Engineering", desc: "Certified for major civil works including roads, buildings, and public infrastructure." },
  { grade: "NCA 5", title: "Electrical Engineering", desc: "Licensed for electrical installations, storm arresting, and power distribution systems." },
  { grade: "NCA 6", title: "Mechanical Engineering", desc: "Qualified for HVAC, plumbing, and mechanical systems installation and maintenance." },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" className="section-padding bg-secondary" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Certifications</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            NCA Certified Engineering
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Registered and certified by the National Construction Authority across multiple engineering disciplines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.grade}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-card rounded-xl p-8 border border-border text-center hover-lift group"
            >
              <div className="w-20 h-20 rounded-full orange-gradient mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-10 h-10 text-accent-foreground" />
              </div>
              <span className="font-display font-extrabold text-2xl text-foreground block mb-1">{cert.grade}</span>
              <h3 className="font-display font-bold text-accent mb-3">{cert.title}</h3>
              <p className="text-muted-foreground text-sm">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
