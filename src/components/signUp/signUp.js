
import React from 'react';
import { Link } from "react-router-dom"
import './signUp.scss'
const join= () => {
    
    return(
        <div className = "Background-Join">
            <div className = "BackgroundColor-Join" />
            <Link to = "/"><div className = "Logo-Join">Bagel</div></Link>
            <div className = "title-Join">Sign Up</div>
            <input className = "id-Join" placeholder = "  Email"></input>
            <button className = "send-Join">send</button>
            <input className = "Auth-Join" placeholder = "  Authentication"></input>
            <button className = "confrim-Join">Confrim</button>
            <input className = "Nick-Join" placeholder = "  NickName"></input> 
            <input type = "password" className = "password-Join" placeholder = "  Password"/>
            <input type = "password" className = "checkpassword-Join" placeholder = "  Confrim Password"/>
            <Link to = "/" ><button className = "signUp-Join">sign up</button></Link>
        </div>
    );
    
}

export default join; 