import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import TextLoop from "react-text-loop";
// import { TimelineMax } from 'gsap';

import HowItWorks from './HowItWorks'
import Title from '../Title'

import IllustrationHome from '../../images/Home/support_solid.png'


export default function Home() {
    const history = useHistory()


    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (!load) {
            setLoad(true)
        }
    }, [load])


    return (
        <div className="home container-fluid">

            <div className="homepage">

                <Title title={"Stud'help"} />


                <div className="row justify-content-center">
                    {/* Catch phrase & Cta */}
                    <div className="col-10 col-sm-10 col-md-9 col-lg-8 col-xl-6 flex-direction-column presentation-block">

                        <h2>Créer par et pour les étudiants, nous souhaitons soutenir leur quotidien:
                            <br></br>
                            <TextLoop>
                                <span>Divertissement</span>
                                <span>Action associative</span>
                                <span>Soutien scolaire</span>
                                <span>Échange entre étudiants</span>
                                <span>Ce dont tu as besoin</span>
                                <span>Soutien psychologique</span>
                            </TextLoop>{" "}
                        </h2>

                        <h3>
                            Trouve les évènements près de chez toi en fonction de tes besoins, ou créer le!
                            <br></br>Nous travaillons également avec les associations!
                            <br></br>Pour plus d'informations, tu peux contacter notre équipe <b>ici</b>.
                        </h3>

                        <button className="btn btn-orangeOut" onClick={() => history.push('/evenements')}>Découvrir les évènements</button>

                    </div>
                    {/* End catch phrase */}

                    <img src={IllustrationHome} alt="work wave" className="illustration-home col-10 col-sm-8 col-md-9 col-lg-5 col-xl-5" />
                </div>

            </div>
            <HowItWorks />

        </div>
    )
}
