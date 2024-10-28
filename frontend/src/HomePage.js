import React,{useEffect} from 'react'
import { Link , useHistory} from 'react-router-dom'

function HomePage() {
    let history = useHistory()
    useEffect(() => {
        const token = window.localStorage.getItem("userinfo")
        token?history.push('/chats'):<></>
        return () => {
            
        }
    }, [])
    return (
        <div>
            <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Join Us!!!</h3>
                    <p>Welcome! Please Login / Sign Up</p>
                </div>
                <div className='col-md-6 login-form-2 d-flex justify-content-center align-items-center'>
              {/* <h3 >Login</h3> */}
                  <div className=''>
                    <Link className='btn btn-success' to='/register'>Sign Up</Link>    
                    <Link className='btn btn-warning ml-3 ' to='/login'>Login</Link >     
                  </div>   
                </div>
            </div>           
        </div>
        </div>
    )
}

export default HomePage
