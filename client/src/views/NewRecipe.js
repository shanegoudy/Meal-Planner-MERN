import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

const styles = {
    select : {
        width: '100em'
    },
    div : {
        width: '30vw',
        margin: 'auto'
    },
    instructions : {
        height: '10vh',
        width: '300px'
    }
}

const NewRecipe = (props) => {
    const [ingrOptions, setIngrOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    
    const [newRecipe, setNewRecipe] = useState({
        categories: [],
        name: "",
        instructions: "",
        ingredients: [],
        hyperlink: "",
        createdBy: props.user
    });

    useEffect(() => {
        (
            async () => {
                const data2 = await axios.get('http://localhost:8000/api/categories')
                console.log("data2"+ data2)
                var newTagOptions = []
                for(var i=0; i<data2.data.categories.length; i++){
                    newTagOptions.push(
                        {
                            value: data2.data.categories[i],
                            label: data2.data.categories[i].name
                        }
                    )
                }
                setTagOptions(newTagOptions)
                console.log("tagOptions:" + tagOptions)
                const data1 = await axios.get('http://localhost:8000/api/ingredients')
                console.log("data1"+ data1)
                var newIngrOptions = []
                for(var i=0; i<data1.data.ingredients.length; i++){
                    newIngrOptions.push(
                        {
                            value: data1.data.ingredients[i],
                            label: data1.data.ingredients[i].name
                        }
                    )
                }
                setIngrOptions(newIngrOptions)
                console.log("ingOptions:" + ingrOptions)
                console.log("user:"+ props.user)
            }
        )()
    },[])

    const handleTagsChange = (newValue, actionMeta) => {
        const oldRecipe = newRecipe;
        let newTags=[];
        for(var i=0; i<newValue.length; i++){
            newTags.push(newValue[i].value)
        } 
        setNewRecipe({
            categories: newTags,
            name: oldRecipe.name,
            instructions: oldRecipe.instructions,
            ingredients: oldRecipe.ingredients,
            hyperlink: oldRecipe.hyperlink,
            createdBy: oldRecipe.createdBy
        });
        const { action } = actionMeta;
        let newTagOptions = tagOptions;
        let menuIsOpen = false;
        if (action === "select-option") {
            newTagOptions = newValue.children ? newValue.children : tagOptions;
            menuIsOpen = newValue.children ? true : false;
        }
        // if (action === "create-option") {
        //   setState({
        //     inputValue: [newValue.value],
        //     menuIsOpen
        //   });
        // }
    };

    const handleIngrChange = (newValue, actionMeta) => {
        const oldRecipe = newRecipe;
        let newIngrs=[];
        for(var i=0; i<newValue.length; i++){
            newIngrs.push(newValue[i].value)
        } 
        setNewRecipe({
            categories: oldRecipe.categories,
            name: oldRecipe.name,
            instructions: oldRecipe.instructions,
            ingredients: newIngrs,
            hyperlink: oldRecipe.hyperlink,
            createdBy: oldRecipe.createdBy
        });
        const { action } = actionMeta;
        let newIngrOptions = ingrOptions;
        let menuIsOpen = false;
        if (action === "select-option") {
            newIngrOptions = newValue.children ? newValue.children : ingrOptions;
            menuIsOpen = newValue.children ? true : false;
        }
        // if (action === "create-option") {
        //   setState({
        //     inputValue: [newValue.value],
        //     menuIsOpen
        //   });
        // }
    };

    const handleNameChange= (newName) => {
        const oldRecipe = newRecipe;
        setNewRecipe({
            categories: oldRecipe.categories,
            name: newName,
            instructions: oldRecipe.instructions,
            ingredients: oldRecipe.ingredients,
            hyperlink: oldRecipe.hyperlink,
            createdBy: oldRecipe.createdBy
        });
    };

    const handleInstrChange= (newInstr) => {
        const oldRecipe = newRecipe;
        setNewRecipe({
            categories: oldRecipe.categories,
            name: oldRecipe.name,
            instructions: newInstr,
            ingredients: oldRecipe.ingredients,
            hyperlink: oldRecipe.hyperlink,
            createdBy: oldRecipe.createdBy
        });
    };

    const handleHyperChange= (newHyper) => {
        const oldRecipe = newRecipe;
        setNewRecipe({
            categories: oldRecipe.categories,
            name: oldRecipe.name,
            instructions: oldRecipe.instructions,
            ingredients: oldRecipe.ingredients,
            hyperlink: newHyper,
            createdBy: oldRecipe.createdBy
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/recipes', newRecipe)
            .then(res=>{
                console.log(newRecipe);
                console.log(res.data);
                console.log(res.data.error);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                    console.log(res.data.error.errors);
                } else {
                    navigate('/dashboard');
                }
            })    
            .catch(err=>console.log(err))
    };

    return (
        <>
        <Header route="newRecipe"/>
        <div style={styles.div}>
        <h1>New Recipe:</h1>
        <form onSubmit={onSubmitHandler}>
            <h2>Name:</h2>
            <input type="text" onChange = {(e)=>handleNameChange(e.target.value)}/>
            <p>{
                errors.name ? 
                errors.name.message : null
            }</p>
            <h2>Hyperlink:</h2>
            <input type="text" onChange = {(e)=>handleHyperChange(e.target.value)}/>
            <p>{
                errors.hyperlink ? 
                errors.hyperlink.message : null
            }</p>
            <h2>Ingredients:</h2>
            <CreatableSelect options={ingrOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleIngrChange} style={styles.select}/>
            <p>{
                errors.ingredients ? 
                errors.ingredients.message : null
            }</p>
            <h2>Instructions:</h2>
            <input type="textarea" onChange = {(e)=>handleInstrChange(e.target.value)} style={styles.instructions}/>
            <p>{
                errors.instructions ? 
                errors.instructions.message : null
            }</p>
            <h2>Tags:</h2>
            <CreatableSelect options={tagOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleTagsChange} style={styles.select}/>
            <p>{
                errors.categories ? 
                errors.categories.message : null
            }</p>
            <br/>
            <input type="submit"/>
        </form>
        </div>
        </>
    )
}

export default NewRecipe;
