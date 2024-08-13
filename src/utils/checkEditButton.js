export const checkEditButton = (data) => {
    try {

        let currentDate = new Date().toJSON().slice(0, 10);
        const startDate = data.split('T')[0]
        if (currentDate < startDate) return false

        return true
    } catch (e) {
        console.log(e)
    }
}

export const checkNavigateBtn = (data) => {
    try {

        let currentDate = new Date().toJSON().slice(0, 10);
        const startDate = data.split('T')[0]
        if (currentDate === startDate) return false

        return true
    } catch (e) {
        console.log(e)
    }
}

export const checkActiveScheduleButton = (startTime, endTime) => {
    try {
        let currentDate = new Date().toJSON().slice(0, 10);
        const startDate = startTime.split('T')[0]
        const endDate = endTime.split('T')[0]
        if (currentDate >= startDate && currentDate <= endDate) return false

        return true
    } catch (e) {
        console.log(e)
    }
}