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
                id: 1,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 2,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 3,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 4,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 5,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 6,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 7,
                title: 'Test cookie',
                url: 'https://i.imgur.com/udB8jK2m.jpg'
            },
            {
                id: 8,
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