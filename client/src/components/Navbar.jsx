import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import profilePic from "../images/profilePic.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Jobfinder</h2>
        </div>

        <div className={styles.right}>
          {data?.userData?.name ? (
            <div className={styles.userdetails}>
              <span
                onClick={() => {
                  localStorage.setItem("data", JSON.stringify({}));
                  setData({})
                }}
              >
                Logout
              </span>
              <span>Hello!{data.userData.name}</span>
              <img src={profilePic} alt="" />
            </div>
          ) : (
            <div>
              <button
                className={styles.loginBtn}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className={styles.signupBtn}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
