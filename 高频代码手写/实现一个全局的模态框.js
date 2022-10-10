// 实现一个全局的模态框
import * as React from 'react'
import ReactDOM from 'react-dom'
import Snackbar from '@mui/material/Snackbar'
import styles from '@assets/CustomizedSnackbars.module.css'
import { SUCCESS_TIP, ERROR_TIP } from '@utils/img'

export default function CustomizedSnackbars({ open, setSnackOpen, type, message }) {
  const handleClose = () => {
    setSnackOpen()
  }

  const snackBarBg = {
    'success': '#bcebdc',
    'error': '#f9d7d9',
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <div className={styles.customBox} style={{ background: snackBarBg[type] }}>
        <div className={styles.textBox}>
          {type === 'success' && <><img src={SUCCESS_TIP} width={20} height={20} /><div className={styles.snackSuccessText}>{message}</div></>}
          {type === 'error' && <><img src={ERROR_TIP} width={20} height={20} /><div className={styles.snackErrorText}>{message}</div></>}
        </div>
      </div>
    </Snackbar>
  )
}

export const showSnackBar = (props) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const close = () => {
    ReactDOM.unmountComponentAtNode(div)
    if (div && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  ReactDOM.render(<CustomizedSnackbars open={true} setSnackOpen={close} {...props} />, div)
}