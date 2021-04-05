import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
    name: {
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
    }
}));


const ImportIngredient = (props) => {

    const classes = useStyles();
    const [ingredients, setIngredients] = useState([{ name: '', includedIn: [] }]);

    const handleEditChange = (e, i) => {
        const ingrds = [...ingredients];

        ingrds[i].name = e.target.value;

        setIngredients(ingrds);
    }

    const addNew = () => {
        const values = [...ingredients];
        values.push({ name: '', includedIn: [] });
        setIngredients(values);
    };

    const remove = (i) => {
        const values = [...ingredients];
        values.splice(i, 1);
        setIngredients(values);
    };

    const handleImportClick = () => {
        const ingrds = [ ...ingredients ];
        axios.post(`http://localhost:4000/3/ingredients`, {
            ingredients: ingrds
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
            <div className={classes.legend}>
                <h3>Edit a Product</h3>
            </div>
            <Button className={classes.addBtn} variant='outlined' color='primary' onClick={addNew}><AddIcon />Add Ingredient<AddIcon /></Button>
            {ingredients.map((field, idx) => {
                return (
                    <div className={classes.ingredientCtr} >
                        <form>
                            <div className={classes.productCtr}>
                                <TextField className={`${classes.input} ${classes.name}`} value={ingredients[idx].name} variant='outlined' label='Ingredient Name' key={`name-${idx}`} id={`name-${idx}`} onChange={(e) => { handleEditChange(e, idx) }} />
                            </div>
                        </form>
                        <Button className={classes.rmvBtn} variant='outlined' color='secondary' onClick={() => remove(idx)}><RemoveIcon />Remove Ingredient<RemoveIcon /></Button>
                    </div>);
            })}
            <Button id='btnImport' className={classes.importBtn} variant='contained' color='primary' onClick={handleImportClick}>Import</Button>
        </React.Fragment>
    );
}

export default ImportIngredient;