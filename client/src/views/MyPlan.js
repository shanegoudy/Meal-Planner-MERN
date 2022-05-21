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
        height: '100em',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: '10px',
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
    const [shoppingList, setShoppingList] = useState([]);
    const user = props.user;
    useEffect(()=> {
        if(user=={}){
            useNavigate('/')
        }else{
            axios.get('http://localhost:8000/api/recipes')
                .then(res => {
                    console.log("res"+res);
                    var recipeData = res.data.recipes;
                    var rows = [];
                    var planRecipes = [];
                    var prevIndex = -1;
                    var index = 0;
                    for(var i=0;i<7;i++){
                        var min = Math.ceil(0);
                        var max = Math.floor(recipeData.length-1);
                        index = Math.floor(Math.random() * (max - min) + min);
                        console.log('index' + index);
                        if(index != prevIndex){
                            planRecipes.push(recipeData[index]);
                            console.log("planRecipes" + planRecipes);
                            rows.push(<RecipeCard key={i} recipe={recipeData[index]} user={user} size={"small"}/>);
                            prevIndex = index;
                            console.log(prevIndex);
                        }else{
                            i--;
                        }
                    }
                    var newShoppingList = [];
                    for(var i=0; i<7; i++){
                        console.log("planRecipes"+planRecipes);
                        for(var y=0; y<=planRecipes[i].ingredients.length; y++){
                            if(planRecipes[i].ingredients[y] != undefined){
                                console.log("y"+y);
                                newShoppingList.push(<p key={"ingr"+y}>{planRecipes[i].ingredients[y].name}</p>);
                                console.log("newShoppingList" + newShoppingList);
                            }
                        }
                    }
                    console.log("newShoppingList" + newShoppingList);
                    console.log("rows:" + rows);
                    setRecipes(rows);
                    setShoppingList(newShoppingList);
                    console.log(recipes);
                    console.log(shoppingList);
                })
                .catch(err => console.log(err))
        }
    }, [])
    return (
        <>
        <Header route="myPlan"/>
        <div styles={styles.pin_container}>
            <h4>Mon:</h4>
            {recipes[0]}
            <h4>Tues:</h4>
            {recipes[1]}
            <h4>Wed:</h4>
            {recipes[2]}
            <h4>Thurs:</h4>
            {recipes[3]}
            <h4>Fri:</h4>
            {recipes[4]}
            <h4>Sat:</h4>
            {recipes[5]}
            <h4>Sun:</h4>
            {recipes[6]}
        </div>
        <div>
            <h4>Shopping List:</h4>
            {shoppingList}
        </div>
        </>
    )
}

export default Dashboard;
