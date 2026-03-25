import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load komponen yang tidak terlihat di awal (below the fold)
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Experience = lazy(() => import("@/components/Experience"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Header />
        <main>
          <ErrorBoundary sectionName="Hero">
            <Hero />
          </ErrorBoundary>
          
          <ErrorBoundary sectionName="Experience">
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary sectionName="Skills">
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary sectionName="Projects">
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary sectionName="Contact">
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
        
        <ErrorBoundary sectionName="Footer">
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </SmoothScroll>
  );
};

export default Index;
