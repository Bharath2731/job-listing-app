import React, { useContext, useState } from "react";
import styles from "../styles/viewjob.module.css";
import Navbar from "./Navbar";
import { viewJobContext } from "../App";
import locationPin from "../images/location-pin.png";
import salaryLogo from "../images/salarylogo.svg";

function ViewJob() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [viewJob, setViewJob] = useContext(viewJobContext);

  function capitaliz(inputString) {
    return inputString
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className={styles.outer}>
      <Navbar data={data} setData={setData} />
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.companyName}>
            <img src={viewJob.addLogoUrl} alt="" />
            <span>{viewJob.companyName}, </span>
            <span> {viewJob.jobType}</span>
          </div>
          <div className={styles.title}>
            <h1>{capitaliz(viewJob.jobPosition)}</h1>
          </div>
          <div className={styles.location}>
            <img src={locationPin} alt="" />
            <span>{viewJob.location}</span>
            <div className={styles.salary}>
              <img src={salaryLogo} alt="" />
              <span>Salary : {viewJob.monthlySalary}/month</span>
            </div>
          </div>
          <div className={styles.aboutcompany}>
            <h3>About Company</h3>
            <p>{viewJob.aboutCompany}</p>
          </div>
          <div className={styles.jobdiscreption}>
            <h3>Job Discreption</h3>
            <p>{viewJob.jobDescription}</p>
          </div>
          <div className={styles.skills}>
            <h3>Skill(s) Required</h3>
            {viewJob?.skillsRequired?.map((skill)=>{
              return(
                <span>{skill}</span>
              )
            })}
          </div>
          <div className={styles.information}>
            <h3>Additional Information</h3>
            <p>{viewJob.information}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
