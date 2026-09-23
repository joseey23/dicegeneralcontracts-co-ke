import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Dice General Contractors | Construction & Engineering Contractor in Kenya"
        description="NCA-certified contractor in Kenya delivering civil, electrical, mechanical works, renovations and fit-outs for government and institutional clients."
        path="/"
       jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Dice General Contractors Limited",
          description: "NCA-certified construction and engineering contractor in Kenya.",
          telephone: "+254703581833",
          email: "info@dicelimited.co.ke",
          url: "https://dicegeneralcontracts-co-ke.lovable.app/",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
          areaServed: "Kenya",
        }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Certifications />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
