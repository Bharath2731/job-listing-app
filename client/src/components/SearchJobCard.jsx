import React, { useState } from 'react'
import styles from '../styles/searchjobcard.module.css'
import search from '../images/search.svg'
import cross from '../images/cross.png'
import { useNavigate } from 'react-router-dom'
function SearchJobCard({setSkillsArray,skillsArray}) {
  const navigate = useNavigate();
    const skills =['html','css','javascript','react','node','express','mongodb','git','java','c++','c','dsa','python','sql','postgresql']
    const handleChange =(e)=>{
      if(!(skillsArray.includes(e.target.value))){
        setSkillsArray([...skillsArray,e.target.value])
      }
    }
  return (
    <div className={styles.outercontainer}>
      <div className={styles.container}>
        <div className={styles.inputcontainer}>
            <img src={search} alt="" />
            <input type="text" className={styles.input} placeholder='Type any job title'/>
            <div className={styles.search}><p className={styles.search}>search</p></div>
        </div>
        <div className={styles.skillscontainer}>
            <select  id="skills" className={styles.select} onChange={handleChange}>
                <option  hidden value="select">select skills</option>
                {skills.map((skill,idx)=>{
                    return <option key={idx} value={skill} className={styles.options}>{`${skill}`}</option>
                })}
            </select>
            <div className={styles.skillsselected}>
                {
                  skillsArray.length>0? skillsArray.map((skill)=>{
                    return(<SkillChips title={`${skill}`} skillsArray={skillsArray} setSkillsArray={setSkillsArray}/>)
                  }) : ''
                }
            </div>
            <button className={styles.addBtn} onClick={()=>navigate('/addjob')}>
              <b> + </b> Add Job
            </button>
            
        </div>
      </div>
    </div>
  )
}

export default SearchJobCard


function SkillChips (props){
  function handleClick (e){
    const crossedSkill = e.target.name;
    props.setSkillsArray(props.skillsArray.filter((skill)=>{
      return(skill!=crossedSkill)
    }))
  }
    return(
        <div className={styles.chipscontainer}>
            <p className={styles.chipspara}>{props.title}</p>
            <img className={styles.chipscross} src={cross} alt="" onClick={handleClick} name= {props.title}/>
        </div>
    )
}