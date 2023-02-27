/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:23:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useAuth } from './Auth';

const Register = () => {

    const auth = useAuth();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [signupError, setSignupError] = useState('')
    const [signupSuccess, setSignupSuccess] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState('');
    const navigate = useNavigate();

    const validateUsername = (username) => {
        if (!username) {
            setUsernameError('name cannot be blank');
            NotificationManager.error('name cannot be blank', "Add New User")
            return false
        }

        if (username.length < 4 || username.length > 15) {
            setUsernameError('min and max lengths are 4 and 15')
            NotificationManager.error('min and max lengths are 4 and 15', "Add New User")
            return false;
        } else {
            fetch(`${auth.api}validate_username?api_token=${auth.api_token}&username=${username}`)
                .then((response) => response.json())
                .then((response) => {
                    let final = response.code;
                    if (final !== '00') {
                        setUsernameError('use a unique username');
                        return false;
                    }
                })
                .catch((err) => {
                    console.log("Error" + false)
                    return false;
                })
        }

        if (username.includes('@')) {
            setUsernameError('invalid username');
            return false;
        }

        setUsernameError(false);
        return true;
    }

    const validateEmail = (email) => {

        if (!email) {
            setEmailError('email cannot be blank');
            return false;
        }

        if (!email.includes('@')) {
            setEmailError('invalid email address');
            return false;
        } else if (!email.includes('.')) {
            setEmailError('invalid email address');
            return false;
        } else {
            fetch(`${auth.api}validate_email?api_token=${auth.api_token}&username&email=${email}`)
                .then((response) => response.json())
                .then((response) => {
                    let final = response.code;
                    if (final !== '00') {
                        setUsernameError('use a unique email');
                        return false;
                    }
                })
                .catch((err) => {
                    console.log("Error" + false)
                    return false;
                })
        }

        setEmailError(false)
        return true;
    }

    const validatePassword = (password) => {

        if (!password) {
            setPasswordError('password cannot be blank');
            return false;
        }

        if (password.length < 8) {
            setPasswordError('minimum password length is 8');
            return false;
        }

        setPasswordError('')
        return true;
    }

    const handleSignup = (event) => {
        event.preventDefault();
        setButtonDisabled(true);
        const username = event.target.elements.username.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const userValid = validateUsername(username);
        const emailValid = validateEmail(email);
        const passValid = validatePassword(password);

        if (userValid && emailValid && passValid) {
            fetch(`${auth.api}new_member?api_token=${auth.api_token}&username=${username}&password=${password}&email=${email}`)
                .then((response) => response.json())
                .then((response) => {
                    let final = response.code;
                    if (final === '00') {
                        setSignupSuccess(true);
                        setSignupError(false)
                        setButtonDisabled(false);
                        NotificationManager.success("Registration Successful", "Add New User")
                        navigate('/login', { replace: false });
                    } else {
                        setSignupSuccess(false);
                        setSignupError(response.message)
                        NotificationManager.error(response.message, "Add New User")
                        setButtonDisabled(false);
                    }
                })
                .catch((err) => {
                    NotificationManager.error(err.message, "Add New User")
                    setButtonDisabled(false);
                })
        } else {
            setButtonDisabled(false);
        }

    }

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <NotificationContainer />
            <section className="row justify-content-center">
                <div className="col-lg-6 col-md-7 col-sm-8 col-12">
                    <form onSubmit={handleSignup} className="walletList" style={{ padding: '10px' }}>
                        <div className="" style={{ marginBottom: '20px', fontFamily: 'monospace', fontWeight: '800', textTransform: 'uppercase', fontSize: '18px', textAlign: 'center' }}>
                            Create a new account.
                        </div>
                        <div style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>
                            {signupError ? (
                                <small className="error">
                                    {signupError}
                                </small>
                            ) : ''}
                            {signupSuccess ? (
                                <small className="success">
                                    {signupSuccess}
                                </small>
                            ) : ''}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
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
                            ) : ''}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <input className="form-control input" type="email" name="email" value={email} onChange=
                                {
                                    (e) => {
                                        setEmail(e.target.value)
                                        validateEmail(e.target.value)
                                    }
                                }
                                placeholder="Email Address"
                            />
                            {emailError ? (
                                <small className="error">
                                    {emailError}
                                </small>
                            ) : ''}
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
                            ) : ''}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <button className="btn btn-primary" disabled={buttonDisabled ? "disabled" : ''} style={{ width: '100%', fontWeight: '700' }} type="submit">
                                {buttonDisabled ? "L O A D I N G . . ." : "R  E  G  I  S  T  E  R"}
                            </button>
                        </div>
                        <div>
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default Register
