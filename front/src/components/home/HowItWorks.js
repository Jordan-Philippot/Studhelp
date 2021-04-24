import React from 'react'
import StudentWork from '../../images/Home/process_outline.png'
import Gaming from '../../images/Home/gaming_solid.png'

export default function HowItWorks() {
    return (
        <div className="howItWorks">
            <h3>Comment ça marche?</h3>






            <div className="explain-block row max-md-flex-direction-column-reverse mt-5" id="howItWorks">
                <div className="explain-text offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4 flex-direction-column ">
                    <h4>Pour commencer Stud'help, c'est quoi? </h4>

                    <p className="describe-explain mt-4">
                        Stud'help, c'est simplement une start-up composé d'étudiant, qui s'est dis que ce serait pas mal de blabla! <br></br>
                        Du coup, on a monté ce petit site pour que tout les étudiants puisse continuer d'intéragir, de créer des liens sociaux, <br></br>
                        et surtout donner un coup de pouce à ceux qui en ont le plus besoin.
                    </p>

                    {/* <div className="mt-4">
                        <a className="text-blue d-flex text-decoration-none " href="/nos-solutions/Assistant-de-gestion-administrative-patientele">
                            <p className="mr-2">En savoir plus</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    </div> */}
                </div>

                <div className="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4 bubble-turquoise">
                    <img className="explain-picture" src={StudentWork} alt="Expert comptable" />
                </div>
            </div>




            {/* Assistant 2 */}
            <div className="explain-block row max-md-flex-direction-column">

                <div className="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4 bubble-turquoise">
                    <img className="explain-picture" src={Gaming} alt="Manette de jeu, gaming, gameboy" />
                </div>

                <div className="explain-text offset-1 col-10 offset-sm-3 col-sm-6 offset-md-3 col-md-6 offset-lg-1 col-lg-5 offset-xl-1 col-xl-4 flex-direction-column ">
                    <h4>Assistant gestion des rendez-vous</h4>

                    <p className="describe-explain mt-4">
                        Proposer des créneaux à vos interlocuteurs n’est pas forcément chose à facile.
                        Concilier votre agenda avec ses disponibilités peut prendre du temps.
                        Equipez-vous et délaissez cette tâche à votre assistant.
    </p>

                    <div className="mt-4">
                        <a className="text-blue d-flex text-decoration-none " href="/nos-solutions/Assistant-gestionnaire-de-calendrier">
                            <p className="mr-2">En savoir plus</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* End assistant 2 */}






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
