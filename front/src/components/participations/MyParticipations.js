import React, { useEffect, useState } from 'react'
// import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getMyParticipations } from '../../services/participation'
import MyParticipation from './MyParticipation'
import IllustrationMyEvents from '../../images/User/Humaans_myevents.png'
import Title from '../Title'
import Loader1 from '../loader/Loader1'

export default function MyParticipations() {
    const [MyParticipationsResponse, setMyParticipationsResponse] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

    // const history = useHistory()

    useEffect(() => {
        setLoading(true)
        getMyParticipations(setMyParticipationsResponse, setLoading)
    }, [])

    console.log(MyParticipationsResponse)

    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(MyParticipationsResponse.length / PER_PAGE);
    return (
        <div className="associations">

            <Title title="Mes Participations" />

            {/* Presentation my events */}
            <div className="row justify-content-center description-page mt-0">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Ici, tu peux consulter les évènements auquels tu t'es inscrit.
                    </p>

                    <p>
                        Tu peux également voir les détails en cliquant sur <b>"Voir l'évènement" </b>
                        <br></br>
                        Dans chaque évènement, tu auras accès au tchat dédié ou tu pourras simplement supprimer ta participation.
                        <br></br><br></br>
                        <i>
                            Si tu souhaites consulter les évènements dont tu es le créateur,
                            il suffit de te rendre sur <a href="/espace-client/mes-evenements">"Mes Évènements"</a>
                        </i>
                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-3">
                    <img className="search-illustration" src={IllustrationMyEvents} alt="Men searching with binoculars" />
                </div>
            </div>



            {/* All Associations with paginate component */}
            <div className="row justify-content-center my-5">
                <div className="col-10 col-xl-10">
                    <div className="row justify-content-center">

                        {(() => {
                            if (MyParticipationsResponse.length === 0 && loading === false) {
                                return <p className="geolocalisation-none">Désolé, aucun évènement n'a été trouvé</p>
                            } else if (MyParticipationsResponse.length > 0 && loading === false) {
                                return MyParticipationsResponse
                                    .slice(offset, offset + PER_PAGE)
                                    .map((event, key) => {
                                        return <MyParticipation key={key} event={event} />
                                    })
                            } else {
                                return <Loader1 />;
                            }
                        })()}


                        <div className="row justify-content-center">
                            {(() => {
                                if (MyParticipationsResponse.length > 0 && loading === false) {
                                    return <ReactPaginate
                                        previousLabel={"← Previous"}
                                        nextLabel={"Next →"}
                                        pageCount={pageCount}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination"}
                                        previousLinkClassName={"pagination__link"}
                                        nextLinkClassName={"pagination__link"}
                                        disabledClassName={"pagination__link--disabled"}
                                        activeClassName={"pagination__link--active"}
                                    />
                                }
                            })()}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
