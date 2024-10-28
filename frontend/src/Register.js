import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import env from './Settings'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState('')
    const [isLoading, setLoading]= useState(false)
    let history = useHistory()
    useEffect(() => {
        {window.localStorage.getItem("userinfo")?history.push('/'):<></>}
    }, [])
    let handleSubmit = async function (e) {
        e.preventDefault();
        setLoading(true)
        try {
            console.log({name,email,password,pic})
            const { data }= await axios.post(`${env.api}/api/user`, { name, email, password, pic }, {
            headers: {
                "Content-type":"application/json"
                }
            });
                setLoading(false)
            localStorage.setItem('userinfo',JSON.stringify(data))
        // alert("Confirmation email sent!")
            history.push("/chats")
            window.location.reload()
        } catch (error) {
            alert('error occured')
        }
    }
    // const handleClick = async function () { };
    const postDetails = async function (pict) {
        setLoading(true);
        if (pict === undefined) {
            return;
        }
        if(pict.type==='image/jpeg'||pict.type==='image/png') {
            const data = new FormData();
            data.append('file', pict);
            data.append('upload_preset', 'chatapp');
            data.append('cloud_name', "dhfcilzy2");
            let res = await axios.post('https://api.cloudinary.com/v1_1/dhfcilzy2/image/upload',data)
            setPic(res.data.url)
            setLoading(false)
            console.log(res.data.url)
            console.log(pic)
        }
        else {
            alert('Please select only .jpeg or .png files')
        }

    }
    return (
        <div className='container login-container '>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Lets Get Started</h3>
                    <p>Welcome! Please Register</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3 >Register</h3>
                    <form onSubmit={e=>handleSubmit(e)}>
                            <div className="form-group">
                                <label for="name" className="form-label">Name  <span style={{"color":"red"}}>*</span></label>
                                <input type="text" className="form-control" id='name' placeholder="Name" onChange={e=>setName(e.target.value)} value={name} required/>
                            </div>
                            <div className="form-group">
                                <label for="email" className="form-label">Email address  <span style={{"color":"red"}}>*</span></label>
                                <input type="email" className="form-control" id='email' placeholder="Your Email" onChange={e=>setEmail(e.target.value)} value={email} required />
                            </div>
                            <div className="form-group">
                                <label for="password" className="form-label">Password <span style={{"color":"red"}}>*</span></label>
                                <input type="password" className="form-control" id='password' placeholder="Your Password" onChange={e=>setPassword(e.target.value)} value={password} required/>
                        </div>
                        <div class="form-group mb-3">
                        <label class="form-label" for="inputGroupFile02">Upload Profile pic (optional)</label>{isLoading?<span>Uploading... please wait</span>:<span></span>}
                        <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" onChange={(e) => postDetails(e.target.files[0])}/>
                        </div>
                            <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Register" disabled={isLoading}/>
                            </div>
                            <div className="form-group">
                                {/* <a href="#" className="ForgetPwd">Forget Password?</a> */}
                                <Link to="/login" className='links'>Already have an account?</Link>
                            </div>
                        </form>
                </div>
            </div>           
        </div>
    )
}

export default Register
