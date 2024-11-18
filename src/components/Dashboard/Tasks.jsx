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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
      const newTask = prompt("Enter a new task:");
      if (newTask && newTask.trim() !== "") {
        setTasks([...tasks, newTask]);
      }
  };
  
  const handleTaskComplete = (taskIndex) => {
      const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
      setTasks(updatedTasks);
  };
  
  return (
    <div className="info__container">
        <div className="info__text">
          <Link to="/news">Tasks</Link>
        </div>
        <FiPlus size={40} onClick={handleAddTask} style={{ cursor: "pointer" }} />
        <img src={container} className="info__image" alt="Task Container" />
        <div className="task__list">
        {tasks.length === 0 ? (
            <p className="add__task">Add a task.</p>
        ) : (
            <ul className="task__items">
            {tasks.map((task, index) => (
                <li key={index} className="task__item">
                <span>{task}</span>
                <button onClick={() => handleTaskComplete(index)} className="complete__button">
                    ✓
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    </div>
  )
}

export default Tasks;