import React, { useEffect, useRef } from 'react';

const EnhancedHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="enhanced-hero">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-overlay" />
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 
            ref={titleRef}
            className="hero-title"
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <span className="title-line">Formation Professionnelle</span>
            <span className="title-line highlight">de Qualité</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="hero-subtitle"
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            Découvrez notre plateforme innovante de formation continue
            <br />
            conçue pour les professionnels modernes
          </p>

          <div 
            ref={ctaRef}
            className="hero-cta"
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            <button className="cta-primary">
              <span>Commencer Maintenant</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="cta-secondary">
              <span>Voir la Démo</span>
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="visual-container">
            <div className="floating-card card-1">
              <div className="card-icon">📚</div>
              <div className="card-text">Formations Certifiantes</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">👥</div>
              <div className="card-text">Experts Qualifiés</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🎯</div>
              <div className="card-text">Résultats Garantis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-text">Découvrir</div>
        <div className="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .enhanced-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          align-items: center;
        }

        .hero-text {
          color: white;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .title-line {
          display: block;
        }

        .title-line.highlight {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
          color: #667eea;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .cta-primary:hover .arrow-icon {
          transform: translateX(4px);
        }

        .cta-secondary {
          padding: 1rem 2rem;
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .hero-visual {
          position: relative;
          height: 400px;
        }

        .visual-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          color: white;
          text-align: center;
          animation: float-card 6s ease-in-out infinite;
        }

        .card-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .card-2 {
          top: 50%;
          right: 20%;
          animation-delay: 2s;
        }

        .card-3 {
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        @keyframes float-card {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .card-text {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          text-align: center;
          z-index: 2;
          animation: bounce 2s infinite;
        }

        .scroll-text {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          opacity: 0.8;
        }

        .scroll-arrow svg {
          width: 24px;
          height: 24px;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-cta {
            justify-content: center;
          }

          .floating-card {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedHero;
