import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './LoginForm.css';

interface LoginFormProps {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm = ({setUserName, setIsLoggedIn}: LoginFormProps) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginDirty, setLoginDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginError, setLoginError] = useState('Логин не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);
    const [authError, setAuthError] = useState('');

    let navigate = useNavigate();

    async function authorization() {
        const response = await fetch(`http://localhost/counteroffensive/server/index.php?method=login&login=${login}&password=${password}`, {
            method: 'get',
        });
        return await response.json();
    }

    async function authHandler() {
        const response = await authorization();
        if (response['result'] === 'ok') {
            const userName = response['data']['name'];
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            setUserName(userName);
            localStorage.setItem('userName', userName)
            navigate("/rectangle");
        } else {
            setAuthError(response['error']['text']);
        }
    }

    const loginHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
        if (e.target.value.length < 3) {
            setLoginError('Логин должен иметь более 2 символов');
        } else {
            setLoginError('');
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 5 || e.target.value.length > 16) {
            setPasswordError('Пароль должен иметь не менее 4 символов но не более 16');
        } else {
            setPasswordError('');
        }
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'login':
                setLoginDirty(true);
                break
            case 'password':
                setPasswordDirty(true);
                break
        }
    }

    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [loginError, passwordError])

    return (
        <div className="login_form">
            <p>Авторизация</p>
            {(loginDirty && loginError) && <div className="formError">{loginError}</div>}
            <input placeholder="Логин" onChange={e => loginHandler(e)} onBlur={e => blurHandler(e)} value={login} name="login" type="text"/>
            {(passwordDirty && passwordError) && <div className="formError">{passwordError}</div>}
            <input placeholder="Пароль" onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} value={password} name="password" type="text"/>
            <button disabled={!formValid} onClick={authHandler}>Вход</button>
            {authError && <div className="formError authError">{authError}</div>}
        </div>
    );
};

export default LoginForm;