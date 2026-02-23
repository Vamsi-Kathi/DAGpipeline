// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    icon: '🤖',
    backgroundColor: '#faf5ff',
    borderColor: '#a855f7',
    titleColor: '#6b21a8',
    fields: [
      {
        name: 'description',
        type: 'text',
        label: '',
        defaultValue: 'This is a LLM.',
        placeholder: 'LLM Description',
      },
    ],
    handles: [
      {
        type: 'target',
        id: `${id}-system`,
        label: 'System',
        style: { top: '33%' },
      },
      {
        type: 'target',
        id: `${id}-prompt`,
        label: 'Prompt',
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
