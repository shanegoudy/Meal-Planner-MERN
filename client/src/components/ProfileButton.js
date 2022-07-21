import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/images/profile.svg';

const ProfileButton = (props) => {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const handleProfileClick = (e) => {
        e.preventDefault();
        if(checked == true){
            setChecked(false);
        } else {
            setChecked(true);
        }
    };

    const handleSelect = (value) => {
        if(value == 'logout'){
            axios.post('localhost:8000/api/users/logout')
                .then(
                    navigate('/')
                )
                .catch(err=>{
                    console.log(err);
                })
        }
    };

    return (
        <>
        <img src={profile} style={{height:'4vh', marginBottom:'3vh', marginRight:'5px'}}/>
        <select placeholder='' style={{marginBottom:'3vh', width:'18px'}} onChange={(e)=>handleSelect(e.target.value)}>
            <option value="profile">{props.user.firstName} {props.user.lastName}</option>
            <option value="logout">Logout</option>
        </select>
        </>
    )
}

export default ProfileButton;