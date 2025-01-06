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
}

export interface TechTreeData {
  [era: string]: TechData[];
}
