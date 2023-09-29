import React from 'react';
import {NavLink} from "react-router-dom";
import './NavBar.css';

interface NavBarProps {
    userName: string;
    isLoggedIn: boolean;
    setIsLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({userName, isLoggedIn, setIsLoggedIn}: NavBarProps) => {

    const logOutHandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    }

    return (
        <header className="header">
            {
                isLoggedIn
                    ?
                    <div>
                        <div className="logged">
                            <nav className="nav">
                                <NavLink to="/rectangle">
                                    Прямоугольник
                                </NavLink>
                            </nav>
                            <div className="account">
                                <p className="userName">{userName}</p>
                                <NavLink
                                    to="/login"
                                    onClick={logOutHandler}
                                    className="logOut">
                                    Выход
                                </NavLink>
                            </div>
                            <img className="avatar" alt="" src={require('../../img/bogdan.jpg')}></img>
                        </div>
                    </div>
                    :
                    <div className="notLogged">
                        <nav className="nav">
                            <NavLink to="/rectangle" className={({isActive}) => isActive ? "active" : ""}>
                                Прямоугольник
                            </NavLink>
                        </nav>
                        <NavLink
                            to="/login"
                            onClick={logOutHandler}
                            className="sup login">
                            Войти
                        </NavLink>
                    </div>
            }
        </header>
    );
};

export default NavBar;