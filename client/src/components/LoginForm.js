import React, { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.png';

const styles = {
    logo : {
        height: '8vw',
        margin: '10vh .5vh .5vh .5vh'
    }
}

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:8000/api/users/login',
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true
                }
            )
            .then(res=>{
                console.log("res", res);
                navigate('/dashboard');
            })
            .catch(err=>{
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            })
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <img src={logo} alt="logo" style={styles.logo}/>
            <p>{errorMessage ? errorMessage : null}</p>
            <p>
                <label>Email</label><br/>
                <input type="email" style={{...styles.email}} onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>
                <label>Password</label><br/>
                <input type="password" onChange = {(e)=>setPassword(e.target.value)}/>
            </p>
            <input type="submit"/>
            <p style={{fontSize: "1.5vw"}}>Don't have an account? Register <Link to = "/register">Here</Link></p>
        </form>
    )
}
export default LoginForm;

