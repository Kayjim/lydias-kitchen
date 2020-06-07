import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';


const CakesPage = (props) => {
    const products = props.products;
    return (
        <div className='cake-container card-container'>
            {products.map(p => {
                return (
                    <Card
                        key={p.title}
                        product={p}
                        className='cake-card'
                        title={p.title}
                        ingredients={p.ingredients}
                        description={p.description}
                        image={p.images[0]}
                        addToCart={props.addToCart}
                    />
                );
            }
            )}
        </div>
    );
};

export default CakesPage;