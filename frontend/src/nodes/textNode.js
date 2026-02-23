// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 220, height: 'auto' });
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{variableName}})
  useEffect(() => {
    const variableRegex = /\{\{(\s*\w+\s*)\}\}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const foundVariables = matches.map(match => match[1].trim());
    
    // Remove duplicates
    const uniqueVariables = [...new Set(foundVariables)];
    setVariables(uniqueVariables);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      // Reset height to recalculate
      textarea.style.height = 'auto';
      
      // Calculate new dimensions
      const scrollHeight = textarea.scrollHeight;
      const textLength = currText.length;
      
      // Dynamic width based on text length
      let newWidth = 220;
      if (textLength > 50) newWidth = 280;
      if (textLength > 100) newWidth = 350;
      if (textLength > 200) newWidth = 420;
      
      // Dynamic height
      const newHeight = Math.max(80, scrollHeight + 60);
      
      setDimensions({ width: newWidth, height: newHeight });
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div 
      className="text-node"
      style={{
        width: dimensions.width,
        minHeight: dimensions.height,
        backgroundColor: '#fffbeb',
        border: '2px solid #f59e0b',
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Dynamic input handles for variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            background: '#3b82f6',
            width: '12px',
            height: '12px',
            border: '2px solid white',
          }}
          title={`Variable: ${variable}`}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#10b981',
          width: '12px',
          height: '12px',
          border: '2px solid white',
        }}
        title="Output"
      />

      {/* Node Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          color: '#92400e',
          fontWeight: '600',
          fontSize: '14px',
        }}
      >
        <span style={{ fontSize: '18px' }}>📝</span>
        <span>Text</span>
      </div>

      {/* Text Input */}
      <div>
        <label 
          style={{ 
            fontSize: '12px', 
            color: '#78716c',
            marginBottom: '4px',
            display: 'block',
            fontWeight: '500',
          }}
        >
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text... Use {{variable}} for dynamic inputs"
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #d97706',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: 'monospace',
            resize: 'none',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}
        />
      </div>

      {/* Variable indicators */}
      {variables.length > 0 && (
        <div 
          style={{
            marginTop: '8px',
            padding: '6px',
            backgroundColor: '#fef3c7',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#92400e',
          }}
        >
          <strong>Variables:</strong> {variables.join(', ')}
        </div>
      )}
    </div>
  );
};
