import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {LoginForm} from "./components/LoginForm/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import Rectangle from "./components/Rectangle/Rectangle";

import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userName, setUserName] = useState(localStorage.getItem('userName') + '');

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar
                    userName={userName}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />

                <main>
                    <Routes>
                        <Route path="*" element={<Rectangle/>}/>
                        <Route path="/login" element={<LoginForm setUserName={setUserName} setIsLoggedIn={setIsLoggedIn}/>}/>
                    </Routes>
                </main>

            </div>
        </BrowserRouter>
    );
}

export default App;