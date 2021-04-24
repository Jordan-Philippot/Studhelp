import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import Select from 'react-select'
import ReactPaginate from "react-paginate";

import { getEvents } from '../../services/events'
import Event from './Event'

export default function Events() {
    const [center, setCenter] = useState([])
    const [map, setMap] = useState(null)
    const [events, setEvents] = useState([])
    const [perimeter, setPerimeter] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchBar, setSearchBar] = useState('')
    const [loading, setLoading] = useState(true)

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
            getEvents(setEvents, setLoading, position.coords.latitude, position.coords.longitude, perimeter, searchBar)
            setCenter({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
            console.log( position.coords.latitude, position.coords.longitude)
        });
    }, [perimeter, searchBar])

    const containerStyle = {
        width: '200px',
        height: '200px'
    };

    console.log(events)

    const options = [
        { value: 3, label: '3km' },
        { value: 5, label: '5km' },
        { value: 10, label: '10km' },
        { value: 20, label: '20km' },
        { value: 30, label: '30km' },
        { value: 50, label: '50km' },
    ]

    // Pagination
    const PER_PAGE = 10;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(events.length / PER_PAGE);

    return (
        <div className="association">

            <div className="row justify-content-center">
                <div className="col-xl-3">
                    <Select
                        defaultValue={perimeter}
                        onChange={(e) => setPerimeter(e.value)}
                        options={options}
                        placeholder={perimeter + "km"}
                    />
                </div>
                <div className="col-xl-3">
                    <input type="text" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} placeholder="Rechercher par Type, Titre, Description, Ville..." />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-xl-6">

                    {(() => {
                        if (events.length > 0 && loading === false) {
                            return events
                                .slice(offset, offset + PER_PAGE)
                                .map((event, key) => {
                                    return <Event key={key} event={event} className="" />
                                })
                        } else {
                            return <button>"ATTEND WSH"</button>;
                        }
                    })()}


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
            </div>


            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        { /* Child components, such as markers, info windows, etc. */}
                        <></>
                    </GoogleMap>
                ) : <></>
            }


    Associations
        </div >
    )
}
