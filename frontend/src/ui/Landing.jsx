import React, { lazy, Suspense, useEffect, useRef } from 'react'
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
import PageSection from './PageSection'
import GradientBackground from './GradientBackground'
import Hero from './Hero'
import Stats from './Stats'
import DividerWave from './DividerWave'

// Lazy-loaded sections for performance
const FeatureGrid = lazy(() => import('./FeatureGrid'))
const Actors = lazy(() => import('./Actors'))
const Benefits = lazy(() => import('./Benefits'))
const Testimonials = lazy(() => import('./Testimonials'))
const LogosStrip = lazy(() => import('./LogosStrip'))
const StepsShowcase = lazy(() => import('./StepsShowcase'))
const Pricing = lazy(() => import('./Pricing'))
const Faq = lazy(() => import('./Faq'))
const ContactBanner = lazy(() => import('./ContactBanner'))
const Newsletter = lazy(() => import('./Newsletter'))
const ShowcaseGallery = lazy(() => import('./ShowcaseGallery'))

const Landing = () => {
  const parallaxRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = 0.3 + (index * 0.1);
          ref.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addParallaxRef = (el) => {
    if (el && !parallaxRefs.current.includes(el)) {
      parallaxRefs.current.push(el);
    }
  };

  return (
    <GradientBackground>
      <HeaderBar />
      <main className="landing-main">
        {/* Hero Section with Parallax */}
        <PageSection id="hero" className="hero-section">
          <div 
            ref={addParallaxRef}
            className="parallax-layer hero-background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
            }}
          />
          <Hero />
          <Stats />
        </PageSection>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-shape shape-1" />
          <div className="floating-shape shape-2" />
          <div className="floating-shape shape-3" />
        </div>

        <Suspense fallback={
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Chargement…</p>
          </div>
        }>
          {/* Logos Section with Parallax */}
          <PageSection id="logos" className="logos-section">
            <div ref={addParallaxRef} className="parallax-layer">
              <LogosStrip />
            </div>
          </PageSection>

          {/* Features Section */}
          <PageSection id="features" className="features-section">
            <div className="section-background" />
            <FeatureGrid />
          </PageSection>

          <DividerWave />

          {/* Actors Section */}
          <PageSection id="actors" className="actors-section">
            <div ref={addParallaxRef} className="parallax-layer">
              <Actors />
            </div>
          </PageSection>

          {/* Gallery Section */}
          <PageSection id="gallery" className="gallery-section">
            <ShowcaseGallery />
          </PageSection>

          {/* Steps Section */}
          <PageSection id="steps" className="steps-section">
            <div className="section-background" />
            <StepsShowcase />
          </PageSection>

          {/* Benefits Section */}
          <PageSection id="benefits" className="benefits-section">
            <Benefits />
          </PageSection>

          {/* Testimonials Section */}
          <PageSection id="testimonials" className="testimonials-section">
            <div ref={addParallaxRef} className="parallax-layer">
              <Testimonials />
            </div>
          </PageSection>

          {/* Pricing Section */}
          <PageSection id="pricing" className="pricing-section">
            <div className="section-background" />
            <Pricing />
          </PageSection>

          {/* FAQ Section */}
          <PageSection id="faq" className="faq-section">
            <Faq />
          </PageSection>

          {/* Contact Section */}
          <PageSection id="contact" className="contact-section">
            <ContactBanner />
          </PageSection>

          {/* Newsletter Section */}
          <PageSection id="newsletter" className="newsletter-section">
            <div ref={addParallaxRef} className="parallax-layer">
              <Newsletter />
            </div>
          </PageSection>
        </Suspense>

        {/* Bottom CTA */}
        <PageSection id="cta-bottom" className="cta-bottom-section">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à commencer votre formation ?</h2>
            <p className="cta-subtitle">Rejoignez des milliers de professionnels qui ont déjà transformé leur carrière</p>
            <button className="cta-button">
              <span>Commencer Maintenant</span>
              <svg className="button-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </PageSection>
      </main>
      <FooterBar />
    </GradientBackground>
  )
}

export default Landing


