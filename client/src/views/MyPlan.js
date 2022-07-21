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
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        justifyContent: 'center',
        backgroundColor: 'rgba(240,82,35,.2)',
        borderRadius: '16px',
    },
    button: {
        margin: '.5vh',
        fontSize: '1.5vw',
    },
    input: {
        width: '3vw',
        fontSize: '1.5vw',
        borderRadius: '5px',
        textAlign: 'center',
    },
    form: {
        margin: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'normal',
        color: '#f05223',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        width: '90vw',
        backgroundColor: 'rgba(240,82,35,.2)',
        borderRadius: '1vw'
    }
}


const MyPlan = (props) => {
    const [shoppingList, setShoppingList] = useState([]);
    const [mealPlan, setMealPlan] = useState([]);
    const [planLength, setPlanLength] = useState(7);
    const [user, setUser] = useState({});

    const generateShoppingList = (planData) => {
        var newShoppingList = [];
        var key=0;
        for(var i=0; i<planData.length; i++){
            for(var x=0; x<planData[i].ingredients.length; x++){
                newShoppingList.push(<p key={key}>{planData[i].ingredients[0][x].name}</p>);
                key++;
            }
            console.log("newShoppingList: ");
            console.log(newShoppingList);
        }
        setShoppingList(newShoppingList);
        console.log("shoppingList:" + shoppingList);
    }

    const loadPlan = (userData) => {
        axios.get('http://localhost:8000/api/plans/' + userData._id)
            .then(res=>{
                console.log(res);
                if(res.data.plan.recipes.length){
                    var recipeIds = res.data.plan.recipes;
                    axios.post('http://localhost:8000/api/multirecipes', recipeIds, {withCredentials: true})
                        .then(res=>{
                            console.log(res.data);
                            var planData = res.data.recipes;
                            console.log(planData);
                            var planCards = [];
                            for(var i=0; i<planData.length; i++){
                                planCards.push(<RecipeCard key={i} recipe={planData[i]} size={"small"}/>);
                            }
                            setMealPlan(planCards);
                            generateShoppingList(planData);
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                } else {
                    setMealPlan([]);
                    setShoppingList([]);
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/user", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                loadPlan(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const generatePlanHandler = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/recipes')
            .then(res => {
                //Generate Recipe and Meal Plan arrays
                console.log("res"+res);
                var recipeData = res.data.recipes;
                var planData = [];
                var planCards = [];
                var index = 0;
                for(var i=0; i<planLength; i++){
                    var min = Math.ceil(0);
                    var max = Math.floor(recipeData.length-1);
                    index = Math.floor(Math.random() * (max - min) + min);
                    console.log('index: ' + index);
                    planCards.push(<RecipeCard key={i} recipe={recipeData[index]} size={"small"}/>);
                    planData.push(recipeData[index]);
                    recipeData.splice(index, 1);
                    console.log('recipeData: ');
                    console.log(recipeData);
                    console.log('planData');
                    console.log(planData);
                }
                console.log('recipeData: ' + recipeData);
                console.log(planData);

                //Enter meal plan into database and update on client side
                var newRecipes = [];
                for(var i=0; i<planLength; i++){
                    console.log(planData[i]);
                    newRecipes.push(planData[i]._id);
                };
                var newMealPlan = {
                    user: user._id,
                    recipes: newRecipes 
                };
                axios.put('http://localhost:8000/api/plans/' + user._id, newMealPlan, {withCredentials: true})
                    .then( res=> {
                        console.log(res);
                        setMealPlan(planCards);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                generateShoppingList(planData);

            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
        <Header route="myPlan" user={user}/>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-3vh'}}>
            <div style={{...styles.main}}>
                <div style={{...styles.pin_container}}>
                    {mealPlan}
                </div>
                <form onSubmit={generatePlanHandler} style={{...styles.form}}>
                    <div>
                    <label style={{...styles.label}}> Meals: </label>
                    <input type="number" min="1" max="30" step="1" value={planLength} style={{...styles.input}} onChange = {(e)=>setPlanLength(e.target.value)}/>
                    </div>
                    <input type="submit" style={{...styles.button}} value="Generate Plan"/>
                </form>
                <div>
                    <h4>Shopping List:</h4>
                    {shoppingList}
                </div>
            </div>
        </div>
        </>
    )
}

export default MyPlan;
