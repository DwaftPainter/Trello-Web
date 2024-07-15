import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToOtherColumnsApi = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/support/moving-card`, updateData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

export const createNewBoardApi = async (newBoardData) => {
  const response = await axios.post(`${API_ROOT}/v1/boards`, newBoardData)
  return response.data
}

export const createNewColumnAPIs = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const createNewCardAPIs = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

export const createNewAccountAPis = async (newAccount) => {
  const response = await axios.post(`${API_ROOT}/v2/user/register`, newAccount)
  return response.data
}

export const checkExistAccount = async (account) => {
  const response = await axios.post(`${API_ROOT}/v2/user/login`, account)
  return response.data
}

export const getUserDetails = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.token}` // Replace with your actual JWT token
  }
  const response = await axios.get(`${API_ROOT}/v2/user/login`, { headers })
  return response.data
}