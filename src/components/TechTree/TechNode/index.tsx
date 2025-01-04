import React, { useRef, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { TechData, TechStatus } from '../types'
import './TechNode.scss'

interface TechNodeProps {
  tech: TechData
  status: TechStatus | undefined
  isAvailable: boolean
  faded: boolean
  default?: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  getTechTitle: (id: string) => string
}

const TechNode: React.FC<TechNodeProps> = React.memo(({
  tech,
  status,
  isAvailable,
  faded,
  default: isDefault,
  onClick,
  onMouseEnter,
  onMouseLeave,
  getTechTitle
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const currentStatus = status || 'Pending';
  const [showDetails, setShowDetails] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updateDetailsPosition = useCallback(() => {
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const scale = window.visualViewport?.scale || 1;
      
      // Calculate position relative to viewport
      let x = rect.left / scale;
      let y = (rect.bottom + 8) / scale;

      // Check if details would go below viewport
      const viewportHeight = window.innerHeight / scale;
      if (detailsRef.current && y + detailsRef.current.offsetHeight > viewportHeight) {
        y = (rect.top / scale) - detailsRef.current.offsetHeight - 8;
      }

      // Check if details would go off the right edge
      const viewportWidth = window.innerWidth / scale;
      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 8;
      }

      // Check if details would go off the left edge
      if (x < 8) {
        x = 8;
      }

      // Ensure y is not negative
      if (y < 8) {
        y = 8;
      }

      setPosition({ x: x * scale, y: y * scale });
    }
  }, []);

  useEffect(() => {
    if (showDetails) {
      const update = () => {
        requestAnimationFrame(() => {
          updateDetailsPosition();
          // Run again after a short delay to account for any layout shifts
          setTimeout(updateDetailsPosition, 50);
        });
      };

      update();

      const handleScroll = () => requestAnimationFrame(updateDetailsPosition);
      const handleResize = () => {
        setShowDetails(false); // Hide details when resizing/zooming
      };
      const handleVisualViewportChange = () => {
        setShowDetails(false); // Hide details when viewport changes (zoom)
      };
      
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      window.visualViewport?.addEventListener('resize', handleVisualViewportChange);
      window.visualViewport?.addEventListener('scroll', handleVisualViewportChange);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('resize', handleVisualViewportChange);
        window.visualViewport?.removeEventListener('scroll', handleVisualViewportChange);
      };
    }
  }, [showDetails, updateDetailsPosition]);

  const handleMouseEnter = () => {
    setShowDetails(true);
    onMouseEnter();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const detailsEl = detailsRef.current;
    const relatedTarget = e.relatedTarget;
    
    if (detailsEl && relatedTarget instanceof Node && detailsEl.contains(relatedTarget)) {
      return;
    }
    
    setShowDetails(false);
    onMouseLeave();
  };

  const handleDetailsMouseLeave = (e: React.MouseEvent) => {
    const nodeEl = nodeRef.current;
    const relatedTarget = e.relatedTarget;
    
    if (nodeEl && relatedTarget instanceof Node && nodeEl.contains(relatedTarget)) {
      return;
    }
    
    setShowDetails(false);
    onMouseLeave();
  };

  const renderDetails = () => {
    if (!showDetails) return null;

    const details = (
      <div className="tech-details-container" style={{ left: position.x, top: position.y }}>
        <div 
          ref={detailsRef} 
          className="tech-details"
          onMouseLeave={handleDetailsMouseLeave}
        >
          {tech.description && (
            <div className="tech-description">
              <h4>Description</h4>
              <p>{tech.description}</p>
            </div>
          )}
          {tech.unlocks && tech.unlocks.length > 0 && (
            <div className="tech-unlocks">
              <h4>Unlocks</h4>
              <ul>
                {tech.unlocks.map((unlock, index) => (
                  <li key={index}>{unlock}</li>
                ))}
              </ul>
            </div>
          )}
          {tech.prerequisites && tech.prerequisites.length > 0 && (
            <div className="tech-prerequisites">
              <h4>Prerequisites</h4>
              <ul>
                {tech.prerequisites.map((prereq, index) => (
                  <li key={index}>{getTechTitle(prereq)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );

    return createPortal(details, document.getElementById('portal-root') || document.body);
  };

  return (
    <div
      ref={nodeRef}
      className={`tech-node ${currentStatus} ${isAvailable ? 'available' : ''} ${faded ? 'faded' : ''} ${isDefault ? 'default' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tech-content">
        <div className="tech-header">
          <h3>{tech.name}</h3>
        </div>
        <div className="tech-badges">
          <div className={`cost ${tech.developmentCost?.toLowerCase()}`}>
            {tech.developmentCost}
          </div>
          <div className={`tech-status ${currentStatus.toLowerCase()}`}>
            <div className="status-light"></div>
            <div className="status-text">{currentStatus}</div>
          </div>
        </div>
      </div>
      {renderDetails()}
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.status === nextProps.status &&
         prevProps.isAvailable === nextProps.isAvailable &&
         prevProps.tech === nextProps.tech &&
         prevProps.faded === nextProps.faded &&
         prevProps.default === nextProps.default;
})

export default TechNode
