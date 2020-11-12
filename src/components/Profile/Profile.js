import React from 'react';
import './Profile.scss';
import { Link } from 'react-router-dom';

const Profile = () => {
    return(
        <div className = "background-profile">
            <div className = "background-white-profile">
                <div className = "form-profile">
                    <div className = "text-profile">Email <input className = "input-profile" placeholder = " nickname@gmail.com"/></div>
                    <br/><br/>
                    <div className = "text-profile">NickName <input className = "input-profile"/></div>
                    <br/><br/>
                    <div className = "text-profile">Password <input className = "input-profile"/></div>
                    <br/><br/>
                    <div className = "text-profile">Confrim Password <input className = "input-profile"/></div>
                    <br/><br/>
                    <Link to = "/profile"><button className = "cancel-profile">Cancel</button></Link>
                    <Link to = "/main"><button className = "save-profile">Save</button></Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile