import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import env from './Settings';

function Forgot() {
    const userInfo = localStorage.getItem("userinfo");
    const user = userInfo ? JSON.parse(userInfo) : null;
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [message, setMessage] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false); // New state to track OTP sent status

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Please enter your email.');
            return;
        }

        // Step 1: Send OTP
        if (!isOTPSent) {
            try {
                let response = await axios.post(
                    `${env.api}/api/user/forgotpassword`, 
                    { email } // Send email with request
                );
                setMessage(response.data.message);
                setIsOTPSent(true); // Set OTP sent status to true
            } catch (error) {
                setMessage('Error sending OTP. Please try again later.');
                console.error("Error sending mail:", error);
            }
            return; // Exit after sending OTP
        }

        // Step 2: Check if OTP is provided
        if (!otp) {
            setMessage('Please enter the OTP sent to your email.');
            return;
        }

        // Step 3: Verify OTP
        try {
            const verifyResponse = await axios.post(`${env.api}/api/user/verifyotp`, { email, otp });
            setMessage(verifyResponse.data.message);

            if (verifyResponse.data.status === 200) {
                // Step 4: Update Password
                if (!password) {
                    setMessage('Please enter your new password.');
                    return;
                }

                try {
                    let passwordResponse = await axios.put(
                        `${env.api}/api/user/resetpassword`,
                        { email, password } // Send email and new password
                    );

                    if (passwordResponse.data.status === 200) {
                        alert("Password changed successfully! Please login.");
                        localStorage.removeItem("userinfo");
                        history.push("/");
                    } else {
                        setMessage(passwordResponse.data.message);
                    }
                } catch (error) {
                    console.error("Error updating password:", error);
                    setMessage('Error updating password. Please try again later.');
                }
            }
        } catch (error) {
            setMessage('Error verifying OTP. Please try again later.');
            console.error("Error verifying OTP:", error);
        }
    };

    useEffect(() => {
        if (window.localStorage.getItem("url_login")) {
            history.push('/'); // Redirect if already logged in
        }
    }, [history]);

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3 className='justify-content-center'>Never Forget Again</h3>
                    <p>Welcome!</p>
                </div>
                <div className='col-md-6 login-form-2'>
                    <h3>Forgot Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                id='email'
                                placeholder="Your Email *"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        {isOTPSent && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="otp" className="form-label">OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='otp'
                                        placeholder="OTP *"
                                        onChange={e => setOTP(e.target.value)}
                                        value={otp}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id='password'
                                        placeholder="New Password *"
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </div>
                            </>
                        )}
                        <p style={{ color: "red" }}>{message}</p>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                {isOTPSent ? "Reset Password" : "Send OTP"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgot;
