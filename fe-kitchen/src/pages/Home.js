import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';

import axios from 'axios';



const fetchTopCookies = () => {
    //REST call to fetch Cookies to display
};

const fetchTopCakes = () => {
    //REST call to fetch Cakes to display
};

const HomePage = props => {
    React.useEffect(() => fetchTopCookies());
    React.useEffect(() => fetchTopCakes());

    const products = props.products;
    return (
        <div className='cookie-container card-container'>
            {products.map(p => {
                return (
                    <Card
                        key={p.title}
                        className='cookie-card'
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

export default HomePage;