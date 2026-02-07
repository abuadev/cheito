import { useState, useEffect } from 'preact/hooks';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true); // Always render for SSR visibility
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('hasVisitedCheito');

    if (hasVisited) {
      setShouldRender(false);
      // Ensure class is removed just in case script missed it
      document.documentElement.classList.remove('is-loading');
      return;
    }

    // First time in session: Activate animations and start timer
    setIsPlaying(true);
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasVisitedCheito', 'true');
      // Release the page visibility
      document.documentElement.classList.remove('is-loading');

      // Wait for fade out animation before removing from DOM
      setTimeout(() => setShouldRender(false), 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`loading-wrapper ${!isVisible ? 'fade-out' : ''} ${isPlaying ? 'is-playing' : ''}`}>
      <div className="loader-container">
        {/* Logo with Breathing Animation */}
        <div className="logo-section">
          <img
            src="/ball-cheito-180x180.png"
            alt="Cheito Logo"
            className="logo-img"
          />
          <div className="logo-glow"></div>
        </div>

        {/* Ball below the logo with Bounce & Roll Animation */}
        <div className="ball-section">
          <div className="ball-container">
            <img
              src="/balon.png"
              alt="Football"
              className="ball-img"
            />
          </div>
          <div className="ball-shadow"></div>
        </div>
      </div>
    </div>
  );
}
