import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import profileImage from "@/assets/profile.png";
import { ChevronDown } from "lucide-react";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

const ANIMATION_CONFIG = {
  INITIAL_DELAY: 0.3,
  TITLE_STAGGER: 0.02,
  TITLE_DURATION: 0.4,
  SUBTITLE_DURATION: 0.8,
  IMAGE_DURATION: 0.5,
  SCROLL_DURATION: 0.6,
  PROFILE_FADE_DURATION: 0.05,
  CHARACTER_INIT_DELAY: 200,
  PARALLAX_DURATION: 0.3,
} as const;

const CHARACTER_CONFIG = {
  INITIAL_POSITION_X: 12430, // fixed pixels from left
  INITIAL_POSITION_Y: 600, // fixed pixels from top
  SIZE: 320, // pixels
  OPACITY: 0.9,
  MOVEMENT_THRESHOLD: 2, // pixels to avoid jitter
  IDLE_TIMEOUT: 200, // milliseconds before returning to front view
  TRANSITION_DURATION: '0.s',
  IMAGES: {
    FRONT: '/hero-front-wiew.webp',
    LEFT: '/hero-left-wiew.webp',
    RIGHT: '/hero-right-wiew.webp',
  },

} as const;

const OBJECT_SHOWCASE_CONFIG = {
  POSITION_X: 1250, // fixed pixels from left
  POSITION_Y: 710, // fixed pixels from top
  SIZE: 350, // fixed pixels
  IMAGE: '/object-showcase.webp',
  ANIMATION_DURATION: 0.9,
} as const;

const OBJECT_EXPERIENCE_CONFIG = {
  POSITION_X: 1000, // fixed pixels from left
  POSITION_Y: 720, // fixed pixels from top
  SIZE: 175, // fixed pixels
  IMAGE: '/object-experience.webp',
  ANIMATION_DURATION: 0.9,
} as const;

const OBJECT_SKILL_CONFIG = {
  POSITION_X: 350, // fixed pixels from left
  POSITION_Y: 730, // fixed pixels from top
  SIZE: 600, // fixed pixels
  IMAGE: '/object-oven.webp',
  ANIMATION_DURATION: 0.9,
} as const;

const OBJECT_CONTACT_CONFIG = {
  POSITION_X: 310, // fixed pixels from left
  POSITION_Y: 308, // fixed pixels from top
  SIZE: 95    , // fixed pixels
  IMAGE: '/object-contact.webp',
  ANIMATION_DURATION: 0.9,
} as const;

const OBJECT_MENU_CONFIG = {
  POSITION_X: 923, // fixed pixels from left
  POSITION_Y: 300, // fixed pixels from top
  SIZE: 348, // fixed pixels
  IMAGE: '/object-menu.webp',
  ANIMATION_DURATION: 0.9,
} as const;

const VISIBILITY_CONFIG = {
  INTERSECTION_THRESHOLD: 0.1, // 10% of section must be visible
} as const;

const PARALLAX_CONFIG = {
  HERO_MULTIPLIER: 0.3,
  IMAGE_MULTIPLIER: 0.1,
} as const;

// ============================================================================
// TYPES
// ============================================================================

type CharacterImageType = typeof CHARACTER_CONFIG.IMAGES[keyof typeof CHARACTER_CONFIG.IMAGES];

// ============================================================================
// COMPONENT
// ============================================================================

