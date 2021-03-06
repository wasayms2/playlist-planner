import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getAudioContext =  () => {
    AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContent = new AudioContext();
    return audioContent;
};

function SongBrowse({ title, artist, id, playlists, remove, playlistId, file, api }) {
    const [newFile, setNewFile] = useState(file);
    const [audioContext, setAudioContext] = useState(undefined); 
    const [source, setSource] = useState(undefined);
    useEffect(() => {
        console.log('yeeee')
        if (typeof file === 'string' || typeof newFile === 'string') {
            let temp = getAudioContext()
            setAudioContext(temp);
            setSource(temp.createBufferSource());
        }
    },[file, newFile])
    
    const [uploaded, setUploaded] = useState('');

    let defaultVal = playlistId;
    if (!defaultVal) {
        defaultVal = playlists[0].PlaylistID
    }


    const [addPlaylistId, setAddPlaylistId] = useState(defaultVal);
    let onAdd = (e) => {
        console.log(`${id}, ${addPlaylistId}`);
        console.log(api.post(`/addtoplaylist`, {
            PlaylistID: addPlaylistId,
            SongID: id,
        }).then((res) => {
            console.log(res.data);
        }))
    };
    let onDelete = (e) => {
        console.log(`${id}, ${playlistId} del`);
        api.post(`/delfromplaylist`, {
            PlaylistID: playlistId,
            SongID: id,
        }).then((res) => {
            console.log(res.data);
        });
    };

    let playing = false;
    let playSong = async () => {
        console.log(audioContext)
        // playing ? source.stop() : source.start();
        // setPlaying(!playing)
        if (typeof file === 'string') {
            const response = await axios.get(`/files/${file}`, {
                responseType: 'arraybuffer',
            });
            const audioBuffer = await audioContext.decodeAudioData(response.data);;
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0)
            playing = true
            console.log('played')
        } else if (typeof newFile === 'string') {
            const response = await axios.get(`/files/${newFile}`, {
                responseType: 'arraybuffer',
            });
            const audioBuffer = await audioContext.decodeAudioData(response.data);;
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0)
            playing = true
            console.log('played')
        } else {
            console.log('failed')
        }
    }
    let pauseSong = () => {
        console.log(audioContext)
        source.stop(0)
        playing = false
    }

    let action = 
        <div>
            Add to playlist:
            <select style={{margin: '5px'}}
                onChange={(e => setAddPlaylistId(e.target.value))}>
                {playlists && playlists.map((playlist) => (
                    <option value={playlist.PlaylistID}>
                        {playlist.Name}
                    </option>
                ))}
            </select>
            <button onClick={onAdd} style={{margin: '5px'}}> Add! </button>
        </div>;
    
    if (remove) {
        action =
            <div>
                {typeof file !== 'string' &&
                <button style={{margin: '5px'}} onClick={() => {
                    if (uploaded === '') {
                        alert('No file chosen. Please upload a file to add to the server')
                    } else {
                        console.log(uploaded)
                        let formData = new FormData();
                        formData.append("file", uploaded);
                        formData.append("SongID", id);
                        axios.post('/upload', formData, {
                            timeout: 5000,
                            mode: 'no-cors',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'multipart/form-data'
                            },
                            credentials: 'same-origin'
                        }).then((res) => {
                            setNewFile(res.data.filename)
                        })
                    }
                }}>Upload Song</button>} {typeof file !== 'string' &&
                <input type='file' onChange={(e) => {
                    setUploaded(e.target.files[0]);
                    console.log(e.target.files[0]);
                }}/>}
                <button onClick={onDelete} style={{margin: '5px'}}> Remove! </button>
            </div>;
    }

    let card = <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '.5em 2em',
        border: '5px solid #151515'
        }}>
        <div>{title} (by {artist}) {typeof file === 'string' && <button onClick={() => playing ? pauseSong() : playSong()}> Play/Pause </button>}</div>
    <div>{action}</div>
    </div>;

    return (<>{card}</>);
}

export default SongBrowse;
