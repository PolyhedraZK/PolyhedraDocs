export type TechStatus = 'Researched' | 'Developing' | 'Pending';
export type DevelopmentCost = 'High' | 'Medium' | 'Small';

export interface TechData {
  id: string;
  name: string;
  era: string;
  description: string;
  prerequisites: string[];
  developmentCost: DevelopmentCost;
  unlocks: string[];
  status?: TechStatus;
  level: number;  // Vertical position (0, 1, 2, etc.)
  position: number;  // Horizontal position within level (0, 1, 2, etc.)
  iconSrc?: string;  // Optional path to GIF or SVG icon
}

export interface TechTreeData {
  [era: string]: TechData[];
}
