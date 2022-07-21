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
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
                const userData = await axios.get("http://localhost:8000/api/user", { withCredentials: true })
                    console.log(userData);
                    setUser(userData.data);
                const axiosRecipesData = await axios.get('http://localhost:8000/api/recipes')
                    var recipeData = axiosRecipesData.data.recipes;
                    var rows = [];
                    for(var i=0;i<recipeData.length;i++){
                        rows.push(<RecipeCard key={i} recipe={recipeData[i]} user={userData.data} dashboard='true' size={"small"}/>);
                    }
                    console.log("rows:" + rows);
                    console.log(rows[0]);
                    setRecipes(rows);
                    console.log(recipes);
            }
        )()
    },[])

    return (
        <>
        <Header route="dashboard" user={user}/>
        <div style={styles.pin_container}>
            {recipes}
        </div>
        </>
    )
}

export default Dashboard;
