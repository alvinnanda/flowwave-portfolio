import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Project Lead",
    company: "bosonline.id",
    period: "2022 - Present",
    description: "Leading development team for enterprise business management solutions",
    achievements: [
      "Architected scalable microservices platform",
      "Managed team of 8 developers",
      "Increased system performance by 300%",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "bosCOD",
    period: "2021 - 2022",
    description: "Developed comprehensive COD management system",
    achievements: [
      "Built real-time tracking dashboard",
      "Implemented automated notification system",
      "Reduced delivery errors by 45%",
    ],
  },
  {
    role: "Software Engineer Trainee",
    company: "Digital Talent Scholarship (DTS)",
    period: "2020 - 2021",
    description: "Intensive training in modern web technologies",
    achievements: [
      "Completed advanced React and Node.js courses",
      "Built multiple full-stack projects",
      "Achieved top 10% ranking",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "PT Kereta Api Indonesia (KAI)",
    period: "2019 - 2020",
    description: "Contributed to internal systems development",
    achievements: [
      "Developed employee management module",
      "Assisted in API integration projects",
      "Improved code documentation practices",
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
      className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Experience Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-pink"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="glass-card p-6 w-full md:w-5/12 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-pink rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{exp.description}</p>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dot */}
                <div
                  ref={(el) => (dotsRef.current[index] = el)}
                  className="hidden md:block w-4 h-4 bg-white border-4 border-primary rounded-full z-10 shadow-lg"
                />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
