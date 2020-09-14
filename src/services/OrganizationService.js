import axios from "../utils/axios";


const listOrganization = async (offset, limit, keyword) => {
    try {
        const response = await axios.post("/sponsor/listOrganization",{
            offset,
            limit,
            keyword
        });
        if (response.data.code === 0) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return []
    }
};

const createOrUpdateOrganization = async (data) =>{
    try {
        const response = await axios.post("/sponsor/createOrUpdate",data);
        return response.data
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default {
    listOrganization,
    createOrUpdateOrganization
};