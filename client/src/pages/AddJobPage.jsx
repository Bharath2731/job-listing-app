import React from 'react'
import Jobright from '../components/Jobright'
import JobLeft from '../components/JobLeft'
import styles from '../styles/registerPage.module.css'
function AddJobPage() {
  return (
    <div className={styles.container}>
        <JobLeft/>
        <Jobright/>
    </div>
  )
}

export default AddJobPage
