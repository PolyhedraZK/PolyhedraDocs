import React from 'react'

interface EraDescriptionProps {
  text: string
}

const EraDescription: React.FC<EraDescriptionProps> = ({ text }) => {
  return (
    <div style={{
      fontSize: '20px',
      color: '#141413',
      lineHeight: '30px'
    }}>
      {text}
    </div>
  )
}

export default EraDescription
