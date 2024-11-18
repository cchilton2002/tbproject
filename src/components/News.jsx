import { FiPlus,FiRefreshCcw } from "react-icons/fi";
import React from "react";
import { useState, useEffect } from "react";
import './News.css'

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const url = "https://feeds.bbci.co.uk/news/rss.xml"
    const fetchNews = async () => {
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
            const xmlData = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "application/xml");

            const items = xmlDoc.getElementsByTagName('item');
            const newsItems = Array.from(items).map(item => ({
                title: item.getElementsByTagName("title")[0].textContent,
                description: item.getElementsByTagName("description")[0].textContent,
                link: item.getElementsByTagName("link")[0].textContent,
                image: item.getElementsByTagName("media:thumbnail")[0]?.getAttribute('url'),
            }))
            setNewsData(newsItems);
            setLoading(false);
        } catch (err){
            setError('Failed to fetch data');
            setLoading(false);
        }

    }
    useEffect(() => {
        fetchNews();
    }, []);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    };
    
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
    };

    if (loading) return <div>Loading news...</div>;
    if (error) return <div>{error}</div>;
    if (newsData.length === 0) return <div>No news available.</div>;

    const currentArticle = newsData[currentIndex];

    return (
        <div className="news__section">
            <h2 className="latest__news">Latest News</h2>
            <div className="news-item">
                <div>
                    {currentArticle.image && (
                        <img src={currentArticle.image} alt={currentArticle.title}  className="news-image" />
                    )}
                </div>

                <h3>{currentArticle.title}</h3>
                <p>{currentArticle.description}</p>
                <a href={currentArticle.link} target="_blank" rel="noopener noreferrer">
                    Read more
                </a>
            </div>
            {/* Navigation Arrows */}
            <div className="navigation-arrows">
                <button onClick={goToPrevious}>&lt; Previous</button>
                <span>
                {currentIndex + 1} / {newsData.length}
                </span>
                <button onClick={goToNext}>Next &gt;</button>
            </div>
        </div>
  );
}

export default News;