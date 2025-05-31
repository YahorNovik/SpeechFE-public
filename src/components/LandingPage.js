import React, { useState, useEffect } from 'react';
import { Mic, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

function LandingPage({ onLoginClick, onRegisterClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      backgroundColor: '#f3f4f6',
      minHeight: '100vh'
    }}>
      {/* Enhanced Navigation */}
      <nav style={{
        backgroundColor: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '16px' : '0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: isMobile ? '12px' : '0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#2563EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Mic size={20} color="white" />
            </div>
            <h1 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: 'bold',
              color: '#111827',
              margin: '0'
            }}>Speech Grammar Assistant</h1>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            width: isMobile ? '100%' : 'auto'
          }}>
            <button
              onClick={onLoginClick}
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                border: '2px solid #2563EB',
                color: '#2563EB',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: isMobile ? '1' : 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563EB';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2563EB';
              }}
            >
              Login
            </button>
            <button
              onClick={onRegisterClick}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: isMobile ? '1' : 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563EB';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '40px 20px' : '80px 20px'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '60px' : '80px'
        }}>
          <h2 style={{
            fontSize: isMobile ? '36px' : '56px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Turn Your Meetings into
            <br />
            <span style={{ color: '#2563EB' }}>Learning Opportunities</span>
          </h2>
          
          <p style={{
            fontSize: isMobile ? '18px' : '22px',
            color: '#4B5563',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Record your business meetings, presentations, or practice sessions and get personalized grammar analysis powered by advanced AI.
          </p>

          {/* CTA Button */}
          <button
            onClick={onRegisterClick}
            style={{
              padding: '16px 32px',
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              marginBottom: '60px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563EB';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
          >
            Start Free Analysis
            <ArrowRight size={20} />
          </button>

          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '40px',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {[
              { number: '30 min', label: 'Free analysis time' },
              { number: '95%', label: 'Grammar accuracy' },
              { number: '24/7', label: 'AI-powered support' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563EB',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '32px',
          marginBottom: '80px'
        }}>
          <FeatureCard
            icon={<Users size={32} color="#2563EB" />}
            title="Real Meeting Analysis"
            description="Record your actual business conversations and meetings. Get insights into your natural speaking patterns in professional contexts with real-time feedback."
            isMobile={isMobile}
          />
          <FeatureCard
            icon={<CheckCircle size={32} color="#10B981" />}
            title="Smart Grammar Corrections"
            description="Receive tailored grammar corrections and suggestions based on your specific speech patterns and common mistakes. Context-aware AI understands business language."
            isMobile={isMobile}
          />
          <FeatureCard
            icon={<TrendingUp size={32} color="#8B5CF6" />}
            title="Progress Analytics"
            description="Track your improvement over time with detailed analysis of your speaking habits. Get personalized exercise recommendations and skill development insights."
            isMobile={isMobile}
          />
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          backgroundColor: 'white',
          padding: isMobile ? '40px 24px' : '60px 40px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
        }}>
          <h3 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '20px'
          }}>
            Ready to Improve Your Professional Communication?
          </h3>
          <p style={{
            color: '#4B5563',
            marginBottom: '32px',
            fontSize: isMobile ? '16px' : '18px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Join professionals who have transformed their speaking skills. Start with 30 minutes of free analysis time – no credit card required.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
          }}>
            <button
              onClick={onRegisterClick}
              style={{
                padding: '16px 32px',
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563EB';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
              }}
            >
              Get Started for Free
            </button>
            
            <p style={{
              color: '#6B7280',
              fontSize: '14px',
              margin: 0,
              textAlign: 'center'
            }}>
              ✓ No credit card required  ✓ 30 minutes free  ✓ Setup in 2 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, isMobile }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: isMobile ? '24px' : '32px',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      height: '100%'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        backgroundColor: '#F3F4F6',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: isMobile ? '20px' : '22px',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '16px'
      }}>
        {title}
      </h3>
      
      <p style={{
        color: '#4B5563',
        lineHeight: '1.6',
        fontSize: isMobile ? '15px' : '16px'
      }}>
        {description}
      </p>
    </div>
  );
}

export default LandingPage;
