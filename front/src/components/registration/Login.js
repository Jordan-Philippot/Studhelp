import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser, GoogleAuth } from '../../services/registration.js'
import { GoogleLogin } from 'react-google-login';
import Party from '../../images/party.png'
import Logo from '../../images/hat.png'

export default function Login(props) {
    // Data
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Response
    const [errors, setErrors] = useState([])
    const [response, setResponse] = useState([])
    const [successGoogle, setSuccessGoogle] = useState([])

    const history = useHistory()
    const input = useRef();

    // Login User 
    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([])
        setResponse([])
        loginUser(setResponse, setErrors, email, password)
    };

    // If response contains token, put token in local storage
    useEffect(() => {
        if (response.token) {
            localStorage.setItem('studhelp', response.token)
            window.location.href = '/?registration=login'
        }
    }, [response])

    // Show or hide password
    const showPassword = () => {
        if (input.current.type === "password") {
            input.current.type = "text";
        } else {
            input.current.type = "password";
        }
    }

    useEffect(() => {
        if (props.token.user) {
            history.goBack()
        }
    }, [props, history]);


    // After Click sign in google & choose account
    const responseGoogle = (response) => {
        console.log(response.tokenId);
        setErrors([]);
        const tokenId = response.tokenId
        GoogleAuth(tokenId, setSuccessGoogle, setErrors)
    }

    // if connection success, we return a token and set in localStorage
    useEffect(() => {
        console.log(successGoogle.data)
        if (successGoogle.data) {
            localStorage.setItem('studhelp', successGoogle.data.token)
            window.location.href = '/?registration=login'
        }
    }, [successGoogle])

    return (
        <div className="register">
            <div className="row justify-content-center lg-flex-direction-column-reverse">

                <div className="col-sm-12 col-lg-6 login-block">

                    <h3 className="offset-2 col-8 offset-xl-3 col-xl-6">Connectez-vous avec Studhelp:</h3>
                    <p className="offset-2 col-8 offset-xl-3 col-xl-6"></p>

                    {errors.message === "Invalid credentials." && <span className="text-error">Aucun utilisateur trouvé<br></br></span>}

                    <div className="d-flex flex-direction-column offset-2 col-8 offset-xl-3 col-xl-6 mt-4">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            name="email"
                            id="email"
                            className="login-input"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="d-flex flex-direction-column offset-2 col-8 offset-xl-3 col-xl-6 mt-4">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="d-flex">
                            <input type="password"
                                name="password"
                                id="password"
                                className="login-input"
                                value={password}
                                ref={input}
                                required
                                onChange={(e) => setPassword(e.target.value)} />

                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="showPassword bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="offset-2 col-8 offset-xl-3 col-xl-6">
                        <button className="login-btn" onClick={handleLogin}>Se connecter</button>
                    </div>


                    <a className="" href="/inscription">S'inscrire</a>

                    <GoogleLogin
                        clientId="534386804784-eqjhmmep5fmm96hovnn5kp8h6e2g5f6f.apps.googleusercontent.com"
                        buttonText="Connexion"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="googleLogin mt-5"
                    />

                </div>

                <div className="col-sm-12 col-lg-6 illustration-block">
                    {/* Logo */}
                    <a className="logo d-flex" href="/">
                        <img src={Logo} alt="Studhelp Logo" />
                        <span>Stud'help</span>
                    </a>
                    {/* Illustration */}
                    <img className="illustration-login" src={Party} alt="Student party" />
                </div>

            </div>
        </div>
    )
}
