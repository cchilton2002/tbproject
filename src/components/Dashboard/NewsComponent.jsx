import { FiPlus,FiRefreshCcw } from "react-icons/fi";
import React from "react";
import { useState, useEffect } from "react";
import './Dashboard.css';


const NewsComponent = ({ feedType }) => {
  const [feedData, setFeedData] = useState(null);

  const fetchFeedData = async (url) => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
      const xmlData = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "application/xml");

      const item = xmlDoc.querySelector("item");
      if (item) {
        const title = item.querySelector("title")?.textContent;
        const description = item.querySelector("description")?.textContent;
        const link = item.querySelector("link")?.textContent;

        setFeedData({ title, description, link });
      }
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    const getFeedUrl = () => {
      if (feedType === "news") {
        return "http://feeds.bbci.co.uk/news/rss.xml";
      } else if (feedType === "sports") {
        return "http://feeds.bbci.co.uk/sport/rss.xml";
      }
      return null;
    };

    const url = getFeedUrl();
    if (url) {
      fetchFeedData(url);
    }
  }, [feedType]);

  return (
    <div className="feed__container">
      {feedData ? (
        <div>
          <h2>{feedData.title}</h2>
          <p>{feedData.description}</p>
        </div>
      ) : (
        <p>Loading {feedType} feed...</p>
      )}
    </div>
  );
};

export default NewsComponent;
