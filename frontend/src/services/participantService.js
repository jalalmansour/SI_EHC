import {axiosPrivate} from "./axios.js";

export const participantService = {
  getParticipants: async () => {
      return await axiosPrivate.get('/participants')
  },
}

export default participantService
