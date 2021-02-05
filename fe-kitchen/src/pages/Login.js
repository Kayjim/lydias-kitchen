import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';
import { GoogleLogin } from 'react-google-login';

const CLIENTID = '944333602720-rsd1u9grcpqa7l6rt4qa65sn13a42oka.apps.googleusercontent.com';

const LoginPage = (props) => {

    return (
        <div className='loginCtr'>
            <GoogleLogin 
                clientId = {CLIENTID}
                buttonText = 'Login'
                onSuccess = {props.loginSuccess}
                onFailure = {props.loginFailure}
                cookiePolicy = {'single_host_origin'}
                className = 'testForNow'
            />
        </div>
    );
};

export default LoginPage;