import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

import { getAssocs, getDistance } from '../../services/user'
export default function Events() {

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAkWtxL2EU0hLe9fQXv7umLECdugu8DJdU"
    })

    const [center, setCenter] = useState([])
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [assocs, setAssocs] = useState([])
    const [position, setPosition] = useState([])

    const [distance, setDistance] = useState([])

    useEffect(() => {
       
        navigator.geolocation.getCurrentPosition(function (position) {
            // getGeopositionInfo(setPosition, position.coords.latitude, position.coords.longitude)
            getAssocs(setAssocs, position.coords.latitude, position.coords.longitude)
            getDistance(setDistance, position.coords.latitude, position.coords.longitude)
            setCenter({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
        });
    }, [])

    console.log(assocs)
    // useEffect(() => {
    //     if (assocs.association) {
    //         assocs.association.forEach(element => {
    //             console.log(element)
    //         });
    //     }
    // }, [assocs])
    const containerStyle = {
        width: '400px',
        height: '400px'
    };


    // useEffect(() => {
    //     if (position.location) {

    //         // getDistance(setDistance, position.location.lat, position.location.lng)
    //     }
    // }, [position])

    // useEffect(() => {
    //     assocs.forEach(assoc => {

    //     });
    // }, [assocs])
    return (
        <div>
            {isLoaded ? (
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
hello
        </div>
    )
}
