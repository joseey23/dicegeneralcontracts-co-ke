import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, User, Tag, Wrench, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />

      {/* Hero banner */}
      <section className="navy-gradient pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container-wide section-padding !py-0">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent mb-4">
              {project.category}
            </span>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary-foreground mb-6 max-w-3xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm">
              <span className="flex items-center gap-2"><User size={16} /> {project.client}</span>
              <span className="flex items-center gap-2"><MapPin size={16} /> {project.location}</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {project.date}</span>
              <span className="flex items-center gap-2"><Wrench size={16} /> {project.discipline}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">Scope of Works</h2>
                <ul className="space-y-3">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Stats */}
              {project.stats && project.stats.length > 0 && (
                <div className="bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="font-display font-bold text-foreground mb-4">Project Facts</h3>
                  <div className="space-y-4">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{stat.label}</span>
                        <span className="font-display font-bold text-accent">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-secondary rounded-xl p-6 border border-border">
                <h3 className="font-display font-bold text-foreground mb-2">Engineering Discipline</h3>
                <p className="text-muted-foreground text-sm">{project.discipline}</p>
              </div>

              <button
                onClick={() => { const el = document.getElementById("contact"); if (el) { el.scrollIntoView({ behavior: "smooth" }); } else { window.location.href = "/#contact"; } }}
                className="w-full orange-gradient text-accent-foreground px-6 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Request Similar Project <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
