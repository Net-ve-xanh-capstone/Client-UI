import axiosApi from "./axiosApi"

export const createPreliminary = payload => {
    return axiosApi.post("schedules/preliminary", payload)
}

export const createFinal = payloiad => {
    return axiosApi.post("schedules/final", payloiad)
}