import React, { useState } from "react";
import axios from 'axios'
import styles from "../styles/login.module.css";
import {Link, useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate()
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('')

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const frontendData = {email,password}
        try {
            const response = await axios.post('http://localhost:4000/login' ,frontendData)
            console.log(response.data)
            toast.success('login successful')
            localStorage.setItem('data',JSON.stringify(response.data))
            navigate('/')
        } catch (error) {
            toast.error('invalid credentials')
        }
    }
  return (
    <div>
      <div className={styles.outer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Already have an account?</h1>
          <p className={styles.para}>Your personal job finder is here</p>
          <input type="email" required placeholder="Email" className={styles.input} value={email} onChange={handleEmail}/><br />
          <input type="password" required placeholder="Password" className={styles.input} value={password} onChange={handlePassword}/>
          <div className={styles.button}>
            <button> Sign in</button>
          </div>
          <Link to="/register" className={styles.link}>
            <span>Don’t have an account? </span>
            <b>Sign Up</b>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
