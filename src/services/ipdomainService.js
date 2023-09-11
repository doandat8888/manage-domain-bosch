import axios from "../axios";

const getAllIPDomain = () => {
    return axios.get(`/proxy`);
}

const addNewIPDomain = (origin, target) => {
    return axios.post('/proxy', {
        origin: origin,
        target: target
    })
}

const updateIPDomain = (id, origin, target) => {
    return axios.put(`/proxy/${id}`, {
        id: id,
        origin: origin,
        target: target
    })
}

const deleteIPDomain = (id) => {
    return axios.delete(`/proxy/${id}`);
}

export default {
    getAllIPDomain,
    addNewIPDomain,
    updateIPDomain,
    deleteIPDomain
}