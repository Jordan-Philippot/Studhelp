import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { getProfile, setUserProfile } from '../../../services/user.js'
import { TimelineMax } from 'gsap'
import { Helmet } from "react-helmet";

import Illustration from '../../../images/mockup2.png'

export default function Profile(props) {
    const input = useRef();

    const [profile, setProfile] = useState([])

    // Profile informations form 
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState(0)
    const [school, setSchool] = useState("")

    const [isCheckedStudent, setIsCheckedStudent] = useState(false)
    const [isCheckedAssociation, setIsCheckedAssociation] = useState(false)

    const [errorsprofile, setErrorsprofile] = useState([])
    const [successprofile, setSuccessprofile] = useState("")

    const history = useHistory();

    const data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password !== "" ? password : "",
        "type": type,
        "phone": phone,
        "age": age,
        "school": school
    }

    // Get profile
    useEffect(() => {
        getProfile(setProfile)
    }, [])

    // put profile in input
    useEffect(() => {
        if (profile) {
            setFirstname(profile.firstname)
            setLastname(profile.lastname)
            setEmail(profile.email)
            setType(profile.type)
            setPhone(profile.phone)
            setAge(profile.age)
            setSchool(profile.school)

            if (profile.type === "student") {
                setIsCheckedStudent(true)
            } else if (profile.type === "association") {
                setIsCheckedAssociation(true)
            }
        }
    }, [profile])

    useEffect(() => {
        if (props.token.user === "" || props.token.user === false) {
            history.goBack()
        }
    }, [props, history]);

    // A rajouter !!! existe plus success popup -> successProfile
    useEffect(() => {
        if (successprofile === "success") {
            const tl = new TimelineMax();
            tl.fromTo('.success-popup', 2, { top: '-500', display: 'none' }, { top: '0px', display: 'block' })
            tl.to('.success-popup', 2, { top: '-500', display: 'none', delay: 5 });
            setSuccessprofile("")

        } else if (successprofile === "email") {
            const tl = new TimelineMax();
            tl.fromTo('.success-popup', 2, { top: '-500', display: 'none' }, { top: '0px', display: 'block' })
            tl.to('.success-popup', 2, { top: '-500', display: 'none', delay: 5 });

            localStorage.removeItem('studhelp')
            window.location.reload();
            setSuccessprofile("")
        } else {
            const tl = new TimelineMax();
            tl.set('.success-popup', { top: '-500', display: 'none' });
        }
        // eslint-disable-next-line
    }, [successprofile])


    // Show or hide password
    const showPassword = () => {
        if (input.current.type === "password") {
            input.current.type = "text";
        } else {
            input.current.type = "password";
        }
    }

    const handleProfile = () => {
        setUserProfile(data, setErrorsprofile, setSuccessprofile)
    }

    return (
        <div className="profile row justify-content-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Stud'help - Profile</title>
                <link rel="canonical" href="http://localhost:3000/profile" />
            </Helmet>

            <div className="illustration">
                <img className="" src={Illustration} alt="Students happy illustration" />
                {/* <p>SUPER</p> */}
            </div>

            <div className="col-xl-5 profileForm">
                <h1>Mes informations personnelles</h1>
                <p className="catch-phrase">Modifiez à tout moment vos informations personnelles dans cet espace.</p>




                <div className="row justify-content-center">
                    <div className="col-xl-10">

                        <div className="d-flex">
                            <div className="col-xl-5 ">
                                <label htmlFor="lastname">Nom</label>
                                <input type="text"
                                    name="lastname"
                                    id="lastname"
                                    maxLength="50"
                                    value={lastname || ""}
                                    required
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                {errorsprofile.lastname && <span className="text-danger">{errorsprofile.lastname}<br></br></span>}
                            </div>
                            <div className="offset-xl-2 col-xl-5">
                                <label htmlFor="firstname">Prénom</label>
                                <input type="text"
                                    name="firstname"
                                    id="firstname"
                                    value={firstname || ""}
                                    maxLength="50"
                                    required
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                {errorsprofile.firstname && <span className="text-danger">{errorsprofile.firstname}</span>}
                            </div>
                        </div>



                        <div className="flex-direction-column">
                            <div className="d-flex" title="Pour des raisons de sécurité, tout changement d'email entraînera une déconnexion">
                                <label htmlFor="email">Email </label>
                                <svg className="exclamationPoint" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 2.75024C17.1089 2.75024 21.2499 6.89224 21.2499 12.0002C21.2499 17.1082 17.1089 21.2502 11.9999 21.2502C6.89188 21.2502 2.74988 17.1082 2.74988 12.0002C2.74988 6.89224 6.89188 2.75024 11.9999 2.75024Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path opacity="0.9" d="M11.995 8.20435V12.6233" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path opacity="0.9" d="M11.995 15.7961H12.005" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input type="email"
                                name="email"
                                id="email"
                                value={email || ""}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorsprofile.email && <span className="text-danger">{errorsprofile.email}</span>}
                        </div>

                        <div className="d-flex flex-direction-column">
                            <label htmlFor="password">Mot de passe</label>
                            <div className="d-flex">
                                <input type="password"
                                    name="password"
                                    id="password"
                                    value={password || ""}
                                    ref={input}
                                    maxLength="50"
                                    minLength="5"
                                    onChange={(e) => setPassword(e.target.value)} />

                                <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="showPassword bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            {errorsprofile.password && <span className="text-danger">{errorsprofile.password}</span>}
                        </div>


                        <div className="d-flex flex-direction-column col-8">
                            <label htmlFor="">Vous êtes :</label>
                            <div className="d-flex type">
                                <label htmlFor="student">Étudiant</label>
                                <input type="radio" id="student" name="type" value="student" defaultChecked={isCheckedStudent || null} onChange={(e) => setType(e.target.value)} />

                                <label htmlFor="association">Association</label>
                                <input type="radio" id="association" name="type" value="association" defaultChecked={isCheckedAssociation || null} onChange={(e) => setType(e.target.value)} />
                            </div>
                            {errorsprofile.type && <span className="text-error">{errorsprofile.type}</span>}
                        </div>


                        <div className="flex-direction-column">
                            <label htmlFor="school">Nom de votre Association / École </label>
                            <input type="type"
                                name="school"
                                id="school"
                                value={school || ""}
                                required
                                maxLength="50"
                                minLength="3"
                                onChange={(e) => setSchool(e.target.value)}
                            />
                            {errorsprofile.school && <span className="text-error">{errorsprofile.school}</span>}
                        </div>


                        <div className="d-flex">
                            <div className="col-xl-5 ">
                                <label htmlFor="phone">Téléphone</label>
                                <input type="phone"
                                    name="phone"
                                    id="phone"
                                    value={phone || ""}
                                    maxLength="10"
                                    minLength="9"
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {errorsprofile.phone && <span className="text-error">{errorsprofile.phone}<br></br></span>}
                            </div>
                            <div className="offset-xl-2 col-xl-5">
                                <label htmlFor="age">Age</label>
                                <input type="text"
                                    name="age"
                                    id="age"
                                    value={age || ""}
                                    required
                                    maxLength="2"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                {errorsprofile.age && <span className="text-error">{errorsprofile.age}</span>}
                            </div>
                        </div>

                        <button className="btn-yellowOut my-5" onClick={handleProfile}>Enregistrer</button>

                    </div>


                </div>
            </div>
        </div >
    )
}
