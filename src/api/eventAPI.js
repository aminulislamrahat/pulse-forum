import useAxiosPublic from './useAxiosPublic'
import useAxiosPrivate from './useAxiosPrivate'

const useEventAPI = () => {
  const axiosPublic = useAxiosPublic()
  const axiosPrivate = useAxiosPrivate()

  //Public APIs
  const getUpcomingEvents = async (search = '', type = '') => {
    const res = await axiosPublic.get(
      `/get/upcoming-events?search=${search}&type=${type}`
    )
    return res.data
  }

  const getNearestEvents = async () => {
    const res = await axiosPublic.get('/get/nearest-events')
    return res.data
  }

  const getEventById = async id => {
    const res = await axiosPublic.get(`/get/event/${id}`)
    return res.data
  }

  //Private APIs
  const createEvent = async eventData => {
    const res = await axiosPrivate.post('/create-event', eventData)
    return res.data
  }

  const updateEvent = async (id, data) => {
    const res = await axiosPrivate.put(`/update/event/${id}`, data)
    return res.data
  }

  const deleteEvent = async id => {
    const res = await axiosPrivate.delete(`/delete/event/${id}`)
    return res.data
  }

  const joinEvent = async (eventId, eventData) => {
    const res = await axiosPrivate.post(`/join-event/${eventId}`, eventData)
    return res.data
  }

  const getJoinedEvents = async email => {
    const res = await axiosPrivate.get(`/get/joined-events/${email}`)
    return res.data
  }

  const getCreatedEvents = async email => {
    const res = await axiosPrivate.get(`/get/created-events/${email}`)
    return res.data
  }

  return {
    getUpcomingEvents,
    getNearestEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    joinEvent,
    getJoinedEvents,
    getCreatedEvents
  }
}

export default useEventAPI
