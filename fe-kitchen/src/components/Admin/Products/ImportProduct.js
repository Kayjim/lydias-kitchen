import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
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
}));

const ImportProduct = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Button className={classes.addBtn} variant='outlined' color='primary' onClick={props.addNew}><AddIcon />Add Product<AddIcon /></Button>
            <form className={classes.uploadProductForm}>
                {props.products.map((field, idx) => {
                    return (
                        <div className={classes.productCtr} key={`${field}-${idx}`}>
                            <TextField className={`${classes.input} ${classes.title}`} variant='outlined' label='Product Name' id={'title-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Description' id={'desc-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Ingredients' id={'ingrd-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Type' id={'type-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <Button className={classes.rmvBtn} variant='outlined' color='secondary' onClick={() => props.remove(idx)}><RemoveIcon />Remove Product<RemoveIcon /></Button>

                        </div>)
                })}
            </form>
            <Button id='btnImport' className={classes.importBtn} variant='contained' color='primary' onClick={props.handleImport}>Import</Button>
        </React.Fragment>
    );
}
export default ImportProduct;