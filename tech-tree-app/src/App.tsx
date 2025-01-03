import React from 'react'
import TechTree from './components/TechTree'
import './styles/index.scss'

const App: React.FC = () => {
  return (
    <div>
      <h1 className="main-title">Polyhedra Network Technology Tree</h1>
      <TechTree />
    </div>
  )
}

export default App
