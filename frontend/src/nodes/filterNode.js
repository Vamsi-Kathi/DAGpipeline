// filterNode.js

import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    icon: '🔍',
    backgroundColor: '#f0fdfa',
    borderColor: '#14b8a6',
    titleColor: '#115e59',
    fields: [
      {
        name: 'condition',
        type: 'select',
        label: 'Condition',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
        ],
      },
      {
        name: 'value',
        type: 'text',
        label: 'Filter Value',
        defaultValue: '',
        placeholder: 'Enter filter value',
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
        id: `${id}-passed`,
        label: 'Passed',
        style: { top: '40%' },
      },
      {
        type: 'source',
        id: `${id}-failed`,
        label: 'Failed',
        style: { top: '60%' },
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
