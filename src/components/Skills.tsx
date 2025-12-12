import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { 
  Code2, 
  Server, 
  Smartphone, 
  Database, 
  Wrench, 
  Palette 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const skillsData = [
  {
    icon: Code2,
    category: "Frontend",
    skills: ["React", "TypeScript", "Vue.js", "Next.js", "Svelte"],
    description: "Building responsive and interactive user interfaces.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Server,
    category: "Backend",
    skills: ["PHP", "Golang", "Node.js", "NestJS", "Redis", "RabbitMQ"],
    description: "Creating robust server-side logic and APIs.",
    color: "from-emerald-500/20 to-green-500/20"
  },
  {
    icon: Smartphone,
    category: "Mobile",
    skills: ["Ionic", "React Native", "Flutter", "Android", "iOS"],
    description: "Developing cross-platform mobile experiences.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Database,
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Debezium"],
    description: "Designing efficient data storage solutions.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Wrench,
    category: "Tools",
    skills: ["Git", "Docker", "Figma", "AWS", "Jira"],
    description: "Streamlining development and deployment workflows.",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    icon: Palette,
    category: "Design",
    skills: ["Tailwind", "GSAP", "Prototyping"],
    description: "Crafting beautiful and functional designs.",
    color: "from-rose-500/20 to-orange-500/20"
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
       const mm = gsap.matchMedia();
       const container = containerRef.current;
       const section = sectionRef.current;
       const header = headerRef.current;
       const cards = gsap.utils.toArray('.skill-card') as HTMLElement[];
       
       if (!container || !section) return;

       // Header Animation
       if (header) {
         gsap.fromTo(header, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 80%", toggleActions: "play none none reverse" } });
       }

       mm.add("(min-width: 768px)", () => {
         const totalWidth = container.scrollWidth;
         const windowWidth = window.innerWidth;
         const xMove = -(totalWidth - windowWidth - 100);

         // Entry Animation: Scale and Fade in cards before pinning
         gsap.fromTo(container, 
           { scale: 0.9, autoAlpha: 0 },
           {
             scale: 1,
             autoAlpha: 1,
             duration: 1,
             ease: "power2.out",
             scrollTrigger: {
               trigger: section,
               start: "top bottom", // Start earlier
               end: "center center", // Finish well before pinning starts
               scrub: 1
             }
           }
         );

         // Main Horizontal Scroll
         const horizontalTween = gsap.to(container, {
            x: xMove,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              // anticipatePin removed for cleaner lock
              start: "top top",
              // Add extra scroll distance to ensure all cards are fully visible
              // before unpinning and transitioning to next section
              end: `+=${Math.abs(xMove) + windowWidth * 0.4}`,
              scrub: 1,
              invalidateOnRefresh: true,
              
            },
         });

         cards.forEach((card) => {
           const iconPaths = card.querySelectorAll('path, circle, rect, line, polyline, polygon');
           gsap.set(iconPaths, { drawSVG: "0%" });
           gsap.to(iconPaths, {
             drawSVG: "100%",
             duration: 1,
             ease: "power2.out",
             scrollTrigger: {
               trigger: card,
               containerAnimation: horizontalTween,
               start: "left 85%",
               end: "right center",
               toggleActions: "play none none none",
             }
           });
         });
       });

       mm.add("(max-width: 767px)", () => {
         cards.forEach((card) => {
           const iconPaths = card.querySelectorAll('path, circle, rect, line, polyline, polygon');
           gsap.set(iconPaths, { drawSVG: "0%" });
           ScrollTrigger.create({
             trigger: card,
             start: "top 80%",
             onEnter: () => gsap.to(iconPaths, { drawSVG: "100%", duration: 1 }),
           });
         });
       });
    }, sectionRef);
    return () => {
      // Reset gap to default before cleanup
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          gap: 20,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      ctx.revert();
    };
  }, []);


  return (
    <section 
      ref={sectionRef} 
      className="relative bg-background md:h-screen md:overflow-hidden flex flex-col justify-center py-10 md:py-0"
    >
        {/* Header Section */}
        <div ref={headerRef} className="container mx-auto px-4 mb-12 md:mb-16 z-10 shrink-0 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">My Expertise</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
             Exploring the technologies that power modern applications.
          </p>
        </div>

        {/* Scroll Container */}
        <div 
          ref={containerRef} 
          className="
            flex items-center
            flex-col w-full gap-8
            md:flex-row md:w-fit md:gap-10 md:px-10 md:pl-[30vw]
          "
        >
          {skillsData.map((item, index) => (
            <div
              key={index}
              className={`
                skill-card relative flex-shrink-0 
                w-full max-w-[320px] h-[450px]
                md:w-[450px] md:h-[500px]
                group perspective-1000
              `}
            >
              {/* Gradient Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.color} rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-500`}></div>

              {/* Card Body */}
              <div className="relative h-full flex flex-col p-8 glass-card rounded-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div>
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center mb-6 backdrop-blur-md`}>
                     <item.icon 
                        className="text-foreground w-10 h-10 md:w-12 md:h-12" 
                        strokeWidth={1.5}
                     />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text mb-3">
                    {item.category}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-secondary/50 hover:bg-secondary/80 backdrop-blur-md rounded-full text-foreground/80 text-sm font-medium border border-border/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Spacer */}
          <div className="hidden md:block w-[5vw] shrink-0" />
        </div>
    </section>
  );
}
