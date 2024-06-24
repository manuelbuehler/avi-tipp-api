import Scrapper from './Scrapper';
import { useParams } from 'react-router-dom';
import './Ranking.css';
import TipScrapper from './TipScrapper';

const Ranking = () => {
    const { communityid } = useParams();

    return (
        <main className="ranking">
            <section className="table">
                <section className="table__header">
                    <h1>Euro2024 Tippspiel Ranking</h1>
                </section>
                <section className="table__body">
                    <Scrapper communityId={communityid} />
                </section>
            </section>
            <section className='tips'>
                <section className='tips__header'>
                    <h1>Neuste Tipps</h1>
                </section>
                <section className='tips__body'>
                    <TipScrapper/>
                </section>
            </section>
        </main>
    );
}

export default Ranking;
