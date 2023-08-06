const StepButton = ({ buttonFunc = null, text = null, completed = false }) => {
  return completed ? (
    <button
      onClick={buttonFunc}
      style={{
        boxSizing: 'border-box',
        height: 40,
        color: '#fff',
        backgroundColor: '#5b8def',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none',
        borderRadius: 5,
      }}
    >
      {text}
    </button>
  ) : (
    <button
      style={{
        boxSizing: 'border-box',
        height: 40,
        color: '#fff',
        backgroundColor: '#CACACA',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none',
        borderRadius: 5,
      }}
    >
      {text}
    </button>
  )
}
export default StepButton
