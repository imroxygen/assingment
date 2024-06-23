import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/loginSignup.css';
import useLogin from '../hooks/useLogin';

const SignUpForm = () => {
    const {loginUser}=useLogin();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        loginUser(formData);
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
               
                <button type="submit" className="signup-button">Sign In</button>
                <Link to="/" className="login-link">Don't have an account? Sign Up</Link>
            </form>
        </div>
    );
};

export default SignUpForm;
