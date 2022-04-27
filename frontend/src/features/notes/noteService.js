import axios from "axios";

const API_URL = '/api/tickets/'

//  Get ticket notes
const getNotes = async (ticketId, token) => {
    
    // assign bearer token if there is one
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + '/notes', config)

    return response.data
}

const noteService = {
    getNotes
}

export default noteService