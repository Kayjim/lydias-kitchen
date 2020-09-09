import React from 'react';
import CakePage from './Cakes';
import CookiePage from './Cookies';
import CupcakePage from './Cupcakes';
import { makeStyles } from '@material-ui/core/styles';

import BannerImage from '../images/2020Logo.png'


const useStyles = makeStyles((theme) => ({
    sectionHeadersCtr: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    subHeader: {
        fontWeight: 600,
        marginTop: 0
    },
    bannerCtr: {
        display: 'flex',
        margin: 'auto',
        maxWidth: '40%',
        maxHeight: '400px',
        padding: '50px'
    },
    banner: {
        borderRadius: ''
    }
  }));

const HomePage = props => {
    const classes = useStyles();
    return (
        <div className='gallery-ctr'>
            {!props.search &&
                <React.Fragment>
                    <div className={classes.bannerCtr}>
                        <img style={{width: '100%'}} src={BannerImage}></img>
                    </div>
                    <div className='display-ctr'>
                        <h2 className='section-hdr'>Cookies</h2>
                        <CookiePage products={props.products.filter(p => p.type === 'Cookie')} />
                    </div>
                    <div className='display-ctr'>
                        <h2 className='section-hdr'>Cupcakes</h2>
                        <CupcakePage products={props.products.filter(p => p.type === 'Cupcake')} />
                    </div>
                    <div className='display-ctr'>
                        <div className={classes.sectionHeadersCtr}>
                            <h2 className='section-hdr'>Cakes</h2>
                            <h4 className={classes.subHeader}>Most of the cupcakes can also be ordered as an 8 inch round layer cake - $35</h4>
                        </div>
                        <CakePage products={props.products.filter(p => p.type === 'Cake')} />
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