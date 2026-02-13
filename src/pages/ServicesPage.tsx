import { motion } from "framer-motion";
import { Building2, Wrench, Zap, PaintBucket, LayoutGrid, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const services = [
  {
    icon: Building2,
    title: "Institutional Construction",
    description: "Government and institutional buildings constructed to the highest standards with NCA-certified quality.",
    details: [
      "Educational facilities (classrooms, libraries, dormitories, dining halls)",
      "Government administrative offices",
      "Community centres and public buildings",
      "Full design-build delivery from foundation to handover",
      "Compliance with government procurement and building standards",
    ],
  },
  {
    icon: Wrench,
    title: "Civil Engineering & Infrastructure",
    description: "Roads, perimeter walls, drainage systems, and public infrastructure development across Kenya.",
    details: [
      "Road construction and thermoplastic marking",
      "Perimeter walls and boundary infrastructure",
      "Drainage and stormwater management systems",
      "Site preparation, grading, and earthworks",
      "NCA 2 certified civil engineering works",
    ],
  },
  {
    icon: Zap,
    title: "Mechanical & Electrical Installations",
    description: "HVAC systems, electrical wiring, storm arresting, and MEP services for commercial buildings.",
    details: [
      "HVAC system design and installation",
      "Electrical distribution and wiring",
      "Lightning protection and storm arresting systems",
      "Plumbing and water reticulation",
      "NCA 5 & NCA 6 certified MEP works",
    ],
  },
  {
    icon: PaintBucket,
    title: "Renovations & Refurbishment",
    description: "Complete building restoration including re-roofing, plastering, painting, and structural repairs.",
    details: [
      "Roof replacement and waterproofing",
      "Wall re-plastering and structural repairs",
      "Interior and exterior painting",
      "Floor tiling and finishing",
      "Staff quarters and residential renovations",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Interior Fit-Out & Acoustic Solutions",
    description: "Aluminium partitions, gypsum ceilings, soundproofing, and modern interior finishing.",
    details: [
      "Aluminium partition systems",
      "Gypsum board and acoustic ceilings",
      "Soundproofing and noise insulation",
      "Office space planning and fit-out",
      "Custom interior finishing works",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Storm Arresting & Safety",
    description: "Lightning protection systems and safety installations for high-rise and government buildings.",
    details: [
      "Lightning protection system design",
      "Storm arrester installation",
      "Grounding and earthing systems",
      "Testing and commissioning",
      "Ongoing maintenance and inspection",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      <section className="navy-gradient pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide section-padding !py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">Our Services</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl">
              Engineering Solutions That Deliver
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl">
              From ground-breaking to handover, we provide end-to-end construction and engineering services across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid md:grid-cols-2 gap-8 bg-card rounded-xl border border-border p-8 hover:border-accent/30 transition-colors"
              >
                <div>
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-3">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-4">What We Deliver</h3>
                  <ul className="space-y-3">
                    {service.details.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Get in touch and let's discuss how we can bring your vision to life.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 orange-gradient text-accent-foreground px-8 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
