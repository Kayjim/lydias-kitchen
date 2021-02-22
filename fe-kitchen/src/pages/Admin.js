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
import EditProduct from '../components/Admin/Products/EditProduct';
import ImportProduct from '../components/Admin/Products/ImportProduct';

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
    const [productToEditTitle, setProductToEditTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    //#endregion

    //#region image view state
    const [product, setProduct] = useState({});
    const [entireList, setEntireList] = useState([{}]);
    //#endregion

    //#region render
    useEffect(() => {
        axios.get("http://localhost:4000/all-products").then(res => {
            console.log(res.data.products);
            setEntireList(res.data.products);
        }).catch(e => { console.log(e) });
    }, []);
    //#endregion

    //#region change listeners

    useEffect(() => {
        axios.get(`http://localhost:4000/3/products/${productToEditTitle}`)
            .then(res => {
                setIngredients(res.data.cdata.product.ingredients.toString());
                setProductToEdit(res.data.cdata.product);
            }).catch(err => {
                console.log(err);
            })
    }, [productToEditTitle])

    //#endregion

    const handleChange = (i, e) => {
        const values = [...product];
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

    const handleSelectProductEdit = (e) => {
        setProductToEditTitle(e.target.value);
    }

    const handleSaveEditClick = (e) => {
        e.preventDefault();
        let product = { ...productToEdit };
        product.ingredients = productToEdit.ingredients.split(',');
        axios.put(`http://localhost:4000/3/products/${productToEdit._id}`, {
            updatedProduct: product
        })
            .then(res => {
                console.log(res.msg);
            })
            .catch(err => {
                console.log(err);
            })
    }
    //#endregion

    return (
        <div className={classes.adminCtr}>
            <div className={classes.adminNav}>
                <Button id='productImport' className={classes.navBtn} variant='outlined' color='primary' onClick={handleNavClick}>Products</Button>
                <Button id='imageUpload' className={classes.navBtn} variant='outlined' color='primary' onClick={(e) => handleNavClick(e)}>Image Upload</Button>
            </div>
            { viewKey == 'products' &&
                <React.Fragment>
                    <div className={classes.legend}>
                        <h3>Rules to Follow for Importing Products:</h3>
                        <p>*<i>This page is primarily for importing a list of new products, and it is not for editing existing products.</i></p>
                        <ul className={classes.legendList}>
                            <li>When adding ingredients you need to enter them using a comma seperated list. For example - flour,butter,icing,sprinkles</li>
                            <li>Examples for the "type" field - Cake or Cookie or Cupcake</li>
                        </ul>
                    </div>
                    <div className={classes.productNav}>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('product-edit')}>Edit Product</Button>
                        <Button className={classes.addBtn} variant='outlined' color='primary' onClick={() => setService('import')}>Import Products</Button>
                    </div>
                    {service == 'import' &&
                        <ImportProduct products={products} handleChange={handleChange} addNew={addNew} remove={remove} handleImport={handleImport} />
                    }
                    {
                        service == 'product-edit' &&
                        <EditProduct entireList={entireList} product={product} productToEdit={productToEdit} ingredients={ingredients} handleSelectProductEdit={handleSelectProductEdit} handleEditChange={handleEditChange} handleSaveEditClick={handleSaveEditClick} />
                    }
                </React.Fragment >
            }
            {
                viewKey == 'images' &&
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
                            inputProps={{ multiple: true }}
                            type="file"
                        />
                        <Button type='submit' id='btnUpload' className={classes.uploadBtn} variant='contained' color='primary'>Submit</Button>
                    </form>
                </React.Fragment>
            }
        </div >
    );
};
export default AdminPage;