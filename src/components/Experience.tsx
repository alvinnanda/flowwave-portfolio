import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Project Lead",
    company: "bosonline.id",
    period: "2025 - Present",
    description: "As the Project Lead at bosOnline, I oversaw the end-to-end development of a high-conversion online ordering platform and led the planning and delivery of critical features including multi-form checkout flows, order management, courier API integrations, payment processing, and seller dashboards. I provided technical direction and guidance to the engineering team, prioritized technical debt and feature development, and ensured the platform delivered a seamless, reliable experience for thousands of sellers. As a result, the team continuously improved product quality, optimized onboarding and verification flows, and enhanced analytics features that help sellers track and grow their business.",
    achievements: [],
  },
  {
    role: "Full Stack Developer",
    company: "bosCOD.com",
    period: "2021 - Present",
    description: "At Boscod, I ensured smooth integration with various courier APIs, enabling real-time tracking and automatic status updates for deliveries. I developed an intuitive and optimized Android application tailored to the needs of a large user base, while also selecting and testing software tools to ensure development efficiency and quality. Additionally, I integrated and managed PPOB systems for seamless payment processing, resolved technical issues during API integration and application development, and actively collaborated with cross-functional teams to analyze user needs, design technical solutions, and ensure the application's usability. I also utilized Agile/Scrum methodologies and tools like Jira to manage project workflows effectively and maintain development efficiency.",
    achievements: [],
  },
  {
    role: "Training Program",
    company: "DTS Kominfo - Intro to Full Stack Developer",
    period: "2020 - 2021",
    description: "I completed a training program in Full Stack Development, covering web technologies such as HTML & CSS, JavaScript, SQL, Node.js, and Python, gaining a solid foundation in building web applications.",
    achievements: [],
  },
  {
    role: "Software Engineering Intern",
    company: "PT. Kereta Api Indonesia (Persero) Upt. Pengusahaan Aset Madura",
    period: "Apr 2019 - Mei 2019",
    description: "Developed an Android application for internal company asset management in the Madura region.",
    achievements: [],
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
