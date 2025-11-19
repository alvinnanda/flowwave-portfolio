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
    description: "Bosonline is an online ordering and sales platform that enables merchants to create high-conversion checkout forms, manage orders, process payments, and integrate with multiple courier services in a single streamlined system. Designed to support both small businesses and high-volume sellers, bosOnline provides tools for product management, shipping automation, seller dashboards, analytics, and customer verification flows. By centralizing order processing and logistics, the platform helps merchants improve operational efficiency, increase conversion rates, and scale their business with ease",
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

      // Only animate if elements exist
      if (cards.length > 0) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 60,
            rotation: 5,
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            rotation: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const image = card.querySelector(".project-image") as HTMLElement;
    const overlay = card.querySelector(".project-overlay") as HTMLElement;
    const button = card.querySelector(".project-button") as HTMLElement;

    gsap.timeline()
      .to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" })
      .to(overlay, { opacity: 1, duration: 0.3 }, "-=0.4")
      .to(button, { y: 0, opacity: 1, duration: 0.3 }, "-=0.2");
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const image = card.querySelector(".project-image") as HTMLElement;
    const overlay = card.querySelector(".project-overlay") as HTMLElement;
    const button = card.querySelector(".project-button") as HTMLElement;

    gsap.timeline()
      .to(button, { y: 20, opacity: 0, duration: 0.2 })
      .to(overlay, { opacity: 0, duration: 0.3 }, "-=0.1")
      .to(image, { scale: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that drive business value
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden group cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image w-full h-full object-cover"
                />
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 flex items-end justify-center pb-6"
                >
                  <span className="project-button px-6 py-3 bg-white rounded-full font-medium flex items-center gap-2 opacity-0 translate-y-5">
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>
              </div>

              {/* Project Info */}
              <div className="p-5">
                <div className="relative group/desc">
                <p className="text-gray-600 mb-6 h-[12em] group-hover/desc:h-auto overflow-hidden transition-all duration-500 ease-in-out">
                  {project.description}
                  <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent 
                            group-hover/desc:opacity-0 transition-opacity duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-blue-500 opacity-50
                            group-hover/desc:opacity-0 transition-opacity duration-300">
                    
                  </span>
                </p>
              </div>
              
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
