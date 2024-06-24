import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import $ from 'jquery';

const TipScrapper = ({ userId }) => {
    console.log("Start..");

    useEffect(() => {
        const fetchAllData = async () => {
            const teams = [];
            const images = [];
            const results = [];
            let time = "";

            try {
                const url = `/users/jLl6J`;
                const urlResponse = await axios.get(url);
                const $ = cheerio.load(urlResponse.data);

                const links = [];
                $(".widget__main").each((i, element) => {
                    $(element).find(".scoreBet__team").each((i, teamElement) => {
                        console.log(teamElement);
                    });
                });

                // if (links.length === 0) {
                //     moreData = false;
                // } else {
                //     allLinks = [...allLinks, ...links];
                //     page++;
                // }
            } catch (error) {
                console.error("Error fetching data: ", error);
                // moreData = false;
            }
        };

        fetchAllData();
    }, []);


    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         const data = [];

    //         try {
    //             $(".widget__main").each((index, element) => {
    //                 const teams = [];
    //                 const images = [];
    //                 const results = [];
    //                 let time = "";

    //                 // Teams und Bilder auslesen
    //                 $(element).find(".scoreBet__team").each((i, teamElement) => {
    //                     const teamName = $(teamElement).find(".scoreBet__team__name").text().trim();
    //                     const imageUrl = $(teamElement).find(".scoreBet__team__image").attr("src");
    //                     teams.push(teamName);
    //                     images.push(imageUrl);
    //                 });

    //                 // Ergebnis auslesen
    //                 const resultText = $(element).find(".scoreBet__finalResult div").text().trim();
    //                 const [homeScore, awayScore] = resultText.split(" : ");
    //                 results.push(parseInt(homeScore), parseInt(awayScore));

    //                 // Uhrzeit auslesen
    //                 time = $(element).find(".scoreBet__header__meta").text().trim();
    //                 time = time.split(" | ")[1]; // "23. Juni | 21:00" -> "21:00"

    //                 // Daten in Objekt speichern
    //                 const matchData = {
    //                     teams,
    //                     images,
    //                     results,
    //                     time
    //                 };

    //                 // Hier kannst du matchData weiterverarbeiten oder in ein Array pushen, etc.
    //                 console.log(matchData);
    //             });
    //         } catch (error) {
    //             console.error('Error beim Scrapen der Daten:', error);
    //             // Hier kannst du auf den Fehler reagieren, z.B. eine Fehlermeldung anzeigen oder Logging durchführen
    //         }
    //     };

    //     fetchAllData();
    // }, []);

    return (
        <header>
        </header>
    );
}

export default TipScrapper;