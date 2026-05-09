import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Create your web app with AI</h1>
        <p>Describe your idea, and KksBuild will generate a complete web application for you instantly. Bridging the gap from idea to code in seconds.</p>
        
        <div className="hero-btns">
          <button className="btn-primary" onClick={handleStart}>Start Building for Free</button>
          <button className="btn-secondary" onClick={() => window.scrollTo(0, 800)}>See Features</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <FeatureCard 
          icon="✏️" 
          title="Describe in English" 
          description="Use plain natural language to describe the web app you want to build. Our AI understands requirements and intent." 
        />
        <FeatureCard 
          icon="⚙️" 
          title="AI-Powered Engine" 
          description="Leverages Groq AI to architecture and build complete HTML, CSS, and JS code blocks dynamically." 
        />
        <FeatureCard 
          icon="🚀" 
          title="Instant Preview" 
          description="Preview your generated app in a secure sandbox environment instantly. Download code whenever you're ready." 
        />
      </section>
    </div>
  );
};

export default LandingPage;
