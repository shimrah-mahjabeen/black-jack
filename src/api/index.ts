import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_DECK_BASE_URL,
  timeout: 1000000,
})

export default instance
