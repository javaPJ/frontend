import React from 'react';
import './Forgotpassword.scss'
import { Link } from "react-router-dom"

const Forgotpassword = () => {
    
    return(
        <div className = "Background-Forgot">
            <div className = "BackgroundColor-Forgot">
                <Link to = "/"><div className = "Logo-Join">Bagel</div></Link>
                <div className = "title-Forgot">Forgot Password</div>
                <input className = "input-Forgot" placeholder = "Email"></input>
                <button className = "send-Forgot" >Send</button>
                <div className = "content-Forgot">본 이메일로 <span style={{color: "red"}}>임시 비밀번호</span>를 보냈습니다. <span style = {{color: "red"}} >임시 비밀번호</span>로 로그인을 하여 비밀번호를 재설정해주세요.</div>
                <Link to = "/"><button className = "submit-Forgot">submit</button></Link>
            </div>
        </div>
    );
    
}

export default Forgotpassword; 