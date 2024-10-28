import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import env from './Settings'

function Forgot() {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [message,setMessage]=useState(true);
    const [token,setToken]=useState(false);
    let handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            let logindata = await axios.post(`${env.api}/forgot`,{email});
            if(logindata.data.message){
                setMessage(true)
                alert("Reset link sent on mail")
                // console.log(logindata.data.user)
                history.push(`/login`)
            }

        } catch (error) {
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
                    <h3 className='justify-content-center'>Never Forget Again</h3>
                    <p>Welcome! </p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3 >Forgot Password</h3>
                    <form onSubmit={e=>handleSubmit(e)}>
                            <div className="form-group">
                                <label for="email" className="form-label">Email address</label>
                                <input type="text" className="form-control" id='email' placeholder="Your Email *" onChange={e=>setEmail(e.target.value)} value={email} />
                            </div>
                            
                            <div className="form-group">
                                <input type="submit" className="btnSubmit" value="Submit" />
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

export default Forgot
