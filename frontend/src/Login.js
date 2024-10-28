import React,{useEffect, useState} from 'react'
import env from './Settings'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Login() {
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('')
    let history = useHistory()
    const [message,setMessage]=useState(true);
    const [token,setToken]=useState(false);
    let handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            let {data} = await axios.post(`${env.api}/api/user/login`,{email,password});
            window.localStorage.setItem("userinfo",JSON.stringify(data))
            // window.location.reload()
            history.push(`/chats`)
            window.location.reload()
        } catch (error) {
            setMessage(false)
        }
    }
    useEffect(() => {
        try {
            if(!window.localStorage.getItem("userinfo")){
                setToken(false)
                console.log(token)
            }
            else{
                setToken(true)
                console.log(token)
                history.push('/chats')
            }
        } catch (error) {
            
        }
    }, [])
    return (
   <div className='container login-container '>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Chat App</h3>
                    <p>Welcome! Please login</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3 >Login</h3>
                    <form onSubmit={e=>handleSubmit(e)}>
                            <div className="form-group">
                                <label for="email" className="form-label">Email address</label>
                                <input type="text" className="form-control" id='email' placeholder="Your Email *" onChange={e=>setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="form-group">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id='password' placeholder="Your Password *" onChange={e=>setPassword(e.target.value)} value={password} />
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Login" />
                            </div>
                            <div className="form-group">
                                <span className='ForgetPwd'>Forgot Password? Reset </span> <Link to='/forgot' className="links">here</Link><br/>
                                <span className='ForgetPwd'>Don't have an account? Register </span><Link className='links' to="/register">here</Link>
                            </div>
                        </form>
                </div>
            </div>           
        </div>
    )
}

export default Login
