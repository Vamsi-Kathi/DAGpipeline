// outputNode.js

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    icon: '📤',
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
    titleColor: '#065f46',
    fields: [
      {
        name: 'outputName',
        type: 'text',
        label: 'Name',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name',
      },
      {
        name: 'outputType',
        type: 'select',
        label: 'Type',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ],
      },
    ],
    handles: [
      {
        type: 'target',
        id: `${id}-value`,
        label: 'Input',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
