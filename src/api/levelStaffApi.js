import axiosApi from "./axiosApi"

export const deleteLevel = (id) => {
    return axiosApi.patch(`educationallevels?id=${id}`)
}

export const createLevel = payload => {
    return axiosApi.post('educationallevels', payload)
}