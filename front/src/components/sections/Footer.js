import React from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../../images/hat.png'
// import { TimelineMax, CSSPlugin } from 'gsap';

export default function Footer(props) {

    const history = useHistory()

    const Disconnected = () => {
        localStorage.removeItem('studhelp')
        history.push('/connexion')
    }


    return (
        <footer >
            <div className="d-flex row justify-content-center">
                <div className="dropOrange dropOrange-1"></div>
                <div className="dropOrange dropOrange-2"></div>
                <div className="dropOrange dropOrange-3"></div>
                <div className="dropOrange dropOrange-4"></div>

                <ul className="offset-1 col-5 col-sm-5 col-lg-4 col-xl-2 ">
                    <li className="logo">
                        <img src={Logo} alt="logo Stud'help" /><a href="/">Stud'help</a>
                    </li>
                    <div className="d-flex mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 48 48">
                            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                            <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="24" height="24"
                            viewBox="0 0 48 48"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                        </svg>
                    </div>
                </ul>


                <ul className="col-6 col-sm-6 col-lg-4 col-xl-2">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/#howItWorks">Comment ça marche?</a></li>
                    <li><a href="/about-us">A propos</a></li>
                    <li><a href="/evenements">Évènements</a></li>
                    <li><a href="/associations">Associations</a></li>
                    {/* <li><a href="/">FAQ</a></li> */}
                </ul>

                <ul className="offset-1 col-5 col-sm-5 col-lg-4 col-xl-2">
                    {props.token?.user && <li><a href="/espace-client/profil">Profil</a></li>}
                    {props.token?.user && <li><a href="/connexion" onClick={Disconnected}>Déconnexion</a></li>}
                    {!props.token?.user && <li><a href="/connexion">Connexion</a></li>}
                    {!props.token?.user && <li><a href="/inscription">Inscription</a></li>}
                </ul>

                <ul className="col-6 col-sm-6 col-lg-4 col-xl-2">

                    {props.token?.user && <li><a href="/espace-client/mes-evenements">Mes évènements</a></li>}
                    {props.token?.user && <li><a href="/espace-client/mes-participations">Mes Participations</a></li>}
                    {props.token?.user && <li><a href="/espace-client/chat?conversation=">Tchat</a></li>}
                    {props.token?.user && <li><a href="/espace-client/mes-invitations">Mes invitations</a></li>}

                </ul>
            </div>
        </footer >
    )
}
