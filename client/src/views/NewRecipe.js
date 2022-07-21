import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import makeAnimated from 'react-select/animated';
import CreatableSelect, { actionMeta, OnChangeValue } from 'react-select/creatable';


const styles = {
    select : {
        width: '10vw',

    },
    main : {
        width: '30vw',
        margin: '-20px auto 20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form : {
        width: '80vw',
        backgroundColor: 'rgba(240,82,35,.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '20px'
    },
    instructions : {
        height: '10vh',
        width: '30vw',
    },
    image : {
        marginTop: '20px',
        marginRight: '20px',
        width: '35vw',
        display: 'block',
        borderRadius: '10px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    detailsSubmit: {

    },
    name: {
        fontSize: '3vw'
    }
}

const NewRecipe = (props) => {
    const [ingrOptions, setIngrOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [hyperlink, setHyperlink] = useState("");
    const [image, setImage] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [user, setUser] = useState({});


    useEffect(() => {
        (
            async () => {
                const userData = await axios.get("http://localhost:8000/api/user", { withCredentials: true })
                    console.log(userData);
                    setUser(userData.data);
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
            }
        )()
    },[])

    const newIngredient = (ingredient) => {
        var ingredientObj = {
            name: ingredient
        };
        console.log('ingredientObj');
        console.log(ingredientObj);
        var newIngredientValue = {};
        axios.post('http://localhost:8000/api/ingredients', ingredientObj)
            .then(res=>{
                console.log(res.data.error);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                    console.log(res.data.error.errors);
                } else {
                    console.log(res.data.ingredient);
                    console.log('successful ingredient registration');
                    newIngredientValue = {
                        value: res.data.ingredient,
                        label: res.data.ingredient.name
                    };
                    console.log('successful ingredient registration');
                }
            })
    };

    const newTag = (tag) => {
        var tagObj = {
            name: tag
        };
        var newTagValue = {};
        axios.post('http://localhost:8000/api/categories', tagObj)
            .then(res=>{
                console.log(res.data.error);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                    console.log("errors:" + res.data.error.errors);
                } else {
                    console.log(res.data.category);
                    newTagValue = {
                        value: res.data.category,
                        label: res.data.category.name
                    };
                    console.log('successful category registration');
                }
            })
        return newTagValue;
    }

    const handleTagsChange = (newValue, actionMeta) => {
        let newTags=[];
        for(var i=0; i<newValue.length; i++){
            if(typeof newValue[i].value === 'string') {
                newTags.push(newTag(newValue[i].value));
            } else {
                newTags.push(newValue[i].value);
            }
        }  
        setCategories(newTags);
        const { action } = actionMeta;
        let newTagOptions = tagOptions;
        let menuIsOpen = false;
        if (action === "select-option") {
            newTagOptions = newValue.children ? newValue.children : tagOptions;
            menuIsOpen = newValue.children ? true : false;
        };
        if (action === "create-option") {
            menuIsOpen = false;
        };
    };

    const handleIngrChange = (newValue, actionMeta) => {
        let newIngrs=[];
        for(var i=0; i<newValue.length; i++){
            if(typeof newValue[i].value === 'string') {
                newIngrs.push(newIngredient(newValue[i].value));
            } else {
                newIngrs.push(newValue[i].value);
            }
        } 
        setIngredients(newIngrs);
        const { action } = actionMeta;
        let newIngrOptions = ingrOptions;
        let menuIsOpen = false;
        if (action === "select-option") {
            newIngrOptions = newValue.children ? newValue.children : ingrOptions;
            menuIsOpen = newValue.children ? true : false;
        };
        if (action === "create-option") {
            menuIsOpen = false;
        };
    };

    const handleNameChange= (newName) => {
        setName(newName);
    };

    const handleInstrChange= (newInstr) => {
        setInstructions(newInstr);
    };

    const handleHyperChange= (newHyper) => {
        setHyperlink(newHyper);
    };

    const handleImageChange= (newImage) => {
        setImage(newImage);
        setImgSrc(newImage);
    };

    const imageError=()=>{
        setImgSrc("https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image.jpg")
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        var newRecipe = {
            categories: categories,
            name: name,
            instructions: instructions,
            ingredients: ingredients,
            hyperlink: hyperlink,
            image: image
        }
        axios.post(
            'http://localhost:8000/api/recipes', 
            newRecipe, 
            { withCredentials: true }
        )
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
        <Header route="newRecipe" user={user}/>
        <div style={styles.main}>
            <form onSubmit={onSubmitHandler} style={{...styles.form}}>
                <div>
                    <img src={imgSrc} alt="Recipe Image" onError={imageError} style={styles.image}/>
                    <input type="text" placeholder="Image Link" onChange = {(e)=>handleImageChange(e.target.value)}/>
                </div>
                <div style={{...styles.detailsSubmit}}>
                    <div style={{...styles.details}}>
                        <input type="text" placeholder="Add name" onChange = {(e)=>handleNameChange(e.target.value)} style={{...styles.name}}/>
                        <p>{
                            errors.name ? 
                            errors.name.message : null
                        }</p>
                        <input type="text" placeholder="Website: (optional)" onChange = {(e)=>handleHyperChange(e.target.value)}/>
                        <p>{
                            errors.hyperlink ? 
                            errors.hyperlink.message : null
                        }</p>
                        <input type="textarea" placeholder='Instructions: (optional)' onChange = {(e)=>handleInstrChange(e.target.value)} style={styles.instructions}/>
                        <p>{
                            errors.instructions ? 
                            errors.instructions.message : null
                        }</p>
                        <CreatableSelect placeholder="Ingredients:" options={ingrOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleIngrChange} style={styles.select}/>
                        <p>{
                            errors.ingredients ? 
                            errors.ingredients.message : null
                        }</p>
                        <CreatableSelect placeholder="Tags:" options={tagOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleTagsChange} style={styles.select}/>
                        <p>{
                            errors.categories ? 
                            errors.categories.message : null
                        }</p>
                        <br/>
                    </div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
        </>
    )
}

export default NewRecipe;
