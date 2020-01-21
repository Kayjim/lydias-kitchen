import React from 'react';
import Card from '../components/Cards';

const fetchCookies = () => {
    //REST call to /get-cookies that will return all our cookie objects 
    //into state
};

React.useEffect(() => fetchCookies());

const testImage = {
    title: 'Test cookie',
    url: 'https://i.imgur.com/udB8jK2m.jpg'
};

const cookiePage = props => (
    <div className='cookie-container card-container'>
        <Card 
            className='cookie-card'
            image={testImage}
        />
        <Card 
            className='cookie-card'
            image={testImage}
        />
        <Card 
            className='cookie-card'
            image={testImage}
        />
        <Card 
            className='cookie-card'
            image={testImage}
        />
    </div>
);

export default cookiePage;