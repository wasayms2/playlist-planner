import React, { useState } from 'react';
import Navigation from '../Components/Navigation';

function Landing({userId, setUserId, api}) {
    const [username, setUsername] = useState(undefined);
    const [pass, setPass] = useState(undefined);
    const [dob, setDOB] = useState(undefined);
    const [email, setEmail] = useState(undefined);

    let createUser = () => {
        api.post(`/users`, {
            Email: email,
            Username: username,
            Password: pass,
            DOB: dob
        }).then((res) => {
            api.post(`/findusers`, {
                Username: username,
                Password: pass,
            }).then((res) => {
                console.log(res.data)
                setUserId(res.data)
            });
        });
    };

    let login = () => {

        api.post(`/findusers`, {
            Username: username,
            Password: pass,
        }).then((res) => {
            console.log(res.data)
            setUserId(res.data)
        });
    };

    let page = 
        <>
            <div style={{'padding': '2em'}}>
                <input
                    type='text'
                    placeholder='Username'
                    name='uname'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input
                    type='text'
                    placeholder='Password'
                    name='pwd'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                <button type='submit' onClick={login}>Login</button>
            </div>
            <div style={{'padding': '2em'}}>
                <input
                    type='text'
                    placeholder='Username'
                    name='uname'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input
                    type='text'
                    placeholder='Password'
                    name='pwd'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                
                <input
                    type='text'
                    placeholder='Date Of Birth'
                    name='DOB'
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    />
                
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
        
                <button type='submit' onClick={createUser}>Create New User</button>
            </div>
        </>;
    if (typeof userId !== 'undefined') {
        page =
            <>
                Welcome {username}!
            </>
    }
    return (
        <>
            <Navigation />
            <div style={{margin: '20px'}}>
                {page}
            </div>
        </>
    );
}

export default Landing;
