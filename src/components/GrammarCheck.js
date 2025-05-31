// src/components/GrammarCheck.js
export default function GrammarCheck({ text, onAnalysisComplete }) {
    return (
      <div>
        <button onClick={() => onAnalysisComplete(text)}>
          Check Grammar
        </button>
      </div>
    );
  }