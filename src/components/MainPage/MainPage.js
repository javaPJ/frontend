import React from 'react';
import './MainPage.scss'
import { Link } from 'react-router-dom';
const MainPage= (/*{form, onChange, onSubmit}*/) => {
    
    return(
        <div className = "Background-Main">
            <div className = "BackgroundColor-Main"></div>
                <Link to = "/"><div className = "Logo-Main">Bagel</div></Link>
                <Link to = "/join"><button className = "signUp-Main">Sign Up</button></Link>
                <div className = "javaproject-Main">java project</div>
                <div className = "title-Main">This website is a collabration site</div>
                <div className = "Login-Main">Login</div>
                <input 
                    className = "id-Main"
                    placeholder = "아이디" 
                    autoComplete="username"
                    name="username"/*
                    
                    onChange = {onChange}
                    value = {form.username}*/
                />
                <input 
                className = "password-Main"
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                /*
                    
                    onChange = {onChange}
                    value = {form.password}
                    */
                />
                <Link to = "/Forgot"><div className = "ForgotPassword-Main">Forgot Password?</div></Link>
                <Link to = "/"><button className = "LoginButton-Main">Login</button></Link>
        </div>
    );
    
}

export default MainPage; 