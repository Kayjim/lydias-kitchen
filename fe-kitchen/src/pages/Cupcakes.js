import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';


const CupcakePage = (props) => {
    const products = props.products;
    return (
        <div className='cupcake-ctr'>
            {products.map(p => {
                return (
                    <Card
                        key={p.title}
                        product={p}
                        className='cupcake-card'
                        title={p.title}
                        ingredients={p.ingredients}
                        description={p.description}
                        image={p.images[0]}
                    />
                );
            }
            )}
        </div>
    );
};

export default CupcakePage;