import {axiosPrivate} from "./axios.js";

export const certificationService = {
  getCertifications: async () => {
      return await axiosPrivate().get('/certifications')
  },
}

export default certificationService
