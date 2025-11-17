import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    icon: "💻",
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Svelte"],
  },
  {
    icon: "⚙️",
    category: "Backend",
    skills: ["Node.js", "Express", "NestJS", "GraphQL", "REST API"],
  },
  {
    icon: "📱",
    category: "Mobile",
    skills: ["React Native", "Flutter", "Android", "iOS"],
  },
  {
    icon: "🗄️",
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    icon: "🛠️",
    category: "Tools",
    skills: ["Git", "Docker", "CI/CD", "Vite", "Vercel"],
  },
  {
    icon: "🎨",
    category: "Design",
    skills: ["Figma", "GSAP", "Framer Motion", "UI/UX"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children || [];

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.category}</h3>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
