import Loader from '../components/Loader';

export default function Button({
  isLoading = false,
  style = {},
  onClick = () => {},
  text='Click Me',
  textStyle = {},
  className = '',
}) {
  return (
    <button
      className={className}
      style={{
        backgroundColor: '#FF6B01',
        color: '#fff',
        padding: '10px 20px',
        height: '40px',
        // width: '120px',
        border: 'none',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span><Loader /></span> : <span style={{...textStyle, fontSize: '16px'}}>{text}</span>}
    </button>
  );
}