import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Project Lead",
    company: "bosonline.id",
    period: "2025 - Present",
    description: "Leading the end-to-end development of a high-conversion online ordering platform.",
    achievements: [
      "Driving key features such as multi-form checkout, order management, and BOSCOD API integrations.",
      "Leading payment processing integration and seller dashboard development.",
      "Providing technical direction and prioritizing technical debt and feature delivery.",
      "Ensuring a seamless experience for thousands of sellers, improving faster onboarding flows.",
      "Enhanced analytics that support sellers in tracking and growing their business.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "bosCOD.com",
    period: "2021 - Present",
    description: "Developing and optimizing core systems for delivery, tracking and internal operations.",
    achievements: [
      "Ensured smooth integration with various courier APIs for real-time tracking.",
      "Developed an intuitive and optimized Android application for a large user base.",
      "Managed PPOB systems for seamless payment processing.",
      "Collaborated with cross-functional teams to analyze user needs and design technical solutions.",
      "Utilized Agile/Scrum methodologies and Jira for effective project workflow.",
    ],
  },
  {
    role: "Training Program",
    company: "DTS Kominfo - Intro to Full Stack Developer",
    period: "2020 - 2021",
    description: "Intensive training program covering modern web development technologies.",
    achievements: [
      "Mastered HTML, CSS, JavaScript, and SQL foundations.",
      "Built web applications using Node.js and Python.",
      "Gained practical experience in full-stack development workflows.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "PT. Kereta Api Indonesia (Persero)",
    period: "Apr 2019 - Mei 2019",
    description: "Internship focused on internal asset management systems.",
    achievements: [
      "Developed an Android application for asset management in the Madura region.",
      "Assisted in digitalizing manual asset tracking processes.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          {
            scaleY: 0,
            transformOrigin: "top",
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
          }
        );
      }

      // Animate dots with stagger
      const validDots = dotsRef.current.filter(dot => dot !== null);
      if (validDots.length > 0) {
        gsap.fromTo(validDots,
          {
            scale: 0,
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            stagger: 0.2,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        );
      }

      // Animate cards alternating from left/right
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
            },
            {
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 md:py-24 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience Timeline</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-0 relative">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } ${index !== 0 ? "md:-mt-32" : ""}`}
              >
                {/* Card Side */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-0" : ""} md:px-12`}>
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="relative group perspective-1000"
                  >
                    {/* Gradient Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>

                    <div className="relative glass-card p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col gap-2 mb-4">
                        <h3 className="text-2xl font-bold gradient-text">{exp.role}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                            {exp.company}
                          </span>
                          <span className="text-muted-foreground font-mono">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                        {exp.description}
                      </p>

                      {exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm flex items-start gap-3 text-foreground/80">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-pink flex-shrink-0"></span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-8 h-8 z-20">
                  <div
                    ref={(el) => (dotsRef.current[index] = el)}
                    className="w-4 h-4 bg-background rounded-full border-4 border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] relative"
                  >
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Empty Side for Balance */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
