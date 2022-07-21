import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const RecipeBook = (props) => {
    const [book, setBook] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        (
            async () => {
                var userData = {};
                var recipeIds = [];
                const userRes = await axios.get('http://localhost:8000/api/user', {withCredentials: true})
                    .catch(err=>{
                        console.log(err);
                    })
                    console.log(userRes.data);
                    setUser(userRes.data);
                    userData = userRes.data;
                const bookRes = await axios.get('http://localhost:8000/api/books/' + userData._id, {withCredentials: true})
                    .catch(err=>{
                        console.log(err);
                    })
                    console.log(bookRes.data);
                    setBook(bookRes.data);
                    recipeIds = bookRes.data.recipes;
                const recipesRes = await axios.post('http://localhost:8000/api/multirecipes', recipeIds, {withCredentials: true})
                    .catch(err=>{
                        console.log(err);
                    })
                    console.log(recipesRes.data);
                    var bookData = recipesRes.data.recipes;
                    console.log(bookData);
                    var bookCards = [];
                    for(var i=0; i<bookData.length; i++){
                        bookCards.push(<RecipeCard key={i} recipe={bookData[i]} size={"small"}/>);
                    }
                    setRecipes(bookCards);
                setLoaded(true);
            }
        )()
    },[])

    return (
        <>
        <Header route="recipeBook" user={user}/>
        {loaded && (
            <div style={styles.pin_container}>
                {recipes}
            </div>
        )}
        </>
    )
}

export default RecipeBook;
