import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navigation from '../Components/Navigation';

function SearchSongs({userId, setUserId}) {
    const [songs, setSongs] = useState([]);

    const instance = Axios.create({
        timeout: 1000,
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    });

    useEffect(() => {
        instance.get(`/viewsongs`).then((res) => {
            console.log(res);
            setSongs(res.data)
        });
    }, [])

    return (
        <div>
            <Navigation />
            <input
                type='text'
                placeholder='Song Name'
                name='sngname'
                />
            {songs.map((title) => (<p>{title.title}</p>))}
        </div>
    );
}

export default SearchSongs;
