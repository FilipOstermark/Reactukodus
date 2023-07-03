interface IconButtonProps {
  isFilled: boolean
  iconSrc: string
  onClick: () => void
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <button
      className='utility-button'
      data-is-filled={props.isFilled}
      onClick={props.onClick}>
      <img className='icon' src={props.iconSrc} />
    </button>
  )
}