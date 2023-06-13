const GridLineEmphasis: React.FC = () => {
  return (
    <>
      <div className='gridline-emphasis'>
        <div className='gridline-emphasis-vertical' />
        <div className='gridline-emphasis-vertical' />
      </div>
      <div className='gridline-emphasis flex-direction-column'>
        <div className='gridline-emphasis-horizontal' />
        <div className='gridline-emphasis-horizontal' />
      </div>
    </>
  )
}

export default GridLineEmphasis