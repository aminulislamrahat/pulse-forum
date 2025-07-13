import useAxiosPublic from './useAxiosPublic'
import useAxiosPrivate from './useAxiosPrivate'

const useForumAPI = () => {
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

  const getUserByEmail = async email => {
    const res = await axiosPrivate.get(`/users/${email}`)
    return res.data
  }
  // --- Update user profile (name, photo, about) ---
  const updateProfileDB = async (userId, { name, photo, about }) => {
    // PATCH /users/:id/about (or similar endpoint in your backend)
    const res = await axiosPrivate.patch(`/users/${userId}/about`, {
      name,
      photo,
      about
    })
    return res.data // Should be the updated user object
  }

  // --- Upgrade membership ---
  const upgradeMembership = async userId => {
    const res = await axiosPrivate.patch(`/users/${userId}/member`)
    return res.data.user // should return the updated user
  }

  // --- Check membership expiry ---
  const checkMembershipExpiry = async userId => {
    const res = await axiosPrivate.patch(`/users/${userId}/member-expiry-check`)
    return res.data.user // returns updated user
  }
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
    getUserByEmail,
    updateProfileDB,
    upgradeMembership,
    checkMembershipExpiry,
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

export default useForumAPI
