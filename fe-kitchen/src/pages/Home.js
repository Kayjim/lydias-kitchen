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
            {!props.search &&
                <React.Fragment>
                    <div className='display-ctr'>
                        <h2 className='section-hdr'>Cakes</h2>
                        <CakePage products={props.products.filter(p => p.type === 'Cake')} />
                    </div>

                    <div className='display-ctr'>
                        <h2 className='section-hdr'>Cookies</h2>
                        <CookiePage products={props.products.filter(p => p.type === 'Cookie')} />
                    </div>
                    <div className='display-ctr'>
                        <h2 className='section-hdr'>Cupcakes</h2>
                        <CupcakePage products={props.products.filter(p => p.type === 'Cupcake')} />
                    </div>
                </React.Fragment>}
            {props.search && props.search == 'cakes' &&
                <div className='display-ctr'>
                    <h2 className='section-hdr'>Cakes</h2>
                    <CakePage products={props.products.filter(p => p.type === 'Cake')} />
                </div>
            }
            {props.search && props.search == 'cookies' &&
                <div className='display-ctr'>
                    <h2 className='section-hdr'>Cookies</h2>
                    <CookiePage products={props.products.filter(p => p.type === 'Cookie')} />
                </div>
            }
            {props.search && props.search == 'cupcakes' &&
                <div className='display-ctr'>
                    <h2 className='section-hdr'>Cupcakes</h2>
                    <CupcakePage products={props.products.filter(p => p.type === 'Cupcake')} />
                </div>
            }
        </div>
    );
};

export default HomePage;