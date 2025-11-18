import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    icon: "💻",
    category: "Frontend",
    skills: ["React", "TypeScript", "Vue.js", "Next.js", "Svelte"],
  },
  {
    icon: "⚙️",
    category: "Backend",
    skills: ["PHP","Golang","Node.js", "Express", "NestJS", "REST API"],
  },
  {
    icon: "📱",
    category: "Mobile",
    skills: ["React", "Flutter", "Android", "iOS"],
  },
  {
    icon: "🗄️",
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    icon: "🛠️",
    category: "Tools",
    skills: ["Git", "VSCode", "Figma", "Postman", "Jira", "GitHub"],
  },
  {
    icon: "🎨",
    category: "Design",
    skills: ["Figma", "Corel Draw"],
  },
];

export default function Skills() {
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
            y: 50,
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
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((item, index) => (
            <div
              key={index}
              className="glass-card group cursor-pointer"
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                gsap.to(card, { 
                  y: -5,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                gsap.to(card, { 
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center text-3xl mb-5 text-pink-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-xs font-medium border border-gray-200"
                    >
                      {skill}
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
