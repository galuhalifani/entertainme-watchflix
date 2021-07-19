import InfoIcon from './icons/InfoIcon'
import SuccessIcon from './icons/SuccessIcon'
import ErrorIcon from './icons/ErrorIcon'
import { CloseIconSuccess, CloseIconError } from './icons/CloseIcon'

const alertStyleSuccess = {
    backgroundColor: 'lightyellow',
    color: 'black',
    padding: '10px',
    paddingRight: '2px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box',
    borderRadius: '10px'
  }

  const alertStyleError = {
    backgroundColor: '#260003',
    color: 'white',
    padding: '10px',
    paddingRight: '2px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box',
    borderRadius: '10px'
  }

  const alertStyleInfo = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    paddingRight: '2px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box',
    borderRadius: '10px'
  }
  
  const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#000000'
  }
  
  const AlertTemplate = ({ message, options, style, close }) => {
    if (options.type === 'success') {
        return (
            <div style={{ ...alertStyleSuccess, ...style }}>
              {options.type === 'success' && <SuccessIcon />}
              <span style={{ flex: 2, marginLeft: '3%' }}>{message}</span>
              <button onClick={close} style={buttonStyle}>
                <CloseIconSuccess />
              </button>
            </div>
          )                
    } else if (options.type === 'error') {
        return (
            <div style={{ ...alertStyleError, ...style }}>
            {options.type === 'error' && <ErrorIcon />}
            <span style={{ flex: 2, marginLeft: '3%' }}>{message}</span>
            <button onClick={close} style={buttonStyle}>
                <CloseIconError />
            </button>
            </div>
        )                
    } else {
        return (
            <div style={{ ...alertStyleInfo, ...style }}>
              {options.type === 'info' && <InfoIcon />}
              <span style={{ flex: 2, marginLeft: '3%' }}>{message}</span>
              <button onClick={close} style={buttonStyle}>
                <CloseIconSuccess />
              </button>
            </div>
        )      
    }
  }
  
  export default AlertTemplate