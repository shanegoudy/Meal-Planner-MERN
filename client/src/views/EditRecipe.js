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
    const { id } = useParams();
    const [ingrOptions, setIngrOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const animatedComponents = makeAnimated();
    const navigate = useNavigate();
    const [ogRecipe, setOgRecipe] = useState({});
    const [initCats, setInitCats] = useState([]);
    const [initIngrs, setInitIngrs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [newRecipe, setNewRecipe] = useState({
        categories: [],
        name: "",
        instructions: "",
        ingredients: [],
        hyperlink: "",
        createdBy: {}
    });

    useEffect(() => {
        (
            async () => {
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
                axios.get('http://localhost:8000/api/recipes/' + id )
                .then(res => {
                    console.log(res);
                    var cats = [];
                    for(var i=0; i<res.data.recipe.categories[0].length; i++){
                        cats.push({
                            label: res.data.recipe.categories[0][i].name,
                            value: res.data.recipe.categories[0][i]
                        });
                        console.log(cats);
                    };
                    var ingrs = [];
                    for(var i=0; i<res.data.recipe.ingredients[0].length; i++){
                        ingrs.push({
                            label: res.data.recipe.ingredients[0][i].name,
                            value: res.data.recipe.ingredients[0][i]
                        });
                    }
                    setInitCats(cats);
                    setInitIngrs(ingrs);
                    setOgRecipe(res.data.recipe);
                    setNewRecipe({
                        categories: res.data.recipe.categories,
                        name: res.data.recipe.name,
                        instructions: res.data.recipe.instructions,
                        ingredients: res.data.recipe.ingredients,
                        hyperlink: res.data.recipe.hyperlink,
                        createdBy: res.data.recipe.createdBy
                    });
                    setLoaded(true);
                    console.log(ogRecipe);
                    console.log(newRecipe);
                })
                .catch(err => console.log(err))
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
        axios.put('http://localhost:8000/api/recipes/' + id, newRecipe)
            .then(res=>{
                console.log(newRecipe);
                console.log(res.data);
                if(res.data.error){
                    setErrors(res.data.error.errors);
                    console.log(res.data.error.errors);
                } else {
                    navigate('/recipes/' + id);
                }
            })    
            .catch(err=>console.log(err))
    };

    return (
        <>
        <Header route="editRecipe"/>
        <div style={styles.div}>
        <h1>Edit Recipe:</h1>
        {loaded && (
            <form onSubmit={onSubmitHandler}>
                <h2>Name:</h2>
                <input type="text" defaultValue={ogRecipe.name} onChange = {(e)=>handleNameChange(e.target.value)}/>
                <p>{
                    errors.name ? 
                    errors.name.message : null
                }</p>
                <h2>Hyperlink:</h2>
                <input type="text" defaultValue={ogRecipe.hyperlink} onChange = {(e)=>handleHyperChange(e.target.value)}/>
                <p>{
                    errors.hyperlink ? 
                    errors.hyperlink.message : null
                }</p>
                <h2>Ingredients:</h2>
                <CreatableSelect defaultValue={initIngrs} options={ingrOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleIngrChange} style={styles.select}/>
                <p>{
                    errors.ingredients ? 
                    errors.ingredients.message : null
                }</p>
                <h2>Instructions:</h2>
                <input type="textarea" defaultValue={ogRecipe.instructions} onChange = {(e)=>handleInstrChange(e.target.value)} style={styles.instructions}/>
                <p>{
                    errors.instructions ? 
                    errors.instructions.message : null
                }</p>
                <h2>Tags:</h2>
                <CreatableSelect defaultValue={initCats} options={tagOptions} isMulti components={animatedComponents} closeMenuOnSelect={false} onChange = {handleTagsChange} style={styles.select}/>
                <p>{
                    errors.categories ? 
                    errors.categories.message : null
                }</p>
                <br/>
                <input type="submit"/>
            </form>
        )}
        </div>
        </>
    )
}

export default NewRecipe;
