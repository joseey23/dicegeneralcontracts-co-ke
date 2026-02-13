import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { projects, categories, type ProjectCategory } from "@/data/projects";

export default function Projects() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  // Auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi, active]);

  // Reset carousel when filter changes
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, active]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                  className="flex-[0_0_100%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%] min-w-0"
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

          {/* Nav arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-accent/50 transition-colors z-10"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-accent/50 transition-colors z-10"
          >
            <ArrowRight size={18} className="text-foreground" />
          </button>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 orange-gradient text-accent-foreground px-8 py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
