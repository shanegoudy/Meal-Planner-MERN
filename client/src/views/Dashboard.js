import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const styles = {
    pin_container: {
        margin: 0,
        padding: 0,
        width: '80vw',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 15vw)',
        gridAutoRows: '.7vw',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '16px',
    }
}

const Dashboard = (props) => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/user",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/recipes')
            .then(res => {
                console.log(res);
                var recipeData = res.data.recipes;
                var rows = [];
                for(var i=0;i<recipeData.length;i++){
                    rows.push(<RecipeCard key={i} recipe={recipeData[i]} dashboard='true' size={"small"}/>);
                }
                console.log("rows:" + rows);
                console.log(rows[0]);
                setRecipes(rows);
                console.log(recipes);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
        <Header route="dashboard"/>
        <div style={styles.pin_container}>
            {recipes}
        </div>
        </>
    )
}

export default Dashboard;
