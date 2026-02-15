import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, User, Tag, Wrench, ArrowRight, X, ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from "@/lib/contact";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const result = await sendContactEmail({ ...form, projectTitle: project?.title });
    setSending(false);
    if (result.success) {
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setDialogOpen(false);
    } else {
      toast({ title: "Failed to send", description: result.error, variant: "destructive" });
    }
  };

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
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-accent text-sm mb-8 transition-colors">
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
                onClick={() => {
                  setForm((f) => ({ ...f, message: `I'm interested in a project similar to "${project.title}". Please get in touch.` }));
                  setDialogOpen(true);
                }}
                className="w-full orange-gradient text-accent-foreground px-6 py-3.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Request Similar Project <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="section-padding !pt-0">
          <div className="container-wide">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">Project Gallery</h2>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img src={img} alt={`${project.title} - Photo ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={28} /></button>
            <button
              className="absolute left-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + project.images!.length) % project.images!.length); }}
            ><ChevronLeft size={36} /></button>
            <img
              src={project.images[lightboxIndex]}
              alt={`${project.title} - Photo ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % project.images!.length); }}
            ><ChevronRight size={36} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Request Similar Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              maxLength={100}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email Address"
              maxLength={255}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone Number (optional)"
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
            />
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your project..."
              maxLength={1000}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full orange-gradient text-accent-foreground px-8 py-3.5 rounded-md font-bold text-sm tracking-wide hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
