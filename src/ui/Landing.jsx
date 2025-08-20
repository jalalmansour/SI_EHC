import React, { lazy, Suspense } from 'react'
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

const Landing = ({ onShowLogin, onShowSignup }) => {
  return (
    <GradientBackground>
      <HeaderBar onShowLogin={onShowLogin} onShowSignup={onShowSignup} />
      <main>
        <PageSection id="hero">
          <Hero onShowLogin={onShowLogin} onShowSignup={onShowSignup} />
          <Stats />
        </PageSection>
        <Suspense fallback={<div className="text-center text-gray-400 py-10">Chargement…</div>}>
          <PageSection id="logos"><LogosStrip /></PageSection>
          <PageSection id="features"><FeatureGrid /></PageSection>
          <DividerWave />
          <PageSection id="actors"><Actors /></PageSection>
          <PageSection id="gallery"><ShowcaseGallery /></PageSection>
          <PageSection id="steps"><StepsShowcase /></PageSection>
          <PageSection id="benefits"><Benefits onShowSignup={onShowSignup} /></PageSection>
          <PageSection id="testimonials"><Testimonials /></PageSection>
          <PageSection id="pricing"><Pricing /></PageSection>
          <PageSection id="faq"><Faq /></PageSection>
          <PageSection id="contact"><ContactBanner /></PageSection>
          <PageSection id="newsletter"><Newsletter /></PageSection>
        </Suspense>
        <PageSection id="cta-bottom"><div className="text-center text-gray-500">Merci de votre visite</div></PageSection>
      </main>
      <FooterBar />
    </GradientBackground>
  )
}

export default Landing


