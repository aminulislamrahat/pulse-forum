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

  // --- PAYMENTS ---
  // Create a Stripe payment intent
  const createPaymentIntent = async amount => {
    const res = await axiosPrivate.post('/create-payment-intent', { amount })
    return res.data // { clientSecret }
  }

  // Save payment to DB after Stripe success
  const savePayment = async paymentObj => {
    const res = await axiosPrivate.post('/payments', paymentObj)
    return res.data
  }

  // Get current user's payment history
  const getMyPayments = async () => {
    const res = await axiosPrivate.get('/payments/me')
    return res.data
  }

  // Get all users' payments (admin)
  const getAllPayments = async () => {
    const res = await axiosPrivate.get('/payments/all')
    return res.data
  }

  return {
    getUserByEmail,
    updateProfileDB,
    upgradeMembership,
    checkMembershipExpiry,
    createPaymentIntent,
    savePayment,
    getMyPayments,
    getAllPayments,

    getUpcomingEvents,
    getNearestEvents,
    getEventById
  }
}

export default useForumAPI
