const Notification = ({ text, severity }) => {
  if (text === '') {
    return null
  }

  return (
    <div className={severity}>
      {text}
    </div>
  )
}

export default Notification