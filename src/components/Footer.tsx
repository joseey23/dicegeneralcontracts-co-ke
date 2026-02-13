import { Link } from "react-router-dom";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="navy-gradient text-primary-foreground">
      <div className="container-wide section-padding !py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md orange-gradient flex items-center justify-center">
                <span className="font-display font-extrabold text-accent-foreground">D</span>
              </div>
              <span className="font-display font-bold text-lg">DICE<span className="text-accent ml-1">GC</span></span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              NCA-certified general contractor delivering civil, electrical, and mechanical engineering solutions across Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Services", "Projects", "Certifications", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-primary-foreground/50 hover:text-accent text-sm text-left transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-primary-foreground/50 text-sm">
              <p>Nairobi, Kenya</p>
              <p>+254 700 000 000</p>
              <p>info@dicegc.co.ke</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-primary-foreground/30 text-xs">
          © {new Date().getFullYear()} Dice General Contractors Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
