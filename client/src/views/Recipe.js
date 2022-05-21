import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
// import placeholder from '../assets/images/placeholder.png';

const Recipe = (props) => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [createdBy, setCreatedBy] = useState({});
    const [ingredientsList, setIngredientsList] = useState("");
    const [tagsList, setTagsList] = useState("");
    const navigate = useNavigate();
    
    const generateIngrList = (ingredients) =>{
        var ingrList = ingredients[0].name;
        for(var i=1; i<ingredients.length; i++){
            ingrList = ingrList + ", " + ingredients[i].name;
        }
        console.log("ingrList"+ingrList);
        setIngredientsList(ingrList);
    }

    const generateTagsList = (tags) =>{
        var tagsList = tags[0].name;
        for(var i=1; i<tags.length; i++){
            tagsList = tagsList + ", " + tags[i].name;
        }
        console.log("tagsList"+tagsList);
        setTagsList(tagsList);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        navigate('/recipes/edit/' + id);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/recipes/' + id)
            .then(res => {
                navigate("/dashboard");
            })
            .catch(err => console.log(err))
    };

    useEffect(()=> {
        axios.get('http://localhost:8000/api/recipes/' + id )
            .then(res => {
                console.log(res);
                setRecipe(res.data.recipe);
                setCreatedBy(res.data.recipe.createdBy[0][0]);
                generateIngrList(res.data.recipe.ingredients[0]);
                generateTagsList(res.data.recipe.categories[0]);
                console.log(recipe);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
        <Header route="recipe"/>
        <h1>{recipe.name}</h1>
        <h3>Submitted by:
            <Link to={"/user/" + createdBy._id}> 
                {" " + createdBy.first_name + " " + createdBy.last_name}
            </Link>
        </h3>
        <img src='https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg' alt="placeholder image" style={{width: "300px"}}/>
        <h3>Hyperlink:</h3>
        <p>{recipe.hyperlink}</p>
        <h3>Ingredients:</h3>
        {ingredientsList}
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
        <form onSubmit={onSubmitHandler}>
            <button type='submit'>Edit</button>
        </form>
        <form onSubmit={deleteHandler}>
            <button type='submit'>Delete</button>
        </form>
        <h3>Tags</h3>
        {tagsList}
        </>
    )
}

export default Recipe;
