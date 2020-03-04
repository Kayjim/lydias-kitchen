import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';




const AdminPage = () => {

    const [products, setProducts] = useState([{ url: null, title: null, description: null, ingredients: null }]);

    const handleChange = (i, e) => {
        const values = [...products];
        switch (e.target.id) {
            case ('url-'+i):
                values[i].url = e.target.value;
                break;
            case ('title-'+i):
                values[i].title = e.target.value;
                break;
            case ('desc-'+i):
                values[i].description = e.target.value;
                break;
            case ('ingrd-'+i):
                values[i].ingredients = e.target.value;
                break;
        }
        setProducts(values);
    };

    const addNew = () => {
        const values = [...products];
        values.push({ url: null, title: null, description: null, ingredients: null });
        setProducts(values);
    };

    const remove = (i) => {
        const values = [...products];
        values.splice(i, 1);
        setProducts(values);
    };

    const handleImport = () => {
        console.log(products);
        axios.post('http://localhost:4000/3/import', products)
            .then( res => {
                console.log(res);
                console.log(res.data);
            });
    }


    return (
        <div className='admin-container'>
            <Button variant='outlined' color='primary' onClick={addNew}><AddIcon /></Button>
            <form className='upload-products__form'>
                {products.map((field, idx) => {
                    return (
                        <div key={`${field}-${idx}`}>
                            <TextField id={'url-' + idx} defaultValue='Image URL' onChange={(e) => handleChange(idx, e)} />
                            <TextField id={'title-' + idx} defaultValue='Image Title' onChange={(e) => handleChange(idx, e)} />
                            <TextField id={'desc-' + idx} defaultValue='Description' onChange={(e) => handleChange(idx, e)} />
                            <TextField id={'ingrd-' + idx} defaultValue='Ingredients' onChange={(e) => handleChange(idx, e)} />
                            <Button variant='outlined' color='secondary' onClick={() => remove(idx)}><RemoveIcon /></Button>
                        </div>)
                })}
            </form>
            <Button id='btnImport' variant='contained' color='primary' onClick={handleImport}>Import</Button>
        </div>
    );
};
export default AdminPage;