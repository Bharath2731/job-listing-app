import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import SearchJobCard from '../components/SearchJobCard'
import JobDetails from '../components/JobDetails'
import styles from '../styles/homepage.module.css'
function HomePage() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [skillsArray,setSkillsArray] = useState([])
  const [jobs,setJobs]= useState([]);
  useEffect( () =>{
    try {
        const fetchData = async ()=>{
          const userData = JSON.parse(localStorage.getItem('data'))
          const response = await axios.get('https://job-listing-app-server.onrender.com/jobs')
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
        <Navbar data={data} setData={setData} />
        <SearchJobCard setSkillsArray={setSkillsArray} skillsArray={skillsArray} className={styles.searchjobcard}/>
        {
          jobs?.map((job)=>{
            return(
              <div key={job._id} >
                <JobDetails  job={job} data={data}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default HomePage
