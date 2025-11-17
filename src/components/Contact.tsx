import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+62 823 0135 7568",
    href: "tel:+6282301357568",
  },
  {
    icon: Mail,
    label: "Email",
    value: "alvinnandad@gmail.com",
    href: "mailto:alvinnandad@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View my work",
    href: "https://github.com",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children || [];

      // Only animate if elements exist
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleIconHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const icon = e.currentTarget.querySelector(".contact-icon");
    gsap.to(icon, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const icon = e.currentTarget.querySelector(".contact-icon");
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's collaborate on your next project. I'm always open to discussing new opportunities.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card p-6 hover:shadow-2xl transition-all duration-300 group"
              onMouseEnter={handleIconHover}
              onMouseLeave={handleIconLeave}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="contact-icon p-4 bg-gradient-pink rounded-full">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {item.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to start a project?
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm available for freelance work and full-time opportunities. Let's create something amazing together!
            </p>
            <a
              href="mailto:alvinnandad@gmail.com"
              className="inline-block px-8 py-4 bg-gradient-pink text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
