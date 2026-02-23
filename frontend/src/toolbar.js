// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ 
                color: 'white', 
                marginBottom: '15px', 
                fontSize: '24px',
                fontWeight: '600',
            }}>
                🚀 VectorShift Pipeline Builder
            </h2>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px',
                marginTop: '20px',
            }}>
                <DraggableNode type='customInput' label='📥 Input' />
                <DraggableNode type='llm' label='🤖 LLM' />
                <DraggableNode type='customOutput' label='📤 Output' />
                <DraggableNode type='text' label='📝 Text' />
                <DraggableNode type='transform' label='🔄 Transform' />
                <DraggableNode type='filter' label='🔍 Filter' />
                <DraggableNode type='api' label='🌐 API Call' />
                <DraggableNode type='aggregator' label='📊 Aggregator' />
                <DraggableNode type='delay' label='⏱️ Delay' />
            </div>
        </div>
    );
};
