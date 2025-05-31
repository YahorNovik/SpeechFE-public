import React, { useState } from 'react';
import { Info, X, Mic, Clock, LogOut } from 'lucide-react';

const WelcomeInterface = ({ timeRemaining, onLogout, onRecord }) => {
  const [showGuide, setShowGuide] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Welcome Banner */}
      {showGuide && (
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Info className="mr-2" /> Welcome to Speech Analysis
            </h2>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-white hover:bg-blue-700 p-2 rounded"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
          <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">How it works:</h3>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
              Click the Record button when you're ready to speak
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
              Your speech will be automatically transcribed
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
              Receive instant grammar analysis and improvements
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">4</span>
              Use headphones to ensure only your voice is captured clearly
            </li>
          </ol>
        </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Available Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard 
                  icon={<Mic className="text-blue-600" />}
                  title="Speech Recording"
                  description="High-quality audio capture for accurate transcription"
                />
                <FeatureCard 
                  icon={<Clock className="text-blue-600" />}
                  title="Time Tracking"
                  description="Monitor your remaining analysis time"
                />
                <FeatureCard 
                  icon={<LogOut className="text-blue-600" />}
                  title="Session Management"
                  description="Easily manage your recording sessions"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative group">
            <button 
              onClick={onRecord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center"
            >
              <Mic className="mr-2" size={20} />
              Record
            </button>
            {showTooltips && (
              <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded">
                Click to start recording your speech
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="bg-gray-100 px-4 py-2 rounded">
                <span className="text-gray-600">Time Remaining:</span>
                <span className="ml-2 font-semibold">{timeRemaining}</span>
              </div>
              {showTooltips && (
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded">
                  Your available analysis time
                  <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              )}
            </div>

            <div className="relative group">
              <button 
                onClick={onLogout}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center"
              >
                <LogOut className="mr-2" size={20} />
                Logout
              </button>
              {showTooltips && (
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded">
                  End your current session
                  <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
    <div className="mr-3 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default WelcomeInterface;