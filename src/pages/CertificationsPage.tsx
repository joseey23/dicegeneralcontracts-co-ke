import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const certs = [
  {
    grade: "NCA 2",
    title: "Civil Engineering",
    desc: "Certified for major civil works including roads, buildings, and public infrastructure.",
    details: [
      "Institutional and government buildings",
      "Road construction and infrastructure",
      "Perimeter walls and boundary works",
      "Drainage and stormwater systems",
      "Site preparation and earthworks",
    ],
  },
  {
    grade: "NCA 5",
    title: "Electrical Engineering",
    desc: "Licensed for electrical installations, storm arresting, and power distribution systems.",
    details: [
      "Electrical distribution systems",
      "Lightning protection installations",
      "Power reticulation and wiring",
      "Testing and commissioning",
      "Storm arresting systems",
    ],
  },
  {
    grade: "NCA 6",
    title: "Mechanical Engineering",
    desc: "Qualified for HVAC, plumbing, and mechanical systems installation and maintenance.",
    details: [
      "HVAC system installation",
      "Plumbing and water systems",
      "Acoustic and soundproofing works",
      "Gypsum ceiling installations",
      "Metal fabrication and welding",
    ],
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      <section className="navy-gradient pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide section-padding !py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">Certifications</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl">
              NCA Certified Engineering
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl">
              Registered and certified by the National Construction Authority across multiple engineering disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide space-y-10">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.grade}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid md:grid-cols-3 gap-8 bg-card rounded-xl border border-border p-8"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 rounded-full orange-gradient mb-4 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-accent-foreground" />
                </div>
                <span className="font-display font-extrabold text-3xl text-foreground block mb-1">{cert.grade}</span>
                <h2 className="font-display font-bold text-accent text-xl mb-2">{cert.title}</h2>
                <p className="text-muted-foreground text-sm">{cert.desc}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-display font-semibold text-foreground mb-4">Scope of Certification</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cert.details.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground mb-4">Need a Certified Contractor?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Our NCA certifications ensure your project meets all national standards and regulations.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 orange-gradient text-accent-foreground px-8 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
