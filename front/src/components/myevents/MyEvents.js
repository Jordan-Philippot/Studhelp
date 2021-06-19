import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getEventsByUser } from '../../services/events'
import MyEvent from './MyEvent'
import IllustrationMyEvents from '../../images/User/Humaans_myevents.png'
import Title from '../Title'
import Loader1 from '../loader/Loader1'

export default function MyEvents() {
    const [myEventsResponse, setMyEventsResponse] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        setLoading(true)
        getEventsByUser(setMyEventsResponse, setLoading)
    }, [])

    console.log(myEventsResponse)

    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(myEventsResponse.length / PER_PAGE);
    return (
        <div className="associations">

            <Title title="Mes Évènements" />

            {/* Presentation my events */}
            <div className="row justify-content-center description-page mt-0">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Ici, tu peux consulter les évènements dont tu es le créateur, ainsi que les modifier.
                    </p>

                    <p>
                        Tu peux également voir les détails en cliquant sur <b>"Voir mon évènement" </b>
                        Dans chaque évènement, la liste des utilisateurs de Stud'help est consultable afin de les inviter.
                        <br></br>
                        Un tchat dédié est également mis à disposition.
                        <br></br><br></br>
                        <i>
                            Tu souhaites créer ton évènement? Rien de plus de simple,
                            il suffit de cliquer sur <b>"Créer un Évènements"</b>
                        </i>
                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-3">
                    <img className="search-illustration" src={IllustrationMyEvents} alt="Men searching with binoculars" />
                </div>
            </div>


            {/* Create new Event */}
            <div className="row justify-content-center">
                <button className="col-6 col-xl-3 btn-orangeFull my-5 py-4" onClick={() => history.push("/espace-client/nouvel-evenement")}>Créer un Évènement</button>
            </div>


            {/* All Associations with paginate component */}
            <div className="row justify-content-center my-5">
                <div className="col-10 col-xl-10">
                    <div className="row justify-content-center">

                        {(() => {
                            if (myEventsResponse.length === 0 && loading === false) {
                                return <p className="geolocalisation-none">Désolé, aucun évènement n'a été trouvé</p>
                            } else if (myEventsResponse.length > 0 && loading === false) {
                                return myEventsResponse
                                    .slice(offset, offset + PER_PAGE)
                                    .map((event, key) => {
                                        return <MyEvent key={key} event={event} />
                                    })
                            } else {
                                return <Loader1 />;
                            }
                        })()}


                        <div className="row justify-content-center">
                            {(() => {
                                if (myEventsResponse.length > 0 && loading === false) {
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



            <ReactPaginate
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
        </div>
    )
}
