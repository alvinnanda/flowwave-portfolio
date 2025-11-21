import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import bosOnline from "@/assets/bosonline.png";
import bosCOD from "@/assets/bosCOD.png";
import bosAgen from "@/assets/bosAgen.png";
import takonAI from "@/assets/takonAI.png";
import dkpSystem from "@/assets/dkpSystem.png";
import sipakdeSystem from "@/assets/sipakdeSystem.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "bosOnline",
    description: "bosOnline is an online ordering platform that lets merchants create high-conversion checkout forms, manage orders, process payments, and connect to multiple couriers from one dashboard. It supports small shops to high-volume sellers with product management, shipping automation, seller dashboards, analytics, and customer verification to centralize operations, boost conversions, and scale growth.",
    tech: ["Golang", "Fiber", "Next.js", "Debezium"],
    image: bosOnline,
    link: "https://bosonline.id"
  },
  {
    name: "bosCOD",
    description: "Boscod is a multi-platform application (Android, iOS, and WebApp) that provides delivery and payment services with integrated courier APIs and a PPOB system. It is designed to meet the needs of a large user base. The app enables real-time delivery tracking and efficient payment processing, supporting various courier services, including IDExpress, JNE, J&T, J&T Cargo SiCepat, SAP Express, Anteraja, and Ninja Xpress.",
    tech: ["Ionic", "React", "Codeigniter", "Laravel", "Microservices"],
    image: bosCOD,
    link: "https://ww3.boscod.com/"
  },
  {
    name: "bosAgen",
    description: "Bosagen is an Android application similar to Boscod, but designed with agents as partners to facilitate delivery and payment services. It aims to address the needs of users who may not be able to place orders online, allowing agents to act as intermediaries. The application integrates courier APIs and a PPOB system, serving as a bridge between agents and customers.",
    tech: ["Ionic", "React", "Codeigniter", "Laravel", "Microservices"],
    image: bosAgen,
    link: "https://play.google.com/store/apps/details?id=com.boscod.agen&hl=id&pli=1"
  },
  {
    name: "TakonAI",
    description: "TakonAI is an AI chat app that delivers intelligent, real-time conversations powered by OpenAI and Anthropic technologies. It offers personalized responses, adapting to user context, while ensuring a seamless experience with secure authentication and the ability to view chat history.",
    tech: ["Next.js", "Nest.js", "OpenAI", "Anthropic"],
    image: takonAI,
    link: "https://takonai-zeta.vercel.app"
  },
  {
    name: "DKP System",
    description: "Developed a web-based attendance system for DKP Kabupaten Bangkalan with GPS technology and workload analysis features.",
    tech: ["Web", "GPS", "Google Maps API"],
    image: dkpSystem,
    link: "#"
  },
  {
    name: "Sipakde System",
    description: "Created a web and Android application to help soybean farmers diagnose plant pests.",
    tech: ["Web", "Android", "Machine Learning"],
    image: sipakdeSystem,
    link: "#"
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children || [];

      if (cards.length > 0) {
        Array.from(cards).forEach((card, index) => {
          // Scroll Trigger Animation
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              scale: 0.9,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power4.out",
            }
          );

          // Parallax Effect for Images
          const image = card.querySelector(".project-image-container");
          if (image) {
            gsap.to(image, {
              y: -30,
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-pink mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Crafting digital experiences that merge <span className="font-medium text-foreground">innovation</span> with <span className="font-medium text-foreground">purpose</span>.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col gap-20 md:gap-32"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center group perspective-1000`}
            >
              {/* Decorative Number */}
              <div
                className={`absolute top-0 ${index % 2 === 0 ? "-left-12 md:-left-24" : "-right-12 md:-right-24"
                  } -translate-y-1/2 text-[8rem] md:text-[12rem] font-bold text-muted/20 select-none z-0 pointer-events-none`}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Project Image Side */}
              <div
                className="w-full md:w-3/5 relative z-10 project-image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={project.link}
                  target={project.link == '#' ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden shadow-2xl aspect-video transform transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Floating Action Button */}
                  <div
                    className={`absolute bottom-6 ${index % 2 === 0 ? "left-6" : "right-6"
                      } z-30 w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-lg transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-muted hover:scale-110`}
                    title="View Project"
                  >
                    <ExternalLink className="w-5 h-5 text-foreground" />
                  </div>
                </a>
              </div>

              {/* Project Content Side - Glassmorphism */}
              <div
                className={`w-full md:w-1/2 relative z-20 mt-[-40px] md:mt-0 ${index % 2 === 0 ? "md:-ml-20" : "md:-mr-20"
                  }`}
              >
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-xl rounded-2xl p-6 md:p-10 transform transition-transform duration-500 hover:-translate-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground flex items-center gap-3">
                    <a
                      href={project.link}
                      target={project.link == '#' ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                    >{project.name}</a>
                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent ml-4"></div>
                  </h3>

                  <p className="text-muted-foreground mb-8 leading-relaxed text-base">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 bg-secondary/50 border border-border text-secondary-foreground text-sm font-medium rounded-full hover:border-primary/50 hover:text-primary hover:shadow-sm transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border md:hidden">
                    <a
                      href={project.link}
                      target={project.link == '#' ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
