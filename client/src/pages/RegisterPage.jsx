import React from 'react'
import Register from '../components/Register'
import RightSide from '../components/RightSide'
import styles from '../styles/registerPage.module.css'

function RegisterPage() {
  return (
    <div className={styles.container}>
      <Register/>
      <RightSide/>
    </div>
  )
}

export default RegisterPage
