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
    const [perimeter, setPerimeter] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchBar, setSearchBar] = useState('')
    const [loading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState("ASC")


    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(function (position) {

            getUsers(id, setUsers, setLoading, position.coords.latitude, position.coords.longitude, perimeter, searchBar, orderBy)

        });
    }, [perimeter, searchBar, orderBy])


    // Select Custom
    const optionsPerimeter = [
        { value: 3, label: '3km' },
        { value: 5, label: '5km' },
        { value: 10, label: '10km' },
        { value: 20, label: '20km' },
        { value: 30, label: '30km' },
        { value: 50, label: '50km' },
    ]
    const optionsOrderBy = [
        { value: "title", label: 'Titre' },
        { value: "distance", label: 'Distance' }
    ]

    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(users.length / PER_PAGE);

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
                <div className="col-9 col-sm-7 col-md-3 col-lg-2">
                    <Select
                        defaultValue={perimeter}
                        onChange={(e) => setPerimeter(e.value)}
                        options={optionsPerimeter}
                        placeholder={perimeter + "km"}
                        className="custom-select"
                    />
                </div>
                <div className="col-9 col-sm-7 col-md-4 col-lg-3">
                    <input
                        type="text"
                        value={searchBar}
                        onChange={(e) => setSearchBar(e.target.value)}
                        placeholder="Nom, Ville, Description.."
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
                                        return <User key={key} user={user} />
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
