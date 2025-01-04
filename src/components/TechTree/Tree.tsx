import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import TechNode from './TechNode'
import EraYear from './EraYear'
import EraDescription from './EraDescription'
import { TechData, TechStatus } from './types'
import { techTreeData } from './data/techTreeData'
import './styles.scss'

interface NodePosition {
  id: string
  x: number
  y: number
  level: number
  column: number
  width: number
  height: number
}

const BASE_WIDTH = 226  // Fixed width from TechNode component
const BASE_HEIGHT = 120  // Base height for size calculation
const LEVEL_WIDTH = 62  // Horizontal spacing between eras and columns
const VERTICAL_GAP = 25  // Vertical spacing between nodes
const CURVE_WIDTH = 80  // Extra spacing for connection curves
const ARROW_MIDPOINT_WIDTH = LEVEL_WIDTH/2  // Connection line offset
const INITIAL_OFFSET = { x: 0, y: 100 }
const TechTree: React.FC = () => {
  const [techStatuses, setTechStatuses] = useState<Record<string, TechStatus>>({
    "expander": "Researched",
    "circuit-compiler": "Researched",
    "expchain-testnet": "Researched",
    "zkbridge": "Researched",
    "virgo++": "Developing",
    "optimized-verifier": "Developing",
    "zkcuda": "Developing",
    "zkpytorch": "Developing",
    "poi": "Developing",
    "on-chain-app": "Developing",
    "expos": "Pending",
    "scale-dev-ecosystem": "Developing",
    "gpu-expander": "Developing",
    "log-space-uniform-verifier": "Pending",
    "data-market": "Pending",
    "zkml-showcase-app": "Pending",
    "proof-of-consensus": "Developing",
    "multi-gpu-expander": "Pending",
    "zk-friendly-quantization": "Developing",
    "scale-dev-ecosystem-2": "Pending",
    "single-slot-finality": "Pending",
    "zkbridge-ssf": "Pending",
    "larger-model-integration": "Pending",
    "full-decentralization": "Pending"
  })
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([])
  const [eraPositions, setEraPositions] = useState<Record<string, number>>({})
  const [eraInfo, setEraInfo] = useState<{ [key: string]: { startLevel: number; width: number; x: number; maxColumns: number } }>({})
  const scale = 1  // Fixed scale, no zooming
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateNodeSize = useCallback((tech: TechData) => {
    const contentLength = (
      tech.name.length + 
      (tech.description?.length || 0) + 
      (tech.unlocks?.join('').length || 0) +
      (tech.prerequisites?.join('').length || 0)
    );
    
    const widthScale = Math.min(Math.max(1, contentLength / 200), 1.2);
    const heightScale = Math.min(Math.max(1, contentLength / 300), 1.2);
    
    return {
      width: BASE_WIDTH * widthScale,
      height: BASE_HEIGHT * heightScale
    };
  }, []);

  useEffect(() => {
    const positions: NodePosition[] = []
    const eraYPositions: Record<string, number> = {}
    let maxY = 0

    // Calculate era widths and positions
    const newEraInfo: { [key: string]: { startLevel: number; width: number; x: number; maxColumns: number } } = {}
    let currentX = 0

    // First pass: Calculate era widths
    Object.entries(techTreeData).forEach(([era, techs]) => {
      const startLevel = Math.min(...techs.map(t => t.level))
      const endLevel = Math.max(...techs.map(t => t.level))
      
      // Calculate max columns needed for each level
      const maxColumnsByLevel = new Map<number, number>();
      
      for (let level = startLevel; level <= endLevel; level++) {
        const levelTechs = techs.filter(t => t.level === level);
        const columnAssignments = new Map<string, number>();
        const processedNodes = new Set<string>();

        // Helper function to get max column of prerequisites
        const getMaxPrereqColumn = (tech: TechData): number => {
          const prereqColumns = tech.prerequisites
            .filter(prereq => techs.find(t => t.id === prereq))
            .map(prereq => columnAssignments.get(prereq) || 0);
          return Math.max(-1, ...prereqColumns);
        };

        // Assign columns for this level
        const assignColumns = (tech: TechData) => {
          if (processedNodes.has(tech.id)) return;
          
          tech.prerequisites
            .filter(prereq => techs.find(t => t.id === prereq))
            .forEach(prereq => {
              const prereqTech = techs.find(t => t.id === prereq)!;
              assignColumns(prereqTech);
            });

          const column = getMaxPrereqColumn(tech) + 1;
          columnAssignments.set(tech.id, column);
          processedNodes.add(tech.id);
        };

        levelTechs.forEach(tech => assignColumns(tech));
        
        // Store max columns needed for this level
        const columnsNeeded = Math.max(0, ...Array.from(columnAssignments.values())) + 1;
        maxColumnsByLevel.set(level, columnsNeeded);
      }

      // Calculate era width based on max columns needed
      const maxColumns = Math.max(...Array.from(maxColumnsByLevel.values()));
      const width = ((endLevel - startLevel + 1) * BASE_WIDTH) + 
        ((maxColumns - 1) * (BASE_WIDTH + LEVEL_WIDTH));
      
      newEraInfo[era] = {
        startLevel,
        width,
        x: currentX,
        maxColumns
      }

      // Add gap between eras
      currentX += width + LEVEL_WIDTH
    })

    // Track vertical positions by era
    interface EraBottomEdges {
      firstColumn: number;
      secondColumn: number;
    }
    const eraBottomEdges: { [key: string]: EraBottomEdges } = {}

    // Second pass: Position nodes
    Object.entries(techTreeData).forEach(([era, techs]) => {
      const { startLevel, x: eraX } = newEraInfo[era]

      // Sort techs by level first, then by position
      const sortedTechs = [...techs].sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }
        return a.position - b.position;
      });

      // Group techs by level
      const techsByLevel: { [key: number]: TechData[] } = {};
      sortedTechs.forEach(tech => {
        if (!techsByLevel[tech.level]) {
          techsByLevel[tech.level] = [];
        }
        techsByLevel[tech.level].push(tech);
      });

      // Process each level
      Object.entries(techsByLevel).forEach(([level, levelTechs]) => {
        // Calculate column assignments based on dependencies
      const columnAssignments = new Map<string, number>();
      const processedNodes = new Set<string>();

      // Helper function to get max column of prerequisites
      const getMaxPrereqColumn = (tech: TechData): number => {
        const prereqColumns = tech.prerequisites
          .filter(prereq => techs.find(t => t.id === prereq))
          .map(prereq => columnAssignments.get(prereq) || 0);
        return Math.max(-1, ...prereqColumns);
      };

      // Assign columns
      const assignColumns = (tech: TechData) => {
        if (processedNodes.has(tech.id)) return;
        
        // Process prerequisites first
        tech.prerequisites
          .filter(prereq => techs.find(t => t.id === prereq))
          .forEach(prereq => {
            const prereqTech = techs.find(t => t.id === prereq)!;
            assignColumns(prereqTech);
          });

        // Assign column after prerequisites
        const column = getMaxPrereqColumn(tech) + 1;
        columnAssignments.set(tech.id, column);
        processedNodes.add(tech.id);
      };

      // Assign columns to all techs in this level
      levelTechs.forEach(tech => assignColumns(tech));

      // Get number of columns needed for this level
      const columnsNeeded = Math.max(0, ...Array.from(columnAssignments.values())) + 1;
      
      // Calculate level width based on number of columns
      const levelWidth = BASE_WIDTH * columnsNeeded + (columnsNeeded - 1) * LEVEL_WIDTH;

      // Process nodes with assigned columns
      const columnBottoms = new Array(columnsNeeded).fill(0);
      
      levelTechs.forEach(tech => {
        const { width, height } = calculateNodeSize(tech);
        const column = columnAssignments.get(tech.id)!;
        const x = eraX + (parseInt(level) - startLevel) * levelWidth + column * (BASE_WIDTH + LEVEL_WIDTH);
        
        const y = columnBottoms[column] === 0 ? 0 : columnBottoms[column] + VERTICAL_GAP;
        columnBottoms[column] = y + height;

        positions.push({
          id: tech.id,
          x,
          y,
          level: parseInt(level),
          column,
          width,
          height
        });

        maxY = Math.max(maxY, y + height);
      });

        // Update era bottom edges
        if (!eraBottomEdges[era]) {
          eraBottomEdges[era] = { firstColumn: 0, secondColumn: 0 };
        }
        // Update bottom edges for all columns
        columnBottoms.forEach((bottom, idx) => {
          if (idx === 0) {
            eraBottomEdges[era].firstColumn = Math.max(eraBottomEdges[era].firstColumn, bottom);
          } else if (idx === 1) {
            eraBottomEdges[era].secondColumn = Math.max(eraBottomEdges[era].secondColumn, bottom);
          }
          maxY = Math.max(maxY, bottom);
        });
      });

      // Set era label position
      if (!eraYPositions[era]) {
        const firstTech = sortedTechs[0];
        if (firstTech) {
          const level = firstTech.level;
          const levelTechs = techs.filter(t => t.level === level);
          const columnAssignments = new Map<string, number>();
          const processedNodes = new Set<string>();

          // Helper function to get max column of prerequisites
          const getMaxPrereqColumn = (tech: TechData): number => {
            const prereqColumns = tech.prerequisites
              .filter(prereq => techs.find(t => t.id === prereq))
              .map(prereq => columnAssignments.get(prereq) || 0);
            return Math.max(-1, ...prereqColumns);
          };

          // Assign columns for this level
          const assignColumns = (tech: TechData) => {
            if (processedNodes.has(tech.id)) return;
            
            tech.prerequisites
              .filter(prereq => techs.find(t => t.id === prereq))
              .forEach(prereq => {
                const prereqTech = techs.find(t => t.id === prereq)!;
                assignColumns(prereqTech);
              });

            const column = getMaxPrereqColumn(tech) + 1;
            columnAssignments.set(tech.id, column);
            processedNodes.add(tech.id);
          };

          levelTechs.forEach(tech => assignColumns(tech));
          
          // Calculate level width based on columns needed
          const columnsNeeded = Math.max(0, ...Array.from(columnAssignments.values())) + 1;
          const levelWidth = BASE_WIDTH * columnsNeeded + (columnsNeeded - 1) * LEVEL_WIDTH;
          const x = eraX + (level - startLevel) * levelWidth;
          eraYPositions[era] = x + levelWidth / 2;
        }
      }
    })

    // Calculate total width including gaps and second columns
    const width = currentX + (BASE_WIDTH + LEVEL_WIDTH) + CURVE_WIDTH * 2 // Add width for second column plus spacing
    const height = maxY + 50 // Add some padding at the bottom

    setNodePositions(positions)
    setEraPositions(eraYPositions)
    setEraInfo(newEraInfo)
    setSvgSize({ width, height })
  }, [calculateNodeSize])

  const isAvailable = useCallback((tech: TechData): boolean => {
    if (!tech.prerequisites?.length) return true
    return tech.prerequisites.every(prereq => techStatuses[prereq] === 'Researched')
  }, [techStatuses])

  const renderEraLabels = useMemo(() => {
    return Object.entries(eraPositions).map(([era, yPosition]) => {
      const parts = era.split(', ')
      const isDateEra = parts.length > 1
      
      return (
        <div
          key={era}
          style={{
            position: 'absolute',
            left: yPosition,
            top: -120,  // Increased to prevent overlap with cards
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            zIndex: 5,
            pointerEvents: 'none'  // Prevent interaction with title during zoom
          }}
        >
          <EraYear text={isDateEra ? parts[0] : "Before 2025"} />
          <EraDescription text={isDateEra ? parts[1] : era} />
        </div>
      )
    })
  }, [eraPositions])

  const getConnectedNodes = useCallback((techId: string): string[] => {
    const allTechs = Object.values(techTreeData).flat()
    const connectedNodes = new Set<string>()
    
    // Helper function to recursively add prerequisites
    const addPrerequisites = (id: string) => {
      const tech = allTechs.find(t => t.id === id)
      if (tech?.prerequisites) {
        tech.prerequisites.forEach(prereqId => {
          if (!connectedNodes.has(prereqId)) {
            connectedNodes.add(prereqId)
            addPrerequisites(prereqId)
          }
        })
      }
    }
    
    // Add the hovered node itself
    connectedNodes.add(techId)
    
    // Add all prerequisites recursively
    addPrerequisites(techId)
    
    return Array.from(connectedNodes)
  }, [])

  const renderEraDividers = useMemo(() => {
    const eras = Object.keys(techTreeData);
    return eras.slice(0, -1).map((era, index) => {
      const currentEraInfo = eraInfo[era];
      const nextEraInfo = eraInfo[eras[index + 1]];
      if (!currentEraInfo || !nextEraInfo) return null;

      const currentEraEnd = currentEraInfo.x + currentEraInfo.width;
      const nextEraStart = nextEraInfo.x;
      const midPoint = currentEraEnd + (nextEraStart - currentEraEnd) / 2;

      return (
        <line
          key={`era-divider-${index}`}
          x1={midPoint}
          y1={0}
          x2={midPoint}
          y2={svgSize.height}
          className="era-divider"
        />
      );
    });
  }, [eraInfo, svgSize.height]);

  const renderConnections = useMemo(() => {
    const allTechs = Object.values(techTreeData).flat()
    return allTechs.map(tech => {
      return tech.prerequisites.map(prereqId => {
        const startNode = nodePositions.find(p => p.id === prereqId)
        const endNode = nodePositions.find(p => p.id === tech.id)
        if (!startNode || !endNode) return null

        const startX = startNode.x + startNode.width
        const startY = startNode.y + startNode.height / 2
        const endX = endNode.x
        const endY = endNode.y + endNode.height / 2

        // Show edge if both nodes are in the prerequisite chain
        const isVisible = hoveredTech !== null && 
          getConnectedNodes(hoveredTech).includes(tech.id)

        // Calculate midpoint for elbow
        const midY = startY + (endY - startY) / 2

        // Calculate path based on vertical difference
        const horizontalOffset = ARROW_MIDPOINT_WIDTH
        const verticalDiff = endY - startY
        const isVertical = Math.abs(verticalDiff) > 1  // Small threshold for floating point comparison
        const curveRadius = 15  // Reduced radius for tighter curves
        const direction = verticalDiff >= 0 ? 1 : -1
        
        // Generate path based on whether it's vertical or horizontal
        const path = isVertical 
          ? `M ${startX} ${startY} 
             L ${startX + horizontalOffset - curveRadius} ${startY}
             C ${startX + horizontalOffset} ${startY} 
               ${startX + horizontalOffset} ${startY} 
               ${startX + horizontalOffset} ${startY + direction * curveRadius}
             L ${startX + horizontalOffset} ${endY - direction * curveRadius}
             C ${startX + horizontalOffset} ${endY}
               ${startX + horizontalOffset} ${endY}
               ${startX + horizontalOffset + curveRadius} ${endY}
             L ${endX} ${endY}`
          : `M ${startX} ${startY}
             L ${endX} ${endY}`

        // Create arrow at the end
        const arrowSize = 2
        const arrowPath = `M ${endX - arrowSize} ${endY - arrowSize}
                          L ${endX} ${endY}
                          L ${endX - arrowSize} ${endY + arrowSize}`

        return (
          <g key={`${prereqId}-${tech.id}`}>
            <path
              d={path}
              className={isVisible ? 'visible' : ''}
            />
            <path
              d={arrowPath}
              className={isVisible ? 'visible' : ''}
            />
          </g>
        )
      })
    })
  }, [nodePositions, hoveredTech])

  return (
    <div ref={containerRef} className="tech-tree">
      <div style={{
        marginTop: '60px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h1 style={{ margin: 0, fontSize: '40px' }}>Interactive Technology Tree</h1>
      </div>
      <div className="tech-container" style={{ 
        width: svgSize.width, 
        height: svgSize.height, 
        transform: `translate3d(${INITIAL_OFFSET.x}px, ${INITIAL_OFFSET.y}px, 0)`
      }}>
        <svg 
          ref={svgRef} 
          className="connections"
          width={svgSize.width}
          height={svgSize.height}
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          preserveAspectRatio="none"
          style={{ zIndex: 1 }}
        >
          {renderEraDividers}
          {renderConnections}
        </svg>
        {renderEraLabels}
        {nodePositions.map(position => {
          const tech = Object.values(techTreeData).flat().find(t => t.id === position.id)!
          return (
            <div
              key={tech.id}
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: position.width,
                height: position.height,
                zIndex: 10,
                willChange: 'transform'
              }}
            >
              <TechNode
                tech={tech}
                status={techStatuses[tech.id]}
                isAvailable={isAvailable(tech)}
                faded={hoveredTech !== null && !getConnectedNodes(hoveredTech).includes(tech.id)}
                default={hoveredTech === null}
                onClick={() => {}}
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
                getTechTitle={(id) => {
                  const tech = Object.values(techTreeData).flat().find(t => t.id === id);
                  return tech?.name || id;
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(TechTree)
