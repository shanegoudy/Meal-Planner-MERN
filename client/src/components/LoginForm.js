import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/users/byemail/' + email + '/' + password)
            .then(res=>{
                console.log(res);
                console.log(res.data.user[0]);
                props.changeUser(res.data.user[0]);
                navigate('/dashboard');
            })
            .catch(err=>console.log(err))
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <h1>Sign In</h1>
            <p>
                <label>Email</label><br/>
                <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>
                <label>Password</label><br/>
                <input type="text" onChange = {(e)=>setPassword(e.target.value)}/>
            </p>
            <input type="submit"/>
            <p>Don't have an account? Register <Link to = "/register">Here</Link></p>
        </form>
    )
}
export default LoginForm;

