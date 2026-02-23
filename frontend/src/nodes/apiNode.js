// apiNode.js

import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const config = {
    title: 'API Call',
    icon: '🌐',
    backgroundColor: '#fefce8',
    borderColor: '#eab308',
    titleColor: '#713f12',
    fields: [
      {
        name: 'method',
        type: 'select',
        label: 'Method',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      {
        name: 'endpoint',
        type: 'text',
        label: 'Endpoint',
        defaultValue: '',
        placeholder: 'https://api.example.com',
      },
    ],
    handles: [
      {
        type: 'target',
        id: `${id}-body`,
        label: 'Request Body',
        style: { top: '33%' },
      },
      {
        type: 'target',
        id: `${id}-headers`,
        label: 'Headers',
        style: { top: '66%' },
      },
      {
        type: 'source',
        id: `${id}-response`,
        label: 'Response',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
