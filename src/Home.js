import styles from './Home.css'

const Home = () => {
    return (
        <main className='login'>
            <h1>Tippgruppe</h1>
            <div className="inputBox">
                <input type='text' id="communityId" required="required" />
                <span>Tippgruppe-Id</span>
            </div>
            <a className='helpLink'>Wo finde ich meine Tippgruppe-Id?</a>
            <button className="submitButton" type="submit">Nachricht senden</button>
        </main>
    );
};

export default Home;