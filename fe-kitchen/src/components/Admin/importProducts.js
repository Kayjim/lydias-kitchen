import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';


const importProducts = () => {

    return (
        <div className='import-container'>
            <form className='upload-products__form'>
                <TextField required id='standard-required' label ='Required' defaultValue='Image URL' />
                <TextField required id='standard-required' label ='Required' defaultValue='Image Title' />
                <TextField required id='standard-required' label ='Required' defaultValue='Description' />
                <TextField required id='standard-required' label ='Required' defaultValue='Ingredients' />

            </form>
        </div>
    );
};

export default importProducts;