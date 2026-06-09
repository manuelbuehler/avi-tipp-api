import Scrapper from "./Scrapper";
import TipsScrapper from "./TipsScrapper";
import { useParams } from "react-router-dom";
import "./Ranking.css";

const Ranking = () => {
  const { communityid } = useParams();
  const userId = "zD2gr";

  return (
    <main>
      <section className="table">
        <h1 className="main-title-freestyle">WM 2026 Tippspiel Ranking</h1>
        <section className="table__body">
          <Scrapper communityId={communityid} />
        </section>
      </section>
      <section className="tips">
        <h1 className="main-title-freestyle" style={{ paddingLeft: "1rem" }}>
          Aktuelle Spiele
        </h1>

        <section className="tips__body" style={{ overflowY: "auto", flex: 1 }}>
          <TipsScrapper />
        </section>
      </section>
    </main>
  );
};

export default Ranking;
