import React from 'react';
import {Link} from "react-router-dom";
import '../styles/StartPage.style.css';

const StartPage = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Aplikacja do zarządzania budżetem domowym</h2>
            <p>
                <Link to="/login" className="login-button">Zaloguj się</Link>
            </p>
        </div>
    );
};

export default StartPage;