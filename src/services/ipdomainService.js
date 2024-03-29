import axios from "../axios";

const getAllIPDomain = (limit, currentPage) => {
    return axios.get(`/proxy?limit=${limit}&page=${currentPage}`);
}

const getIpDomainServiceByPage = (limit, currentPage) => {
    return axios.get(`/proxy?limit=${limit}&page=${currentPage}`)
}

const getIpDomainServiceByName = (limit, currentPage, ipValue) => {
    return axios.get(`/proxy?limit=${limit}&page=${currentPage}&origin=${ipValue}`)
}

const addNewIPDomain = (origin, target, password) => {
    return axios.post('/proxy', {
        origin: origin,
        target: target,
        password: password
    })
}

const updateIPDomain = (id, origin, target, password) => {
    return axios.put(`/proxy/${id}`, {
        id: id,
        origin: origin,
        target: target,
        password: password
    })
}

const deleteIPDomain = (id, password) => {
    return axios.delete(`/proxy/${id}`,{
        data: {
          password: password
        }
      });
}

export default {
    getAllIPDomain,
    addNewIPDomain,
    updateIPDomain,
    deleteIPDomain,
    getIpDomainServiceByPage,
    getIpDomainServiceByName
}