import React from 'react';
import HeroSection from './sections/HeroSection';
import ProblemSolution from './sections/ProblemSolution';
import ProcessFlow from './flows/ProcessFlow';
import MarketFlow from './flows/MarketFlow';
import TechnologyStack from './sections/TechnologyStack';
import GrowthStrategy from './sections/GrowthStrategy';
import UserMarketStats from './sections/UserMarketStats';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PitchDeck = () => {
  const sectionSpacing = {
    marginBottom: '10px'
  };

  const sectionHeading = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const generatePDF = async () => {
    try {
      const sections = document.querySelectorAll('.section');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
  
      const a4Width = 210;
      const a4Height = 297;
      const marginTop = 10;
  
      // Process each section separately
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF'
        });
  
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const imgWidth = a4Width;
        const imgHeight = (canvas.height * a4Width) / canvas.width;
  
        // Add new page for each section except the first one
        if (i > 0) {
          pdf.addPage();
        }
  
        // Add image centered on page
        pdf.addImage(
          imgData,
          'JPEG',
          0,
          marginTop,
          imgWidth,
          imgHeight
        );
      }
  
      // Add the final CTA section
      const cta = document.querySelector('.call-to-action');
      if (cta) {
        const ctaCanvas = await html2canvas(cta, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF'
        });
  
        const ctaImgData = ctaCanvas.toDataURL('image/jpeg', 1.0);
        const ctaImgWidth = a4Width;
        const ctaImgHeight = (ctaCanvas.height * a4Width) / ctaCanvas.width;
  
        pdf.addPage();
        pdf.addImage(
          ctaImgData,
          'JPEG',
          0,
          marginTop,
          ctaImgWidth,
          ctaImgHeight
        );
      }
  
      pdf.setProperties({
        title: 'Speech Grammar Assistant - Pitch Deck',
        subject: 'AI-Powered Speech Analysis Platform',
        author: 'Speech Grammar Assistant',
        keywords: 'AI, speech analysis, language learning, pitch deck',
        creator: 'Speech Grammar Assistant'
      });
  
      pdf.save('speech-grammar-assistant-pitch-deck.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}> {/* Changed background color */}
      {/* Header */}
      <nav style={{
        backgroundColor: 'white',
        padding: '16px',
        marginBottom: '32px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 150px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827'
          }}>
            Speech Grammar Assistant
          </h1>
          <div style={{ display: 'flex', gap: '16px' }}>
          <button 
    onClick={generatePDF}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
    style={{ 
      color: '#000000',  
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '16px',     // Match text size
      padding: 0,           // Remove padding
      display: 'inline',    // Match link display
      fontWeight: 'normal'  
    }}
  >
    Download Pitch Deck
  </button>
  <a 
    href="/"
    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
    style={{ textDecoration: 'none' }}
  >
    Get Started
  </a>
        </div>
        </div>
      </nav>

      {/* Main Content Container with White Background */}
      <div id="pitch-deck-content" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 150px' }}>
        {/* Hero Section */}
        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <HeroSection />
        </div>

        {/* How It Works */}
        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px'
        }}>
          <h2 style={sectionHeading}>How It Works</h2>
          <ProcessFlow />
        </div>

        {/* Problem & Solution */}
        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px'
        }}>
          <ProblemSolution />
        </div>

        {/* Market Opportunity */}
        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px'
        }}>
          <h2 style={sectionHeading}>Market Opportunity</h2>
          <MarketFlow />
          <UserMarketStats />
        </div>

        {/* Technology Stack */}
        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px'
        }}>
          <TechnologyStack />
        </div>

        <div className="section" style={{ 
          ...sectionSpacing, 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px'
        }}>
          <GrowthStrategy />
        </div>

        {/* Call to Action */}
        <div className="call-to-action" style={{ 
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            Investment Opportunity
          </h2>
          <p style={{ marginBottom: '32px', color: '#666' }}>
            Join us in revolutionizing language learning with AI-powered speech analysis.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <a 
            href="https://www.linkedin.com/in/yahor-novik-a85240245/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            style={{ textDecoration: 'none' }}
          >
            Contact Us
          </a>
          <a 
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            style={{ textDecoration: 'none' }}
          >
            Get Started
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;