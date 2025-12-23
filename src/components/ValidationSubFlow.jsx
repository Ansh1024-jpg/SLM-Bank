import { useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import { ArrowLeft } from 'lucide-react';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';

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
    { id: 'start', type: 'trigger', position: { x: 50, y: 250 }, data: { label: 'Input Data', subLabel: 'from Loan App', type: 'trigger', status: 'success' } },
    { id: 'v-email', type: 'validator', position: { x: 400, y: 100 }, data: { label: 'Email Validator', subLabel: 'SMTP Check', type: 'validator', status: 'idle' } },
    { id: 'v-aadhar', type: 'validator', position: { x: 400, y: 250 }, data: { label: 'Aadhar API', subLabel: 'UIDAI Verify', type: 'validator', status: 'idle' } },
    { id: 'v-pan', type: 'validator', position: { x: 400, y: 400 }, data: { label: 'PAN NSDL', subLabel: 'Tax Status', type: 'validator', status: 'idle' } },
    { id: 'aggregator', type: 'approval', position: { x: 750, y: 250 }, data: { label: 'Aggregation', subLabel: 'Combine Results', type: 'approval', status: 'idle' } },
];

const initialEdges = [
    { id: 'e-s-email', source: 'start', target: 'v-email', type: 'custom', animated: false },
    { id: 'e-s-aadhar', source: 'start', target: 'v-aadhar', type: 'custom', animated: false },
    { id: 'e-s-pan', source: 'start', target: 'v-pan', type: 'custom', animated: false },

    { id: 'e-email-agg', source: 'v-email', target: 'aggregator', type: 'custom', animated: false },
    { id: 'e-aadhar-agg', source: 'v-aadhar', target: 'aggregator', type: 'custom', animated: false },
    { id: 'e-pan-agg', source: 'v-pan', target: 'aggregator', type: 'custom', animated: false },
];

const ValidationSubFlow = ({ onBack }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

    useEffect(() => {
        const runSimulation = async () => {
            // Start parallel validation
            updateEdge('e-s-email', true);
            updateEdge('e-s-aadhar', true);
            updateEdge('e-s-pan', true);

            await new Promise(r => setTimeout(r, 800));

            // Activate all agents
            updateStatus('v-email', 'active');
            updateStatus('v-aadhar', 'active');
            updateStatus('v-pan', 'active');

            updateEdge('e-s-email', false);
            updateEdge('e-s-aadhar', false);
            updateEdge('e-s-pan', false);

            // Random delays for realism
            // Email finishes first
            await new Promise(r => setTimeout(r, 1500));
            updateStatus('v-email', 'error'); // Valid email check failed (as per main flow story)
            updateEdge('e-email-agg', true);

            // Aadhar finishes
            await new Promise(r => setTimeout(r, 500));
            updateStatus('v-aadhar', 'success');
            updateEdge('e-aadhar-agg', true);

            // PAN finishes
            await new Promise(r => setTimeout(r, 500));
            updateStatus('v-pan', 'success');
            updateEdge('e-pan-agg', true);

            // Aggregation
            await new Promise(r => setTimeout(r, 1000));
            updateStatus('aggregator', 'active');
            updateEdge('e-email-agg', false);
            updateEdge('e-aadhar-agg', false);
            updateEdge('e-pan-agg', false);

            await new Promise(r => setTimeout(r, 1500));
            updateStatus('aggregator', 'error'); // Overall result is error because email failed
        };

        runSimulation();
    }, []);

    return (
        <div className="w-full h-full relative">
            <button
                onClick={onBack}
                className="absolute top-24 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-panel)] border border-[var(--glass-border)] text-[var(--text-primary)] shadow-lg hover:bg-[var(--glass-border)] transition-all"
            >
                <ArrowLeft size={16} />
                Back to Workflow
            </button>

            {/* Title Overlay */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 px-6 py-2 rounded-full glass-panel border border-[var(--glass-border)]">
                <span className="text-sm font-semibold text-[var(--text-primary)]">Validation Agent Internals</span>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <Background variant="dots" color={document.documentElement.getAttribute('data-theme') === 'light' ? '#94a3b8' : '#334155'} gap={20} size={1.5} />
                <Controls className="!bg-[var(--bg-panel)] !border-[var(--glass-border)]" />
            </ReactFlow>
        </div>
    );
};

export default ValidationSubFlow;
