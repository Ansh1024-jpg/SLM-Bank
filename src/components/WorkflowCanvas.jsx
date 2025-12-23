import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import ValidationSubFlow from './ValidationSubFlow';

const nodeTypes = {
  trigger: CustomNode,
  validator: CustomNode,
  human: CustomNode,
  risk: CustomNode,
  approval: CustomNode,
  comm: CustomNode,
  error: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  { id: '1', type: 'trigger', position: { x: 50, y: 300 }, data: { label: 'Loan Application', subLabel: 'Upload & OCR', type: 'trigger', status: 'idle' } },
  { id: '2', type: 'validator', position: { x: 300, y: 300 }, data: { label: 'Validation Agent', subLabel: 'Aadhar / PAN / Email', type: 'validator', status: 'idle' } },
  { id: '3', type: 'human', position: { x: 450, y: 500 }, data: { label: 'Human Review', subLabel: 'Manual Correction', type: 'human', status: 'idle' } },
  { id: '4', type: 'risk', position: { x: 650, y: 300 }, data: { label: 'Risk Analysis', subLabel: 'Credit Verification', type: 'risk', status: 'idle' } },
  { id: '5', type: 'approval', position: { x: 900, y: 300 }, data: { label: 'Multi-Approval', subLabel: 'Loan Officer (<1M)', type: 'approval', status: 'idle' } },
  { id: '6', type: 'comm', position: { x: 1150, y: 300 }, data: { label: 'Communication', subLabel: 'Notify Decision', type: 'comm', status: 'idle' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'custom', animated: false },
  // Normal path (dashed initially)
  { id: 'e2-4', source: '2', target: '4', type: 'custom', animated: false, style: { strokeDasharray: '5,5' } },
  // Error path
  { id: 'e2-3', source: '2', target: '3', type: 'custom', animated: false, label: 'Validation Failed' },
  { id: 'e3-4', source: '3', target: '4', type: 'custom', animated: false, label: 'Corrected' },

  { id: 'e4-5', source: '4', target: '5', type: 'custom', animated: false },
  { id: 'e5-6', source: '5', target: '6', type: 'custom', animated: false },
];

const WorkflowCanvas = ({ theme }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeView, setActiveView] = useState('main'); // 'main' | 'validation'

  // Simulation Step
  const [step, setStep] = useState(0);

  // Helper to update status
  const updateStatus = (id, status) => {
    setNodes((nds) => nds.map((n) => {
      if (n.id === id) {
        return { ...n, data: { ...n.data, status } };
      }
      return n;
    }));
  };

  const updateEdge = (id, active) => {
    setEdges((eds) => eds.map((e) => {
      if (e.id === id) {
        return { ...e, data: { ...e.data, active } };
      }
      return e;
    }));
  };

  // Simulation Logic
  useEffect(() => {
    // Auto-start simulation on mount
    const runSimulation = async () => {
      // Step 1: Upload (Active)
      await new Promise(r => setTimeout(r, 1000));
      updateStatus('1', 'active');

      // Step 1 -> 2
      await new Promise(r => setTimeout(r, 2000));
      updateStatus('1', 'success');
      updateEdge('e1-2', true);

      // Step 2: Validation
      await new Promise(r => setTimeout(r, 1500));
      updateStatus('2', 'active');
      // Stop edge animation
      updateEdge('e1-2', false);

      // Step 2 -> Fail (Email Error)
      await new Promise(r => setTimeout(r, 2500));
      updateStatus('2', 'error'); // Email invalid

      // Path to Human
      updateEdge('e2-3', true);
      await new Promise(r => setTimeout(r, 1000));
      updateStatus('3', 'active'); // Human waiting
      updateEdge('e2-3', false);

      // Here we could wait for user interaction, but we'll auto-resolve for now or add a button?
      // Let's add a button in the UI or just auto-resolve after 3s
      await new Promise(r => setTimeout(r, 3000));
      updateStatus('3', 'success'); // Human fixes it

      // Path to Risk
      updateEdge('e3-4', true);
      await new Promise(r => setTimeout(r, 1000));
      updateStatus('4', 'active');
      updateEdge('e3-4', false);

      // Step 4: Risk Analysis
      await new Promise(r => setTimeout(r, 2000));
      updateStatus('4', 'success');
      updateEdge('e4-5', true);

      // Step 5: Approval
      await new Promise(r => setTimeout(r, 1000));
      updateStatus('5', 'active');
      updateEdge('e4-5', false);

      await new Promise(r => setTimeout(r, 2000));
      updateStatus('5', 'success');
      updateEdge('e5-6', true);

      // Step 6: Comm
      await new Promise(r => setTimeout(r, 1000));
      updateStatus('6', 'active');
      updateEdge('e5-6', false);

      await new Promise(r => setTimeout(r, 1500));
      updateStatus('6', 'success');
    };

    runSimulation();
  }, []);

  // Node Click Handler
  const onNodeClick = useCallback((event, node) => {
    // If Validation Agent (id: '2') is clicked, drill down
    if (node.id === '2') {
      setActiveView('validation');
    }
  }, []);

  if (activeView === 'validation') {
    return <ValidationSubFlow onBack={() => setActiveView('main')} />;
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        fitView
        defaultEdgeOptions={{
          type: 'custom',
          markerEnd: { type: MarkerType.ArrowClosed, color: theme === 'light' ? '#94a3b8' : '#334155' },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant="dots" color={theme === 'light' ? '#94a3b8' : '#334155'} gap={20} size={1.5} />
        <Controls className="!bg-[var(--bg-panel)] !border-[var(--glass-border)]" />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
