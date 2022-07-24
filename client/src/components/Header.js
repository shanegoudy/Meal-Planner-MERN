import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import ProfileButton from './ProfileButton';

const styles = {
    div : {
        margin: '0 auto 0 auto',
        width: '80vw',
        height: '12vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link : {
        height: '8vh',
        margin: '.5vh'
    },
    button : {
        height: '4vh',
        margin: '.5vh',
        border: 'none',
        cursor: 'pointer',
    },
    buttonHighlighted : {
        height: '4vh',
        margin: '.5vh',
        backgroundColor: '#f05223',
        border: 'none',
        borderRadius: '5px',
        color: 'white'
    },
    logo : {
        height: '6vh',
        margin: '.5vh .5vh 4vh .5vh'
    }
}


const Header = (props) => {
    const [buttonStyles, setButtonStyles] = useState([]);
    
    useEffect(()=> {
        if(props.route=="dashboard"){
            setButtonStyles([
                    {...styles.buttonHighlighted},
                    {...styles.button},
                    {...styles.button},
                    {...styles.button}
                ])
        }else if(props.route=="myPlan"){
            setButtonStyles([
                {...styles.button},
                {...styles.buttonHighlighted},
                {...styles.button},
                {...styles.button}
            ])
        }else if(props.route=="recipeBook"){
            setButtonStyles([
                {...styles.button},
                {...styles.button},
                {...styles.buttonHighlighted},
                {...styles.button}
            ])
        }else if(props.route=="newRecipe"){
            setButtonStyles([
                {...styles.button},
                {...styles.button},
                {...styles.button},
                {...styles.buttonHighlighted}
            ])
        }else{
            setButtonStyles([
                {...styles.button},
                {...styles.button},
                {...styles.button},
                {...styles.button}
            ])
        }
    }, [])

    return (
        <div id="Card" style={{
            ...styles.div
        }}>
            <ProfileButton user={props.user}/>
            <Link to = "/dashboard" style={{
            ...styles.link
            }}>
                <button type="button" style={buttonStyles[0]}>
                    Home
                </button>
            </Link>
            <Link to = "/myplan" style={{
            ...styles.link
            }}>
                <button type="button" style={buttonStyles[1]}>
                    My Plan
                </button>
            </Link>
            <img src={logo} alt="logo" style={styles.logo}/>
            <Link to = "/recipebook" style={{
            ...styles.link
            }}>
                <button type="button" style={buttonStyles[2]}>
                    Recipe Book
                </button>
            </Link>
            <Link to = "/recipes/new" style={{
            ...styles.link
            }}>
                <button type="button" style={buttonStyles[3]}>
                    New Recipe
                </button>
            </Link>
        </div>
    )
}

export default Header;