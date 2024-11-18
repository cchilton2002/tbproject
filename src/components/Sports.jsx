import React, { useState, useEffect } from "react";
import "./Sports.css";

const Sports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamWins, setTeamWins] = useState({});
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Fetch the pre-processed JSON data
  useEffect(() => {
    const fetchTeamWins = async () => {
      try {
        const response = await fetch("/team_wins.json");
        const data = await response.json();

        setTeamWins(data);
      } catch (err) {
        console.error("Failed to fetch JSON file:", err);
        setError("Failed to load team data.");
      }
    };

    fetchTeamWins();
  }, []);

  const handleSearch = () => {
    setError("");
    setResults([]);
  
    if (searchTerm.trim() === "") {
      setError("Please enter a team name.");
      return;
    }
  
    // Convert the search term to lowercase
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
    // Create a lowercased version of the teamWins dictionary
    const teamWinsLowercase = Object.fromEntries(
      Object.entries(teamWins).map(([key, value]) => [key.toLowerCase(), value])
    );
  
    // Check for wins in the lowercased dictionary
    const wins = teamWinsLowercase[lowerCaseSearchTerm];
  
    if (!wins || wins.length === 0) {
      setError("Team not found or no wins recorded.");
      return;
    }
  
    setResults(wins);
  };
  

  return (
    <div className="sports__container">
      <h2>Search Teams Beaten by (Serie A 2017/18)</h2>

      <div className="search__bar__container">
        <input
          type="text"
          placeholder="Enter team name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search__input"
        />
        <button onClick={handleSearch} className="search__button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {results.length > 0 ? (
        <div className="results__container">
          <h3 className="teams__beaten">Teams Beaten by {searchTerm}:</h3>
          <ul className="results__list">
            {results.map((team, index) => (
              <li key={index} className="results__list__item">{team}</li>
            ))}
          </ul>
        </div>
      ) : (
        searchTerm.trim() && <p>No wins found or invalid team name entered.</p>
      )}
    </div>
  );
};

export default Sports;