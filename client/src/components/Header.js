import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    div : {
        margin: '0 auto 0 auto',
        width: '80vw',
        height: '10vh',
        display: 'flex',
        flexDirection: 'row',
    },
    link : {
        height: '8vh',
        margin: '.5vh'
    },
    button : {
        height: '8vh',
        margin: '.5vh',
        backgroundColor: 'white',
        border: 'none' 
    },
    buttonHighlighted : {
        height: '8vh',
        margin: '.5vh',
        backgroundColor: 'Aqua',
        border: 'none',
        borderRadius: '5px'
    }
}

const Header = (props) => {
    const route = props;
    return (
        <div id="Card" style={{
            ...styles.div
        }}>
            <Link to = "/dashboard" style={{
            ...styles.link
            }}>
                <button type="button" style={{
            ...styles.buttonHighlighted
            }}>
                    Home
                </button>
            </Link>
            <Link to = "/myplan" style={{
            ...styles.link
            }}>
                <button type="button" style={{
            ...styles.button
            }}>
                    My Plan
                </button>
            </Link>
            <Link to = "/recipebook" style={{
            ...styles.link
            }}>
                <button type="button" style={{
            ...styles.button
            }}>
                    My Recipe Book
                </button>
            </Link>
            <Link to = "/recipes/new" style={{
            ...styles.link
            }}>
                <button type="button" style={{
            ...styles.button
            }}>
                    New Recipe
                </button>
            </Link>
        </div>
    )
}

export default Header;