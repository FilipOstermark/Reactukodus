interface GridLineEmphasisProps {
  isSolved: boolean
}

const GridLineEmphasis = ({ isSolved }: GridLineEmphasisProps) => {
  return (
    <>
      <div className='gridline-emphasis' data-is-solved={isSolved}>
        <div className='gridline-emphasis-vertical' />
        <div className='gridline-emphasis-vertical' />
      </div>
      <div 
        className='gridline-emphasis flex-direction-column'  
        data-is-solved={isSolved}
      >
        <div className='gridline-emphasis-horizontal' />
        <div className='gridline-emphasis-horizontal' />
      </div>
    </>
  )
}

export default GridLineEmphasis
