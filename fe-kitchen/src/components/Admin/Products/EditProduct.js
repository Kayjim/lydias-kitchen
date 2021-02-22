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
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    productCtr: {
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
    }
}));


const EditProduct = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.legend}>
                <h3>Edit a Product</h3>
            </div>
            <form>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="iptLabel--product">Select Product</InputLabel>
                    <Select
                        labelId="select--product_label"
                        id="product"
                        name='product'
                        value={props.product}
                        onChange={props.handleSelectProductEdit}
                        label="Product"
                    >
                        {props.entireList.map(p => {
                            return (<MenuItem key={`${p._id}`} value={`${p.title}`}>{p.title}</MenuItem>)
                        })
                        }
                    </Select>
                </FormControl>
                <div className={classes.productCtr}>
                    <TextField className={`${classes.input} ${classes.title}`} value={props.productToEdit.title} variant='outlined' label='Product Name' id='editTitle' onChange={(e) => props.handleEditChange(e)} />
                    <TextField className={classes.input} variant='outlined' value={props.productToEdit.description} label='Description' id='editDesc' onChange={(e) => props.handleEditChange(e)} />
                    <TextField className={classes.input} variant='outlined' value={props.ingredients} label='Ingredients' id='editIngrd' onChange={(e) => props.handleEditChange(e)} />
                    <TextField className={classes.input} variant='outlined' value={props.productToEdit.type} label='Type' id='editType' onChange={(e) => props.handleEditChange(e)} />
                </div>
                <Button type='save' id='btnSaveEdit' className={classes.saveEditBtn} variant='contained' color='primary' onClick={(e) => props.handleSaveEditClick(e)}>Save</Button>
            </form>
        </React.Fragment>
    );
}

export default EditProduct;