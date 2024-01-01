import React, { useState } from "react";
import styles from "../styles/jobleft.module.css";
import toast from "react-hot-toast";
import axios from "axios";

function JobLeft() {
  const initialFormData = {
    companyName: "",
    addLogoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    remoteOrOffice: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: "",
    information: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const allFieldsFilled = (obj)=>{
    for (const key in obj ){
        if(obj[key]==='')return false
    }
    return true;
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleCancel = () => {
    setFormData(initialFormData);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const data =  JSON.parse(localStorage.getItem('data'))

    if(data.userData==null){
      toast.error('please login');
      return;
    }
    if(allFieldsFilled (formData)){
        try {
            console.log(data.jwtoken)
            console.log(formData)
            const response =await axios.post('https://job-listing-app-server.onrender.com/jobs',formData,{
                headers:{
                    'jwtoken' : data.jwtoken
                }
                
            })
            toast.success('successfully added job-post')
            
        } catch (error) {
            console.log(error)
            toast.error('failed to add job-post')
        }
    }
    else{
        toast.error('please fill all fields')
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Add Job Description</h1>
        <div className={styles.namePlusInput}>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter your company name here"
            onChange={handleChange}
            value={formData.companyName}
          />
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="addLogoUrl">Add logo URL</label>
          <input
            type="text"
            id="addLogoUrl"
            placeholder="Enter the link"
            onChange={handleChange}
            value={formData.addLogoUrl}
          />
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="jobPosition">Job position</label>
          <input
            type="text"
            id="jobPosition"
            placeholder="Enter job position"
            onChange={handleChange}
            value={formData.jobPosition}
          />
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="monthlySalary">Monthly salary</label>
          <input
            type="text"
            id="monthlySalary"
            placeholder="Enter Amount in rupees"
            onChange={handleChange}
            value={formData.monthlySalary}
          />
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="jobType">Job Type</label>
          <select
            name="jobType"
            id="jobType"
            placeholder="select"
            onChange={handleChange}
            value={formData.jobType}
          >
            <option hidden  value="select">Select</option>
            <option value="full-time">full-time</option>
            <option value="intern">intern</option>
          </select>
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="remoteOrOffice">Remote/office</label>
          <select
            name="Remote/office"
            id="remoteOrOffice"
            onChange={handleChange}
            value={formData.remoteOrOffice}
          >
            <option hidden value="select">Select</option>
            <option value="remote">Remote</option>
            <option value="office">office</option>
          </select>
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Enter Location"
            onChange={handleChange}
            value={formData.location}
          />
          <br />
        </div>

        <div className={`${styles.textareaDiv} ${styles.namePlusInput}`}>
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            rows={4}
            placeholder="Type the job description"
            onChange={handleChange}
            value={formData.jobDescription}
          ></textarea>
          <br />
        </div>

        <div className={`${styles.textareaDiv} ${styles.namePlusInput}`}>
          <label htmlFor="aboutCompany">About Company</label>
          <textarea
            name="aboutCompany"
            id="aboutCompany"
            rows={4}
            placeholder="Type about your company"
            onChange={handleChange}
            value={formData.aboutCompany}
          ></textarea>
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="skillsRequired">Skills Required</label>
          <input
            type="text"
            id="skillsRequired"
            placeholder="Enter the must have skills"
            onChange={handleChange}
            value={formData.skillsRequired}
          />
          <br />
        </div>

        <div className={styles.namePlusInput}>
          <label htmlFor="information">Information</label>
          <input
            type="text"
            id="information"
            placeholder="Enter the additional information"
            onChange={handleChange}
            value={formData.information}
          />
          <br />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.cancelBtn}
            type="button"
            onClick={handleCancel}
          >
            cancel
          </button>
          <button className={styles.addJobBtn} type="submit">
            + Add Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobLeft;
