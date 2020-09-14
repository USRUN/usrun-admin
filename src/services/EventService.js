import axios from "../utils/axios";


const listEvent = async (offset, limit, keyword) => {
    try {
        const response = await axios.post("/event/listEvent",{
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

const createOrUpdateEvent = async (data) =>{
    try {
        const response = await axios.post("/event/createOrUpdate",data);
        return response.data
    } catch (err) {
        console.error(err);
        return null;
    }
}

const exportData = async (row) =>{
    try{
        const response = await axios.post("/event/export", row);
        console.log("response", response.data)
        return response.data;
    }catch(err){
        console.error(err);
        return null;
    }
}

export default {
    listEvent,
    createOrUpdateEvent,
    exportData
};