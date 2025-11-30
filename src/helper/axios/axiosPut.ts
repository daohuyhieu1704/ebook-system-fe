import axiosClient from './axiosClient'

const AxiosPut = async (url: string, data: any, params = {}) => {
  try {
    const response = await axiosClient.put(url, data, { params })
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export default AxiosPut
