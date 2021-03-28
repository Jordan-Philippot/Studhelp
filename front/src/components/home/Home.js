import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import IllustrationHome from '../../images/vector-creator7.png'
// import Illustration from '../../images/tel7.png'

import TextLoop from "react-text-loop";

import { TimelineMax } from 'gsap';
import PopupRegister from '../popup/SuccessRegister'
import PopupLogin from '../popup/SuccessLogin'

// import IllustrationHome from '../../images/Home/vector-creator.png'
export default function Home(props) {

    // Get params 
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    // const history = useHistory();

    const [successSubscrib, setSuccessSubscrib] = useState(query.get("registration") ? query.get("registration") : null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (!load) {
            setLoad(true)
            let tl = new TimelineMax();
            // tl.fromTo('.home', 3, { background: "linear-gradient(135deg, #010101 85%,  #6247e9)" }, { background: "linear-gradient(135deg, #010101 60%, #6247e9)" });
        }
    }, [load])

    useEffect(() => {
        if (successSubscrib === "register") {
            const tl = new TimelineMax();
            tl.fromTo('.successRegister-popup', 2, { top: '-500', display: 'none' }, { top: '0px', display: 'block' })
            tl.to('.successRegister-popup', 2, { top: '-500', display: 'none', delay: 5 });
            // history.push('/')
            setSuccessSubscrib(null);
        } else if (successSubscrib === "login") {
            const tl = new TimelineMax();
            tl.fromTo('.successLogin-popup', 2, { top: '-500', display: 'none' }, { top: '0px', display: 'block' })
            tl.to('.successLogin-popup', 2, { top: '-500', display: 'none', delay: 5 });
            // history.push('/')
            setSuccessSubscrib(null);
        } else {
            const tl = new TimelineMax();
            tl.set('.successLogin-popup, .successRegister-popup', { top: '-500', display: 'none' });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="home">
            {/* <img className="illustration" src={Illustration} alt="Students happy illustration" /> */}

            <div className="row justify-content-center">

                <div className="col-xl-5 presentation-block">
                    <div className="z-100">
                        <h1>Créer par et pour les étudiants, nous souhaitons soutenir leur quotidien:
                        <TextLoop>
                                <span>Divertissement</span>
                                <span>Action associative</span>
                                <span>Soutien scolaire</span>
                                <span>Échange entre étudiants</span>
                                <span>Ce dont tu as besoin</span>
                                <span>Soutien psychologique</span>
                            </TextLoop>{" "}</h1>
                        <p>
                            Trouve les évènements près de chez toi en fonction de tes besoins, ou créer le!
                        <br></br>
                        Nous travaillons également avec les associations! <br></br>Pour plus d'informations, tu peux contacter notre équipe <b>ici</b>.
                    </p>


                        <button className="btn btn-yellowOut">Découvrir les évènements</button>
                    </div>

                </div>

                <div className="col-xl-5">
                    <img className="illustrationHome" src={IllustrationHome} alt="Students happy illustration" />
                </div>
            </div>

            <div className="drops">
                <div className="drop drop-1"></div>
                <div className="drop drop-2"></div>
                <div className="drop drop-3"></div>
                <div className="drop drop-4"></div>
                <div className="drop drop-5"></div>
            </div>
            
            
            <PopupRegister />
            <PopupLogin />
        </div>
    )
}
