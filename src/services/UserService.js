import axios from "../utils/axios";


const banUser = async (userId, banned) => {
    try {
        const response = await axios.post("/users/banUser", {
            userId,
            banned
        });

        if (response.data.code === 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

const loadUserOnPage = async (offset, limit) => {
    try {
        const response = await axios.post("/users/getAllUsersPaged", {
            offset,
            limit
        });

        if (response.data.code === 0) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

const findUsers = async (key, offset, count) => {
    try {
        const response = await axios.post("/users/findUsersPaged", {
            key,
            offset,
            count
        });

        if (response.data.code === 0) {
            return response.data.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default {
    banUser,
    loadUserOnPage,
    findUsers,
};