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

const BASE_WIDTH = 200
const BASE_HEIGHT = 120
const LEVEL_WIDTH = 62  // Horizontal spacing between eras
const CURVE_WIDTH = 80  // Increased for more balanced spacing
const INITIAL_OFFSET = { x: -15, y: 0 }  // Add 32px left margin

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
    const eraInfo: { [key: string]: { startLevel: number; width: number; x: number } } = {}
    let currentX = 0

    // First pass: Calculate era widths
    Object.entries(techTreeData).forEach(([era, techs]) => {
      const startLevel = Math.min(...techs.map(t => t.level))
      const endLevel = Math.max(...techs.map(t => t.level))
      const width = (endLevel - startLevel + 1) * BASE_WIDTH
      
      eraInfo[era] = {
        startLevel,
        width,
        x: currentX
      }

      // Add gap between eras
      currentX += width + LEVEL_WIDTH
    })

    // Track vertical positions by era
    const eraBottomEdges: { [key: string]: number } = {}

    // Second pass: Position nodes
    Object.entries(techTreeData).forEach(([era, techs]) => {
      const { startLevel, x: eraX } = eraInfo[era]

      // Sort techs by position first, then by level
      const sortedTechs = [...techs].sort((a, b) => {
        if (a.position !== b.position) {
          return a.position - b.position
        }
        return a.level - b.level
      })

      // Process each tech in this era
      sortedTechs.forEach(tech => {
        const { width, height } = calculateNodeSize(tech)
        // Position node relative to era start
        const x = eraX + (tech.level - startLevel) * BASE_WIDTH
        
        // Get last bottom edge for this era
        const lastBottom = eraBottomEdges[era] || 0
        // Calculate y position with exact 25px gap from last node in this era
        const y = lastBottom === 0 ? 0 : lastBottom + 25

        positions.push({
          id: tech.id,
          x,
          y,
          level: tech.level,
          column: tech.position,
          width,
          height
        })

        // Update bottom edge for this era
        eraBottomEdges[era] = y + height
        maxY = Math.max(maxY, y + height)

        // Set era label position at center of first node
        if (!eraYPositions[era]) {
          eraYPositions[era] = x + width / 2
        }
      })
    })

    // Calculate total width including gaps
    const width = currentX - LEVEL_WIDTH + CURVE_WIDTH * 2
    const height = maxY + 50 // Add some padding at the bottom

    setNodePositions(positions)
    setEraPositions(eraYPositions)
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

        // Create elbow path with fixed spacing
        const horizontalOffset = 40  // Fixed distance from nodes
        const path = `M ${startX} ${startY} 
                     L ${startX + horizontalOffset} ${startY}
                     L ${startX + horizontalOffset} ${endY}
                     L ${endX} ${endY}`

        // Create arrow at the end
        const arrowSize = 5
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

  const containerStyle = useMemo(() => ({
    transform: `translate3d(${INITIAL_OFFSET.x}px, ${INITIAL_OFFSET.y}px, 0)`,
    width: svgSize.width,
    height: svgSize.height,
    padding: '32px'
  }), [svgSize.width, svgSize.height])

  return (
    <>
      <div 
        ref={containerRef}
        className="tech-tree"
      >
        <div
          className="tech-container"
          style={containerStyle}
        >
          <svg 
            ref={svgRef} 
            className="connections"
            width={svgSize.width}
            height={svgSize.height}
            viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
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
                  onClick={() => {}}
                  onMouseEnter={() => setHoveredTech(tech.id)}
                  onMouseLeave={() => setHoveredTech(null)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default React.memo(TechTree)
