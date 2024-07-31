import axiosApi from './axiosApi'

export const getAll = () => {
    return axiosApi.get('topics/GetAllTopic')
}

export const createTopic = payload => {
    return axiosApi.post('topics', payload)
}

export const editTopic = payload => {
    return axiosApi.put('topics', payload)
}

export const deleteTopic = id => {
    return axiosApi.patch(`topics?id=${id}`)
}

export const createTopicRound = payload => {
    return axiosApi.post('roundtopics', payload)
}

export const deleteTopicRound = payload => {
    return axiosApi.delete('roundtopics/deleteroundtopic', {
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
