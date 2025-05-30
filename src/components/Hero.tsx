import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-20 md:pt-28 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1529704193007-e8c78f0f46f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          filter: "brightness(0.4)"
        }}
      ></div>
      
      {/* Subtle flame overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-firegauge-red/20 to-firegauge-accent/20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in">
            Go Paperless for NFPA Hose, Ladder & Pump Tests—In 5 Minutes
          </h1>
          
          <p className="text-xl text-white/90 mb-8 opacity-0 animate-fade-in-delay-1">
            Record offline, auto-sync, e-sign & generate audit-ready PDFs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay-2">
            <Button 
              className="bg-firegauge-red hover:bg-firegauge-red/90 text-white py-6 px-8 text-lg"
              onClick={() => navigate('/auth')}
            >
              Start Your Free 30-Day Pilot
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
