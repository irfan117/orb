import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import BooksShowcase from './BooksShowcase';
import ActivitiesSection from './ActivitiesSection';
import CommunitySection from './CommunitySection';
import ContactSection from './ContactSection';
import FooterSection from './FooterSection';

const LandingPage: React.FC = () => {
  return (
    <div>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="books">
        <BooksShowcase />
      </div>
      <div id="activities">
        <ActivitiesSection />
      </div>
      <div id="community">
        <CommunitySection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default LandingPage;