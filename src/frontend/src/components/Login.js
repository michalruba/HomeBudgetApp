import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.style.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7219/api/Login', {
                username: username,
                password: password,
                role: 'string'
            });

            console.log('Login successful. Token:', response.data);
            localStorage.setItem('token', response.data);
            navigate('/home');

        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Niewłaściwe dane logowania');
        }
    };

    return (
        <div className="login-container">
            <h2>Logowanie</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="login-input"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
            />
            <button onClick={handleLogin} className="login-button">Zaloguj się</button>
            {loginError && <p className="login-error">{loginError}</p>}
        </div>
    );
};

export default Login;