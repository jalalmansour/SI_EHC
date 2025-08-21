import {axiosPrivate} from "./axios.js";

export const evaluationService = {
  getEvaluations: async () => {
      return await axiosPrivate().get('/evaluations')
  },
}

export default evaluationService
