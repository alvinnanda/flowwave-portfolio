import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "bosOnline",
    description: "Comprehensive business management platform for modern enterprises",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  },
  {
    name: "bosCOD",
    description: "Cash on delivery management system with real-time tracking",
    tech: ["React Native", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    name: "bosAgen",
    description: "Agent management and commission tracking system",
    tech: ["Next.js", "Supabase", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    name: "TakonAI",
    description: "AI-powered recommendation engine for personalized experiences",
    tech: ["TypeScript", "OpenAI", "FastAPI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
  {
    name: "DKP System",
    description: "Digital knowledge platform for educational institutions",
    tech: ["Vue.js", "Laravel", "MySQL"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  },
  {
    name: "Sipakde System",
    description: "Integrated delivery management and logistics platform",
    tech: ["React", "NestJS", "Redis"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image w-full h-full object-cover"
                />
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 flex items-end justify-center pb-6">
                  <button className="project-button px-6 py-3 bg-white rounded-full font-medium flex items-center gap-2 opacity-0 translate-y-5">
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-xs font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
