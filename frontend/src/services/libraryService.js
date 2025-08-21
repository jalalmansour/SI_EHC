import {axiosPrivate} from "./axios.js";

export const libraryService = {
  getLibrary: async () => {
      return await axiosPrivate().get('/library')
  },
}

export default libraryService
