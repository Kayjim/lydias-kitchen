import React, { useState, useEffect } from 'react';
import Card from '../components/Cards';



const fetchTopCookies = () => {
    //REST call to fetch Cookies to display
};

const fetchTopCakes = () => {
    //REST call to fetch Cakes to display
};

const testImage = {
    title: 'testcookie',
    url: 'https://i.imgur.com/udB8jK2m.jpg'
};

const HomePage = props => {
    React.useEffect(() => fetchTopCookies());

    React.useEffect(() => fetchTopCakes());
    const [cookies, setCookies] = useState([]);

    useEffect(() => {
            setCookies([
                {
                    title: 'Test cookie0',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie2',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie3',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie4',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie5',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie6',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
                {
                    title: 'Test cookie7',
                    url: 'https://i.imgur.com/udB8jK2m.jpg'
                },
            ]);
    }, []);
    return (
        <div className='cookie-container card-container'>
            {cookies.map(c => {
                return (
                    <Card
                        key={c.title}
                        className='cookie-card'
                        image={c}
                    />
                );
            }
            )}
        </div>
    );
};

export default HomePage;