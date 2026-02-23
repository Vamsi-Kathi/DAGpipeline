// transformNode.js

import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    icon: '🔄',
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    titleColor: '#991b1b',
    fields: [
      {
        name: 'operation',
        type: 'select',
        label: 'Operation',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'trim', label: 'Trim' },
        ],
      },
    ],
    handles: [
      {
        type: 'target',
        id: `${id}-input`,
        label: 'Input',
      },
      {
        type: 'source',
        id: `${id}-output`,
        label: 'Output',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
