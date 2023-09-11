import axios from "../axios";

const getAllIPDomain = () => {
    return axios.get(`/config`);
}

const addNewIPDomain = (origin, target) => {
    return axios.post('/config', {
        origin: origin,
        target: target
    })
}

const updateIPDomain = (id, origin, target) => {
    return axios.put(`/config/${id}`, {
        id: id,
        origin: origin,
        target: target
    })
}

const deleteIPDomain = (id) => {
    return axios.delete(`/config/${id}`);
}

export default {
    getAllIPDomain,
    addNewIPDomain,
    updateIPDomain,
    deleteIPDomain
}