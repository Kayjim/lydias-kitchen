import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toast } from 'react-toastify';

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


const EditProduct = (props) => {

    const classes = useStyles();

    const [checked, setChecked] = useState([]);

    useEffect(() => {
        let newList = [];
        if (props.productToEdit && props.allIngredients) {
            if (props.productToEdit.ingredients) {
                props.productToEdit.ingredients.forEach(i => {
                    props.allIngredients.forEach(aI => {
                        if (aI._id === i._id) {
                            newList.push(i._id);
                        }
                    });
                });
            }
            setChecked(newList);
        }
    }, [props.productToEdit]);

    const handleCheckboxClick = e => {
        const newList = checked?.includes(e.target.id) ? checked?.filter(p => p !== e.target.id) : [...(checked ?? []), e.target.id]
        setChecked(newList);
    }

    const handleDeleteClick = e => {
        axios.post(`https://lydias-kitchen.herokuapp.com/3/deleteProduct`, {
            cdata: { id: props.productToEdit._id }
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

    return (
        <React.Fragment>
            <form>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="iptLabel--product">Select Product</InputLabel>
                    <Select
                        labelId="select--product_label"
                        id="product"
                        name='product'
                        value={props.productToEdit.title}
                        onChange={props.handleSelectProductEdit}
                        label="Product"
                    >
                        {props.entireList.map(p => {
                            return (<MenuItem id={`${p._id}`} key={`${p._id}`} value={`${p.title}`}>{p.title}</MenuItem>)
                        })
                        }
                    </Select>
                </FormControl>
                <div className={classes.productCtr}>
                    <TextField className={`${classes.input} ${classes.title}`} value={props.productToEdit.title || ''} variant='outlined' label='Product Name' id='editTitle' onChange={(e) => props.handleEditChange(e)} />
                    <TextField className={classes.input} variant='outlined' value={props.productToEdit.description || ''} label='Description' id='editDesc' onChange={(e) => props.handleEditChange(e)} />
                    <div className='ingredients-list'>
                        <ul>
                            {props.allIngredients.map((i) => {
                                return (<li key={i._id}>
                                    <FormControlLabel
                                        label={i.name}
                                        control={<Checkbox
                                            id={i._id}
                                            className='ckbox'
                                            color='primary'
                                            name={i._id}
                                            key={i._id}
                                            value={i.name}
                                            onChange={handleCheckboxClick}
                                            checked={checked.includes(i._id)}
                                        />}
                                        label={i.name}
                                    />
                                </li>);
                            })}
                        </ul>
                    </div>
                    <TextField className={classes.input} variant='outlined' value={props.productToEdit.type || ''} label='Type' id='editType' onChange={(e) => props.handleEditChange(e)} />
                </div>
                <Button type='save' id='btnSaveEdit' className={`${classes.saveEditBtn} ${classes.button}`} variant='contained' color='primary' onClick={(e) => props.handleSaveEditClick(e, checked)}>Save</Button>
                <Button id='delete' onClick={handleDeleteClick} label="Delete" className={`${classes.button} ${classes.deleteBtn}`}>
                    Delete
                </Button>
            </form>
        </React.Fragment>
    );
}

export default EditProduct;