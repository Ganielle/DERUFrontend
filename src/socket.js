import { io } from "socket.io-client"

const URL = process.env.VUE_APP_API_URL
export const socket = io(URL);