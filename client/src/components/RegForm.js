import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.png';

const styles = {
    logo : {
        height: '10vh',
        margin: '10vh .5vh .5vh .5vh'
    }
}

const RegForm = (props) => {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const onBackButtonHandler = (e) => {
        navigate('/');
    };

    const registerPlan = (plan) => {
        axios.post('http://localhost:8000/api/plans', plan)
            .then(res=>{
                console.log(res);
                navigate('/');
            })
            .catch(err=>{
                console.log(err.response.data.errors);
            })
    };

    const registerBook = (book) => {
        axios.post('http://localhost:8000/api/books', book)
            .then(res=>{
                console.log(res);
                navigate('/');
            })
            .catch(err=>{
                console.log(err.response.data.errors);
            })
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        })
            .then(res=>{
                console.log(res.data.error);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                    console.log("errors:" + res.data.error.errors);
                } else {
                    console.log(res.data.user);
                    console.log('successful user registration!');
                    var newPlan = {
                        user: res.data.user._id,
                        recipes: []
                    };
                    var newBook = {
                        user: res.data.user._id,
                        recipes: []
                    };
                    registerPlan(newPlan);
                    registerBook(newBook);
                }
            })
            .catch(err=>{
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    };
    
    return (
        <>
        <form onSubmit={onSubmitHandler}>
            <img src={logo} alt="logo" style={styles.logo}/>
            <h2>Registration</h2>
            <p>
                <label>First Name</label><br/>
                <input type="text" onChange = {(e)=>setFirstName(e.target.value)}/>
            </p>
            <p>{
                errors.firstName ? 
                errors.firstName.message : null
            }</p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange = {(e)=>setLastName(e.target.value)}/>
            </p>
            <p>{
                errors.lastName ? 
                errors.lastName.message : null
            }</p>
            <p>
                <label>Email</label><br/>
                <input type="text" onChange = {(e)=>setEmail(e.target.value)}/>
            </p>
            <p>{
                errors.email ? 
                errors.email.message : null
            }</p>
            <p>
                <label>Password</label><br/>
                <input type="text" onChange = {(e)=>setPassword(e.target.value)}/>
            </p>
            <p>{
                errors.password ? 
                errors.password.message : null
            }</p>
            <p>
                <label>Confirm Password</label><br/>
                <input type="text" onChange = {(e)=>setConfirmPassword(e.target.value)}/>
            </p>
            <p>{
                errors.confirmPassword ? 
                errors.confirmPassword.message : null
            }</p>
            <input type="submit"/>
        </form>
        <form onSubmit={onBackButtonHandler}>
            <input type="submit" value="Back"/>
        </form>
        </>
    )
}
export default RegForm;

