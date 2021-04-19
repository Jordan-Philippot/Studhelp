import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import Select from 'react-select'

import { getAssocs } from '../../services/associations'
import Association from './Association'

export default function Associations() {
    const [center, setCenter] = useState([])
    const [map, setMap] = useState(null)
    const [assocs, setAssocs] = useState([])
    const [perimeter, setPerimeter] = useState(1)

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
        // navigator.geolocation.getCurrentPosition(function (position) {
        //     getAssocs(setAssocs, position.coords.latitude, position.coords.longitude, perimeter)
        //     setCenter({
        //         "lat": position.coords.latitude,
        //         "lng": position.coords.longitude
        //     })
        // });
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            getAssocs(setAssocs, position.coords.latitude, position.coords.longitude, perimeter)
            setCenter({
                "lat": position.coords.latitude,
                "lng": position.coords.longitude
            })
        });
    }, [perimeter])

    const containerStyle = {
        width: '200px',
        height: '200px'
    };

    console.log(assocs)

    const options = [
        { value: 5, label: '5km' },
        { value: 10, label: '10km' },
        { value: 20, label: '20km' },
        { value: 30, label: '30km' },
        { value: 50, label: '50km' },
    ]


    return (
        <div className="association">

            <div className="row justify-content-center">
                <div className="col-xl-3">
                    <Select
                        defaultValue={perimeter}
                        onChange={(e) => setPerimeter(e.value)}
                        options={options}
                        placeholder={"Autour de moi"}
                    />
                </div>
            </div>

            <div className="row  justify-content-center">
                <div className="col-xl-6">
                    {assocs.length > 0 && assocs.map((assoc, key) => {
                        return <Association key={key} assoc={assoc} className="" />
                    })}
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
