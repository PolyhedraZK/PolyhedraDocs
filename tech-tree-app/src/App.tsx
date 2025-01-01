import React from 'react'
import TechTree from './components/TechTree'
import './components/TechTree/TechTree.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Polyhedra Network Technology Tree</h1>
      </header>
      <main className="app-content">
        <TechTree />
      </main>
    </div>
  )
}

export default App
