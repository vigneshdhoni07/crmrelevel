import React, { useState,useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var {loginuser,createuser}=require("../api/auth")

const Login = () => {
    const[signUp,setSignup]=useState(false)

    const[userId,setUserId]=useState("")
    const[userName,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[userType,setUserType]=useState("CUSTOMER")

    const[message,setMessage]=useState("")

    const[error,setError]=useState(false)


    const updateForm=(event)=>{

        if(event.target.id==="userName") {
            setUserName(event.target.value)
        }
        else if(event.target.id==="password") {
            setPassword(event.target.value)
        }
        else if(event.target.id==="email") {
            setEmail(event.target.value)
        }
        else if(event.target.id==="userId") {
            setUserId(event.target.value)
        }
    }

    const toggleState=()=>{
        setSignup(!signUp)
        setUserName("")
        setEmail("")
        setPassword("")
        setUserId("")
        setMessage("")
        setError(false)
    }
    
    useEffect(()=>{

        var userTypes=window.localStorage.getItem("userTypes")

        if(!userTypes)
        {
            return
        }

        if(userTypes==="CUSTOMER") window.location.href="/customer";
            else if(userTypes==="ADMIN") window.location.href="/admin";
            else if(userTypes==="ENGINEER") window.location.href="/engineer";

    },[])

async function onSignUp(event){
    const data={
        name:userName,
        password:password,
        userId:userId,
        email:email,
        userType:userType
    }
    event.preventDefault()
    if(userId.length<5)
    {
        setError(true)
        setMessage("UserId Should Be Of Minimum Length 5")
        return
    }
    else if(password.length<5||password.length>12)
    {
        setError(true)
        setMessage("Password Should Be Of Minimum Length 5 and Maximum length 12")
        return
    }
    
    
    else{
        setError(false)
        setMessage("Click On SignUp")
    }
    createuser(data).then((op)=>{
    if(op.status>="200" && op.status<"400")
    {   console.log(op)
        setError(false)
        setMessage("SignUp Success")
        window.location.href="/"
    }}).catch((err)=>{
     if(err.response.status>="400"){
            console.log(err)
        setError(true)

         setMessage(err.response.data.message)
    }})
    //console.log(op.response.data.message)
    //Api Call for Sign Up
    
}

const onLogIn=(event)=>{
    const data={
        
        password:password,
        userId:userId,
       
    }
    event.preventDefault()
    if(userId.length<5)
    {
        setError(true)
        setMessage("UserId Should Be Of Minimum Length 5")
        return
    }
    else if(password.length<5||password.length>12)
    {
        setError(true)
        setMessage("Password Should Be Of Minimum Length 5 and Maximum length 12")
        return
    }
    loginuser(data).then((op)=>{
        if(op.status>="200" && op.status<"400")
        {   console.log(op)
            setError(false)
            //setMessage("SignIn Success")
            window.localStorage.setItem("name",op.data.name)
            window.localStorage.setItem("email",op.data.email)
            window.localStorage.setItem("userId",op.data.userId)
            window.localStorage.setItem("accessToken",op.data.accessToken)
            window.localStorage.setItem("userTypes",op.data.userTypes)
            if(op.data.userTypes==="CUSTOMER") window.location.href="/customer";
            else if(op.data.userTypes==="ADMIN") window.location.href="/admin";
            else if(op.data.userTypes==="ENGINEER") window.location.href="/engineer";
        }}).catch((err)=>{
         if(err.response.status>="400"){
                console.log(err)
            setError(true)
    
             setMessage(err.response.data.message)
        }})
    
}

function handleSelect(event)
{
    setUserType(event)
}


  return (
    <div className='bg-primary d-flex justify-content-center align-items-center vh-100'>
        <div style={{width:25+"rem"}} className='card p-3 rounded-3 lg'>
        <h4 className="text-primary">
            {signUp?"signUp":"Login Page"}
        </h4>
        <form className="" onSubmit={signUp?onSignUp:onLogIn}>
            
                
              
            


            <div className='input-group '>
                <input className="form-control m-1" id="userId" type="text" placeholder='userId' value={userId} onChange={(event)=>updateForm(event)}>
                </input>
            </div>
             {signUp && 
               <div className='input-group '>
               <input className="form-control m-1" type="text" id="userName" placeholder='userName' value={userName} onChange={(event)=>updateForm(event)}>
               </input>
           </div>}

            <div className='input-group '>
                <input className='form-control m-1' type="password" id="password" placeholder='password' value={password} onChange={(event)=>updateForm(event)}>
                </input>
            </div>
            {signUp && 
             
            <>
            <div className='input-group '>
                <input className='form-control m-1' type="text" placeholder='email' id="email" value={email} onChange={(event)=>updateForm(event)}>
                </input>
            </div>

            {/* <div className='input-group '>
                <input className='form-control m-1' type="text"  placeholder='phone Number'>
                </input>
            </div> */}

            <div className='input-group '>
            <DropdownButton
            className='pt-1'
            id="userType"
            onSelect={handleSelect}
            variant="primary"
            title={userType}
            >
                <Dropdown.Item eventKey="ADMIN">Admin</Dropdown.Item>
            <Dropdown.Item eventKey="ENGINEER">Engineer</Dropdown.Item>
            <Dropdown.Item eventKey="CUSTOMER">Customer</Dropdown.Item>
            

            </DropdownButton>
                <input className='form-control m-1 btn btn-primary rounded-3' type="submit" value="signUp">
                </input>
            </div>
            
            <div className='m-1'>
                <a href="#" onClick={()=>toggleState()}> 
                Already Have Account? Sign in
                </a>
                
            </div>
            <div className={error?"text-danger":"text-success"}>
                {message}
            </div>
            

            </>
            
            
            
            
            
            }
            {signUp==false && <>
                <div className='input-group '>
                <input className="btn btn-primary form-control m-1" type="submit" value="signIn">
                </input>
            </div>
            <div className='m-1'>
                <a href="#" onClick={()=>toggleState()}> 
                Don't Have Account? Sign Up
                </a>
                
            </div>
            <div className={error?"text-danger":"text-success"}>
                {message}
            </div>

            </>
           }
           
        </form>
        </div>
        
    </div>
  )
}

export default Login