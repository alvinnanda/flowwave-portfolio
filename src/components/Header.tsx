import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { lenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial fade in animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
    });

    // Scroll listener for blur effect and active section
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ["about", "experience", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.5 });
      } else {
        // Fallback if Lenis is not yet initialized
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power3.inOut",
        });
      }
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
    >
      <nav
        className={`rounded-full px-8 py-4 transition-all duration-300 ${isScrolled
          ? "backdrop-blur-md bg-white/80 shadow-lg"
          : "backdrop-blur-sm bg-white/60 shadow-md"
          }`}
      >
        <div className="flex items-center gap-10">
          {/* Logo - Simplified for pill shape */}
          <h1 className="text-base font-bold gradient-text whitespace-nowrap">
            Alvinnanda Dary
          </h1>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-sm font-medium text-foreground hover:text-primary transition-colors group whitespace-nowrap"
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-pink transition-all duration-300 ${activeSection === item.href.replace("#", "")
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                      }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-white/80 md:hidden mt-4 pt-4 border-t border-gray-200/50">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === item.href.replace("#", "")
                    ? "bg-gradient-pink text-white"
                    : "text-foreground hover:bg-gray-100/50"
                    }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
