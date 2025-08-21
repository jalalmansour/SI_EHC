import {axiosPrivate} from "./axios.js";

export const planningService = {
  getPlanning: async () => {
      return await axiosPrivate.get('/planning')
  },
}

export default planningService
