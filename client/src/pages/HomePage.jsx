import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SearchJobCard from '../components/SearchJobCard'
import JobDetails from '../components/JobDetails'
import styles from '../styles/homepage.module.css'
function HomePage() {
  const [skillsArray,setSkillsArray] = useState([])
  const [jobs,setJobs]= useState([]);
  useEffect( () =>{
    try {
      const fetchData = async()=>{
        const userData = JSON.parse(localStorage.getItem('data'))
        const jwtoken = userData.jwtoken;
        const response = await axios.get('http://localhost:4000/jobs',{
          headers:{
            jwtoken:jwtoken,
          },
        })
        console.log(response.data.data)
        setJobs(response.data.data)
      }
      fetchData();      
    } catch (error) {
      console.log(error)
    }
  },[])
  return (
    <div className={styles.container}>
       <div> 
        <Navbar />
        <SearchJobCard setSkillsArray={setSkillsArray} skillsArray={skillsArray} className={styles.searchjobcard}/>
        {
          jobs.map((job)=>{
            return(
              <div >
                <JobDetails  job={job}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default HomePage
