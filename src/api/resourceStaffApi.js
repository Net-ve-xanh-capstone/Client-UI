import axiosApi from "./axiosApi"

export const createResource = payload => {
    return axiosApi.post('resources', payload)
}

export const editResource = payload => {
    return axiosApi.put('resources', payload)
}

export const deleteResource = id => {
    return axiosApi.patch(`resources?id=${id}`)
}