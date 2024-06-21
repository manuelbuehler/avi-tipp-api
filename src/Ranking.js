import Scrapper from './Scrapper';
import { useParams } from 'react-router-dom';
import styles from './Ranking.css'

const Ranking = () => {
    const { communityid } = useParams();

    return (
        <main className="table">
            <section className="table__header">
                <h1>Euro2024 Tippspiel Ranking</h1>
            </section>
            <section className="table__body">
                <Scrapper communityId={communityid} />
            </section>
        </main>
    );
}

export default Ranking;