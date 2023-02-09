import React, { useState } from "react";
import { useHistory } from "react-router-dom";




function Signup(props) {
const[credentials,setcredentials]=useState({name:'',email:'',password:'',cpassword:''})
let history = useHistory();

const handlesubmit= async (e)=>{
  e.preventDefault();
  const {name, email,password}=credentials
  const response = await fetch("http://localhost:5000/api/auth/createuser", {
     method: "POST",
      headers: {
       "Content-Type": "application/json"},
       body: JSON.stringify({ name, email,password }),
 })
 const json = await response.json();
 console.log(json)
 if(json.success){
  // redirect
  localStorage.setItem("token",json.authtoken);
  history.push("/")
  props.showAlert("Account created Successfully","success")

}else{
  props.showAlert("invalid  credentials","danger")
}

}
const onChange=(e)=>{
 setcredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <div className=" container mt-2" >
      <h1 className="my-2" >Sign up to continue iNotebook</h1>

      <form onSubmit={handlesubmit} >
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
             onChange={ onChange }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
           onChange={ onChange }
          />
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
            onChange={ onChange }
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
          Confirm  Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={ onChange }
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
