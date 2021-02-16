import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

    //#region product view state
    const [productView, setProductView] = useState(false);
    const [products, setProducts] = useState([{ imgs: null, title: null, description: null, ingredients: null, images: [] }]);
    //#endregion

    //#region image view state
    const [imageView, setImageView] = useState(true);
    const [product, setProduct] = useState({});
    const [entireList, setEntireList] = useState([{}]);
    //#endregion

    //#region render
    //render
    useEffect(() => {
        axios.get("http://localhost:4000/all-products").then(res => {
            console.log(res.data.products);
            setEntireList(res.data.products);
        }).catch(e => { console.log(e) });
    }, []);
    //#endregion

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
            case ('images-' + i):
                values[i].images = e.target.files[0];
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

    const handleRelations = (e) => {
        setProduct(e.target.value);
    };

    const handleImport = () => {
        // axios.post('https://lydias-kitchen.herokuapp.com/3/import', products)
        axios.post('http://localhost:4000/3/import', {
            data: {
                products: products
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }


    return (
        <div className={classes.adminCtr}>
            { productView &&
                <React.Fragment>
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
                                    <TextField className={classes.input} variant='outlined' label='Description' id={'desc-' + idx} onChange={(e) => handleChange(idx, e)} />
                                    <TextField className={classes.input} variant='outlined' label='Ingredients' id={'ingrd-' + idx} onChange={(e) => handleChange(idx, e)} />
                                    <TextField className={classes.input} variant='outlined' label='Type' id={'type-' + idx} onChange={(e) => handleChange(idx, e)} />
                                    <Button className={classes.rmvBtn} variant='outlined' color='secondary' onClick={() => remove(idx)}><RemoveIcon />Remove Product<RemoveIcon /></Button>

                                </div>)
                        })}
                    </form>
                    <Button id='btnImport' className={classes.importBtn} variant='contained' color='primary' onClick={handleImport}>Import</Button>
                </React.Fragment>
            }
            {imageView &&
                <React.Fragment>
                    <div className={classes.legend}>
                        <h3>Rules to Follow for Importing Images:</h3>
                        {/* <p>*<i>This page is primarily for importing a list of new products, and it is not for editing existing products.</i></p> */}
                        <ul className={classes.legendList}>
                            <li>Test</li>
                        </ul>
                    </div>
                    <form action='http://localhost:4000/3/uploadImages' method='POST' encType="multipart/form-data">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="iptLabel--product">Select Product</InputLabel>
                            <Select
                                labelId="select--product_label"
                                id="product"
                                name='product'
                                value={product}
                                onChange={handleRelations}
                                label="Product"
                            >
                                {entireList.map(p => {
                                    return (<MenuItem key={`${p._id}`} value={`${p.title}`}>{p.title}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                        <Input
                            accept="image/*"
                            className={classes.input}
                            id='productImages'
                            name='productImages'
                            inputProps={{multiple: true }}
                            type="file"
                        />
                        <Button type='submit' id='btnUpload' className={classes.uploadBtn} variant='contained' color='primary'>Submit</Button>
                    </form>
                </React.Fragment>
            }
        </div>
    );
};
export default AdminPage;