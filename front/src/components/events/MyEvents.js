import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { getEventsByUser } from '../../services/events'
import MyEvent from './MyEvent'

export default function MyEvents() {
    const [myEventsResponse, setMyEventsResponse] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)


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
        <div>
            {(() => {
                if (myEventsResponse.length > 0 && loading === false) {
                    return myEventsResponse
                        .slice(offset, offset + PER_PAGE)
                        .map((event, key) => {
                            return <MyEvent key={key} event={event} className="" />
                        })
                } else {
                    return <button>"ATTEND WSH"</button>;
                }
            })()}

mes evenements



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
