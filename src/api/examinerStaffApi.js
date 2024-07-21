import axiosApi from "./axiosApi"

export const getAll = () => {
    return axiosApi.get('accounts/getallexaminer')
}

export const getById = id => {
    return axiosApi.get(`accounts/getaccountbyid/${id}`)
}

export const banAccount = id => {
    return axiosApi.patch(`accounts/inactiveaccount?id=${id}`)
}

export const unBanAccount = id => {
    return axiosApi.patch(`accounts/activeaccount?id=${id}`)
}