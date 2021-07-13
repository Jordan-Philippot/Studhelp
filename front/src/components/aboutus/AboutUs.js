import React from 'react'
import Title from '../Title'

import Illustration from '../../images/AboutUs/student-help.png'
import Logo from '../../images/hat.png'

export default function AboutUs() {
    return (
        <div className="oneAssociation aboutUs h-100">

            <Title title="À propos de Stud'help" />


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Stud'help, c'est l'histoire de 4 étudiants d'Epitech à Lyon passionées d'informatique, qui,
                        pendant la crise sanitaire, se sont vite rendu compte qu'il existait finalement très peu de solutions
                        et surtout d'entraide pour les étudiants.

                        <br></br><br></br>
                        On à donc décider de créer cette petite plateforme disponible pour tous, dont le but est de recréer un peu
                        de ce lien social et de cette entraide qui s'était rompu entre les confinements.
                        <br></br><br></br>
                        Et parce qu'un verre entre amis c'est bien sympa mais que ça ne paie pas les courses,
                        on à décider de lister toute les associations proche de toi qui pourraient être utile!

                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-4">
                    <img className="rocket-illustration" src={Illustration} alt="Student help each other" />
                </div>
            </div>


            <div className="row justify-content-center video-block">
                <div className="col-10 col-sm-8 col-xl-6">
                    <h2 className="">
                        Et car une petite vidéo vaut mieux qu'une longue explication, voici ce que Stud'help peux te proposer comme services &#128519;
                    </h2>
                </div>

                <div className="col-12">
                    <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                                <stop id="stop1" stop-color="rgba(251, 168, 31, 1)" offset="0%"></stop>
                                <stop id="stop2" stop-color="rgba(251, 168, 31, 1)" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#sw-gradient)" d="M20.8,-23.7C25.9,-20.5,28.2,-12.9,27.1,-6.7C25.9,-0.4,21.3,4.6,17.6,9.4C13.9,14.3,11.3,18.9,6.7,22.1C2.2,25.3,-4.1,27.1,-11.7,26.7C-19.3,26.3,-28.1,23.8,-34.3,17.6C-40.6,11.4,-44.4,1.4,-42.2,-6.8C-40,-15.1,-31.9,-21.8,-23.9,-24.5C-15.9,-27.2,-7.9,-25.9,-0.1,-25.9C7.8,-25.8,15.7,-26.9,20.8,-23.7Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" stroke="url(#sw-gradient)"></path>

                    </svg>

                    <iframe width="560" height="315" src="https://www.youtube.com/embed/u_CcymVIgz0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                </div>




            </div>
        </div >
    )
}
