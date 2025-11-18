import { useEffect, useRef } from "react";
import gsap from "gsap";
import profileImage from "@/assets/profile.jpg";
import { ChevronDown } from "lucide-react";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "GSAP",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Title animation with split text effect
      if (titleRef.current) {
        // Save the original HTML content with styles
        const originalHTML = titleRef.current.innerHTML;
        
        // Create spans for each character while preserving the inner HTML structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;
        
        // Process each text node within the title
        const processNode = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const text = node.textContent;
            const parent = node.parentNode;
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.verticalAlign = 'top';
            
            // Create spans for each character
            const charSpans = text.split('').map(char => {
              const charSpan = document.createElement('span');
              charSpan.className = 'inline-block';
              charSpan.textContent = char === ' ' ? '\u00A0' : char;
              return charSpan.outerHTML;
            }).join('');
            
            span.innerHTML = charSpans;
            parent?.replaceChild(span, node);
            return Array.from(span.children);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.children.length > 0) {
              return Array.from(element.children).flatMap(processNode);
            }
          }
          return [];
        };
        
        // Process all child nodes
        const allSpans = Array.from(tempDiv.childNodes).flatMap(processNode);
        
        // Update the title with the new HTML structure
        titleRef.current.innerHTML = tempDiv.innerHTML;
        
        // Animate each character span
        tl.from(allSpans, {
          opacity: 0,
          y: 50,
          rotationX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Subtitle fade in
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Image scale and bounce
      tl.from(
        imageRef.current,
        {
          scale: 0,
          rotation: 180,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.6"
      );

      // Skill tags stagger
      tl.from(
        tagsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Scroll indicator bounce
      tl.from(
        scrollRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, heroRef);

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: scrollY * 0.3,
          duration: 0.3,
          ease: "none",
        });
      }
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: scrollY * 0.1,
          duration: 0.3,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 md:pb-24 overflow-hidden"
    >
      <div ref={heroRef} className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1
              ref={titleRef}
              className="text-5xl lg:text-6xl font-bold leading-tight text-muted-foreground"
            >
              <span className="text-black dark:text-white">Hi, I'm</span>{" "}
              <span className="text-muted-foreground">Alvinnanda</span>
            </h1>
            
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl"
            >
              A passionate Software Engineer crafting beautiful digital
              experiences with modern technologies.
            </p>

            {/* Skill Tags */}
            <div ref={tagsRef} className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 glass-card text-sm font-medium hover:scale-105 transition-transform"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div
              ref={imageRef}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <div className="absolute inset-0 bg-gradient-pink rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={profileImage}
                alt="Alvinnanda Dary"
                className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-primary" />
        </div>
    </section>
  );
}
