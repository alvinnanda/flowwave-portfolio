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
    skills: ["PHP", "Golang", "Node.js", "Express", "NestJS", "REST API"],
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
            duration: 0.4,
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
      className="py-12 md:py-24 relative overflow-hidden bg-secondary/10"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className="relative group perspective-1000"
              onMouseEnter={(e) => {
                const card = e.currentTarget.querySelector('.glass-card');
                if (card) {
                  gsap.to(card, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget.querySelector('.glass-card');
                if (card) {
                  gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
            >
              {/* Gradient Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative glass-card p-8 h-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">{item.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-secondary/30 hover:bg-secondary/50 rounded-lg text-sm font-medium text-foreground/80 border border-transparent hover:border-primary/20 transition-all duration-300 cursor-default"
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
