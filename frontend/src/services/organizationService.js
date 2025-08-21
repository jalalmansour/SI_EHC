import {axiosPrivate} from "./axios.js";

export const organizationService = {
  // Get organizations
  getOrganizations: async () => {
      return await axiosPrivate.get('/organizations')
  },

  // Get users
  getUsers: async () => {
      return await axiosPrivate.get('/users')
  },
}

export default organizationService
