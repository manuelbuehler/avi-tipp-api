import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './TipsScrapper.css'; // Importiere deine CSS-Datei für die Stile
import useAutoScroll from "./AutoScroll.js";

const TipsScrapper = ({ userId }) => {
    const [data, setData] = useState([]);
    // const [currentRound, setCurrentRound] = useState(null);
    const { containRef, handleMouseOver, handleMouseOut } = useAutoScroll();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const url = `/users/${userId}`;
                const urlResponse = await axios.get(url);
                // console.log("Reponse:")
                // console.log(urlResponse);
                // console.log("Data:")
                // console.log(urlResponse.data)
                const $ = cheerio.load(urlResponse.data);

                // const roundsData = $('div[data-react-class="SelectRaceweek/index"]').attr('data-react-props');
                // setCurrentRound(currentRound ? currentRound.round : null);

                // console.log(`${JSON.stringify(currentRound)}`);

                const games = [];
                $('div[data-react-class="ScoreBet"]').each((i, el) => {
                    const props = $(el).attr('data-react-props');
                    if (props) {
                        const gameData = JSON.parse(props).bet;

                        if (gameData) {
                            const { event_date, event_name, meta_location, final_results, teams } = gameData;
                            games.push({
                                event_date,
                                event_name,
                                meta_location,
                                final_results,
                                teams
                            });
                        }
                    }
                });

                setData(games);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchAllData();
    }, [userId]);

    return (
        <div className='gameData' ref={containRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {data.map((game, index) => (
                <div key={index}>
                    <p className="gameInfo">{formatDate(game.event_date)}</p>
                    <p className="gameInfo">{game.meta_location}</p>
                    <div className="teamList">
                        <ul>
                            {game.teams.map((team, idx) => (
                                <li key={idx}>
                                    <img className="teamFlag" src={team.image} alt={team.name} />
                                    <span className="teamName">{team.name}</span>
                                    <span className="result">
                                        {game.final_results && game.final_results[idx] !== null ? game.final_results[idx] : '?'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', options).replace(',', ' | ');
}

export default TipsScrapper;
