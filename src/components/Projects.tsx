import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, categories, type ProjectCategory } from "@/data/projects";

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Portfolio</span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-4">
            Our Project Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of delivering quality infrastructure for government and institutional clients.
          </p>
        </motion.div>

        {/* Filters */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
            >
              <Link
                to={`/project/${project.id}`}
                className="group block bg-card rounded-lg border border-border hover:border-accent/40 hover-lift overflow-hidden"
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
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {project.date}
                    </span>
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
  );
}
