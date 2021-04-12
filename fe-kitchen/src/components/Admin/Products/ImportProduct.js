import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

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


    const [checked, setChecked] = useState([]);

    const handleCheckboxClick = (e, i) => {
        const newList = checked?.includes(e.target.id) ? checked?.filter(p => p !== e.target.id) : [...(checked ?? []), e.target.id];
        props.products[i].ingredients = newList.map(i => {
            return i.substring(0, i.length - 2);
        });
        console.log(props.products[i].ingredients);
        setChecked(newList);
    }
    return (
        <React.Fragment>
            <Button className={classes.addBtn} variant='outlined' color='primary' onClick={props.addNew}><AddIcon />Add Product<AddIcon /></Button>
            <form className={classes.uploadProductForm}>
                {props.products.map((field, idx) => {
                    return (
                        <div className={classes.productCtr} key={`${field}-${idx}`}>
                            <TextField className={`${classes.input} ${classes.title}`} variant='outlined' label='Product Name' id={'title-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <TextField className={classes.input} variant='outlined' label='Description' id={'desc-' + idx} onChange={(e) => props.handleChange(idx, e)} />
                            <div className='ingredients-list'>
                                <ul>
                                    {props.allIngredients.map((i) => {
                                        return (<li key={i._id}>
                                            <FormControlLabel
                                                label={i.name}
                                                control={<Checkbox
                                                    id={`${i._id}-${idx}`}
                                                    className='ckbox'
                                                    color='primary'
                                                    name={i._id}
                                                    key={i._id}
                                                    value={i.name}
                                                    onChange={(e) => handleCheckboxClick(e, idx)}
                                                    checked={checked.includes(`${i._id}-${idx}`)}
                                                />}
                                                label={i.name}
                                            />
                                        </li>);
                                    })}
                                </ul>
                            </div>
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