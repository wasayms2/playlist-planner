import React from 'react';
import Navigation from '../Components/Navigation';

function Landing({userId, setUserId}) {
    let page = 
        <>
            <div style={{'padding': '2em'}}>
                <input
                    type='text'
                    placeholder='Username'
                    name='uname'
                    />
                <input
                    type='text'
                    placeholder='Password'
                    name='pwd'
                    />
                <button type='submit'>Login</button>
            </div>
            <div style={{'padding': '2em'}}>
                <input
                    type='text'
                    placeholder='Username'
                    name='uname'
                    />
                <input
                    type='text'
                    placeholder='Password'
                    name='pwd'
                    />
                
                <input
                    type='text'
                    placeholder='Date Of Birth'
                    name='DOB'
                    />
                
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    />
        
                <button type='submit'>Create New User</button>
            </div>
        </>;
    if (typeof userId !== 'undefined') {
        page =
            <>
                Welcome!
            </>
    }
    return (
        <div>
            <Navigation />
            {page}
        </div>
    );
}

export default Landing;
