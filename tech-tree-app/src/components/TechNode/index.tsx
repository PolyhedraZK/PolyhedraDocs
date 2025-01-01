import React, { useRef, useCallback } from 'react'
import { TechData, TechStatus } from '../../types'
import './TechNode.scss'

interface TechNodeProps {
  tech: TechData
  status: TechStatus | undefined
  isAvailable: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const TechNode: React.FC<TechNodeProps> = React.memo(({
  tech,
  status,
  isAvailable,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const currentStatus = status || 'Pending';

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const content = contentRef.current;
    if (!content) return;

    const isContentScrollable = content.scrollHeight > content.clientHeight;
    if (!isContentScrollable) return;

    e.stopPropagation();
    content.scrollTop += e.deltaY;
  }, []);

  return (
    <div
      className={`tech-node ${currentStatus} ${isAvailable ? 'available' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onWheel={handleWheel}
    >
      <div className="tech-content" ref={contentRef}>
        <div className="tech-header">
          <h3>{tech.name}</h3>
          <div className={`cost ${tech.developmentCost?.toLowerCase()}`}>
            {tech.developmentCost}
          </div>
        </div>
        <div className="tech-description">{tech.description}</div>
        {tech.unlocks && tech.unlocks.length > 0 && (
          <div className="tech-unlocks">
            <h4>Unlocks:</h4>
            <ul>
              {tech.unlocks.map((unlock, index) => (
                <li key={index}>{unlock}</li>
              ))}
            </ul>
          </div>
        )}
        {tech.prerequisites && tech.prerequisites.length > 0 && (
          <div className="tech-prerequisites">
            <h4>Prerequisites:</h4>
            <ul>
              {tech.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`tech-status ${currentStatus.toLowerCase()}`}>
        Status: {currentStatus}
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.status === nextProps.status &&
         prevProps.isAvailable === nextProps.isAvailable &&
         prevProps.tech === nextProps.tech;
})

export default TechNode
