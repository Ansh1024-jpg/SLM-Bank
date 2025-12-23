import { BaseEdge, getSmoothStepPath, getBezierPath } from 'reactflow';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isActive = data?.active;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: isActive ? 'var(--accent-primary)' : '#334155', strokeWidth: 2, transition: 'stroke 0.3s' }} />
      
      {isActive && (
         <circle r="4" fill="var(--accent-primary)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={edgePath} />
         </circle>
      )}
    </>
  );
};

export default CustomEdge;
