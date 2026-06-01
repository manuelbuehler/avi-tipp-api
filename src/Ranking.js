import Scrapper from './Scrapper';
import { useParams } from 'react-router-dom';
import './Ranking.css'
import TipsScrapper from './TipsScrapper';

const Ranking = () => {
    const { communityid } = useParams();
    const userId = "zD2gr";

    return (
        <main>
            <section className='table'>
                <section className="table__header">
                    <h1>WM 2026 Tippspiel Ranking</h1>
                </section>
                <section className="table__body">
                    <Scrapper communityId={communityid} />
                </section>
            </section>
            <section className='tips'>
                <section className="tips__header">
                    <h1>Aktuelle Runde</h1>
                </section>
                <section className='tips__body'>
                    <TipsScrapper userId={userId}/>
                </section>
            </section>
        </main>
    );
}

export default Ranking;