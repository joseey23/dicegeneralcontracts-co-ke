import { Link } from "react-router-dom";
import diceLogo from "@/assets/dice-logo.png";

export default function Footer() {
  return (
    <footer className="navy-gradient text-primary-foreground">
      <div className="container-wide section-padding !py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={diceLogo} alt="Dice General Contractors Limited" className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-xs">
              NCA-certified general contractor delivering civil, electrical, and mechanical engineering solutions across Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Services", href: "/services" },
                { label: "Projects", href: "/projects" },
                { label: "Certifications", href: "/certifications" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-primary-foreground/50 hover:text-accent text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-primary-foreground/50 text-sm">
              <p>Nairobi, Kenya</p>
              <p>+254 703 581 833</p>
              <p>info@dicelimited.co.ke</p>
              <p>dicelimited@yahoo.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-primary-foreground/30 text-xs">
          © {new Date().getFullYear()} Dice General Contracts Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
