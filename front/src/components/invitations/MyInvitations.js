import React, { useEffect, useState } from 'react'
// import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getMyInvitations } from '../../services/invitations'
import MyInvitation from './MyInvitation'
import IllustrationInvitations from '../../images/User/Humaaans - Phone.png'
import Title from '../Title'
import Loader1 from '../loader/Loader1'

export default function MyInvitations() {
    const [myInvitationsResponse, setMyInvitationsResponse] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [selected, setSelected] = useState("")

    // const history = useHistory()

    useEffect(() => {
        setLoading(true)
        getMyInvitations(setMyInvitationsResponse, setLoading)
    }, [])

    console.log(myInvitationsResponse)
    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCountSender = Math.ceil(myInvitationsResponse.sender ? myInvitationsResponse.sender.length / PER_PAGE : 0);
    const pageCountReceiver = Math.ceil(myInvitationsResponse.receiver ? myInvitationsResponse.receiver.length / PER_PAGE : 0);

    return (
        <div className="associations">

            <Title title="Mes Invitations" />

            {/* Presentation my events */}
            <div className="row justify-content-center description-page mt-0">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Ici, tu peux consulter les invitations que l'on t'as envoyées afin de participer aux évènements, <br></br>
                        ou celles que tu as envoyées aux autres utilisateurs.
                        <br></br><br></br>
                        Pour cela, il te suffit de choisir en cliquant sur un des 2 boutons disponibles
                    </p>

                    <p>
                        Tu peux également voir les détails des invitations en cliquant sur <b>"Voir l'invitation" </b>.
                        <br></br><br></br>
                        Afin que ton expérience utilisateur reste agréable et eviter les spams,
                        1 seule invitation est autorisée par évènement.
                        <br></br>

                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-3">
                    <img className="search-illustration" src={IllustrationInvitations} alt="2 people meet on the phone" />
                </div>
            </div>


            {/* Button for active & display Price Pack */}
            <div className="block-btn row justify-content-center">
                <div className="col-10 col-md-8, col-xl-5">
                    <button type="button" className={`btn-pack ${"receiver" === selected ? "active" : ""}`} onClick={() => setSelected("receiver")}>Invitations Reçues</button>
                    <button type="button" className={`btn-pack ${"sender" === selected ? "active" : ""}`} onClick={() => setSelected("sender")}>Invitations Envoyées</button>
                </div>
            </div>


            {/* All Associations with paginate component */}
            <div className="row justify-content-center my-5">
                <div className="col-10 col-xl-10">
                    <div className="row justify-content-center">

                        {(() => {
                            if (selected === "receiver") {
                                if (myInvitationsResponse.receiver.length === 0 && loading === false) {
                                    return <p className="geolocalisation-none">Aucune invitation n'a été trouvé</p>
                                } else if (myInvitationsResponse.receiver.length > 0 && loading === false) {
                                    return myInvitationsResponse.receiver
                                        .slice(offset, offset + PER_PAGE)
                                        .map((invitation, key) => {
                                            return <MyInvitation key={key} invitation={invitation} who={selected} />
                                        })
                                } else {
                                    return <Loader1 />;
                                }
                            } else if (selected === "sender") {
                                if (myInvitationsResponse.sender.length === 0 && loading === false) {
                                    return <p className="geolocalisation-none">Tu n'as envoyée aucune invitation</p>
                                } else if (myInvitationsResponse.sender.length > 0 && loading === false) {
                                    return myInvitationsResponse.sender
                                        .slice(offset, offset + PER_PAGE)
                                        .map((invitation, key) => {
                                            return <MyInvitation key={key} invitation={invitation} who={selected}/>
                                        })
                                } else {
                                    return <Loader1 />;
                                }
                            }else{
                                return <p className="geolocalisation-none mb-5">Pour voir tes invitations, selectionne un des boutons ci-dessus</p>
                            }

                        })()}


                        <div className="row justify-content-center">
                            {(() => {
                                if (selected === "receiver") {
                                    if (myInvitationsResponse.receiver.length > 0 && loading === false) {
                                        return <ReactPaginate
                                            previousLabel={"← Previous"}
                                            nextLabel={"Next →"}
                                            pageCount={pageCountReceiver}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            previousLinkClassName={"pagination__link"}
                                            nextLinkClassName={"pagination__link"}
                                            disabledClassName={"pagination__link--disabled"}
                                            activeClassName={"pagination__link--active"}
                                        />
                                    }
                                } else if (selected === "sender") {
                                    if (myInvitationsResponse.sender.length > 0 && loading === false) {
                                        return <ReactPaginate
                                            previousLabel={"← Previous"}
                                            nextLabel={"Next →"}
                                            pageCount={pageCountSender}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            previousLinkClassName={"pagination__link"}
                                            nextLinkClassName={"pagination__link"}
                                            disabledClassName={"pagination__link--disabled"}
                                            activeClassName={"pagination__link--active"}
                                        />
                                    }
                                }
                            })()}
                        </div>

                    </div>
                </div>
            </div>

            {(() => {
                if (selected === "receiver") {
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageCountReceiver}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                } else if (selected === "sender") {
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageCountSender}
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
    )
}
