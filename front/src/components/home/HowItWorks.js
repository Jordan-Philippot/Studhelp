import React from 'react'
import StudentWork from '../../images/Home/process_outline.png'
import Gaming from '../../images/Home/gaming_solid.png'
import StudentPuzzle from '../../images/Home/team_at_work.png'

export default function HowItWorks() {
    return (
        <div className="howItWorks">
            <h3>Comment ça marche?</h3>


            <div className="explain-block row max-md-flex-direction-column-reverse mt-5" id="howItWorks">
                <div className="explain-text offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4 flex-direction-column ">
                    <h4>Pour commencer Stud'help, c'est quoi? </h4>

                    <p className="describe-explain mt-4">
                        Stud'help, c'est simplement une start-up composée d'étudiants, qui s'est rendu compte qu'il y avait très peu d'aide concrète pendant la crise liée au covid. <br></br>
                        Du coup, on a monté ce petit site pour que tout les étudiants puisse continuer d'intéragir, de créer des liens sociaux, <br></br>
                        et surtout donner un coup de pouce à ceux qui en ont le plus besoin.
                    </p>
                </div>

                <div className="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4 bubble-turquoise">
                    <img className="explain-picture" src={StudentWork} alt="Students working and discussing in front of a smartphone" />
                </div>
            </div>



            <div className="explain-block row max-md-flex-direction-column">

                <div className="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4 bubble-turquoise">
                    <img className="explain-picture" src={Gaming} alt="Manette de jeu, gaming, gameboy" />
                </div>

                <div className="explain-text offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4 flex-direction-column ">
                    <h4>Créer et rejoins des évènements près de chez toi</h4>

                    <p className="describe-explain mt-4">
                        En quelques clics, tu peux rechercher des évènements près de chez toi
                        (Soutien scolaire, session sportive, sorties, groupe d'entraides, évènements associatifs etc..) <br></br>
                        Un tchat est également disponible pour chaque évènement afin d'échanger avec d'autres étudiant ou simplement s'organiser &#128578;
                    </p>

                    <div className="mt-4">
                        <a className="text-blue d-flex" href="/evenements">
                            <p className="mr-2">En savoir plus</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            <div className="explain-block row max-md-flex-direction-column-reverse" id="howItWorks">
                <div className="explain-text offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4 flex-direction-column ">
                    <h4>Besoin de soutien? </h4>

                    <p className="describe-explain mt-4">
                       Ici, tu trouveras toute les associations étudiantes de france, directement tirées du site gouvernementale.<br></br>
                       Du simple BDE au soutien psychologique, à une récolte alimentaire, tu trouveras tout ce dont tu as besoin &#128519;
                    </p>

                    <div className="mt-4">
                        <a className="text-blue d-flex" href="/associations">
                            <p className="mr-2">En savoir plus</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4 bubble-turquoise">
                    <img className="explain-picture" src={StudentPuzzle} alt="" />
                </div>
            </div>




            {/* <div className="row justify-content-center mt-5">
                <div className="col-sm-5 bubble-turquoise">
                    <img src={StudentWork} alt="students work and phone" />
                </div>


                <div className="col-sm-6">
                    <p><br></br>
                    </p>
                </div>
            </div> */}
        </div>
    )
}
