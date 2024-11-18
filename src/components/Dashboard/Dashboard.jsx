import { FiPlus,FiRefreshCcw } from "react-icons/fi";
import React from "react";
import { useState, useEffect } from "react";
import './Dashboard.css';
import container from '../../assets/Container.png';
import photo from '../../assets/Add_picture.png';
import clothes_pie from '../../assets/clothes_pie.png';
import { Link } from "react-router-dom";
import NewsComponent from "./NewsComponent";
import WeatherComponent from "./WeatherComponent";
import PhotoUpload from "./PhotoUpload";
import Tasks from "./Tasks";

const Dashboard = () => {
    const username = localStorage.getItem("username") || "Guest";
    return (
        <main className="main__dashboard__container">
            <header className="heading__container">
                <h1>Good Day {username}</h1>
                <p className="info">(Please click on Sports and News titles, click the link to enable News and Sports widgets.)</p>
                <a href="https://cors-anywhere.herokuapp.com/corsdemo" className="cors">(CORS Anywhere)</a>
            </header>
            <section className="dashboard__container">
                <div className="summary__container">
                    <div className="info__container">
                        <div className="info__text">Weather</div>
                        <img src={container} className="info__image" alt="Weather Info"/>
                        <div className="weather__overlay">
                            <WeatherComponent />
                        </div>
                    </div>
                    <div className="info__container">
                        <div className="info__text">
                            <Link to="/news">News</Link>
                        </div>
                        <img src={container} className="info__image" alt="Weather Info"/>
                        <div className="news__container">
                            <NewsComponent feedType="news" />
                        </div>
                    </div>
                    <div className="info__container">
                        <div className="info__text">
                            <Link to="/sports">Sports</Link>
                        </div>
                        <img src={container} className="info__image" alt="Weather Info"/>
                        <div className="news__container">
                            <NewsComponent feedType="sports" />
                        </div>
                    </div>
                    <PhotoUpload />
                    <Tasks />
                    <div className="info__container">
                        <div className="info__text">Clothes</div>
                        <img src={container} className="info__image" alt="Weather Info"/>
                        <div className="pie__container">
                            <img src={clothes_pie} alt="Pie chart of clothes" className="clothes__pie" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard;