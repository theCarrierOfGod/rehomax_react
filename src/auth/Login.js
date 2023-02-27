/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 18:48:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useState } from 'react'
import { useAuth } from './Auth';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const auth = useAuth();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(null);

    const validateUsername = (username, password) => {
        if (username.includes('@')) {
            setUsernameError('invalid username');
            return false;
        }

        if (!username) {
            setUsernameError('Name cannot be blank');
            return false
        }

        setUsernameError(null);
        return true;
    }

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('Password cannot be blank');
            return false
        }

        if (password.length < 8) {
            setPasswordError('Minimum password length is 8');
            return false;
        }

        setPasswordError(null)
        return true;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setButtonDisabled(true);
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        setLoginError(null);

        const isUserValid = validateUsername(username);
        const isPassValid = validatePassword(password);
        if (isUserValid && isPassValid) {
            axios(`${auth.api}welcome?api_token=${auth.api_token}&username=${username}&password=${password}`)
                .then((response) => {
                    if (response.data.code === '00') {
                        auth.login(username);
                    } else {
                        setLoginError(response.data.message)
                    }
                    setButtonDisabled(null);
                })
                .catch((err) => {
                    setLoginError(err.message);
                    setButtonDisabled(null);
                })
        } else {
            setButtonDisabled(null);
        }
    }

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <section className="row justify-content-center">
                <div className="col-lg-6 col-md-7 col-sm-8 col-12">
                    <form onSubmit={handleLogin} className="walletList" style={{ padding: '10px' }}>
                        <div className="" style={{ marginBottom: '20px', fontFamily: 'monospace', fontWeight: '800', textTransform: 'uppercase', fontSize: '18px', textAlign: 'center' }}>
                            Log into your account
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            {loginError ? (
                                <small className="error d-block mb-2 w-100 text-center">
                                    {loginError}
                                </small>
                            ) : null}
                            <input className="form-control input" type="text" name="username" value={username} onChange=
                                {
                                    (e) => {
                                        setUsername(e.target.value)
                                        validateUsername(e.target.value)
                                    }
                                }
                                placeholder="Username"
                            />
                            {usernameError ? (
                                <small className="error">
                                    {usernameError}
                                </small>
                            ) : null}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input className="form-control input" type="password" name="password" value={password} onChange=
                                {
                                    (e) => {
                                        setPassword(e.target.value)
                                        validatePassword(e.target.value)
                                    }
                                }
                                placeholder="Password"
                            />
                            {passwordError ? (
                                <small className="error">
                                    {passwordError}
                                </small>
                            ) : null}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <button className="btn btn-primary" disabled={buttonDisabled ? "disabled" : null} style={{ width: '100%' }} type="submit">
                                {buttonDisabled ? "L O A D I N G . . ." : "L O G I N"}
                            </button>
                        </div>

                        <div style={{ marginTop: '25px', marginBottom: '10px' }}>
                            Need an account? <Link to="/register">Register</Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login