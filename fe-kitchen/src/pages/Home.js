import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';

import axios from 'axios';

const HomePage = props => {

    const products = props.products;
    return (
        <div className='cookie-container card-container'>
            {products.map(p => {
                return (
                    <Card
                        key={p.title}
                        className='cookie-card'
                        product={p}
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

export default HomePage;