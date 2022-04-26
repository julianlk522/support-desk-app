import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

    const dispatch = useDispatch()

    //  Reset if there is any failure to unmount
    useEffect(() => {
        return () => {
            if (isSuccess) dispatch(reset())
        }
    }, [dispatch, isSuccess])
    
    //  Load tickets if they exist or are changed
    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])
    
    if (isLoading) return <Spinner />
    
    return (
        <>
            <BackButton url='/'/>
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                </div>

                <div>
                    {tickets.map((ticket) => (
                        <TicketItem key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tickets