import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import axios from 'axios';


const useStyles = makeStyles(theme => ({
    adminCtr: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    },
    uploadProductForm: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100%',
    },
    productCtr: {
        display: 'flex',
        minWidth: '100%',
        flexDirection: 'column',
        border: '1px solid black',
        padding: '10px',
        margin: '5px 0'
    },
    addBtn: {
        marginLeft: 'auto',
        width: '300px',
        maxWidth: '300px',
    },
    rmvBtn: {
        maxWidth: '300px',
        width: '300px',
        marginLeft: 'auto'
    },
    importBtn: {
        maxWidth: '30%',
        margin: 'auto'
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
     }
}));

const AdminPage = () => {

    const classes = useStyles();

    const [products, setProducts] = useState([{ imgs: null, title: null, description: null, ingredients: null }]);

    const handleChange = (i, e) => {
        const values = [...products];
        switch (e.target.id) {
            case ('imgs-' + i):
                values[i].imgs = e.target.value;
                break;
            case ('title-' + i):
                values[i].title = e.target.value;
                break;
            case ('desc-' + i):
                values[i].description = e.target.value;
                break;
            case ('ingrd-' + i):
                values[i].ingredients = e.target.value;
                break;
            case ('type-' + i):
                values[i].type = e.target.value;
                break;
        }
        setProducts(values);
    };

    const addNew = () => {
        const values = [...products];
        values.push({ imgs: null, title: null, description: null, ingredients: null });
        setProducts(values);
    };

    const remove = (i) => {
        const values = [...products];
        values.splice(i, 1);
        setProducts(values);
    };

    const handleImport = () => {
        console.log(products);
        axios.post('https://lydias-kitchen.herokuapp.com/3/import', products)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }


    return (
        <div className={classes.adminCtr}>
            <div className={classes.legend}>
                <h3>Rules to Follow for Importing Products:</h3>
                <p>*<i>This page is primarily for importing a list of new products, and it is not for editing existing products.</i></p>
                <ul className={classes.legendList}>
                    <li>When adding images you need to enter them using a comma seperated list. For example - urlforimage1.imgur.com,urlforimage2.imgur.com,urlforimage3.imgur.com</li>
                    <li>When adding ingredients you need to enter them using a comma seperated list. For example - flour,butter,icing,sprinkles</li>
                    <li>Examples for the "type" field - Cake or Cookie or Cupcake</li>
                </ul>
            </div>
            <Button className={classes.addBtn} variant='outlined' color='primary' onClick={addNew}><AddIcon />Add Product<AddIcon /></Button>
            <form className={classes.uploadProductForm}>
                {products.map((field, idx) => {
                    return (
                        <div className={classes.productCtr} key={`${field}-${idx}`}>
                            <TextField className={`${classes.input} ${classes.title}`} variant='outlined' label='Product Name' id={'title-' + idx} onChange={(e) => handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Images' id={'imgs-' + idx} onChange={(e) => handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Description' id={'desc-' + idx}  onChange={(e) => handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Ingredients' id={'ingrd-' + idx}  onChange={(e) => handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Type' id={'type-' + idx} onChange={(e) => handleChange(idx, e)} />
                            <Button className={classes.rmvBtn} variant='outlined' color='secondary' onClick={() => remove(idx)}><RemoveIcon />Remove Product<RemoveIcon /></Button>
                        </div>)
                })}
            </form>
            <Button id='btnImport' className={classes.importBtn} variant='contained' color='primary' onClick={handleImport}>Import</Button>
        </div>
    );
};
export default AdminPage;