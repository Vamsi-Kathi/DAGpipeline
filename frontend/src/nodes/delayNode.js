// delayNode.js

import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const config = {
    title: 'Delay',
    icon: '⏱️',
    backgroundColor: '#fcf5ff',
    borderColor: '#d946ef',
    titleColor: '#86198f',
    fields: [
      {
        name: 'duration',
        type: 'number',
        label: 'Duration (ms)',
        defaultValue: 1000,
        placeholder: 'Enter delay in milliseconds',
        min: 0,
        max: 60000,
        step: 100,
      },
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Enabled',
        defaultValue: true,
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
