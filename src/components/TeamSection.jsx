import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/mock';
import { 
  Play, 
  User, 
  Linkedin, 
  Twitter,
  Github
} from 'lucide-react';

const TeamSection = () => {
  return (
    <section className="split-section" id="team">
      {/* Left Half - Team Intro (White Background) */}
      <div className="split-half white">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="display-huge mb-6 text-gray-900">Meet the Team</h2>
            <p className="font-regular text-gray-600 mb-8">
              Our team combines deep technical expertise with creative problem-solving. 
              Meet the people who will transform your vision into reality.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">12</span>
                </div>
                <div>
                  <h4 className="heading-3 text-gray-900">Senior Specialists</h4>
                  <p className="body-small text-gray-600">10+ years average experience</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="heading-3 text-gray-900">Core Disciplines</h4>
                  <p className="body-small text-gray-600">Design, Branding, AI, Growth</p>
                </div>
              </div>
            </div>

            <motion.button 
              className="btn-primary mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Meet the Full Team
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Right Half - Team Members */}
      <div className="split-half content bg-black">
        <div className="w-full max-w-3xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/10 border border-gray-700 overflow-hidden hover:border-brand-primary transition-all duration-500"
              >
                <div className="relative h-48 bg-gradient-to-br from-brand-primary/20 to-transparent flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
                  <motion.div 
                    className="relative z-10 flex flex-col items-center text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mb-4 cursor-pointer">
                      <Play className="text-white ml-1" size={24} />
                    </div>
                    <p className="body-small text-white">Watch {member.name} at work</p>
                  </motion.div>
                  
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-brand-primary rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="heading-3 group-hover:text-brand-primary transition-colors text-white">
                        {member.name}
                      </h3>
                      <p className="font-medium text-brand-primary group-hover:text-white font-bold">
                        {member.role}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button 
                        className="p-2 bg-gray-700 border border-gray-600 hover:border-brand-primary text-gray-400 hover:text-brand-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin size={16} />
                      </motion.button>
                      <motion.button 
                        className="p-2 bg-gray-700 border border-gray-600 hover:border-brand-primary text-gray-400 hover:text-brand-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={16} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <p className="body-small text-gray-300 mb-4">
                    {member.expertise}
                  </p>
                  
                  <div className="flex items-center gap-2 text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <User size={16} />
                    <span className="body-small">View Full Profile</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;