import { FiPlus,FiRefreshCcw } from "react-icons/fi";
import React from "react";
import { useState, useEffect } from "react";
import './Dashboard.css';
import container from '../../assets/Container.png';
import photo from '../../assets/Add_picture.png';
import { Link } from "react-router-dom";



const PhotoUpload = () => {
    const [photos, setPhotos] = useState([]);

    const handleAddPhoto = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files).slice(0, 4 - photos.length); // Allow only 4 photos
        const newPhotos = fileArray.map((file) => URL.createObjectURL(file));
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };
    
    const triggerFileInput = () => {
        document.getElementById("file__input").click();
    };
    
    const handleRemovePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    return (
        <div className="info__container">
            <div className="info__text">
                <Link to="/news">Photos</Link>
            </div>
            <FiPlus size={40} onClick={triggerFileInput} className="add__photo__icon" />
            <img src={container} className="info__image" alt="Container" />
            <div className="photos__container">
                {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="photo__wrapper">
                    {photos[index] ? (
                        <img src={photos[index]} alt={`Preview ${index + 1}`} className="add__photo__image" onClick={() => handleRemovePhoto(index)} />
                    ) : (
                        <img src={photo} alt="Add photo" className="add__photo__image" />
                    )}
                </div>
                ))}
            </div>
            <input
                id="file__input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddPhoto}
                className="add__photo__input"
                style={{ display: "none" }}
            />
            <div className="add__photo__text__container">
                <p className="add__photo__text">Add up to 4 photos (click to remove).</p>
            </div>
        </div>
    )
}

export default PhotoUpload;
