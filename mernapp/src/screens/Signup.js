import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MdMovie } from "react-icons/md";
function Signup() {
    const [credentials, setCredentials] = useState({email: "", password: "", repeat_password:"" })

    let navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  email: credentials.email, password: credentials.password, repeat_password: credentials.repeat_password})
  
      });
      const json = await response.json()
      console.log(json);
      if (json.success) {
        //save the auth toke to local storage and redirecthh
        localStorage.setItem('authtoken', json.authToken)
        navigate("/login")
  
      }
      else {
        alert("Enter Valid Credentials")
      }
    }
  
    const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
  return (
    <div className='text-white h-[100vh] flex flex-col justify-center items-center bg-main'>
      <MdMovie className="text-red-600 mb-4 text-3xl"/>
        <div className='bg-form border border-dry rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-whitefont-bold text-left mb-6'>Sign Up</h1>
           <form action='' onSubmit={handleSubmit}>
           <div className='relative my-4'> 
                <input type='email' className='block w-72 py-2.3 px-0 text-sm text-text bg-transparent border-0 border-b-2 border-text appearance-none dark:focus:border-subMain focus:outline-none focus:ring-0 focus:text-text focus:border-subMain peer' placeholder=''  name='email' value={credentials.email} onChange={onChange} />
                <label htmlFor="" className='absolute text-sm text-text duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-subMain peer-focus:dark:text-subMain peer-plceholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email Address</label>
            </div>
            <div className='relative my-4'>
                <input type='password' className='block w-72 py-2.3 px-0 text-sm text-text bg-transparent border-0 border-b-2 border-text appearance-none dark:focus:border-subMainfocus:outline-none focus:ring-0 focus:text-text focus:border-subMain peer' placeholder=''  value={credentials.password} onChange={onChange} name='password'/>
                <label htmlFor="" className='absolute text-sm text-text duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-subMain peer-focus:dark:text-subMain peer-plceholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
            </div>
            <div className='relative my-4'>
                <input type='password' className='block w-72 py-2.3 px-0 text-sm text-text bg-transparent border-0 border-b-2 border-text appearance-none dark:focus:border-subMain focus:outline-none focus:ring-0 focus:text-text focus:border-subMain peer' placeholder='' value={credentials.repeat_password} onChange={onChange} name='repeat_password'/>
                <label htmlFor="" className='absolute text-sm text-text duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-subMain peer-focus:dark:text-subMain peer-plceholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Repeat_password</label>
            </div>
            
            <button 
             className='w-full mb-4 text-[12px] mt-6 rounded-half bg-subMain text-text hover:bg-white hover:text-main py-2 transition-colors duration-300 '  type='submit'>Create an account</button>
            <div>
                <span className='text-[12px] px-10'>Already have an account? <Link   className='text-subMain' to='/Login'>Login</Link></span>
            </div>
           </form>
        </div>
    </div>
  )
}

export default Signup;
