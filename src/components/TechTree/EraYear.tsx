import React from 'react'

interface EraYearProps {
  text: string
}

const EraYear: React.FC<EraYearProps> = ({ text }) => {
  return (
    <div style={{
      fontSize: '18px',
      color: '#141413',
      lineHeight: '30px'
    }}>
      {text}
    </div>
  )
}

export default EraYear
