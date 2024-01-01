import React, { useContext } from "react";
import styles from "../styles/jobdetails.module.css";
import locationPin from '../images/location-pin.png'
import { viewJobContext } from "../App";
import { useNavigate } from "react-router-dom";
function JobDetails({job,data}) {
    const navigate = useNavigate()
    const [viewJob,setViewJob] = useContext(viewJobContext)
    const handleClick = () => {
        console.log(job._id); // Log job ID when JobDetails component is clicked
      };
    const handleViewDetails=()=>{
        setViewJob(job)
        console.log(viewJob)
        navigate('/viewjob')
    }
    return (
    <div>
      <div className={styles.outer}  onClick={handleClick}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.leftupper}>
              <img
                src={job.addLogoUrl}
                alt=""
              />
              <div className={styles.title}>
                <p>
                  <b>{job.jobPosition.toUpperCase()}</b>
                </p>
                <div className={styles.locAndSal}>
                  <span>INR {job.monthlySalary}/month</span>
                  <span className={styles.location}>
                    <img
                      src={locationPin}
                      alt=""
                      className={styles.locationIcon}
                    />
                    <span>{`${job.location}`}</span>
                  </span>
                </div>
                <div className={styles.options}>
                  <span>{`${job.remoteOrOffice}`}</span>
                  <span>{`${job.jobType}`}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.righttop}> 
                {
                    <div className={styles.skillcards}>
                        {
                            job.skillsRequired.length>3? (job.skillsRequired.slice(0,4).map((skill)=>{
                                return (
                                    <span className={styles.skillcard}>{skill}</span>
                                )
                            })) : (job.skillsRequired.map((skill)=>{
                                return(
                                    <span className={styles.skillcard}>{skill}</span>
                                )
                            }))
                        }
                    </div>
                }
            </div>
            <div className={styles.rightbottom}>
                {(data?.userData)?(<button className={styles.editbtn } onClick={handleViewDetails}>Edit job</button>):''}
                <button className={styles.viewbtn} onClick={handleViewDetails}>View details</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
