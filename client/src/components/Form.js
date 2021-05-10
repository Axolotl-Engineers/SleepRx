import React from 'react';

//import { useState } from 'react';
//import { useForm } from "react-hook-form"
import useForm from "./useForm"


const Form = (props) => {
    // const [formState, setFormState] = useState({
        
    //     first_name: "",
    //     last_name: "",
    //     username: "",
    //     password: ""
    
    
    //   })

  
    
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);


    // let handleSubmit = (e) => {
    //     e.preventDefault()
    //     // this.props.handleSubmit(this.state)
    //   }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
       
        fetch('/login', {
              
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        
                     formState
                    })
                  }).then( res => res.json())
                  .then(createdSleepEntry => {
                      props.createUser(createdSleepEntry)
                  })
        
       
    }
    
    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     console.log(e.target.value)

    //     setFormState({ 
    //         [name]: value
    //     })
    //}     

    const [formState, handleChange ] = useForm();
    
    let {formName} = props
    let {first_name, last_name, username, password} = formState
    //console.log("state in decon", useState())
    return (
        <div>
             <form onSubmit={handleSubmit}>

                <div className="form">
                <h2>{formName}</h2>
                <h3>Hey, Good to see you! </h3>
                <div className="formContent">
                    <label htmlFor="name">First Name:</label>
                    <input className="input" type="text" autoComplete="off" name="name" value={first_name } onChange={handleChange}/><br/>
                    <label htmlFor="name">Last Name:</label>
                    <input className="input" type="text" autoComplete="off" name="name" value={last_name } onChange={handleChange}/><br/>
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" autoComplete="off" name="username" value={username } onChange={handleChange}/><br/>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" autoComplete="off" name="password" value={password } onChange={handleChange}/><br/>
                </div>
                    <input className="submitButton" type="submit" value="Submit"/>
                    <h3> Or Authenticate with </h3>
                    <a href="https://imgur.com/N4okLOv"><img src="https://i.imgur.com/N4okLOv.png" title="" /></a><br/>
                    {/* <img src={github} className="" alt="github"  />  */}
                    <button onClick={props.handleLoginGithub}>GITHUB</button>
                </div>
                </form>
        </div>
    )
}

export default Form
