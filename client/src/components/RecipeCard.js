import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@material-ui/core'
import placeholder from '../assets/images/placeholder.png';
import AddRecipeBox from './AddRecipeBox';

const RecipeCard = (props) => {
    const [createdBy, setCreatedBy] = useState({});
    var styles = {
        card: {
            margin: '.5vw 1vw 5vw',
            padding: 0,
            borderRadius: '16px',
            backgroundSize: '15em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        },
        small: {
            gridRowEnd: 'span 26'
        },
        medium: {
            gridRowEnd: 'span 33'
        },
        large: {
            gridRowEnd: 'span 45'
        },
        overlay: {
            width:'10vw',
            height: '10vw',
            // display: 'none',
            zIndex: '1',
            backgroundColor: 'black',
        },
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + props.recipe.createdBy)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.firstName);
                setCreatedBy(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const overlayOn = () => {
        styles.overlay.display = 'block';
    };

    const overlayOff = () => {
        styles.overlay.display = 'none';
    };

    return (
        <div id="Card" 
        style={{
            ...styles.card,
            ...styles[props.size]
        }}>
            <div style={{ position:'absolute', zIndex:'0'}}>
                <Link to={"/recipes/" + props.recipe._id}>
                    <img id="image" src={props.recipe.image} style={{ width: '10vw', height: '10vw', borderRadius: '10px'}}/>
                </Link>
                <h4 style={{ fontSize: '1vw', margin: '.2vw', width: '11vw', overflowWrap: 'normal'}}>{props.recipe.name}</h4>
                <h5 style={{ textDecoration: 'none', fontSize: '1vw', margin: '.2vw'}}>
                    <Link to={"/user/" + createdBy._id} style={{ textDecoration: 'none'}}>
                        {" " + createdBy.firstName + " " + createdBy.lastName}
                    </Link>
                </h5>
            </div>
            <div>
                {
                    props.dashboard ? <AddRecipeBox user={props.user} recipe={props.recipe} book={props.book}/> : null
                }       
            </div>
        </div>
    )
}
export default RecipeCard;

9