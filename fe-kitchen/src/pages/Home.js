import React from 'react';
import Card from '../components/Cards';

const fetchTopCookies = () =>{
    //REST call to fetch Cookies to display
};

const fetchTopCakes = () =>{
    //REST call to fetch Cakes to display
};

// React.useEffect(() => fetchTopCookies());

// React.useEffect(() => fetchTopCakes());

const testImage = {
    title: 'testcookie',
    url: 'https://i.imgur.com/udB8jK2m.jpg'
};

const homePage = props => (
    <div className='home-container'>
        <div classname='cookie-container__home card-container'>
            <h3>Cookies</h3>
        <Card
            className='home-card'
            image={testImage}
        />
        <Card
            className='home-card'
            image={testImage}
        />
        <Card
            className='home-card'
            image={testImage}
        />
        </div>
        <div classname='cake-container__home card-container'>
            <h3>Cakes</h3>
        <Card
            className='home-card'
            image={testImage}
        />
        <Card
            className='home-card'
            image={testImage}
        />
        <Card
            className='home-card'
            image={testImage}
        />
        </div>
    </div>
);

export default homePage;