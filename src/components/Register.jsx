import React from "react";
import './Register.css'
import './Login.css'
import add_picture from '../assets/Add_picture.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRetype, setPasswordRetype] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null); 
    const [previewPhoto, setPreviewPhoto] = useState(add_picture); 

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setProfilePhoto(file); 
            setPreviewPhoto(photoURL); 
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        document.getElementById("profilePicInput").click();
    };

    const handleLogIn = () => {
        navigate("/")
    }

    // Handle registration submission
    const handleRegister = async(event) => {    
        const errors = [];  

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (username.trim().length < 3) {
            errors.push("Username must be at least 3 characters long.");
        }  

        if (!profilePhoto) {
          errors.push("Please upload a profile picture.");
        }
    
        if (password !== passwordRetype) {
          errors.push("Passwords do not match.");
        }
    
        if (errors.length > 0) {
          alert(errors.join("\n\n"));
          return;
        }

        alert("Registration Successful");
        navigate("/")

    };
    return (
        <main className="main__register__container">
            <header className="heading__container">
                <h1>Hackathon</h1>
            </header>
            <section className="register__container">
                <form className="register__details">
                    <input type="text" className="input__field" placeholder="Username" id="register__username" />
                    <input type="text" className="input__field" placeholder="Email" id="register__email" />
                    <input
                        className="input__field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />                    
                    <input
                        className="input__field"
                        type="password"
                        placeholder="Retype Password"
                        value={passwordRetype}
                        onChange={(e) => setPasswordRetype(e.target.value)}
                    />                
                </form>
                <div className="add__photo__container">
                    <img
                    src={previewPhoto} // Shows the preview image
                    alt="Profile Preview"
                    className="profile__picture__image"
                    onClick={triggerFileInput}
                    />
                    <div className="profile__picture__text" onClick={triggerFileInput}>
                        {profilePhoto ? "Change Photo" : "Add Photo"}
                    </div>
                    <input
                    type="file"
                    id="profilePicInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                    />
                </div>
                <div className="register__button__container">
                    <button className="register__button" onClick={handleRegister}>
                        Register
                    </button>
                </div>
                <div className="already__registered__container">
                    <p className="register">
                        Already registered? 
                        <button onClick={handleLogIn} className="register__link"> Log In</button>
                    </p>
                </div>
            </section>
        </main>
    )
} 

export default Register;