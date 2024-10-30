import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import env from './Settings';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    
    let history = useHistory();

    useEffect(() => {
        if (window.localStorage.getItem("userinfo")) history.push('/');
    }, [history]);

    const postDetails = async (pics) => {
        setLoading(true);
        if (!pics) {
            handleSnackbar('Please Check an Image!', 'warning');
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dn6lxcybf");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dumugkpxd/image/upload", data);
                const pic_url = response.data.url.toString();
                //console.log("pic_url :"+pic_url);
                setPic(pic_url);
                handleSnackbar('Image uploaded successfully!', 'success');
            } catch (error) {
                console.error("Error uploading image:", error);
                handleSnackbar('Error uploading image. Please try again.', 'error');
            }
            setLoading(false);
        } else {
            handleSnackbar('Please Select a JPEG or PNG image!', 'warning');
            setLoading(false);
        }
    };

    const handleSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log({name,email,password,pic});
            const { data } = await axios.post(`${env.api}/api/user/`, { name, email, password, pic }, {
                headers: { "Content-type": "application/json" }
            });
            
            setLoading(false);
            localStorage.setItem('userinfo', JSON.stringify(data)); 
            history.push("/chats");
            console.log("data :"+data);
            window.location.reload();
        } catch (error) {
            handleSnackbar('Error occurred during registration. Please try again.', 'error');
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Let's Get Started</h3>
                    <p>Welcome! Please Register</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3>Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name <span style={{"color":"red"}}>*</span></label>
                            <input type="text" className="form-control" id='name' placeholder="Name" onChange={e => setName(e.target.value)} value={name} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email address <span style={{"color":"red"}}>*</span></label>
                            <input type="email" className="form-control" id='email' placeholder="Your Email" onChange={e => setEmail(e.target.value)} value={email} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password <span style={{"color":"red"}}>*</span></label>
                            <input type="password" className="form-control" id='password' placeholder="Your Password" onChange={e => setPassword(e.target.value)} value={password} required/>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="inputGroupFile02">Upload Profile pic (optional)</label>
                            {isLoading ? <span>Uploading... please wait</span> : null}
                            <input type="file" className="form-control" id="inputGroupFile02" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Register" disabled={isLoading}/>
                        </div>
                        <div className="form-group">
                            <Link to="/login" className='links'>Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Snackbar Component for Notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Register;
