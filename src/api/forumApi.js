import useAxiosPublic from './useAxiosPublic'
import useAxiosPrivate from './useAxiosPrivate'

const useForumAPI = () => {
  const axiosPublic = useAxiosPublic()
  const axiosPrivate = useAxiosPrivate()

  //Public APIs
  // Get all tags (optional search)
  const getAllTags = async (search = '') => {
    const res = await axiosPublic.get(
      `/tags${search ? `?search=${search}` : ''}`
    )
    return res.data
  }

  // Get public posts (for homepage, with tag search, pagination)
  const getPublicPosts = async ({ page, limit, search, sort }) => {
    const res = await axiosPublic.get(
      `/posts/public?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
    )
    return res.data // { posts, total }
  }

  // Get single post (with all comments)
  const getPostWithComments = async postId => {
    const res = await axiosPublic.get(`/posts/${postId}`)
    return res.data // { post, postComments }
  }

  // Get related posts by tag (optionally exclude current post)
  const getRelatedPosts = async (tag, except = '') => {
    const url = `/posts/related/${tag}`
    const res = await axiosPublic.get(url, { params: { except } })
    return res.data
  }

  // Log a search/tag
  const logSearchTag = async tag => {
    // POST /searches { tag }
    const res = await axiosPublic.post('/searches', { tag })
    return res.data
  }

  // Get 3 most popular tags (last 7 days)
  const getPopularSearchTags = async () => {
    // GET /searches/popular
    const res = await axiosPublic.get('/searches/popular')
    return res.data // Array of { tag, count, lastSearched }
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

  //get members
  const getMembers = async ({ page, limit, search }) => {
    const res = await axiosPrivate.get(
      `/users?page=${page}&limit=${limit}&search=${search}`
    )
    return res.data // { users, total }
  }
  // user role change
  const updateUserRole = async (userId, role) => {
    const res = await axiosPrivate.patch(`/users/${userId}/role`, { role })
    return res.data
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
  const getMyPayments = async ({ page, limit, search }) => {
    const res = await axiosPrivate.get(
      `/payments/me?page=${page}&limit=${limit}&search=${search || ''}`
    )
    return res.data // { payments, total }
  }

  // Get all users' payments (admin)
  const getAllPayments = async ({ page, limit, search }) => {
    const res = await axiosPrivate.get(
      `/payments/all?page=${page}&limit=${limit}&search=${search || ''}`
    )
    return res.data // { payments, total }
  }

  // Create new tag (admin)
  const createTag = async data => {
    return (await axiosPrivate.post('/tags', data)).data
  }

  // Update tag (admin)
  const updateTag = async (id, data) => {
    return (await axiosPrivate.patch(`/tags/${id}`, data)).data
  }

  // Delete tag (admin)
  const deleteTag = async id => {
    return (await axiosPrivate.delete(`/tags/${id}`)).data
  }

  // Create post
  const createPost = async data => {
    const res = await axiosPrivate.post('/posts', data)
    return res.data
  }

  // Get all posts (Admin only, with search, pagination)
  const getAllPosts = async ({ page = 1, limit = 10, search = '' }) => {
    const res = await axiosPrivate.get(
      `/posts?page=${page}&limit=${limit}&search=${search}`
    )
    return res.data // { posts, total }
  }

  // Get my posts (with search and pagination)
  const getMyPosts = async ({ page = 1, limit = 10, search = '' }) => {
    const res = await axiosPrivate.get(
      `/posts/me?page=${page}&limit=${limit}&search=${search}`
    )
    return res.data // { posts, total }
  }

  // Update post (title/content only)
  const updatePost = async (postId, { title, content }) => {
    const res = await axiosPrivate.patch(`/posts/${postId}`, { title, content })
    return res.data
  }

  // Change post visibility (public/private)
  const updatePostVisibility = async (postId, isPublic) => {
    const res = await axiosPrivate.patch(`/posts/${postId}/visibility`, {
      public: isPublic
    })
    return res.data
  }

  // Delete post
  const deletePost = async postId => {
    const res = await axiosPrivate.delete(`/posts/${postId}`)
    return res.data
  }

  // Vote on post (upvote/downvote/remove)
  const votePost = async (postId, vote) => {
    // vote = 1 (upvote), -1 (downvote), 0 (remove vote)
    const res = await axiosPrivate.patch(`/posts/${postId}/vote`, { vote })
    return res.data
  }

  // Get recent posts by author (public, 3 only)
  const getRecentPostsByAuthor = async email => {
    const res = await axiosPrivate.get(`/posts/author/${email}`)
    return res.data
  }

  // ----- COMMENTS -----
  // Add comment to a post
  const addComment = async ({ postId, text }) => {
    const res = await axiosPrivate.post('/comments', { postId, text })
    return res.data
  }

  // Edit a comment (owner only)
  const editComment = async (commentId, text) => {
    const res = await axiosPrivate.patch(`/comments/${commentId}`, { text })
    return res.data
  }

  // Delete comment (owner or admin)
  const deleteComment = async commentId => {
    const res = await axiosPrivate.delete(`/comments/${commentId}`)
    return res.data
  }

  // Report a comment (post owner only)
  const reportComment = async (commentId, reason) => {
    const res = await axiosPrivate.post(`/comments/${commentId}/report`, {
      reason
    })
    return res.data
  }

  // Admin: Get all reported comments
  const getReportedComments = async () => {
    const res = await axiosPrivate.get('/comments/reported')
    return res.data
  }

  // ----- ANNOUNCEMENTS -----
  // Create
  const createAnnouncement = async ({ title, content }) => {
    const res = await axiosPrivate.post('/announcements', { title, content })
    return res.data
  }

  // Update
  const updateAnnouncement = async (id, { title, content }) => {
    const res = await axiosPrivate.patch(`/announcements/${id}`, {
      title,
      content
    })
    return res.data
  }

  // Delete
  const deleteAnnouncement = async id => {
    const res = await axiosPrivate.delete(`/announcements/${id}`)
    return res.data
  }

  // Get all
  const getAllAnnouncements = async () => {
    const res = await axiosPrivate.get('/announcements')
    return res.data
  }

  // Get by id
  const getAnnouncementById = async id => {
    const res = await axiosPrivate.get(`/announcements/${id}`)
    return res.data
  }

  // ----- NOTIFICATIONS -----
  // Get notifications for current user
  const getNotifications = async () => {
    const res = await axiosPrivate.get('/notifications')
    return res.data
  }

  // Mark notification as read
  const markNotificationRead = async id => {
    const res = await axiosPrivate.patch(`/notifications/${id}/read`)
    return res.data
  }

  // Get unread notification count
  const getUnreadNotificationCount = async () => {
    const res = await axiosPrivate.get('/notifications/unread/count')
    return res.data.count // returns { count }
  }

  return {
    getUserByEmail,
    updateProfileDB,
    upgradeMembership,
    checkMembershipExpiry,
    getMembers,
    updateUserRole,

    createPaymentIntent,
    savePayment,
    getMyPayments,
    getAllPayments,

    getAllTags,
    createTag,
    updateTag,
    deleteTag,

    createPost,
    getAllPosts,
    getPublicPosts,
    getMyPosts,
    getPostWithComments,
    updatePost,
    updatePostVisibility,
    deletePost,
    votePost,
    getRecentPostsByAuthor,
    getRelatedPosts,
    addComment,
    editComment,
    deleteComment,
    reportComment,
    getReportedComments,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAllAnnouncements,
    getAnnouncementById,
    getNotifications,
    markNotificationRead,
    logSearchTag,
    getPopularSearchTags,
    getUnreadNotificationCount
  }
}

export default useForumAPI
