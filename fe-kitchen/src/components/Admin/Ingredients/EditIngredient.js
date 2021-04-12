import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toast } from 'react-toastify';

import axios from 'axios';


const useStyles = makeStyles(theme => ({
    ingredientCtr: {
        display: 'flex',
        minWidth: '100%',
        flexDirection: 'column',
        border: '1px solid black',
        padding: '10px',
        margin: '5px 0'
    },
    input: {
        margin: '5px 0',
    },
    title: {
        alignSelf: 'center',
        width: '50%'
    },
    legend: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        border: '1px solid black',
        minWidth: '70%',
        maxWidth: '70%',
        marginBottom: '5px',
        padding: '5px'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    saveEditBtn: {
        backgroundColor: '#6A8A82',
        '&:hover': {
            backgroundColor: '#A7414A',
        },
    },
    deleteBtn: {
        backgroundColor: '#A7414A',
        '&:hover': {
            backgroundColor: '#6A8A82',
        },
    },
}));


const EditIngredient = (props) => {

    const classes = useStyles();

    const [ingredient, setIngredient] = useState({});

    const handleSelectIngredient = (e, child) => {
        setIngredient(child.props.value)
    }

    const handleEditChange = e => {
        const ingrd = { ...ingredient };

        ingrd.name = e.target.value;

        setIngredient(ingrd);
    }

    const handleDeleteClick = e => {
        axios.post(`https://lydias-kitchen.herokuapp.com/3/deleteIngredient`, {
            cdata: { id: ingredient._id }
        }).then(res => {
            if (!res.status === 200) {
                toast.error(res.status + ' : ' + res.statusText, {
                    position: toast.POSITION.TOP_CENTER
                })
                return;
            }
            else {

                toast.success(`${res.data.msg} - Please wait while the page and database refresh.`, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            }
        })
            .then(() => {
                setTimeout(() => { window.location.reload(); }, 3000);
            }).catch(err => {
                toast.error(err.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                return;
            })
    };

    const handleSaveEditClick = e => {
        let ingrdient = { ...ingredient };
        axios.put(`https://lydias-kitchen.herokuapp.com/3/ingredients/${ingrdient._id}`, {
            ingredient: ingrdient
        })
            .then(res => {
                console.log(res.data.msg);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <React.Fragment>
            <form>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="iptLabel--ingredient">Select Ingredient</InputLabel>
                    <Select
                        labelId="select--ingredient_label"
                        id="ingredient"
                        name='ingredient'
                        onChange={handleSelectIngredient}
                        label="Ingredient"
                    >
                        {props.allIngredients.map(i => {
                            return (<MenuItem id={`${i._id}`} key={`${i._id}`} value={i}>{i.name}</MenuItem>)
                        })
                        }
                    </Select>
                </FormControl>
                <div className={classes.ingredientCtr}>
                    <TextField className={`${classes.input} ${classes.title}`} value={ingredient.name || ''} variant='outlined' label='Ingredient Name' id='editName' onChange={handleEditChange} />
                    <div className='ingredients-list'>
                        <ul>
                            {ingredient.includedIn && ingredient.includedIn.map(i => {
                                return <li>{i.title}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <Button type='save' id='btnSaveEdit' className={`${classes.saveEditBtn} ${classes.button}`} variant='contained' color='primary' onClick={handleSaveEditClick}>Save</Button>
                <Button id='delete' onClick={handleDeleteClick} label="Delete" className={`${classes.button} ${classes.deleteBtn}`}>
                    Delete
                </Button>
            </form>
        </React.Fragment>
    );
}

export default EditIngredient;