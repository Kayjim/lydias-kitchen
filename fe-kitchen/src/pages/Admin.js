import React, { useState, useEffect } from 'react';

import AdminImportProducts from '../components/Admin/importProducts'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';



const AdminPage = () => {

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(1);

    let productInput = [];
    for(let i=0; i< count; i++){
        productInput.push(
            (
                <React.Fragment key={'input-'+ i}>
                    <AdminImportProducts />
                    <Button variant='outlined' color='primary' onClick={ () => setCount(count+1)}><AddIcon /></Button>
                    <Button variant='outlined' color='secondary' onClick={() => setCount(count-1)}
                ><RemoveIcon /></Button>
                </React.Fragment>
            )
        );
    }

    return (
        <div className='admin-container'>
            {productInput}
        </div>
    );
};
export default AdminPage;