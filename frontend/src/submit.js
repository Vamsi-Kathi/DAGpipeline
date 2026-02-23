// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAlertData(data);
            setShowAlert(true);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error connecting to backend. Make sure the server is running on http://localhost:8000');
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertData(null);
    };

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button type="submit" onClick={handleSubmit}>
                    🚀 Submit Pipeline
                </button>
            </div>

            {showAlert && (
                <>
                    <div className="alert-overlay" onClick={closeAlert} />
                    <div className="pipeline-alert">
                        <h2 style={{ 
                            margin: '0 0 20px 0', 
                            color: '#1e293b',
                            fontSize: '24px',
                            fontWeight: '700',
                        }}>
                            📊 Pipeline Analysis
                        </h2>
                        
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '15px',
                            marginBottom: '25px',
                        }}>
                            <div style={{
                                padding: '15px',
                                backgroundColor: '#f0f9ff',
                                borderRadius: '8px',
                                border: '2px solid #3b82f6',
                            }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>
                                    Number of Nodes
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e40af' }}>
                                    {alertData?.num_nodes}
                                </div>
                            </div>

                            <div style={{
                                padding: '15px',
                                backgroundColor: '#f0fdf4',
                                borderRadius: '8px',
                                border: '2px solid #10b981',
                            }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>
                                    Number of Edges
                                </div>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: '#065f46' }}>
                                    {alertData?.num_edges}
                                </div>
                            </div>

                            <div style={{
                                padding: '15px',
                                backgroundColor: alertData?.is_dag ? '#f0fdf4' : '#fef2f2',
                                borderRadius: '8px',
                                border: `2px solid ${alertData?.is_dag ? '#10b981' : '#ef4444'}`,
                            }}>
                                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '5px' }}>
                                    Is Directed Acyclic Graph (DAG)?
                                </div>
                                <div style={{ 
                                    fontSize: '28px', 
                                    fontWeight: '700', 
                                    color: alertData?.is_dag ? '#065f46' : '#991b1b',
                                }}>
                                    {alertData?.is_dag ? '✅ Yes' : '❌ No'}
                                </div>
                                {!alertData?.is_dag && (
                                    <div style={{ 
                                        marginTop: '10px', 
                                        fontSize: '13px', 
                                        color: '#991b1b',
                                    }}>
                                        ⚠️ Your pipeline contains circular dependencies
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={closeAlert}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#3b82f6';
                            }}
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </>
    );
};
