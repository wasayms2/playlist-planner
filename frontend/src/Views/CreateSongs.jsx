import React, { useState } from 'react';
import Navigation from '../Components/Navigation';

function CreateSongs({userId, setUserId, api}) {
    const [title, setTitle] = useState(undefined);
    const [artist, setArtist] = useState(undefined);
    const [genre, setGenre] = useState(undefined);
    const [year, setYear] = useState(undefined);
    const [bpm, setBpm] = useState(undefined);
    const [nrgy, setNrgy] = useState(undefined);
    const [dance, setDnce] = useState(undefined);
    const [db, setDb] = useState(undefined);
    const [live, setLive] = useState(undefined);
    const [val, setVal] = useState(undefined);
    const [dur, setDur] = useState(undefined);
    const [acous, setAcous] = useState(undefined);
    const [speech, setSpeech] = useState(undefined);
    const [pop, setPop] = useState(undefined);

    return (
        <>
            <Navigation />
        <div style={{margin: '20px'}}>
            <input
                type='text'
                placeholder='Title'
                name='plylst'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <input
                type='text'
                placeholder='Artist'
                name='plylst'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                />
            <input
                type='text'
                placeholder='Genre'
                name='plylst'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
            <input
                type='number'
                placeholder='Year'
                name='plylst'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                />
            <input
                type='number'
                placeholder='BPM'
                name='plylst'
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                />
            <input
                type='number'
                placeholder='Energy Level'
                name='plylst'
                value={nrgy}
                onChange={(e) => setNrgy(e.target.value)}
                />
            <input
                type='number'
                placeholder='Danceability'
                name='plylst'
                value={dance}
                onChange={(e) => setDnce(e.target.value)}
                />
            <input
                type='number'
                placeholder='dB'
                name='plylst'
                value={db}
                onChange={(e) => setDb(e.target.value)}
                />
            <input
                type='number'
                placeholder='Liveliness'
                name='plylst'
                value={live}
                onChange={(e) => setLive(e.target.value)}
                />
            <input
                type='number'
                placeholder='Valence'
                name='plylst'
                value={val}
                onChange={(e) => setVal(e.target.value)}
                />
            <input
                type='number'
                placeholder='Duration (seconds)'
                name='plylst'
                value={dur}
                onChange={(e) => setDur(e.target.value)}
                />
            <input
                type='number'
                placeholder='Acousticness'
                name='plylst'
                value={acous}
                onChange={(e) => setAcous(e.target.value)}
                />
            <input
                type='number'
                placeholder='Speechiness'
                name='plylst'
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                />
            <input
                type='number'
                placeholder='Popularity'
                name='plylst'
                value={pop}
                onChange={(e) => setPop(e.target.value)}
                />
            
            <button onClick={() => {
                let songInfo = {
                    'title': title,
                    'artist': artist,
                    'genre': genre,
                    'year': year,
                    'bpm': bpm,
                    'nrgy': nrgy,
                    'dnce': dance,
                    'dB': db,
                    'live': live,
                    'val': val,
                    'dur': dur,
                    'acous': acous,
                    'spch': speech,
                    'pop': pop,
                };
                for (let feat in songInfo) {
                    if (typeof songInfo[feat] !== 'string' || songInfo[feat].length <= 0) {
                        songInfo[feat] = null
                    }
                }
                api.post(`/addnewsong`, songInfo).then((res) => {
                    console.log(res.data);
                    setTitle('');
                    setArtist('');
                    setGenre('');
                    setYear('');
                    setBpm('');
                    setNrgy('');
                    setDnce('');
                    setDb('');
                    setLive('');
                    setVal('');
                    setDur('');
                    setAcous('');
                    setSpeech('');
                    setPop('');
                });
            }}>Create New Song</button>
        </div>
        </>
    );
}

export default CreateSongs;
