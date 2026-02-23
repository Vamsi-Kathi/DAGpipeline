// inputNode.js

import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    icon: '📥',
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6',
    titleColor: '#1e40af',
    fields: [
      {
        name: 'inputName',
        type: 'text',
        label: 'Name',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name',
      },
      {
        name: 'inputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ],
    handles: [
      {
        type: 'source',
        id: `${id}-value`,
        label: 'Output',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
