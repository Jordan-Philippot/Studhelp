import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Select from 'react-select'
import ReactPaginate from "react-paginate";

import { getEvents } from '../../services/events'
import Event from './Event'
import Title from '../Title'
import Illustration from '../../images/Associations/search_outline.png'
import Loader1 from '../loader/Loader1'
import PinMap from '../../images/pin.png'

export default function Events() {
    const [center, setCenter] = useState([])
    const [map, setMap] = useState(null)
    const [events, setEvents] = useState([])
    const [perimeter, setPerimeter] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchBar, setSearchBar] = useState('')
    const [loading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState("ASC")

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU"
    })

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(function (position) {
            getEvents(setEvents, setLoading, position.coords.latitude, position.coords.longitude, perimeter, searchBar, orderBy)
            setCenter({
                "lat": parseFloat(position.coords.latitude),
                "lng": parseFloat(position.coords.longitude)
            })
        });
    }, [perimeter, searchBar])

    // Google maps size
    const containerStyle = {
        width: '350px',
        height: '350px'
    };

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
    const pageCount = Math.ceil(events.length / PER_PAGE);

    return (
        <div className="associations">

            <Title title="Évènements" />

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
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4">
                    <p>
                        Trouve les évènements près de chez toi en quelques clics.<br></br>
                        Recherche par type, ville, description, périmetre, date...
                    </p>

                    <p>
                        Tu peux également voir les détails en cliquant sur <b>"Voir l'évènement"</b>
                        <br></br><br></br>
                        <i>
                            Tu souhaites créer ton évènement? Rien de plus de simple,
                            il suffit de te rendre sur ton espace personnel rubrique <b>"Mes Évènements"</b>
                        </i>
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
                            if (events.length === 0 && loading === false) {
                                return <p className="geolocalisation-none">Désolé, aucun résultat n'a été trouvé</p>
                                // return <p className="geolocalisation-none">Pour accéder aux associations, veuillez accepter la géolocalisation</p>
                            } else if (events.length > 0 && loading === false) {
                                return events
                                    .slice(offset, offset + PER_PAGE)
                                    .map((event, key) => {
                                        return <Event key={key} event={event} />
                                    })
                            } else {
                                return <Loader1 />;
                            }
                        })()}


                        <div className="row justify-content-center">
                            {(() => {
                                if (events.length > 0 && loading === false) {
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


            {
                isLoaded ? (
                    <div className="row justify-content-center mb-5">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={11}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            Marker={center}
                        >
                            <Marker
                                position={center}
                                icon={PinMap} />
                            { /* Child components, such as markers, info windows, etc. */}
                            <></>
                        </GoogleMap>
                    </div>
                ) : <></>
            }


    Associations
        </div >
    )
}