export default function Hero() {
  // ============================================================================
  // REFS
  // ============================================================================
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const characterRef = useRef<HTMLDivElement>(null);
  const objectShowcaseRef = useRef<HTMLDivElement>(null);
  const lastMouseX = useRef<number>(0);
  const mouseTimeout = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // STATE
  // ============================================================================
  const [characterImage, setCharacterImage] = useState<CharacterImageType>(
    CHARACTER_CONFIG.IMAGES.FRONT
  );
  const [mouseXPixels, setMouseXPixels] = useState<number>(0);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(true);
  const [isCharacterVisible, setIsCharacterVisible] = useState<boolean>(false);
  const [isCharacterInitialized, setIsCharacterInitialized] = useState<boolean>(false);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  
  // Stage dimensions state
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });

  // ============================================================================
  // EFFECTS - Stage Dimensions Calculation
  // ============================================================================
  useEffect(() => {
    const calculateStageDimensions = () => {
      const TARGET_WIDTH = 1440;
      const TARGET_HEIGHT = 1024;
      const TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let width, height;

      // If window is wider than target ratio (relative to height), fit to width
      // Actually we want "cover" behavior, so we take the larger dimension
      if (windowRatio > TARGET_RATIO) {
        width = windowWidth;
        height = windowWidth / TARGET_RATIO;
      } else {
        height = windowHeight;
        width = windowHeight * TARGET_RATIO;
      }

      setStageDimensions({ width, height });
    };

    // Initial calculation
    calculateStageDimensions();

    // Recalculate on resize
    window.addEventListener('resize', calculateStageDimensions);
    return () => window.removeEventListener('resize', calculateStageDimensions);
  }, []);

  // ============================================================================
  // EFFECTS - Initial Animations
  // ============================================================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: ANIMATION_CONFIG.INITIAL_DELAY });

      // Title animation with split text effect
      if (titleRef.current) {
        const textNodes: { node: Node; parent: HTMLElement }[] = [];

        const collectTextNodes = (element: Node) => {
          for (let i = 0; i < element.childNodes.length; i++) {
            const node = element.childNodes[i];
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
              textNodes.push({
                node,
                parent: element as HTMLElement
              });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              collectTextNodes(node);
            }
          }
        };

        collectTextNodes(titleRef.current);

        const allSpans: HTMLElement[] = [];

        textNodes.forEach(({ node, parent }) => {
          const text = node.textContent || '';
          const fragment = document.createDocumentFragment();

          text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.className = 'inline-block';
            span.textContent = char === ' ' ? '\u00A0' : char;
            fragment.appendChild(span);
            allSpans.push(span);
          });

          parent.replaceChild(fragment, node);
        });

        if (allSpans.length > 0) {
          tl.from(allSpans, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: ANIMATION_CONFIG.TITLE_STAGGER,
            duration: ANIMATION_CONFIG.TITLE_DURATION,
            ease: "back.out(1.7)",
          });
        }
      }

      // Subtitle fade in
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: ANIMATION_CONFIG.SUBTITLE_DURATION,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Profile image scale and bounce
      tl.from(
        imageRef.current,
        {
          scale: 0,
          rotation: 180,
          duration: ANIMATION_CONFIG.IMAGE_DURATION,
          ease: "elastic.out(1, 0.5)",
        },
        0.2
      );

      // Scroll indicator bounce
      tl.from(
        scrollRef.current,
        {
          opacity: 0,
          y: -20,
          duration: ANIMATION_CONFIG.SCROLL_DURATION,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Transition from profile to character
      tl.call(() => {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            opacity: 0,
            duration: ANIMATION_CONFIG.PROFILE_FADE_DURATION,
            ease: "power2.inOut",
            onComplete: () => {
              setIsProfileVisible(false);
              setIsCharacterVisible(true);
              setTimeout(() => {
                setIsCharacterInitialized(true);
              }, ANIMATION_CONFIG.CHARACTER_INIT_DELAY);
            }
          });
        }
      });
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Removed heroRef parallax since Content Layer is now inside Stage Container
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: scrollY * PARALLAX_CONFIG.IMAGE_MULTIPLIER,
          duration: ANIMATION_CONFIG.PARALLAX_DURATION,
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

  // ============================================================================
  // EFFECTS - Visibility Detection
  // ============================================================================
  useEffect(() => {
    const heroSection = heroRef.current?.parentElement;
    
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting);
        });
      },
      {
        threshold: VISIBILITY_CONFIG.INTERSECTION_THRESHOLD,
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================================================
  // EFFECTS - Mouse Interaction
  // ============================================================================
  useEffect(() => {
    /**
     * Handles mouse movement to update character position and pose
     * Only active when character is initialized and hero section is visible
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (!isCharacterInitialized || !isHeroVisible || !stageDimensions.width) return;
      
      // Calculate mouse position relative to the stage
      // We need to find where the stage is relative to the viewport
      const stageLeft = (window.innerWidth - stageDimensions.width) / 2;
      const relativeMouseX = e.clientX - stageLeft;
      
      // Update character horizontal position in pixels relative to stage
      setMouseXPixels(relativeMouseX>440?relativeMouseX:440);
      
      // Determine movement direction
      const deltaX = e.clientX - lastMouseX.current;
      
      // Clear existing idle timeout
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
      
      // Update character pose based on movement direction
      if (Math.abs(deltaX) > CHARACTER_CONFIG.MOVEMENT_THRESHOLD) {
        if (deltaX > 0) {
          setCharacterImage(CHARACTER_CONFIG.IMAGES.RIGHT);
        } else {
          setCharacterImage(CHARACTER_CONFIG.IMAGES.LEFT);
        }
      }
      
      // Return to front view when mouse stops moving
      mouseTimeout.current = setTimeout(() => {
        setCharacterImage(CHARACTER_CONFIG.IMAGES.FRONT);
      }, CHARACTER_CONFIG.IDLE_TIMEOUT);
      
      lastMouseX.current = e.clientX;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
    };
  }, [isCharacterInitialized, isHeroVisible, stageDimensions]);

  // ============================================================================
  // RENDER
  // ============================================================================
  
  // Calculate percentage positions based on 1440x1024 reference
  const REFERENCE_WIDTH = 1440;
  const REFERENCE_HEIGHT = 1024;
  
  const getPercentage = (value: number, dimension: number) => `${(value / dimension) * 100}%`;

  return (
    <section
      id="about"
      className="relative min-h-screen min-w-screen flex items-center justify-center overflow-hidden"
    >
      {/* Stage Container - Centered and Scaled to Cover */}
      <div 
        className="absolute"
        style={{ 
          width: stageDimensions.width,
          height: stageDimensions.height,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none' // Allow clicks to pass through to objects if needed, but objects have pointer-events-auto
        }}
      >
        {/* Background Image */}
        <img 
          src="/background-hero.webp" 
          alt="Hero Background"
          className="w-full h-full object-cover pointer-events-none"
          style={{
            borderRadius: '0px 0px 4px 4px'
          }}
        />
        
        {/* Interactive Character */}
        {isCharacterVisible && (
          <div
            ref={characterRef}
            className="pointer-events-none"
            style={{
              position: 'absolute',
              left: isCharacterInitialized 
                ? `${mouseXPixels?mouseXPixels:1070}px` 
                : getPercentage(CHARACTER_CONFIG.INITIAL_POSITION_X, REFERENCE_WIDTH),
              top: getPercentage(CHARACTER_CONFIG.INITIAL_POSITION_Y, REFERENCE_HEIGHT),
              transform: 'translate(-50%, -50%)',
              transition: isCharacterInitialized 
                ? `left ${CHARACTER_CONFIG.TRANSITION_DURATION} ease-out, opacity 0.5s ease-in-out` 
                : 'opacity 0.8s ease-in-out',
              width: `${(CHARACTER_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`, // Scale size relative to stage width
              aspectRatio: '1/1', // Maintain aspect ratio
              backgroundImage: `url(${characterImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: CHARACTER_CONFIG.OPACITY,
              zIndex: 10
            }}
          />
        )}
        
        {/* Object Showcase */}
        <div
          ref={objectShowcaseRef}
          className="pointer-events-auto cursor-pointer [filter:drop-shadow(8px_8px_12px_rgba(0,0,0,0.3))] hover:[filter:drop-shadow(2px_0px_0px_rgba(255,255,255,1))_drop-shadow(-2px_0px_0px_rgba(255,255,255,1))_drop-shadow(0px_2px_0px_rgba(255,255,255,1))_drop-shadow(0px_-2px_0px_rgba(255,255,255,1))]"
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          style={{
            position: 'absolute',
            left: getPercentage(OBJECT_SHOWCASE_CONFIG.POSITION_X, REFERENCE_WIDTH),
            top: getPercentage(OBJECT_SHOWCASE_CONFIG.POSITION_Y, REFERENCE_HEIGHT),
            transform: 'translate(-50%, -50%)',
            width: `${(OBJECT_SHOWCASE_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`,
            aspectRatio: '1/1',
            backgroundImage: `url(${OBJECT_SHOWCASE_CONFIG.IMAGE})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 20
          }}
        />

        {/* Object Showcase */}
        <div
          className="pointer-events-auto cursor-pointer [filter:drop-shadow(8px_8px_12px_rgba(0,0,0,0.3))] hover:[filter:drop-shadow(2px_0px_0px_rgba(255,255,255,1))_drop-shadow(-2px_0px_0px_rgba(255,255,255,1))_drop-shadow(0px_2px_0px_rgba(255,255,255,1))_drop-shadow(0px_-2px_0px_rgba(255,255,255,1))]"
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          style={{
            position: 'absolute',
            left: getPercentage(OBJECT_EXPERIENCE_CONFIG.POSITION_X, REFERENCE_WIDTH),
            top: getPercentage(OBJECT_EXPERIENCE_CONFIG.POSITION_Y, REFERENCE_HEIGHT),
            transform: 'translate(-50%, -50%)',
            width: `${(OBJECT_EXPERIENCE_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`,
            aspectRatio: '1/1',
            backgroundImage: `url(${OBJECT_EXPERIENCE_CONFIG.IMAGE})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 20
          }}
        />

        {/* Object experience */}
        <div
          className="pointer-events-auto cursor-pointer [filter:drop-shadow(5px_8px_12px_rgba(0,0,0,0.3))] hover:[filter:drop-shadow(2px_0px_0px_rgba(255,255,255,1))_drop-shadow(-2px_0px_0px_rgba(255,255,255,1))_drop-shadow(0px_2px_0px_rgba(255,255,255,1))_drop-shadow(0px_-2px_0px_rgba(255,255,255,1))]"
          onClick={() => {
            const skillsSection = document.getElementById('experience');
            if (skillsSection) {
              skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          style={{
            position: 'absolute',
            left: getPercentage(OBJECT_SKILL_CONFIG.POSITION_X, REFERENCE_WIDTH),
            top: getPercentage(OBJECT_SKILL_CONFIG.POSITION_Y, REFERENCE_HEIGHT),
            transform: 'translate(-50%, -50%)',
            width: `${(OBJECT_SKILL_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`,
            aspectRatio: '1/1',
            backgroundImage: `url(${OBJECT_SKILL_CONFIG.IMAGE})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 20
          }}
        />

        {/* Object Contact */}
        <div
          className="pointer-events-auto cursor-pointer [filter:drop-shadow(8px_8px_12px_rgba(0,0,0,0.3))] hover:[filter:drop-shadow(2px_0px_0px_rgba(255,255,255,1))_drop-shadow(-2px_0px_0px_rgba(255,255,255,1))_drop-shadow(0px_2px_0px_rgba(255,255,255,1))_drop-shadow(0px_-2px_0px_rgba(255,255,255,1))]"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          style={{
            position: 'absolute',
            left: getPercentage(OBJECT_CONTACT_CONFIG.POSITION_X, REFERENCE_WIDTH),
            top: getPercentage(OBJECT_CONTACT_CONFIG.POSITION_Y, REFERENCE_HEIGHT),
            transform: 'translate(-50%, -50%)',
            width: `${(OBJECT_CONTACT_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`,
            aspectRatio: '1/1',
            backgroundImage: `url(${OBJECT_CONTACT_CONFIG.IMAGE})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 20
          }}
        />
        
        {/* Content Layer - Inside Stage Container */}
        <div 
          ref={heroRef} 
          className="pointer-events-auto"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '3% 3%'
          }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-3 md:space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start bg-white/20 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-xl border border-white/20 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-full mx-auto lg:mx-0">
                <h1
                  ref={titleRef}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-muted-foreground"
                >
                  <span className="text-foreground">Hi, I'm</span>{" "}
                  <span className="text-muted-foreground">Alvinnanda</span>
                </h1>

                <p
                  ref={subtitleRef}
                  className="text-sm md:text-lg lg:text-xl max-w-lg md:max-w-2xl lg:max-w-none mx-auto lg:mx-0"
                >
                  A passionate Software Engineer crafting beautiful digital
                  experiences with modern technologies.
                </p>
              </div>

              {/* Profile Image */}
              <div className="flex justify-center mb-4 lg:mb-0">
                {isProfileVisible && (
                  <div
                    ref={imageRef}
                    className="relative w-24 h-24 md:w-48 md:h-48 lg:w-64 lg:h-64"
                  >
                    <div className="absolute inset-0 bg-gradient-pink rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <img
                      src={profileImage}
                      alt="Alvinnanda Dary"
                      className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                    />
                  </div>
                )}
              </div>

              {/* Object Menu */}
              <div 
                hidden={isProfileVisible}
                className="pointer-events-auto cursor-pointer [filter:blur(0.9px)_drop-shadow(8px_8px_12px_rgba(0,0,0,0.3))] hover:[filter:blur(0px)_drop-shadow(6px_0px_0px_rgba(255,255,255,1))_drop-shadow(-6px_0px_0px_rgba(255,255,255,1))_drop-shadow(0px_6px_0px_rgba(255,255,255,1))_drop-shadow(0px_-6px_0px_rgba(255,255,255,1))]"
                onClick={() => {
                  const menuSection = document.getElementById('skills');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{
                  position: 'absolute',
                  left: getPercentage(OBJECT_MENU_CONFIG.POSITION_X, REFERENCE_WIDTH),
                  top: getPercentage(OBJECT_MENU_CONFIG.POSITION_Y, REFERENCE_HEIGHT),
                  transform: 'translate(-50%, -50%)',
                  width: `${(OBJECT_MENU_CONFIG.SIZE / REFERENCE_WIDTH) * 100}%`,
                  aspectRatio: '1/1',
                  backgroundImage: `url(${OBJECT_MENU_CONFIG.IMAGE})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 20
                }}
              />

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-2 animate-bounce-slow cursor-pointer z-40"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-sm text-white">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
}
