import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@material-ui/core'
import placeholder from '../assets/images/placeholder.png';

var styles = {
    card: {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
        backgroundImage: 'url("https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg")',
        backgroundSize: '15em',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    small: {
        gridRowEnd: 'span 26'
    },
    medium: {
        gridRowEnd: 'span 33'
    },
    large: {
        gridRowEnd: 'span 45'
    }
}

const RecipeCard = (props) => {
    const createdBy = props.recipe.createdBy[0][0];
    return (
        <div id="Card" style={{
            ...styles.card,
            ...styles[props.size]
        }}>
            <Link to={"/recipes/" + props.recipe._id} style={{ textDecoration: 'none', color: 'white'}}>
                <h3 style={{ textShadow: '2px 2px black' }}>{props.recipe.name}</h3>
            </Link>
            <h5 style={{ textDecoration: 'none', color: 'white', textShadow: '2px 2px black'}}>
                Submitter:
                <Link to={"/user/" + createdBy._id} style={{ textDecoration: 'none', color: 'white', textShadow: '2px 2px black'}}>
                    {" " + createdBy.first_name + " " + createdBy.last_name}
                </Link>
            </h5>
        </div>
    )
}
export default RecipeCard;

