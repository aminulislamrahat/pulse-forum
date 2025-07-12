// src/api/cloudinaryAPI.js
import axios from 'axios'

const CLOUD_NAME = 'ducedegzl' // replace with your cloud name
const UPLOAD_PRESET = 'unsigned_preset_1' // replace with your unsigned upload preset

/**
 * Uploads an image file to Cloudinary using unsigned preset
 * Returns the secure_url of the image
 */
export const uploadToCloudinary = async file => {
  if (!file) throw new Error('No file selected')
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', UPLOAD_PRESET)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    data
  )
  return res.data.secure_url // Cloudinary CDN URL
}
