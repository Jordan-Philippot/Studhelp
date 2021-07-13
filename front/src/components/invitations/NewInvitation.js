import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

import { getUsers } from '../../services/invitations'
import User from './User'
import Title from '../Title'
import Loader1 from '../loader/Loader1'

import Illustration from '../../images/Associations/search_outline.png'

export default function NewInvitation() {
    let { id } = useParams();

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [searchBar, setSearchBar] = useState('')
    const [loading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState("ASC")

    const [message, setMessage] = useState("")

    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(function (position) {
            getUsers(id, setUsers, setLoading, position.coords.latitude, position.coords.longitude, searchBar, orderBy)
        });
        // eslint-disable-next-line
    }, [searchBar, orderBy])


    const optionsOrderBy = [
        { value: "email", label: 'Email' },
        { value: "lastname", label: 'Nom' }
    ]

    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(users.length / PER_PAGE);

    console.log(users)
    return (
        <div className="associations">

            <Title title="Envoyer une Invitation" />

            {/* Select and search bar */}
            <div className="row justify-content-center">
                <div className="col-9 col-sm-7 col-md-3 offset-lg-4 col-lg-2">
                    <Select
                        defaultValue={orderBy}
                        onChange={(e) => setOrderBy(e.value)}
                        options={optionsOrderBy}
                        placeholder={"Trier par"}
                        className="custom-select"
                    />
                </div>
    
                <div className="col-9 col-sm-7 col-md-4 col-lg-3">
                    <input
                        type="text"
                        value={searchBar}
                        onChange={(e) => setSearchBar(e.target.value)}
                        placeholder="Nom, Prénom, Email, Organisation, Ville..."
                        className="searchBar"
                    />
                </div>

            </div>


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Tu peux envoyer une invitation pour ton évènement à n'importe quel utilisateur de Stud'help.<br></br>
                        Recherche par Périmetre, Nom, École, Ville...
                    </p>

                    <p>
                        Afin de garder une interface agréable pour tout le monde, 1 seule invitation est autorisé par personne.
                    </p>
                </div>
                <div className="col-10 col-sm-7 col-md-5 col-lg-5 offset-xl-1 col-xl-4">
                    <img className="search-illustration" src={Illustration} alt="Men searching with binoculars" />
                </div>
            </div>


            {/* New Invitation */}
            <div className="row justify-content-center">
                <textarea placeholder="Tu peux écrire un message ici, il sera envoyé à tout les utilisateurs que tu inviteras &#128521;" className="textarea col-10 col-sm-8 col-md-6 col-xl-3 my-5 py-4" onChange={(e) => setMessage(e.target.value)} />
            </div>

            {/* All Associations with paginate component */}
            <div className="row justify-content-center mb-5">
                <div className="col-xl-9">
                    <div className="row justify-content-center">

                        {(() => {
                            if (users.length === 0 && loading === false) {
                                return <p className="geolocalisation-none">Désolé, pour accéder aux utilisateurs, il faut accepter la géolocalisation</p>
                            } else if (users.length > 0 && loading === false) {
                                return users
                                    .slice(offset, offset + PER_PAGE)
                                    .map((user, key) => {
                                        return <User key={user.id} user={user} eventId={id} message={message} />
                                    })
                            } else {
                                return <Loader1 />;
                            }
                        })()}


                        <div className="row justify-content-center">
                            {(() => {
                                if (users.length > 0 && loading === false) {
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


        </div >
    )
}
