import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Products = (props) => {

    const [checked, setChecked] = useState([]);


    useEffect(() => {
        let newList = [];
        if (props.products) {
            props.products.forEach(p => {
                if (props.event) {
                    if (props.event.products) {
                        props.event.products.forEach(eP => {
                            if(eP._id === p._id){
                                newList.push('p-' + p._id);
                            }
                        });
                    }
                }
            });
            setChecked(newList);
        }
    }, [props.event, props.products]);


    const handleCheckChange = (e) => {
        const newList = checked?.includes(e.target.id) ? checked?.filter(p => p !== e.target.id) : [...(checked ?? []), e.target.id]
        setChecked(newList);
    }

    const handleAddRemoveProduct = (e) => {
        handleCheckChange(e);
        props.handleAddRemoveProduct(e);
    }

    return (
        <div className='products-ctr'>
            <h5>All Products:</h5>
            {props.products.map(p => {
                return (
                    <FormControlLabel
                        key={'p-' + p._id}
                        control={<Checkbox
                            id={'p-' + p._id}
                            className='ckbox'
                            color='primary'
                            onChange={handleAddRemoveProduct}
                            checked={checked.includes('p-' + p._id)}
                            value={p._id}
                            name={p.title}
                            key={p._id}
                        />}
                        label={p.title}
                    />)
            })}
        </div>
    );
};

export default Products;