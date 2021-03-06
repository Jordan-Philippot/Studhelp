import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { getAssoc } from '../../services/associations'
import Illustration from '../../images/Associations/product_launch.png'
import Title from '../Title'

export default function OneAssociation() {
    const [assoc, setAssoc] = useState([])
    const history = useHistory()
    let { id } = useParams();

    useEffect(() => {
        getAssoc(setAssoc, id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="oneAssociation">

            <Title title="Association" />


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Voici l'association que tu as choisis<br></br><br></br>
                        Nous n'avons pas accès aux moyens de contact des associations, mais nous esperons que tu as y trouveras ton bonheur!
                        <br></br><br></br>
                        Et sinon pour revenir à la page précédente, <i onClick={() => history.goBack()}>c'est ici</i> !
                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-4">
                    <img className="rocket-illustration" src={Illustration} alt="Men searching with binoculars" />
                </div>
            </div>



            {assoc !== null ?
                <div className="row justify-content-center">
                    <div className="association-component col-10 col-sm-8 col-md-10 col-lg-11 col-xl-9">
                        <div className="row max-md-flex-direction-column ">

                            <div className="offset-1 col-10 offset-lg-0 col-lg-7">
                                <h4>{assoc.title}</h4>
                                <p className="association-description">{assoc.description}</p>
                            </div>

                            <div className="col-1 hr"></div>

                            <div className="offset-1 col-10 offset-lg-0 col-lg-4 right-side">
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                    <p>{assoc.address}</p>
                                </div>
                                <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                                        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg>
                                    <p>Crée le {assoc.createdDate}</p>
                                </div>
                                {assoc.website && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                                        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                    </svg>
                                    <p>{assoc.website}</p>
                                </div>
                                }
                                {assoc.titleShort && <div className="d-flex information">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                    </svg>
                                    <p>{assoc.titleShort}</p>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                : <p className="geolocalisation-none">Désolé, aucun résultat n'a été trouvé</p>
            }


        </div >
    )
}

