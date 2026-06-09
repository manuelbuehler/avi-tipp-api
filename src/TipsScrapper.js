import React, { useState, useEffect } from "react";

const TipsScrapper = ({ userId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchESPNResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Datumsberechnung
        const formatDate = (date) => {
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          return `${y}${m}${d}`;
        };

        const today = new Date();

        if (today < new Date("2026-06-11")) {
          var todayStr = "20260611";
        } else {
          var todayStr = formatDate(today);
        }

        // 2. ESPN API-Aufruf (CORS-frei, direkt im Frontend aufrufbar)
        const response = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${todayStr}`,
        );

        if (!response.ok) {
          throw new Error(`ESPN API lieferte Status ${response.status}`);
        }

        const data = await response.json();
        const events = data.events || [];

        // 3. Datenstruktur für die App vereinheitlichen und sortieren
        const formattedMatches = events
          .map((event) => {
            const competition = event.competitions[0];
            const competitors = competition.competitors || [];

            // ESPN unterscheidet strikt zwischen Home und Away via 'homeAway' Eigenschaft
            const homeTeam = competitors.find((c) => c.homeAway === "home");
            const awayTeam = competitors.find((c) => c.homeAway === "away");

            return {
              id: event.id,
              date: new Date(event.date),
              statusName: event.status.type.name, // STATUS_SCHEDULED, STATUS_IN_PROGRESS, STATUS_FINAL
              statusText: event.status.type.shortDetail, // z.B. "FT", "45'", "21:00"
              venue: competition.venue?.fullName || "WM Stadion",
              home: {
                name:
                  homeTeam?.team?.displayName ||
                  homeTeam?.team?.name ||
                  "Heimteam",
                logo: homeTeam?.team?.logo || "",
                score: homeTeam?.score,
              },
              away: {
                name:
                  awayTeam?.team?.displayName ||
                  awayTeam?.team?.name ||
                  "Auswärtsteam",
                logo: awayTeam?.team?.logo || "",
                score: awayTeam?.score,
              },
            };
          })
          .sort((a, b) => a.date - b.date); // Chronologisch sortieren

        setMatches(formattedMatches);
        setLoading(false);
      } catch (err) {
        console.error("ESPN API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Erstes Laden und automatisches Update-Intervall alle 60 Sekunden für Live-Stände
    fetchESPNResults();
    const interval = setInterval(fetchESPNResults, 60000);
    return () => clearInterval(interval);
  }, []);

  // Hilfsfunktion zur Formatierung des Spielstatus (Live, Beendet, Bevorstehend)
  const renderStatus = (match) => {
    if (match.statusName === "STATUS_IN_PROGRESS") {
      return <span className="status-live">● LIVE ({match.statusText})</span>;
    }
    if (match.statusName === "STATUS_FINAL") {
      return <span className="status-ft">Beendet</span>;
    }
    return <span className="status-ns">Noch nicht begonnen</span>;
  };

  if (loading)
    return <div className="tips-loading">Lade ESPN Live-Resultate...</div>;
  if (error)
    return <div className="tips-error">Fehler beim Laden: {error}</div>;

  return (
    <div className="round-results-container">
      {matches.length === 0 ? (
        <p className="no-matches-text">Keine Spiele im Zeitraum angesetzt.</p>
      ) : (
        <div
          className="matches-list"
          style={{ maxHeight: "72vh", overflowY: "auto" }}
        >
          {matches.map((match) => (
            <div key={match.id} className="match-item-card">
              <div className="match-meta">
                <span>
                  {match.date.toLocaleDateString("de-CH", {
                    day: "2-digit",
                    month: "2-digit",
                    timeZone: "cet",
                  })}{" "}
                  - {""}
                  {match.date.toLocaleTimeString("de-CH", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "cet",
                  })}{" "}
                  Uhr
                </span>
                {renderStatus(match)}
              </div>

              <div className="match-teams-row">
                {/* Heimteam */}
                <div className="team-box home-box">
                  {match.home.logo && (
                    <img src={match.home.logo} alt="" className="mini-flag" />
                  )}
                  <span className="team-name-text">{match.home.name}</span>
                </div>

                {/* Score */}
                <div className="score-box">
                  <span className="score-num">
                    {match.statusName !== "STATUS_SCHEDULED"
                      ? match.home.score
                      : "-"}
                  </span>
                  <span className="score-divider">:</span>
                  <span className="score-num">
                    {match.statusName !== "STATUS_SCHEDULED"
                      ? match.away.score
                      : "-"}
                  </span>
                </div>

                {/* Auswärtsteam */}
                <div className="team-box away-box">
                  <span className="team-name-text">{match.away.name}</span>
                  {match.away.logo && (
                    <img src={match.away.logo} alt="" className="mini-flag" />
                  )}
                </div>
              </div>

              <div className="match-venue-text">{match.venue}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TipsScrapper;
