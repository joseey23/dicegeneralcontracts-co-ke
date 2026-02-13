import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, categories, type ProjectCategory } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      <section className="navy-gradient pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide section-padding !py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">Portfolio</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl">
              Our Project Portfolio
            </h1>
            <p className="text-primary-foreground/60 max-w-2xl">
              A track record of delivering quality infrastructure for government and institutional clients across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat as any)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "orange-gradient text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
              >
                <Link
                  to={`/project/${project.id}`}
                  className="group block bg-card rounded-lg border border-border hover:border-accent/40 hover-lift overflow-hidden h-full"
                >
                  <div className="h-2 orange-gradient" />
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent mb-4">
                      {project.category}
                    </span>
                    <h3 className="font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {project.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.overview}</p>
                    <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
