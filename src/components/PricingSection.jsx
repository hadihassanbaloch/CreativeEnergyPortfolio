import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pricingPlans } from '../data/mock';
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Zap, 
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const planIcons = {
  sprint: Clock,
  build: Zap,
  partnership: Star
};

const PricingSection = () => {
  const [expandedPlan, setExpandedPlan] = useState(null);

  return (
    <section className="split-section" id="pricing">
      {/* Left Half - Pricing Intro */}
      <div className="split-half black px-20 ">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-huge mb-6 text-white">Engagement models</h2>
            <p className="font-medium text-gray-300 mb-8">
              Transparent, flexible pricing designed to match your transformation goals and timeline.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-brand-primary mt-1" size={20} />
                <div>
                  <h4 className="heading-3 mb-2 text-white">No Hidden Costs</h4>
                  <p className="body-medium text-gray-300">
                    Every deliverable clearly defined upfront
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-brand-primary mt-1" size={20} />
                <div>
                  <h4 className="heading-3 mb-2 text-white">Flexible Timelines</h4>
                  <p className="body-medium text-gray-300">
                    Adapt to your business needs and priorities
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CheckCircle className="text-brand-primary mt-1" size={20} />
                <div>
                  <h4 className="heading-3 mb-2 text-white">Outcome Focused</h4>
                  <p className="body-medium text-gray-300">
                    Success measured by your results, not just deliverables
                  </p>
                </div>
              </div>
            </div>

            <motion.button 
              className="btn-primary mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Right Half - Pricing Plans (Primary Background) */}
      <div className="split-half primary">
        <div className="w-full max-w-3xl">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => {
              const Icon = planIcons[plan.id];
              const isExpanded = expandedPlan === plan.id;
              const isRecommended = plan.id === 'build';
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white/10 border-2 transition-all duration-300 relative ${
                    isRecommended 
                      ? 'border-brand shadow-xl' 
                      : 'border-black/10 hover:border-brand hover:shadow-lg'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-white text-brand-primary px-4 py-1 text-sm font-semibold">
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isRecommended ? 'bg-brand-primary text-white' : 'bg-gray-100 border border-brand-primary'
                        }`}>
                          <Icon size={20} className={isRecommended ? 'text-white' : 'text-brand-primary'} />
                        </div>
                        <div>
                          <h3 className="heading-2 text-gray-900">{plan.name}</h3>
                          <p className="body-medium text-gray-600">{plan.duration}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="heading-2 text-gray-900">{plan.price}</p>
                        <motion.button
                          onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                          className="flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors mt-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="body-small">Details</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </motion.button>
                      </div>
                    </div>
                    
                    <p className="body-medium text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    
                    <motion.button 
                      className={` ${isRecommended ? 'bg-brand text-white hover:bg-brand/80' : 'bg-white text-brand-primary border-2 border-white hover:bg-gray-50'} px-6 py-3 font-semibold transition-all duration-300 flex items-center justify-right gap-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="border-t border-gray-200 bg-gray-50"
                      >
                        <div className="p-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="heading-3 text-gray-900 mb-4">Deliverables</h4>
                              <ul className="space-y-2">
                                {plan.deliverables.map((deliverable, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                  >
                                    <CheckCircle className="text-brand-primary" size={16} />
                                    <span className="body-medium text-gray-700">{deliverable}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="heading-3 text-gray-900 mb-4">Timeline</h4>
                              <div className="bg-white border border-gray-200 p-4">
                                <Clock className="text-brand-primary mb-2" size={20} />
                                <p className="body-medium text-gray-700">{plan.timeline}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;