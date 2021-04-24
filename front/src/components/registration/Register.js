import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser, registerUser, GoogleAuth } from '../../services/registration.js'
import { GoogleLogin } from 'react-google-login';
import HelpYou from '../../images/Home/illustration_home.png'
import Logo from '../../images/hat.png'

export default function Register(props) {
    // Response
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    const [loginResponse, setLoginResponse] = useState([])

    // Data form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')
    const [agree, setAgree] = useState(false)
    

    const [successGoogle, setSuccessGoogle] = useState([])
    const history = useHistory()

    const input = useRef();

    useEffect(() => {
        if (props.token.user) {
            history.goBack()
        }
    }, [props, history]);

    const data = {
        "password": password,
        "email": email,
        "type": type,
        "agree": agree
    }

    const handleRegister = () => {
        setErrors([]);
        registerUser(setSuccess, setErrors, data)
    };

    // If success, we logged User
    useEffect(() => {
        if (success === "success") {
            loginUser(setLoginResponse, setErrors, email, password)
        }
        // eslint-disable-next-line
    }, [success])

    useEffect(() => {
        if (loginResponse.token) {
            localStorage.setItem('studhelp', loginResponse.token)
            window.location.href = '/?registration=register'
        }
    }, [loginResponse])


    // Show or hide password
    const showPassword = () => {
        if (input.current.type === "password") {
            input.current.type = "text";
        } else {
            input.current.type = "password";
        }
    }

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
            window.location.href = '/?registration=register'
        }
    }, [successGoogle])
    
    return (
        <div className="register">
            <div className="row justify-content-center lg-flex-direction-column-reverse">


                <div className="col-sm-12 col-lg-6 login-block">
                    <h3 className="offset-2 col-8 offset-lg-1 col-lg-10 offset-xl-3 col-xl-6">Créez un compte Studhelp:</h3>

                    <div className="d-flex flex-direction-column offset-2 col-8  offset-xl-3 col-xl-6">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            name="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span className="text-error">{errors.email}<br></br></span>}
                    </div>

                    <div className="d-flex flex-direction-column offset-2 col-8 offset-xl-3 col-xl-6">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="d-flex">
                            <input type="password"
                                name="password"
                                id="password"
                                value={password}
                                ref={input}
                                required
                                onChange={(e) => setPassword(e.target.value)} />

                            <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="showPassword bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        {errors.password && <span className="text-error">{errors.password}<br></br></span>}
                    </div>



                    <div className="d-flex flex-direction-column offset-2 col-8 offset-xl-3 col-xl-6">
                        <label htmlFor="">Vous êtes :</label>
                        <div className="d-flex type">
                            <label htmlFor="student">Étudiant</label>
                            <input type="radio" id="student" name="type" value="student" onClick={(e) => setType(e.target.value)} />

                            <label htmlFor="association">Association</label>
                            <input type="radio" id="association" name="type" value="association" onClick={(e) => setType(e.target.value)} />
                        </div>
                        {errors.type && <span className="text-error">{errors.type}</span>}
                    </div>


                    <div className="d-flex offset-2 col-8 offset-xl-3 col-xl-6 mt-3 switch-block">
                        <label className="switch">
                            <input type="checkbox" id="agree" name="agree" onChange={(e) => setAgree(e.target.checked)} />
                            <span className="slider round"></span>
                        </label>

                        <div className="col-8 col-md-10 agreeText">
                            <label htmlFor="agree"><a href="/conditions-générales"> J'accepte les conditions générales d'utilisation.</a></label>
                        </div>
                    </div>

                    <div className="offset-2 col-8 offset-xl-0 col-xl-11 "> {errors.agree && <span className="text-error">{errors.agree}<br></br></span>}</div>


                    <div className="offset-2 col-8 offset-xl-3 col-xl-6">
                        <button className="login-btn" onClick={handleRegister}>Créer un compte</button>
                    </div>

                    <a className="linkRegistration"  href="/connexion">Se connecter</a>

                    <GoogleLogin
                        clientId="534386804784-eqjhmmep5fmm96hovnn5kp8h6e2g5f6f.apps.googleusercontent.com"
                        buttonText="M'inscrire"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="googleLogin"
                    />
                </div>


                <div className="col-sm-12 col-lg-6 illustration-block">
                    {/* Logo */}
                    <a className="logo d-flex" href="/">
                        <img src={Logo} alt="Studhelp Logo" />
                        <span>Studhelp</span>
                    </a>
                    {/* Illustration */}
                    <img className="illustration-login" src={HelpYou} alt="Student in meditation" />
                </div>
            </div>


        </div>
    )
}
