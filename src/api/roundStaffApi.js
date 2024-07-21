import axiosApi from "./axiosApi"

export const createRoundLevel = payload => {
    return axiosApi.post('rounds', payload)
}

export const editRoundLevel = payload => {
    return axiosApi.put('rounds', payload)
}

export const deleteRoundLevel = id => {
    return axiosApi.patch(`rounds?id=${id}`)
}