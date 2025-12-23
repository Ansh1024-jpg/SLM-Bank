import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { ShieldCheck, FileText, User, Zap, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const icons = {
  trigger: FileText,
  validator: ShieldCheck,
  human: User,
  risk: Zap,
  comm: Mail,
  approval: CheckCircle,
  error: AlertTriangle,
};

const CustomNode = ({ data, selected }) => {
  const Icon = icons[data.type] || FileText;
  const status = data.status || 'idle'; // idle, active, success, error

  // Status colors/styles
  const statusStyles = {
    idle: 'border-[var(--node-border-idle)] bg-[var(--node-bg-idle)]',
    active: 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 ring-2 ring-[var(--accent-primary)]/30 ring-offset-2 ring-offset-[var(--bg-dark)]',
    success: 'border-green-500 bg-green-500/10',
    error: 'border-red-500 bg-red-500/10',
  };

  const glowVariants = {
    idle: { scale: 1, opacity: 0 },
    active: { 
      scale: [1, 1.2, 1], 
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 2, repeat: Infinity }
    },
    success: { scale: 1, opacity: 0 },
    error: { scale: 1, opacity: 0 }
  };

  return (
    <div className="relative group">
       {/* Active Glow Effect */}
       {status === 'active' && (
        <motion.div
            className={clsx(
                "absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-purple)] opacity-30 blur-md",
            )}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
       )}

      {/* Main Node Body */}
      <div className={clsx(
        "relative min-w-[200px] p-3 rounded-xl border transition-all duration-300 backdrop-blur-md",
        statusStyles[status],
        selected ? 'shadow-lg shadow-[var(--accent-primary)]/20' : ''
      )}>
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-inner transition-colors duration-300",
             status === 'active' ? 'bg-[var(--accent-primary)]' : 
             status === 'success' ? 'bg-green-500' :
             status === 'error' ? 'bg-red-500' : 'bg-[var(--bg-icon)]'
          )}>
            <Icon size={16} />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wide text-[var(--text-primary)] transition-colors duration-300">
                {data.label}
            </span>
            {data.subLabel && (
                <span className="text-[10px] text-[var(--text-secondary)] mt-0.5 transition-colors duration-300">
                    {data.subLabel}
                </span>
            )}
          </div>
        </div>

        {/* Dynamic Status Text or Spinner */}
        {status === 'active' && (
             <div className="mt-2 text-[10px] text-[var(--accent-primary)] flex items-center gap-1.5 font-medium px-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                 Processing...
             </div>
        )}
        
        {status === 'success' && (
             <div className="mt-2 text-[10px] text-green-500 flex items-center gap-1.5 font-medium px-1">
                 <CheckCircle size={10} />
                 Completed
             </div>
        )}
        
         {status === 'error' && (
             <div className="mt-2 text-[10px] text-red-500 flex items-center gap-1.5 font-medium px-1">
                 <AlertTriangle size={10} />
                 Action Required
             </div>
        )}

        {/* Handles */}
        <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-[var(--text-secondary)] !border-none" />
        <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-[var(--text-secondary)] !border-none" />
      </div>
    </div>
  );
};

export default memo(CustomNode);
