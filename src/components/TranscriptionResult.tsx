import React from 'react';
import { motion } from 'framer-motion';
import { TranscriptionResult as TranscriptionResultType } from '../types';
import GrammarAnalysis from './GrammarAnalysis';

interface Props {
  result: TranscriptionResultType;
}

const TranscriptionResult: React.FC<Props> = ({ result }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          marginBottom: '16px',
          borderBottom: '2px solid #E5E7EB',
          paddingBottom: '12px'
        }}>
          Transcription
        </h3>
        <p style={{ 
          color: '#4B5563',
          fontSize: '16px',
          lineHeight: '1.8',
          whiteSpace: 'pre-wrap'
        }}>
          {result.text}
        </p>
      </motion.div>

      <GrammarAnalysis analysis={result.grammar} />
    </div>
  );
};

export default TranscriptionResult;