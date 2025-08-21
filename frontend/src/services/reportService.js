import {axiosPrivate} from "./axios.js";

export const reportService = {
  getReports: async () => {
      return await axiosPrivate().get('/reports')
  },
}

export default reportService
