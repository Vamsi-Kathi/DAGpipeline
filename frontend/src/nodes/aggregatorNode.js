// aggregatorNode.js

import { BaseNode } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const config = {
    title: 'Aggregator',
    icon: '📊',
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
    titleColor: '#5b21b6',
    fields: [
      {
        name: 'operation',
        type: 'select',
        label: 'Operation',
        defaultValue: 'concat',
        options: [
          { value: 'concat', label: 'Concatenate' },
          { value: 'merge', label: 'Merge' },
          { value: 'join', label: 'Join' },
        ],
      },
      {
        name: 'separator',
        type: 'text',
        label: 'Separator',
        defaultValue: ', ',
        placeholder: 'Enter separator',
      },
    ],
    handles: [
      {
        type: 'target',
        id: `${id}-input1`,
        label: 'Input 1',
        style: { top: '25%' },
      },
      {
        type: 'target',
        id: `${id}-input2`,
        label: 'Input 2',
        style: { top: '50%' },
      },
      {
        type: 'target',
        id: `${id}-input3`,
        label: 'Input 3',
        style: { top: '75%' },
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
