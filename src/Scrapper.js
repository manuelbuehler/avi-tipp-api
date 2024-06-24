import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import useAutoScroll from "./AutoScroll.js";

const Scrapper = ({ communityId }) => {
  const [data, setData] = useState([]);
  const { containRef, handleMouseOver, handleMouseOut } = useAutoScroll();

  useEffect(() => {
    const fetchAllData = async () => {
      var allLinks = [];
      var page = 1;
      var moreData = true;

      while (moreData) {
        try {
          const url = `/communities/${communityId}?page=${page}`;
          const urlResponse = await axios.get(url);
          const $ = cheerio.load(urlResponse.data);

          const links = [];
          $(".rankingList__item").each((i, element) => {
            const rank = $(element).find(".rankingItem__rank").text().trim();
            const points = $(element).find(".rankingItem__points").text().trim();
            const name = $(element).find(".rankingItem__name .rankingItem__link").text().trim();
            const profileLink = $(element).find(".rankingItem__name .rankingItem__link").attr("href");
            links.push({ rank, points, name, profileLink });
          });

          if (links.length === 0) {
            moreData = false;
          } else {
            allLinks = [...allLinks, ...links];
            page++;
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          moreData = false;
        }
      }

      setData(allLinks);
    };

    fetchAllData();
  }, [communityId]);


  return (
    <section>
      <table id="table_fixed">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Name</th>
            <th>Punkte</th>
          </tr>
        </thead>
      </table>
      <div id="contain" ref={containRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <table id="table_scroll">
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td>
                  <a href={`https://emtippspiel.srf.ch${item.profileLink}`} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Scrapper;
