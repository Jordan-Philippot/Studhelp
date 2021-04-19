import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

import { getDistance } from '../../services/user'
import { getAssocs } from '../../services/associations'

export default function Events() {
    const [center, setCenter] = useState([])
    const [map, setMap] = useState(null)
    const [assocs, setAssocs] = useState([])

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
        navigator.geolocation.getCurrentPosition(function (position) {
            getAssocs(setAssocs, position.coords.latitude, position.coords.longitude, 3)
            setCenter({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
        });
    }, [])


    const containerStyle = {
        width: '400px',
        height: '400px'
    };

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
Evenements
        </div>
    )
}
