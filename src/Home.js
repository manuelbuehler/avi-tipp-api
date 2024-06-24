import './Home.css'
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Home = () => {
    const [communityId, setCommunityId] = useState(''); 
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCommunityId(e.target.value); 
    };


    const handleSubmit = () => {
        if (communityId.trim() !== '') {
            navigate(`/${communityId}`);
        }
    }
    return (
        <main className='login'>
            <h1>Tippgruppe</h1>
            <div className="inputBox">
                <input type='text' id="communityId" value={communityId} onChange={handleInputChange} required="required" />
                <span>Tippgruppe-Id</span>
            </div>
            <a href='https://github.com/manuelbuehler/avi-tipp-api' className='helpLink'>Wo finde ich meine Tippgruppe-Id?</a>
            <button className="submitButton" onClick={handleSubmit} type="submit">Speichern</button>
        </main>
    );
};

export default Home;