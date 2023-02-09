import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
   const[credentials,setcredentials]=useState({email:'',password:''})
   let history = useHistory();
   


    const handlesubmit= async (e)=>{
     e.preventDefault();
     const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
         headers: {
          "Content-Type": "application/json"},
          body: JSON.stringify({email:credentials.email,password:credentials.password }),
    })
    const json = await response.json();
    console.log(json)
    if(json.success){
        // redirect
         localStorage.setItem("token",json.authtoken);
       props.showAlert("Log in Successfully","success")
        history.push("/")

    }else{
      props.showAlert("invalid  Detalis","danger")

    }

}
const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="mt-3">
      <h1  >Login to continue iNotebook</h1>
      <form  onSubmit={handlesubmit} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
