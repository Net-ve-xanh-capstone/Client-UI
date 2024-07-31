export const checkActiveDate = (data) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const startDate = data.startTime.split('T')[0];
    const endDate = data.endTime.split('T')[0];

    if (startDate <= currentDate && currentDate <= endDate) return true;

    return false;
};