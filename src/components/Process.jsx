import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { processSteps } from '../data/mock';
import { 
  Search, 
  Layers, 
  Hammer, 
  Cpu, 
  Rocket,
  Play,
  CheckCircle
} from 'lucide-react';

const stepIcons = {
  discover: Search,
  prototype: Layers,
  build: Hammer,
  'integrate-ai': Cpu,
  scale: Rocket
};

const Process = () => {
  const [activeStep, setActiveStep] = useState('discover');
  const activeStepData = processSteps.find(step => step.id === activeStep);

  return (
    <section className="split-section" id="process">
      {/* Left Half - Timeline Navigation */}
      <div className="split-half black">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-huge mb-6 text-white">How we transform</h2>
            <p className="body-large text-gray-300 mb-12 mx-5">
              Our proven 5-stage process takes you from idea to market leadership.
            </p>
            
            <div className="space-y-4">
              {processSteps.map((step, index) => {
                const Icon = stepIcons[step.id];
                const isActive = activeStep === step.id;
                const isCompleted = processSteps.findIndex(s => s.id === activeStep) > index;
                
                return (
                  <motion.button
                    key={step.id}
                    className={`w-full flex items-start gap-4 p-4 text-left transition-all duration-300 ${
                      isActive 
                        ? 'border-l-4 border-brand-primary' 
                        : 'hover:bg-black border-l-4 border-transparent'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive 
                        ? ' text-brand' 
                        : isCompleted 
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-700 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`heading-3 ${isActive ? 'text-brand-primary' : 'text-white'}`}>
                          {step.title}
                        </h3>
                        <span className="body-small text-gray-400">
                          {step.duration}
                        </span>
                      </div>
                      <p className="body-small text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Half - Active Step Demo */}
      <div className="split-half content">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
                    {React.createElement(stepIcons[activeStepData.id], { 
                      size: 24, 
                      className: "text-white" 
                    })}
                  </div>
                  <div>
                    <h3 className="heading-2 text-black">{activeStepData.title}</h3>
                    <p className="font-medium text-gray-500">{activeStepData.duration}</p>
                  </div>
                </div>
                
                <p className="font-bold text-gray-500 mb-8">
                  {activeStepData.description}
                </p>
              </div>

              <div className="bg-black border border-gray-700 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Play className="text-brand-primary" size={20} />
                  <span className="heading-3 text-white">Live Demo</span>
                </div>
                
                <div className="bg-black p-6 border border-brand-primary">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="body-small text-gray-400 ml-4">
                      {activeStepData.demo}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {activeStep === 'discover' && (
                      <>
                        <div className="text-brand-primary">$ analyzing-market-opportunity</div>
                        <div className="text-gray-300 pl-4">→ Competitor analysis: 15 key players identified</div>
                        <div className="text-gray-300 pl-4">→ Market size: $2.3B TAM, $450M SAM</div>
                        <div className="text-gray-300 pl-4">→ User interviews: 45 completed</div>
                        <div className="text-brand-primary">✓ Discovery complete</div>
                      </>
                    )}
                    
                    {activeStep === 'prototype' && (
                      <>
                        <div className="text-brand-primary">$ building-interactive-prototype</div>
                        <div className="text-gray-300 pl-4">→ Wireframes: 23 screens designed</div>
                        <div className="text-gray-300 pl-4">→ User flows: 8 critical paths mapped</div>
                        <div className="text-gray-300 pl-4">→ Figma prototype: 87% click-through rate</div>
                        <div className="text-brand-primary">✓ Prototype validated</div>
                      </>
                    )}
                    
                    {activeStep === 'build' && (
                      <>
                        <div className="text-brand-primary">$ deploying-scalable-architecture</div>
                        <div className="text-gray-300 pl-4">→ Backend: FastAPI + PostgreSQL</div>
                        <div className="text-gray-300 pl-4">→ Frontend: React + TypeScript</div>
                        <div className="text-gray-300 pl-4">→ Infrastructure: AWS + Docker</div>
                        <div className="text-brand-primary">✓ MVP deployed</div>
                      </>
                    )}
                    
                    {activeStep === 'integrate-ai' && (
                      <>
                        <div className="text-brand-primary">$ training-custom-ai-models</div>
                        <div className="text-gray-300 pl-4">→ Dataset: 100K samples processed</div>
                        <div className="text-gray-300 pl-4">→ Model accuracy: 94.2%</div>
                        <div className="text-gray-300 pl-4">→ API latency: 150ms average</div>
                        <div className="text-brand-primary">✓ AI integration complete</div>
                      </>
                    )}
                    
                    {activeStep === 'scale' && (
                      <>
                        <div className="text-brand-primary">$ optimizing-for-growth</div>
                        <div className="text-gray-300 pl-4">→ Performance: 99.9% uptime</div>
                        <div className="text-gray-300 pl-4">→ Users: 10K→50K in 3 months</div>
                        <div className="text-gray-300 pl-4">→ Revenue: $1M ARR achieved</div>
                        <div className="text-brand-primary">✓ Scale targets met</div>
                      </>
                    )}
                  </div>
                </div>
                
                <motion.button 
                  className="btn-primary mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Interactive Demo
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Process;