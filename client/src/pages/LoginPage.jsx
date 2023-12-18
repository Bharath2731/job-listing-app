import React from 'react'
import RightSide from '../components/RightSide'
import styles from '../styles/registerPage.module.css'
import Login from '../components/Login'

function LoginPage() {
  return (
  <div className={styles.container}>
    <Login/>
    <RightSide/>
  </div>
  )
}

export default LoginPage
