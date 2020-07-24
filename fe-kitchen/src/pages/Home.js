import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';
import CakePage from './Cakes';
import CookiePage from './Cookies';
import CupcakePage from './Cupcakes';

import axios from 'axios';

const HomePage = props => {

    const products = props.products;
    return (
        <div className='gallery-ctr'>
            <div className='cakes-ctr'>
                <CakePage products={props.products.filter( p => p.type === 'Cake')} />
            </div>
            <div className='cakes-ctr'>
                <CookiePage products={props.products.filter( p => p.type === 'Cookie')} />
            </div>
            <div className='cakes-ctr'>
                <CupcakePage products={props.products.filter( p => p.type === 'Cupcake')} />
            </div>
        </div>
    );
};

export default HomePage;