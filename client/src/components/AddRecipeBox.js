import React, { useState, useEffect } from 'react';
import CheckBox from "react-animated-checkbox";
import axios from 'axios';

const AddRecipeBox = (props) => {
    const [checked, setChecked] = useState(false);

    const updateBook = (updatedBook) => {
        axios.put("http://localhost:8000/api/books/" + props.user._id, updatedBook, {withCredentials: true})
                .then(
                    console.log('recipes successfully updated')
                )
                .catch((err) =>{
                    console.log(err)
                })
    }

    const addRemoveRecipe = () => {
        var book = {};
        axios.get('http://localhost:8000/api/books/' + props.user._id, {withCredentials: true})
            .then(res =>{
                console.log(res.data);
                book = res.data;
                console.log(book);
                var recipes = book.recipes;
                console.log(recipes)
                if(checked == false){
                    var newRecipes = recipes.push(props.recipe._id);
                    var newBook = {
                        user: props.user._id,
                        recipes: newRecipes
                    };
                    updateBook(newBook);
                } else {
                    var index = recipes.indexOf(props.recipe._id);
                    var newRecipes = recipes.splice(index, 1);
                    var newBook = {
                        user: props.user._id,
                        recipes: newRecipes
                    };
                    updateBook(newBook);
                    console.log(recipes);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleClick = (e) => {
        e.preventDefault();
        if(checked == true){
            addRemoveRecipe();
            setChecked(false);
        } else {
            addRemoveRecipe();
            setChecked(true);
        }
    };

    const getPixels = (vw) => {
        return vw * (document.documentElement.clientWidth/100)
    };

    return (
        <>
        <CheckBox
            checked={checked}
            checkBoxStyle={{
                checkedColor: "#f05223",
                size: getPixels(3),
                unCheckedColor: "#b8b8b8"
            }}
            duration={400}
            onClick={handleClick}
            style={{borderRadius:"20px", backgroundColor:'rgba(236, 236, 236, .8)', dropShadow:'5px 5px #000000', position:'absolute', left:'7vw', top:'5.5vw'}}
        />
        </>
    )
}

export default AddRecipeBox;