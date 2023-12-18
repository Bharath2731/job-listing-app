import React, { useState } from "react";
import styles from "../styles/register.module.css";
import { Link } from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  function nameHandler(e) {
    setName(e.target.value);
  }
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function mobileHandler(e) {
    setMobile(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  function isMobileValid (string){
   
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (name&& email && mobile && password && checked){
        const numericString = mobile.replace(/\D/g, ''); // Remove non-digits (\D)
        if(numericString.length != 10) {
            toast.error('invalid mobile number')
            return
        }
        
        const frontendUser = {name,email,phone:mobile,password}
        try {
            const response = await axios.post ('http://localhost:4000/register',frontendUser)
            console.log(response.data)
            toast.success(`sign up successful`)
            localStorage.setItem('data',JSON.stringify(response.data))
        } catch (error) {
            // console.log(error)
            toast.error('email already exists,sign up failed')
        }
    }else{
        toast.error('failed to sign up')
    }
  }
  return (
    <div>
      <div className={styles.outer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Create an account</h1>
          <p className={styles.para}>Your personal job finder is here</p>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            required
            onChange={(e) => {
              nameHandler(e);
            }}
            value={name}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            required
            onChange={(e) => {
              emailHandler(e);
            }}
            value={email}
          />
          <br />
          <input
            type="text"
            placeholder="Mobile"
            className={styles.input}
            required
            onChange={(e) => {
              mobileHandler(e);
            }}
            value={mobile}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
            onChange={(e) => {
              passwordHandler(e);
            }}
            value={password}
          />
          <br />
          <input
            className={styles.checkbox}
            type="checkbox"
            required
            onChange={async (e) => {
              setChecked(e.target.checked);
            }}
          />{" "}
          <span>
            By creating an account, I agree to our terms of use and privacy
            policy
          </span>
          <div className={styles.button}>
            <button> Create account</button>
          </div>
          <Link to="/login" className={styles.link}>
            <span>Already have an account ? </span>
            <b>Sign In</b>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
