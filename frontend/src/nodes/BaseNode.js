// BaseNode.js
// Reusable base component for all nodes

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data,
  config 
}) => {
  const {
    title,
    fields = [],
    handles = [],
    icon,
    defaultWidth = 220,
    defaultHeight = 'auto',
    backgroundColor = '#ffffff',
    borderColor = '#3b82f6',
    titleColor = '#1e40af',
  } = config;

  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialState = {};
    fields.forEach(field => {
      initialState[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialState;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-input"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="node-textarea"
            rows={field.rows || 3}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="node-select"
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            className="node-input"
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className="node-checkbox"
          />
        );
      
      default:
        return null;
    }
  };

  const renderHandle = (handle, index) => {
    const handleId = handle.id || `${id}-${handle.type}-${index}`;
    const position = handle.position || (handle.type === 'source' ? Position.Right : Position.Left);
    
    return (
      <Handle
        key={handleId}
        type={handle.type}
        position={position}
        id={handleId}
        style={{
          ...handle.style,
          background: handle.type === 'source' ? '#10b981' : '#3b82f6',
          width: '12px',
          height: '12px',
          border: '2px solid white',
        }}
        title={handle.label}
      />
    );
  };

  return (
    <div 
      className="base-node"
      style={{
        width: defaultWidth,
        minHeight: defaultHeight,
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '12px',
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Render all handles */}
      {handles.map((handle, index) => renderHandle(handle, index))}

      {/* Node Header */}
      <div 
        className="node-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: fields.length > 0 ? '12px' : '4px',
          color: titleColor,
          fontWeight: '600',
          fontSize: '14px',
        }}
      >
        {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
        <span>{title}</span>
      </div>

      {/* Node Fields */}
      {fields.length > 0 && (
        <div className="node-fields" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {fields.map(field => (
            <div key={field.name} className="node-field">
              {field.label && (
                <label 
                  style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    marginBottom: '4px',
                    display: 'block',
                    fontWeight: '500',
                  }}
                >
                  {field.label}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
