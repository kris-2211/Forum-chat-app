import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import env from './Settings';

function Reset() {
    const userInfo = localStorage.getItem("userinfo");
    const user = userInfo ? JSON.parse(userInfo) : null;
    
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(true);
    const [token, setToken] = useState(false);
    const history = useHistory();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("API endpoint:", env.api);

            let response = await axios.put(
                `${env.api}/api/user/setpassword`,
                { email, password },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            
            console.log("response"+response.data);
            if (response.data.message) {
                alert("Password changed successfully! Please login.");
                localStorage.removeItem("userinfo");
                history.push("/");
            } else {
                setMessage(false);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setMessage(false);
        }
    };

    // Check authentication on component mount
    useEffect(() => {
        const urlLogin = localStorage.getItem("url_login");
        if (!urlLogin) {
            setToken(false);
        } else {
            setToken(true);
            history.push('/');
        }
    }, [history]);

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Hey There</h3>
                    <p>Welcome! Please reset your password.</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3>Reset Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                placeholder="Your Email *" 
                                value={email} 
                                disabled 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Set New Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="New Password *"
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Reset" />
                        </div>
                        {!message && <p className="error-message">Failed to reset password. Please try again.</p>}
                    </form>
                </div>
            </div>           
        </div>
    );
}

export default Reset;
