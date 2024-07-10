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