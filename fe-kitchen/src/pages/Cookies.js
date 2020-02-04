import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';


const fetchCookies = () => {
    //REST call to /get-cookies that will return all our cookie objects 
    //into state

};

const testImage = {
    title: 'Test cookie',
    url: 'https://i.imgur.com/udB8jK2m.jpg'
};
const CookiePage = () => {

    const [cookies, setCookies] = useState([]);

    useEffect(() => {
        setCookies([
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
        ]);
    }, []);
    return (
        <div className='cookie-container card-container'>
            {cookies.map(c => {
                return (
                    <Card
                        className='cookie-card'
                        image={c}
                    />
                );
            }
            )}
        </div>
    );
};

export default CookiePage;