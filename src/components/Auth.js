import React, { useState } from 'react';
import '../styles/form.css';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Footer from './Footer';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const navLogin = () => {
        if (!isLogin) {
            setIsLogin(true)
        } 
    }
    const navRegister = () => {
        if (isLogin) {
            setIsLogin(false)
        }
    }
    return (
        <main className='main-con'>
            <Header />
            <div className="auth-con flex-column main-con">
                {isLogin ? (
                    <Login navRegister={navRegister} />
                ) : (
                    <Register navLogin={navLogin} />
                )}
            </div>
            <Footer />
        </main>
    );
}

export default Auth;