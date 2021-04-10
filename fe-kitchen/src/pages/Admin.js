import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditProduct from '../components/Admin/Products/EditProduct';
import ImportProduct from '../components/Admin/Products/ImportProduct';
import EditIngredient from '../components/Admin/Ingredients/EditIngredient';
import ImportIngredient from '../components/Admin/Ingredients/ImportIngredient';

import Events from '../components/Admin/Events/Events';

import axios from 'axios';


const useStyles = makeStyles(theme => ({
    adminCtr: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px'
    },
    input: {
        margin: '5px 0',
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
    productNav: {
        display: 'flex',
        flexDirection: 'row'
    }
}));


const AdminPage = () => {

    const classes = useStyles();

    //#region universial state
    const [viewKey, setViewKey] = useState('products');
    const [service, setService] = useState('product-edit');
    //#endregion

    //#region product view state
    const [products, setProducts] = useState([{ imgs: null, title: null, description: null, ingredients: null, images: [] }]);
    const [productToEdit, setProductToEdit] = useState({});
    const [productToEditId, setProductToEditId] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    //#endregion

    //#region image view state
    const [product, setProduct] = useState({});
    const [entireList, setEntireList] = useState([{}]);
    const [images, setImages] = useState([]);
    //#endregion

    const importAll = r => {
        return r.keys().map((r, idx) => {

        });
    }

    //#region render
    useEffect(() => {
        //get all
        axios.get("http://localhost:4000/all-products").then(res => {
            console.log(res.data.products);
            setEntireList(res.data.products);
        }).catch(e => { console.log(e) });
        let imgs = [];
        axios.get('http://localhost:4000/3/allImages')
        .then(res => {
            if(res.data.imageFiles){
                imgs = res.data.imageFiles;
            }
            setImages(imgs);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);
    //#endregion

    //#region change listeners

    useEffect(() => {
        axios.get(`http://localhost:4000/3/products/${productToEditId}`)
            .then(res => {
                setIngredients(res.data.cdata.product.ingredients);
                setProductToEdit(res.data.cdata.product);
            }).catch(err => {
                console.log(err);
            })
    }, [productToEditId]);

    useEffect(() => {
        if (viewKey == 'products') {
            axios.get('http://localhost:4000/3/ingredients')
                .then(res => {
                    setAllIngredients(res.data.cdata.ingredients);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, [viewKey]);

    //#endregion

    const handleRelations = (e) => {
        setProduct(e.target.value);
    };

    const handleNavClick = e => {
        e.preventDefault();

        switch (e.target.parentElement.id) {
            case ('productImport'):
                setViewKey('products')
                break;
            case ('imageUpload'):
                setViewKey('images')
                break;
            case ('ingredientImport'):
                setViewKey('ingredients')
                break;
            case ('Events'):
                setViewKey('events')
                break;
        }
    }

    //#region product methods
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

    const handleEditChange = e => {
        const value = { ...productToEdit };
        switch (e.target.id) {
            case ('editTitle'):
                value.title = e.target.value;
                break;
            case ('editDesc'):
                value.description = e.target.value;
                break;
            case ('editIngrd'):
                value.ingredients = e.target.value;
                setIngredients(e.target.value);
                break;
            case ('editType'):
                value.type = e.target.value;
                break;
            default:
                break;
        }

        setProductToEdit(value);
    }

    const handleSelectProductEdit = (e, child) => {
        setProductToEditId(child.props.id);
    }

    const handleSaveEditClick = (e, ingredients) => {
        e.preventDefault();
        let product = { ...productToEdit, ingredients: ingredients };
        axios.put(`http://localhost:4000/3/products/${productToEdit._id}`, {
            updatedProduct: product
        })
            .then(res => {
                console.log(res.data.msg);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (i, e) => {
        const values = [...products];
        switch (e.target.id) {
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
    }
    //#endregion

    return (
        <div className={classes.adminCtr}>
            <div className={classes.adminNav}>
                <Button id='Events' className={classes.navBtn} variant='outlined' color='primary' onClick={handleNavClick}>Events</Button>
                <Button id='productImport' className={classes.navBtn} variant='outlined' color='primary' onClick={handleNavClick}>Products</Button>
                <Button id='imageUpload' className={classes.navBtn} variant='outlined' color='primary' onClick={handleNavClick}>Image Upload</Button>
                <Button id='ingredientImport' className={classes.navBtn} variant='outlined' color='primary' onClick={handleNavClick}>Ingredients</Button>
            </div>
            { viewKey == 'events' &&
                <Events />
            }
            { viewKey == 'products' &&
                <React.Fragment>
                    <div className={classes.legend}>
                        <h3>Edit a Product</h3>
                    </div>
                    <div className={classes.productNav}>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('product-edit')}>Edit Product</Button>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('product-import')}>Import Products</Button>
                    </div>
                    {service == 'product-import' &&
                        <ImportProduct products={products} allIngredients={allIngredients} handleChange={handleChange} addNew={addNew} remove={remove} handleImport={handleImport} />
                    }
                    {
                        service == 'product-edit' &&
                        <EditProduct entireList={entireList} allIngredients={allIngredients} product={product} productToEdit={productToEdit} ingredients={ingredients} handleSelectProductEdit={handleSelectProductEdit} handleEditChange={handleEditChange} handleSaveEditClick={handleSaveEditClick} />
                    }
                </React.Fragment >
            }
            {
                viewKey == 'images' &&
                <React.Fragment>
                    <div className={classes.legend}>
                        <h3>Import Images</h3>
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
                            inputProps={{ multiple: true }}
                            type="file"
                        />
                        <Button type='submit' id='btnUpload' className={classes.uploadBtn} variant='contained' color='primary'>Submit</Button>
                    </form>

                    <div className={'imagesCtr'}>
                        {
                            images.map(
                                (img, idx) => <img key={idx} alt="product" style={{ width: '100%', maxWidth: 250, maxHeight: 325, height: 200 }} src={img}></img>
                            )
                        }
                    </div>
                </React.Fragment>
            }
            {
                viewKey == 'ingredients' &&
                <React.Fragment>
                    <div className={classes.legend}>
                        <h3>Add Ingredients</h3>
                    </div>
                    <div className={classes.productNav}>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('ingredient-edit')}>Edit Ingredient</Button>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('ingredient-import')}>Import Ingredients</Button>
                    </div>
                    {service == 'ingredient-import' &&
                        <ImportIngredient allIngredients={allIngredients} handleChange={handleChange} addNew={addNew} remove={remove} handleImport={handleImport} />
                    }
                    {
                        service == 'ingredient-edit' &&
                        <EditIngredient allIngredients={allIngredients} />
                    }
                </React.Fragment>
            }
        </div >
    );
};
export default AdminPage;