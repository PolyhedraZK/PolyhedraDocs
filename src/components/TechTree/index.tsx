import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './styles.scss';

const TechTreeWrapper: React.FC = () => {
  return (
    <BrowserOnly>
      {() => {
        // Import all necessary components and data
        const TechTree = require('./Tree').default;
        const techTreeData = require('./data/techTreeData').techTreeData;
        
        // Add CSS variables to document root
        const root = document.documentElement;
        const colors = {
          'indigo-10': 'rgba(99, 102, 241, 0.1)',
          'indigo-90': 'rgba(67, 56, 202, 1)',
          'red-10': 'rgba(239, 68, 68, 0.1)',
          'red-90': 'rgba(185, 28, 28, 1)',
          'orange-10': 'rgba(249, 115, 22, 0.1)',
          'orange-90': 'rgba(194, 65, 12, 1)',
          'green-10': 'rgba(34, 197, 94, 0.1)',
          'green-90': 'rgba(21, 128, 61, 1)',
          'yellow-10': 'rgba(234, 179, 8, 0.1)',
          'yellow-90': 'rgba(161, 98, 7, 1)',
          'blue-10': 'rgba(59, 130, 246, 0.1)',
          'blue-90': 'rgba(29, 78, 216, 1)'
        };
        
        Object.entries(colors).forEach(([key, value]) => {
          root.style.setProperty(`--c-${key}`, value);
        });

        // Create portal root if it doesn't exist
        if (!document.getElementById('portal-root')) {
          const portalRoot = document.createElement('div');
          portalRoot.id = 'portal-root';
          document.body.appendChild(portalRoot);
        }

        return <TechTree />;
      }}
    </BrowserOnly>
  );
};

export default TechTreeWrapper;
