import React from 'react'
import styles from './Button.module.css'

const Button = ({children, type,...props}) => {
  return (
    <button type={type} {...props} className={styles.button}>{children}</button>
  )
}

export default Button
