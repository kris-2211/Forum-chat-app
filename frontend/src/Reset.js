import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import env from './Settings'
function Reset() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()
    const [message,setMessage]=useState(true);
    const [token,setToken]=useState(false);
    let handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            let logindata = await axios.put(`${env.api}/setpassword`,{email,password});
            console.log(logindata)
            if(logindata.data.message){
                alert("Password changed, Login now!")
                history.push("/login")  
            }
            else{
                setMessage(false)
            }
            console.log(logindata)
            // else{
            //     setMessage(false)
            // }
        } catch (error) {
            console.log(error)
            setMessage(false)
        } 
    }
    useEffect(() => {
        try {
            if(!window.localStorage.getItem("url_login")){
                setToken(false)
                // console.log(token)
            }
            else{
                setToken(true)
                console.log(token)
                history.push('/')
            }
        } catch (error) {
            
        }
    }, [])
    return (
        <div className='container login-container '>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Hey There</h3>
                    <p>Welcome! Please login</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3 >Reset Password</h3>
                    <form onSubmit={e=>handleSubmit(e)}>
                            <div className="form-group">
                                <label for="email" className="form-label">Email address</label>
                                <input type="text" className="form-control" id='email' placeholder="Your Email *" onChange={e=>setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="form-group">
                                <label for="password" className="form-label">Set New Password</label>
                                <input type="password" className="form-control" id='password' placeholder="New Password *"onChange={e=>setPassword(e.target.value)} value={password} />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Reset" />
                            </div>
                            <div className="form-group">
                                <a href="#" className="ForgetPwd">Forget Password?</a>
                                {/* <Link to="/">Don't have an account</Link> */}
                            </div>
                        </form>
                </div>
            </div>           
        </div>
    )
}

export default Reset
