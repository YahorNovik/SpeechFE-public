import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrammarAnalysis as GrammarAnalysisType } from '../types';

interface Props {
  analysis: GrammarAnalysisType | null;
}

const GrammarAnalysis: React.FC<Props> = ({ analysis }) => {
  if (!analysis) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grammar-analysis"
      style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '600', 
        color: '#1F2937',
        marginBottom: '24px',
        borderBottom: '2px solid #E5E7EB',
        paddingBottom: '12px'
      }}>
        Grammar Analysis
      </h3>

      <AnimatePresence>
        {analysis.corrections?.includes('NO_ERRORS') ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              padding: '20px',
              backgroundColor: '#DEF7EC',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span role="img" aria-label="check" style={{ fontSize: '24px' }}>✓</span>
            <p style={{ 
              color: '#03543F',
              fontSize: '16px',
              fontWeight: '500',
              margin: 0
            }}>
              Perfect! Your text is grammatically correct.
            </p>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {analysis.corrections?.split('ORIGINAL:').slice(1).map((errorBlock, index) => {
              const correctionPart = errorBlock.split('CORRECTION:');
              const explanationPart = correctionPart[1].split('EXPLANATION:');
              
              const originalText = correctionPart[0].trim();
              const correctionText = explanationPart[0].trim();
              const explanation = explanationPart[1].trim();

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ 
                        color: '#991B1B',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px'
                      }}>
                        Original Text
                      </h4>
                      <div style={{
                        backgroundColor: '#FEF2F2',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        color: '#991B1B',
                        fontSize: '15px',
                        lineHeight: '1.5'
                      }}>
                        {originalText}
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ 
                        color: '#065F46',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px'
                      }}>
                        Correction
                      </h4>
                      <div style={{
                        backgroundColor: '#ECFDF5',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        color: '#065F46',
                        fontSize: '15px',
                        lineHeight: '1.5'
                      }}>
                        {correctionText}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ 
                        color: '#1E40AF',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px'
                      }}>
                        Explanation
                      </h4>
                      <div style={{
                        backgroundColor: '#EFF6FF',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        color: '#1E40AF',
                        fontSize: '15px',
                        lineHeight: '1.5'
                      }}>
                        {explanation}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}
        >
          <h4 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span role="img" aria-label="books">📚</span>
            Recommended Exercises
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.recommendations.map((exercise, index) => (
              <motion.a
                key={index}
                href={exercise.exercise_link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  color: '#2563EB',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '20px' }}>→</span>
                <span style={{ fontWeight: '500' }}>{exercise.rule_name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GrammarAnalysis;